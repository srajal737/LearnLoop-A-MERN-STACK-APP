const mongoose = require('mongoose');

const courseprogress = new mongoose.Schema({
    courseid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
    },
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    videocompleted :[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:'SubSection'
    }
    ]
});
module.exports = mongoose.model("CourseProgress",courseprogress);