const express = require('express');
const app = express();
require("dotenv").config();

const userroute = require('./routes/user');
const profileroute = require('./routes/profile');
const courseroute = require('./routes/course');
const paymentroute = require('./routes/payment');
const contactroute = require('./routes/contactus');

const cors =require('cors');
const dbconnect = require('./config/database');
const cloudinaryconnect = require('./config/cloudinary');
const {instance} =require('./config/razorpay');
const fileupload = require('express-fileupload');
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 4000;

dbconnect();

//middleware
app.use(cors({
    origin:'*',
    credentials:true,
    
}))

app.use(cookieParser());
app.use(express.json());
app.use(
    fileupload({
        useTempFiles:true,
        tempFileDir:'/tmp'
    })
)

cloudinaryconnect();

//route define 
app.use("/api/v1/auth",userroute);
app.use('/api/v1/profile',profileroute);
app.use("/api/v1/course", courseroute);
app.use("/api/v1/payment", paymentroute);
app.use("/api/v1/contactus", contactroute);

//app listen 

app.get('/',(req,res)=>{
    return res.json({
        success:true,
        messagae:"server running"
    })
})

app.listen(PORT,()=>{
    console.log(`app is running at ${PORT}`);
});



