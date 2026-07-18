const user = require('../model/User');
const otpgenerator = require('otp-generator');
const OTP = require('../model/otp');
const bcrypt = require('bcrypt');
const profile = require('../model/profile');
const jwt = require('jsonwebtoken');
require("dotenv").config();
const mailsend = require("../util/mailsender");


//signup flow -->> simple:- fill the details and when click "create account" -->>then sendotp route is active and otp is send to email and entered in db . and when "clicked verify" otp then signuproute is active and matches the otp and if correct then makes db entry.

//sendotp
exports.sendotp = async (req,res)=>{
    try{
          const {email} = req.body;
    if(!email){
        return res.status(403).json({
            success:false,
            message:"please enter the email"
        });
    }
    const checkifpresent =await user.findOne({email:email});
    if(checkifpresent){
        return res.status(401).json({
            success:false,
            message:"user already registered"
        })
    }
    const otp = otpgenerator.generate(6,{
        upperCaseAlphabets:false,
        lowerCaseAlphabets:false,
        specialChars:false
    });

    //opt must be unique see below method is very bad as we interact with db until found a unique otp . [solution is that we use services of otp such that they are always unique]

    const found = await OTP.findOne({otp:otp});
    while(found){
        otp = otpgenerator.generate(6,{
        upperCaseAlphabets:false,
        lowerCaseAlphabets:false,
        specialChars:false
       });
       
       found = await OTP.findOne({otp:otp});
    }

    let result = await OTP.create({
        email,
        otp
    });

    res.status(200).json({
        success:true,
        message:'otp send successfully',
    });
    }catch(e){
        res.status(500).json({
        success:false,
        message:e.message
        })
    }
  
}
//sign up

exports.signup = async(req,res)=>{
try{
    const {
        firstname,
        lastname,
        email,
        password,
        confirmpassword,
        accountType,
        contactnumber,//optional
        otp
    } = req.body;
    if(!firstname || !email || !password || !confirmpassword || !otp || !accountType){
        return res.status(403).json({
            success:false,
            message:"all indicated fields required"
        })
    }
    if(password!==confirmpassword){
        return res.status(400).json({
            success:false,
            message:"password not matched"
        })
    }

    const existinguser = await user.findOne({email:email});
    if(existinguser){
           return res.status(401).json({
            success:false,
            message:"user already registered"
        })
    }

    const recentotp = await OTP.findOne({email}).sort({createdAt:-1}).limit(1);//descending order
    if(!recentotp){
        return res.status(400).json({
            success:false,
            message:"OTP not found"
        })
    }
    if(recentotp.otp!==otp){
        return res.status(400).json({
            success:false,
            message:"invalid otp"
        })
    }

    const hashedpass =await bcrypt.hash(password ,10);

    //db entry
    const profiledatails = await profile.create({
        gender:null,
        dateofbirth:null,
        contactnumber:contactnumber,
        about:null
    });

    const usernew = await user.create({
        firstname,
        lastname,
        email,
        password:hashedpass,
        accountType,
        additionalDetails:profiledatails._id,
        image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstname}${lastname}`
    });

    return res.status(200).json({
        success:true,
        message:"user is registered successfully",
    });

}catch(e){
     res.status(500).json({
             success:false,
        message:`user registeration failed with message :${e.message}`
    })
}
}


//login

exports.login = async(req,res)=>{
    try{
        const {email , password} = req.body ;
        if(!email, !password){
            return res.status(403).json({
            success:false,
            message:"All Indicated fields required"
            }) ;
        }
        const loginuser = await user.findOne({email}).populate("additionalDetails").exec();
        if(!loginuser){
            return res.status(401).json({
                success:false,
                message:"user not registered , signup first"
            })
        }
        if(await bcrypt.compare(password,loginuser.password)){
            const payload = {
                email:loginuser.email,
                id:loginuser._id,
                role:loginuser.accountType
            }
            const token = jwt.sign(payload ,process.env.JWT_SECRET,{
                expiresIn:"10h"
            });

            loginuser.token = token;
            loginuser.password = null;

            const options={
                expires:new Date(Date.now() + 3*24*60*60*1000) , //here date.now return in milli second so add in ms.
                httpOnly:true
            }

            res.cookie("token",token , options).status(200).json({
                success:true,
                token,

                loginuser,
                message:'logged in successfully'
            })
            
        }
        else{
            return res.status(401).json({
                success:false,
                message:"password incorrect"
            })
        }

    }catch(e){
        res.status(500).json({
            success:false,
            message:`user login failed with message :${e.message}`})
    }
}

//change password:-
exports.changepassword = async (req, res) => {
    try {
       const {newpassword , oldpassword ,confirmpassword} =req.body;
       if (newpassword !== confirmpassword) {
			return res.status(400).json({ //400 bad request
				success: false,
				message: "The password and confirm password does not match",
			});
		}
        
        const userid = req.user.id;//this is provided by auth middleware
        const userdetail = await user.findById(userid);
        const ismatch =await bcrypt.compare(oldpassword,userdetail.password);
        if(!ismatch){//401 means unauthorized
            return res.status(401).json({ success: false, message: "The password is incorrect" });
        }

        
        const encryptpass = await bcrypt.hash(newpassword,10);
        const updatingpass = await user.findByIdAndUpdate(userid,{password:encryptpass},{new:true});

        //sending email for password confirmation 
        try{
              const sendingmail = await mailsend(updatingpass.email,`password updated successfully`,`Password updated successfully for ${updatingpass.firstname} ${updatingpass.lastname}`);
        }catch(e){//500 internal server error.
            return res.status(500).json({
				success: false,
				message: "Error occurred while sending email",
				error: e.message,
			});
        }
        	return res.status(200).json({ success: true, message: "Password updated successfully" });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "something went wrong while updating password",
            error: error.message
        });
    }
};
