const mongoose = require('mongoose');
const mailsend = require('../util/mailsender');
const otpschema = new mongoose.Schema({
  email:{
    type:String,
    required:true
  },
  otp:{
    type:String,
    required:true,
  },
  createdAt:{ //to make otp invalid after some time .
    type:Date,
    default:Date.now(),
    expires:15*60 //it means automatically expires or deleted after 5 minutes. sec
  }
});

async function sendmailverification(email , otp){
    try{
        const inforesponse =  await mailsend(email,'Email Verification OTP FROM LEARNLOOP',otp);
        
    }
   catch(e){
    console.log("error occured while sending mail ",e);
    throw e ;
   }
}

/*What happens WITH throw e

If mailsend() fails:
Error is caught
You log it

throw e sends the error back to whoever called sendmailverification()

The calling function can now handle the error properly */
otpschema.pre("save",async function(){ //automatically called before save .   NOTE DON'T WRITE this.email or this keyword with arrow function as arrow function not have this pointer so use function
    await sendmailverification(this.email ,this.otp);
  
})

module.exports = mongoose.model("OTP",otpschema);