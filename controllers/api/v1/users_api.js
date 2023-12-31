const User=require('../../../models/user');
const jwt=require('jsonwebtoken');

module.exports.createSession = async function(req,res){
 try{
    let user = await User.findOne({email: req.body.email});
    console.log("check user", user);
        if (!user || user.password != req.body.password){
        //req.flash('error','Invalid Username/Password');
        return res.json(422,{
            message:"Invalid username or password"
        });
    }
        
     
    return res.json(200,{
      message:"sign in successful",
        data:{
            token:jwt.sign(user.toJSON(),'codeial',{expiresIn:'100000000'})
        }
    })

 }   
catch(err){
    console.log("******", err)
    return res.json(500,{
        message:"Internal Server Error"
    })
    //creq.flash('error',err);
}
}