const Post=require('../models/post')
const Comment=require('../models/comment')
module.exports.create=function(req,res){
Post.create({
    content:req.body.content,
    user:req.user._id
}).then((post)=>{
if(req.xhr){
    return res.status(200).jsosn({
        data:{
            post: post
        },
        message:"post created"
    })


}
req.flash('success', 'Post Published');
return res.redirect('back');



}).catch(err=>{console.log("error in creating post");
return;})
}



module.exports.destroy = function(req, res){
    Post.findById(req.params.id).then(
        (post)=>{
            // .id means converting the object id into string
            if (post.user == req.user.id){
               Post.deleteOne({_id:post._id}).then(()=>{
                Comment.deleteMany({post: req.params.id}).then();

               })
    
                
                    
                }
                console.log("delete kru main post");
                return res.redirect('back');
            }
   ).catch(err=>{
                return res.redirect('back');
            })
    

            
           // return;

   
}