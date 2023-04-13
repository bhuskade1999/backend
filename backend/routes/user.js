const express = require('express');
 const {register,login,logout,followUser,updatePassword, updateProfile,deleteProfile, myProfile, getUserProfile, getAllUsers,getMyPosts, getUserPosts ,forgotPassword,resetPassword, searchUsers} = require("../controllers/user")
 const { isAuthenticated } = require('../middleware/auth');
 const router = express.Router()

 router.route("/register").post(register)

 router.route("/login").post(login)

 router.route("/logout").get(logout)

 router.route("/follow/:id").get(isAuthenticated,followUser)

 router.route("/update/password").put( isAuthenticated,updatePassword)

 router.route("/update/profile").put( isAuthenticated,updateProfile)

 router.route("/delete/me").delete(isAuthenticated,deleteProfile)


 router.route("/my/posts").get(isAuthenticated,getMyPosts)

 router.route("/userpost/:id").get(isAuthenticated,getUserPosts)/////

 router.route("/me").get(isAuthenticated,myProfile)

 router.route("/user/:id").get(isAuthenticated,getUserProfile)

 router.route("/users").get(isAuthenticated,getAllUsers)

 router.route("/search").get(isAuthenticated,searchUsers)

 router.route("/forgot/password").post(forgotPassword)

 router.route("/password/reset/:token").put(resetPassword);

 

module.exports = router