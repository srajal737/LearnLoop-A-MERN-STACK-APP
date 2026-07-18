const nodemailer = require('nodemailer');
const mailsend = async (email , title , body)=>{
    try{
        const transportor = nodemailer.createTransport({
        host:process.env.MAIL_HOST,
        auth:{
            user:process.env.MAIL_USER,
            pass:process.env.MAIL_PASS
        }
    });

     let info = await transportor.sendMail({
        from:"Learn Loop",
        to:`${email}`,
        subject:`${title}`,
        html:`${body}`
     })
     return info;
    }catch(e){
        console.log("error while sending mail ");
    }
  
}
module.exports = mailsend;