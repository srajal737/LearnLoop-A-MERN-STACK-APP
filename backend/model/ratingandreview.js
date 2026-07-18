const mongoose = require('mongoose');
const ratingschema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },       
    rating:{
        type:Number,
        required:true
    },
    review:{
        type:String,
        required:true
    },
    course:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Course',
        index:true , //internally b-tree for fast access
        required:true
    }
});
module.exports = mongoose.model("RatingAndReview",ratingschema);