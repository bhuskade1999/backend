const Post =require("../model/post");
const User =require("../model/user");
const cloudinary = require("cloudinary")


exports.createPost = async (req,res)=>{
try{
    const mycloud = await cloudinary.v2.uploader.upload(req.body.image,{
        folder:"posts"
    })
const newPostData ={
    caption : req.body.caption,
    image:{
        public_Id:mycloud.public_id,
        url:mycloud.secure_url
    },
    owner :req.user._id
}

const post = await Post.create(newPostData)
const user = await User.findById(req.user._id)
console.log([post._id])
user.posts.unshift(post._id)
await user.save()


res.status(200).json({success:true,message:"Post Created "})


}catch(err){
    res.status(500).json({
    success:false,
    message :err.message    })

}

}

//===============================Delete Post ====================================

exports.deletePost = async (req,res) => {
try{
    const post = await Post.findById(req.params.id)
    if(!post) {
        return res.status(404).json({success:false, message:"Post Not Found"})
    }
    if(post.owner.toString() !== req.user.id.toString()){
        return res.status(401).json({success:false, message:"Unauthorized"})
    }


     await cloudinary.v2.uploader.destroy(post.image.public_Id)
   await post.deleteOne();

   const user = await User.findById(req.user._id)
    
   const index = user.posts.indexOf(req.params.id)
   user.posts.splice(index, 1)
   await user.save()
    res.status(200).json({success:true,message:"Post Deleted"})

}catch(err){
    res.status(500).json({
    success:false,
    message :err.message    })
}

}








exports.likesAndUnlikesPost = async (req,res) => {
try{
const post = await Post.findById(req.params.id)

if(post.likes.includes(req.user._id)){
const index = post.likes.indexOf(req.user._id)
post.likes.splice(index, 1)
await post.save()
return res.status(200).json({success:true , message:"Post Unlikes"})

}else{

    post.likes.push(req.user._id)
    await post.save()
    return res.status(200).json({success:true, message:"Post Likes"})

}


}catch(err){
    res.status(500).json({
    success:false,
    message :err.message    })
}


}



//=========================================get Post Of Following =========================

exports.getPostOfFollowing = async (req,res) =>{
try{
 
const user = await User.findById(req.user._id) 
 
const post = await Post.find({owner:{$in:user.following}}).populate("owner likes comments.user")

res.status(200).json({success:true, post:post.reverse()})


}catch(err){
    res.status(500).json({
    success:false,
    message :err.message  })
}

     
}


//======================================= Update Post ===========================

exports.updateCaption = async (req,res) => {
try{
const post = await Post.findById(req.params.id)

if(!post) {
    return res.status(404).json({success:false, message:"Post Not Found"})
}

if(post.owner.toString() !== req.user._id.toString()){
    return res.status(401).json({success:false, message:"Unauthorized"})
}

post.caption = req.body.caption

await post.save()

res.status(200).json({success:true,message:"Post Updated"})


}catch(err){
    res.status(500).json({
    success:false,
    message :err.message  })

}

}

//=============================== Add or Update Comments ================================

exports.addComments = async (req,res) => {
try{
    const post = await Post.findById(req.params.id)
    if(!post) {
        return res.status(404).json({success:false, message:"Post Not Found"})
    }

   let commentIndex = -1

   // checking comment is already exist or not
   post.comments.forEach((item,index) =>{
    if(item.user.toString() === req.user._id.toString()){
        commentIndex = index
    }
   })
 
   //if comment exist the update comment
    if(commentIndex  !== -1){
      post.comments[commentIndex].comment = req.body.comment
      await post.save()
      res.status(200).json({success:true,message:"Comment Updated"})

    }else{
        post.comments.push({
            user:req.user._id,
            comment:req.body.comment
        })

        await post.save()
        res.status(200).json({success:true,message:"Comment Added"})
    }

}catch(err){
    res.status(500).json({
    success:false,
    message :err.message  })
}

}

//================================== Deelete Comments ================================

exports.deleteComments = async (req,res) => {
try{

const post = await Post.findById(req.params.id)

if(!post) {
    return res.status(404).json({success:false, message:"Post Not Found"})
}


if(post.owner.toString() === req.user._id.toString()){

    if(req.body.commentId === undefined){
        return res.status(404).json({success:false, message:"CommentId is Required"})
    }

post.comments.forEach((item,index) =>{
    if(item._id.toString() === req.body.commentId.toString()){
          return post.comments.splice(index,1)
    }
})
await post.save()

return res.status(200).json({success:true,message:"Selected Comment Deleted"})

}else{

    post.comments.forEach((item,index) =>{
        if(item.user.toString() === req.user._id.toString()){
          return post.comments.splice(index,1)
        }
       })

       await post.save()
      return res.status(200).json({success:true,message:"Your Comment Has Deleted"})

}


}catch(err){
    res.status(500).json({
    success:false,
    message :err.message  })
}












}