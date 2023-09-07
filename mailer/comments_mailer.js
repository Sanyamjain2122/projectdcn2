const nodeMailer=require('../config/nodemailer');


exports.newComment=(comment)=>{
    console.log('inside newCommentmailer');
   let htmlString=nodeMailer.renderTemplate({comment:comment},'/comment/new_comment.ejs');
    nodeMailer.transporter.sendMail({
        from:"sanyamjain2122@gmail.com",
        to:comment.user.email,
        subject:"New Comment Published",
        html:htmlString

    },(err,info)=>{
        if(err){
            console.log("error in sending mail", err);
            return;
        }
       // console.log("Mail sent", info);
        return;
        
    })
}