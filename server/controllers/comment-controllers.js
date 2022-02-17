const { Blog, Comment } = require("../db/knoll-model");

newComment = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "Oops! We didn't found anything",
    });
  }

  const comment = new Comment(body);

  if (!comment) {
    return res.status(400).json({ success: false, error: err });
  }

  comment
    .save()
    .then((comment) => {
      Blog.findById({ _id: req.body.postId }, (err, post) => {
        if (err) return res.send(err);
        post.comments.push(comment._id);
        post.save(function (err) {
          if (err) return res.send(err);
          res.json({ status: "Comment added successfully to the user" });
        });
      });
    })
    // .then(() => {
    //   return res.status(201).json({
    //     success: true,
    //     id: comment._id,
    //     message: "Comment created!",
    //   });
    // })
    .catch((error) => {
      return res.status(400).json({
        error,
        message: "Comment not created!",
      });
    });
};


getComments = async(req, res) => {
  await Blog.findOne({_id: req.params.id}).populate("comments").then(post => {
    const comments = post.comments
    return res.status(200).json({ success: true, data: comments });
 }).catch((err) => console.log(err));
}


module.exports = {
  newComment,
  getComments
};
