const mongoose = require('mongoose');
const userschema = new mongoose.Schema({ //without new also works.
    firstname:{
        type:String,
        require:true,
        trim:true
    },
    lastname:{
        type:String,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trime:true
    },
    password:{
        type:String,
        required:true
    },
    accountType:{
        type:String,
        required:true,
        enum:["Student" , "Admin","Instructor"]
    },
    additionalDetails:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Profile',
        required:true
    },
    courses:[ //for student this is buyed courrse and for instructor it is his created course .
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Course'
        }
    ],
    image:{
        type:String,
        required:true
    },
    courseProgess:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'CourseProgress'
        }
    ],
    forgetpasswordtoken:{
        type:String
    },
    forgettokenduration:{
        type:Date
    }
});

module.exports = mongoose.model("User",userschema);