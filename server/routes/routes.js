const express = require("express")

const UserCtrl = require("../controllers/user-controllers")
const PostCtrl = require("../controllers/post-controllers")
const CommentCtrl = require("../controllers/comment-controllers")

const router = express.Router();

// user realted requests
router.post("/auth/signup", UserCtrl.createUser);
router.post("/auth/login", UserCtrl.getUser);

// blog realted requests
router.post("/post", PostCtrl.createPost)
router.get("/posts", PostCtrl.getPosts);
router.delete("/post/:id", PostCtrl.deletePost);
router.get("/post/:id", PostCtrl.getPostById);
router.get("/posts/:name", PostCtrl.getPostsByName);
router.put("/post/:id", PostCtrl.updatePost);

// comment realted requests
router.post("/comment", CommentCtrl.newComment);
router.get("/comment/:id", CommentCtrl.getComments);


module.exports = router