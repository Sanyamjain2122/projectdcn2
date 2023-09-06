const nodemailer=require("nodemailer");



let transporter=nodemailer.createTransport({
   service:'gmail',
   host:'smtp.gmail.com',
   port: 587 , 
   secure:true,
   auth:{
    user:'sanyamjain2122@gmail.com',
    pass:'qksairtevcvxrvjg'
   }

});

let renderTemplate=(data,relativePath)=>{
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativePath),
    data,
    function(err,template){
        if(err){console.log("error in rendering mail");return;}
        mailHTML=template;
    })
    return mailHTML;
}

module.exports={
    transporter:transporter,
    renderTemplate:renderTemplate
}