const Comment=require('../models/comment');
const Post=require('../models/post');


module.exports.create=function(req,res){
    //Comment.create().then().catch();
  Post.findById(req.body.post).then((post)=>{
    Comment.create({
        content:req.body.content,
        post: req.body.post, // as in ejs , we have given post._id value to post variable
        user:req.user._id    // as here also we are using user._id directly
    }).then(comment=>{post.comments.push(comment);
    post.save();
    return res.redirect('/');
})
  }).catch(err=>{
    console.log("error in creating comment");
    return res.redirect('/');
  });
}


module.exports.destroy = function(req, res){
    Comment.findById(req.params.id).then((comment)=>{
        if (comment.user == req.user.id){

            let postId = comment.post;

            Comment.deleteOne({_id:comment._id}).then(()=>{
                Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}}).then();

            })
        }

           
                return res.redirect('back');
            }).catch((err)=>{
        
            return res.redirect('back');
        
    })

   
    
}