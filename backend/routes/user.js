const express = require('express');
const router = express.Router();

//login signup handler 
const {sendotp ,signup,login,changepassword}=require('../controller/auth');

const {resetpassword_token,resetpassword} = require('../controller/resetpassword');

const {auth} = require('../middleware/auth');

//login route
router.post('/login',login);

//signup 
//otp send when clicked create account
router.post('/sendotp',sendotp);
//signup route
router.post('/signup',signup);

router.post('/changepassword' , auth,changepassword);


//reset password
router.post('/reset-password-token',resetpassword_token);

router.post('/reset-password' ,resetpassword);

router.get('/isexptoken',auth,(req,res)=>{
    res.status(200).json({
        success:true,
        message:"nice working"
    });
})

module.exports = router;