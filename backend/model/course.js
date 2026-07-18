const mongoose = require('mongoose');
const courseschema = new mongoose.Schema({
    name:{
        type:String,
    },
    description:{
        type:String
    },
    whatwilllearn:{
        type:String
    },
    price:{
        type:Number
    },
    thumbnail:{
        type:String
    },
    tag:{//for searching keywords
        type:[String] //string array
    },
    category:{//used for filtering purpose
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
    },
    studentsEnrolled:[{
         type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }], 

//     await Course.findByIdAndUpdate(courseId, {
//   $push: { studentsEnrolled: userId },
//   $inc: { totalStudents: 1 }
// });

    totalstudent:{
        type:Number,
    },
    instructor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    coursecontent:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Section"
        }
    ],
    ratingandreview:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"RatingAndReview"
        }
    ],
    instructions: {
		type: [String],
	},
	status: {
		type: String,
		enum: ["Draft", "Published"],
	},
    
    createdAt:{type:Date , default :Date.now}

});
module.exports = mongoose.model("Course",courseschema);