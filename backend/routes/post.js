const express = require('express');
const { createPost, likesAndUnlikesPost, deletePost, getPostOfFollowing, updateCaption,addComments, deleteComments} = require('../controllers/post');
const { isAuthenticated } = require('../middleware/auth');
const router = express.Router()

router.route("/post/upload").post( isAuthenticated,createPost)

router.route("/post/:id").get( isAuthenticated,likesAndUnlikesPost)

router.route("/post/:id").put( isAuthenticated,updateCaption)

router.route("/post/:id").delete( isAuthenticated,deletePost)

router.route("/posts").get( isAuthenticated,getPostOfFollowing)

router.route("/post/comment/:id").put(isAuthenticated,addComments)

router.route("/post/comment/:id").delete(isAuthenticated,deleteComments)
 

module.exports = router