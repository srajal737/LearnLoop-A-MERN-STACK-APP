const user = require('../model/User');
const bcrypt = require("bcrypt");
const mailsend = require('../util/mailsender');
const crypto =require('crypto');
require("dotenv").config();
//resetpassword token -->>here frontend link generated for reset password 
exports.resetpassword_token  = async (req,res)=>{
    try{
        email = req.body.email;
        const existing = await user.findOne({email:email});
        if(!existing){
            return res.status(401).json({
                success:false,
                message:"your email is not registered"
            })
        }


        //generating token 
        const token = crypto.randomBytes(20).toString("hex");
        // const token = crypto.randomUUID();
        const updatedetails = await user.findOneAndUpdate({email},{
            forgetpasswordtoken:token,
            forgettokenduration:Date.now() + 5*60*1000
        });
        //email send -->>frontend url here i use local host frontend url [using vite 5]
        const url = `${process.env.FRONTEND_URL}/update-password/${token}`;//makes link unique for everyone
        await mailsend(email ,"forgot password update link" ,`password reset link: ${url}`);

        return res.json({
            success:true,
            message:"email send successfully !! please check email and click on given link"
        })
    }catch(e){
           return res.status(500).json({
            success:false,
            message:e.message
        })
    }
}

//password update in db 
exports.resetpassword = async (req,res)=>{
    try{
        const {password , confirmpassword , token} = req.body ;//here reset token is given by frontend , like from params
        if(password!==confirmpassword){
            return res.json({
                success:false,
                message:"password not matching"
            })
        }
        const finduser = await user.findOne({forgetpasswordtoken:token});
        if(!finduser){
            return res.status(400).json({
                success:false,
                message:"token invalid"
            })
        }
        //checking duration 
        if(finduser.forgettokenduration < Date.now()){
            return res.json({
                success:false,
                message:"token is expired , please try again with new link"
            })
        }
         const hashedpass = await bcrypt.hash(password, 10);
        await user.findOneAndUpdate({forgetpasswordtoken:token},{
            password:hashedpass
        },{new:true})
        return res.status(200).json({
            success:true,
            message:"password reset successfully"
        });
    }catch(e){
          return res.status(500).json({
            success:false,
            message:e.message
        })
    }
}
