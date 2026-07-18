const jwt = require('jsonwebtoken');
require("dotenv").config();
const user = require("../model/User");
//auth -->>token verify 

exports.auth = async (req,res,next)=>{
    try{
         let token;
        if (req.cookies && req.cookies.token) {
            token = req.cookies.token;
        } 
        else if (req.body && req.body.token) {
            token = req.body.token;
        } 
        else if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
            token = req.headers.authorization.split(" ")[1];
        }
        if(!token){
             return res.status(401).json({
                success: false,
                message: "Token is missing"})
        }
        try{
            const decode = jwt.verify(token , process.env.JWT_SECRET);//payload
            req.user  = decode;
        }catch(e){
             console.log(e)
            return res.status(401).json({
               
                success:false ,
                message : "token is invalid"
            })
        }
        next();
    }
    catch(e){
         res.status(500).json({
            success:false,
            message:`authentication failed : ${e.message}`
        })
    }
}

//isstudent 
exports.isstudent =async (req,res,next)=>{
    try{
        if(req.user.role !== "Student"){
            return res.status(401).json({
                success:false,
                message:"this is protected route and only accessed by student "
            })
        }
        next();
    }
    catch(e){
        return res.status(500).json({
            success:false,
            message:e.message
        })
    }
}

//isadmin

exports.isadmin =async (req,res,next)=>{
    try{
        if(req.user.role !== "Admin"){
            return res.status(401).json({
                success:false,
                message:"this is protected route and only accessed by admin "
            })
        }
        next();
    }
    catch(e){
        return res.status(500).json({
            success:false,
            message:e.message
        })
    }
}
//isinstructor
exports.isinstructor =async (req,res,next)=>{
    try{
        if(req.user.role !== "Instructor"){
            return res.status(401).json({
                success:false,
                message:"this is protected route and only accessed by instructor "
            })
        }
        next();
    }
    catch(e){
        return res.status(500).json({
            success:false,
            message:e.message
        })
    }
}