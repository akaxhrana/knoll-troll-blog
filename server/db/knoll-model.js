const mongoose = require('mongoose')
const bcrypt = require("bcrypt")
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {type: String, required: true, unique:true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    posts: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Blog',
    }],
})

const PostSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    created_at: { type: Date, required: true, default: Date },
    imgLocation: {type:String, required: true},
    username: {type: String, required: true},
    // usernameId: { 
    //     type: mongoose.Schema.Types.ObjectId, 
    //     required: true, 
    //     ref: "User" 
    // },
    comments: [{ 
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
   }]
})

const CommentSchema = new Schema({
    username: {
        type: String,
        required:true,
     },
    //  postId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Blog"
    //  },
     content: { type: String, required: true },
     created_at: { type: Date, required: true, default: Date },
    })


UserSchema.pre("save", function (next) {
    const user = this;
  
    bcrypt.hash(user.password, 10, function (error, encrypted) {
      user.password = encrypted;
      next();
    });
  });

const User = mongoose.model("User", UserSchema)
const Blog = mongoose.model("Blog", PostSchema)
const Comment = mongoose.model("Comment", CommentSchema)

module.exports = {User, Blog, Comment}