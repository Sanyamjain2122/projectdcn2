const nodeMailer=require('../config/nodemailer');


exports.newComment=(comment)=>{
    console.log('inside newCommentmailer');
    nodeMailer.transporter.sendMail({
        from:"sanyamjain2122@gmail.com",
        to:comment.user.email,
        subject:"New Comment Published",
        html:'<h1> YUp , your comment is now published ! <h1>'

    },(err,info)=>{
        if(err){
            console.log("error in sending mail", err);
            return;
        }
        console.log("Mail sent", info);
        return;
        
    })
}