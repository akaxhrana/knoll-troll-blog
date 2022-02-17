const {User, Blog} = require("../db/knoll-model");

const fs = require('fs')
const AWS = require("aws-sdk");

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

createPost = async (req, res) => {

  let file = req.body.file

  const imgData = file.split(";base64,").pop()
  const imgToUpload = Buffer.from(imgData,'base64');
  
  // creating params for S3 Bucket 

  const params = {
    Bucket: 'knoll-troll-images',
    Key: req.body.filename,
    Body: imgToUpload,
   };

   // uploading to S3 Bucket
   s3.upload(params, function(error, data) {
    if (error) console.log(error)
    console.log(`File uploaded successfully at ${data.Location}`)

    // `data.Location` returns the url to the S3 Buket object
    const body = req.body;
    body.imgLocation = data.Location

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "Oops! We didn't found anything",
    });
  }

  const post = new Blog(body);

  if (!post) {
    return res.status(400).json({ success: false, error: err });
  }

  post.save().then(post => {
    User.findById({ _id: req.body.usernameId }, (err, user)=>{
      if (err) return res.send(err);
      user.posts.push(post._id);
      user.save(function(err) {
        if (err) return res.send(err);
        res.json({ status : 'Post added successfully to the user' });
      });
    })
    }).then(() => {
            return res.status(201).json({
              success: true,
              id: post._id,
              message: "Post created!",
            });
          })
          .catch((error) => {
            return res.status(400).json({
              error,
              message: "Post not created!",
            });
          });;
  });
}

updatePost = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide something to update",
    });
  }

  Post.findOne({ _id: req.params.id }, (err, post) => {
    if (err) {
      return res.status(404).json({
        err,
        message: "Post not found!",
      });
    }
    post.title = body.title;
    post.description = body.description;
    post.content = body.content;

    post
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          id: post._id,
          message: "Post updated!",
        });
      })
      .catch((error) => {
        return res.status(404).json({
          error,
          message: "Post not updated!",
        });
      });
  });
};

deletePost = async (req, res) => {
  await Blog.findOneAndDelete({ _id: req.params.id }, (err, post) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!post) {
      return res.status(404).json({ success: false, error: `Post not found` });
    }

    return res.status(200).json({ success: true, data: post });
  }).catch((err) => console.log(err));
};

// getPostById = async (req, res) => {
//   await Blog.findOne({ _id: req.params.id }, (err, post) => {
//     if (err) {
//       return res.status(400).json({ success: false, error: err });
//     }

//     if (!post) {
//       return res.status(404).json({ success: false, error: `Post not found` });
//     }
//     return res.status(200).json({ success: true, data: post });
//   }).catch((err) => console.log(err));
// };

getPostById = async(req, res) => {
  await Blog.findOne({_id: req.params.id}).populate("comments").then(post => {
    return res.status(200).json({ success: true, data: post });
 }).catch((err) => console.log(err));
}


getPosts = async (req, res) => {
  await Blog.find({}, null, { sort: { createdAt: -1 } }, (err, posts) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!posts.length) {
      return res.status(404).json({ success: false, error: `Post not found` });
    }
    return res.status(200).json({ success: true, data: posts });
  }).catch((err) => console.log(err));
};

getPostsByName = async (req, res) => {
  await Blog.find(
    { username: req.params.name },
    null,
    { sort: { createdAt: -1 } },
    (err, posts) => {
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }
      if (!posts.length) {
        return res
          .status(404)
          .json({ success: false, error: `Post not found` });
      }
      return res.status(200).json({ success: true, data: posts });
    }
  ).catch((err) => console.log(err));
};

module.exports = {
  createPost,
  getPosts,
  updatePost,
  deletePost,
  getPostById,
  getPostsByName,
};
