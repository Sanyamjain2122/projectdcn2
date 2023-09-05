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
           
               Post.deleteOne({_id:post._id}).then(()=>{
                Comment.deleteMany({post: req.params.id}).then();

               })
               console.log("delete kru main post");
               return res.json(200,{
                message:"posts nd comments deleted successfuly"
               });
                
                    
                }).catch(err=>{
                return res.json(500,{
                    message:'internal servere error'
                });
            })
   
}