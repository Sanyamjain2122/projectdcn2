const Post=require('../../../models/post');
const Comment=require('../../../models/comment');

module.exports.index=function(req,res){

    Post.find({}).populate('user').populate({
        path: 'comments',
            populate :{
                path:'user'
            }
        
    })
    .exec().then((posts)=>{
        
            return res.json(200,{
                message:"hey kis haal chaal",
                post:posts
            })

    }).catch(err=>{console.log(err);
        rres.json(500,{
            message:"not found"
        })})


}




module.exports.destroy = function(req, res){
    Post.findById(req.params.id).then(
        (post)=>{
           if(post.user==req.user.id){
            Post.deleteOne({_id:post._id}).then(()=>{
                Comment.deleteMany({post: req.params.id}).then();

               })
               console.log("delete kru main post");
               return res.json(200,{
                message:"Your posts & comments deleted successfully. Have a good day !:)"
               });
            
           }
           else{
            console.log("Unauthorized");
            return res.json(200,{
             message:"Dont delete someone else's post. Thank you :)"
            });
           }
              
                
                    
                }).catch(err=>{
                return res.json(500,{
                    message:'OMG ! Internal servere error'
                });
            })
   
}