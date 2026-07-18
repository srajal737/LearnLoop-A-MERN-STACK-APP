const ratingandreview = require('../model/ratingandreview');
const course = require('../model/course');
const { mongoose } = require('mongoose');

exports.createreview = async (req,res)=>{

    try{
        const userid = req.user.id;//usually in string.
        const {rating ,review,courseid} = req.body;
        //user enrolled in course or not 
        const userincourse = await course.findOne({_id:courseid , studentsEnrolled:new mongoose.Types.ObjectId(userid)});
      
        if(!userincourse){
            return res.status(404).json({
                success:false,
                message:'Student is not enrolled in course'
            })
        }
        //checking if userid already given review

        const userreviewed = await ratingandreview.findOne({user:userid,course:courseid}); //don't need to convert userid into object as mongoose auto converts.  NOTE:IF SINGLE REF THEN USE DIRECTLY IF ARRAY OF REFS THEN NEED TO CONVERT INTO OBJECTID
 
        if(userreviewed){
             return res.status(400).json({
                success:false,
                message:'Student is already reviewed the in course'
            })
        }
        
        //creating review
        const newreview =await ratingandreview.create({
            user:userid,
            course:courseid,
            rating,
            review
        });

        //reflect course
        const courseupdate = await course.findOneAndUpdate({_id:courseid},{$push:{ratingandreview:newreview._id}},{new:true});

        return res.status(200).json({
            success:true,
            message:"rating and review posted successfully",
            newreview
        });
    }
    catch(e){
          return res.status(500).json({
            success:false,
            message:'failed to post review of course',
            error:e.message
        })
    }
}

// exports.getcoursereviews = async (req, res) => {
//     try {
//         const { courseid } = req.body;
//         const reviews = await ratingandreview.find({ course: courseid })
//             .select("rating review")
//             .populate("user", "firstName lastName"); // optional

//         return res.status(200).json({
//             success: true,
//             message: "Course reviews fetched successfully",
//             data:reviews
//         });

//     } catch (e) {
//         return res.status(500).json({
//             success: false,
//             message: "Failed to fetch course reviews",
//             error: e.message
//         });
//     }
// };
 
//avg rating
exports.getavgrating =async(req,res)=>{
    try{
        const courseid = req.body.courseid;
        const result = await ratingandreview.aggregate([
            {
                $match:{
                    course:new mongoose.Types.ObjectId(courseid)
                }
            },
            {
                $group:{
                    _id:null,
                    averagerating :{$avg:"$rating"}
                }
            }
        ]);
        if(result.length>0){
            return res.status(200).json({
                success:true,
                averagerating:result[0].averagerating
            });
        }
        return res.status(200).json({
            success:true,
            averagerating:0
        })
    }catch(e){
         return res.status(500).json({
            success:false,
            message:'failed to get avg rating of course',
            error:e.message
        })
    }
}


//get all ratingand reivews

exports.getallratingandreviews = async (req,res)=>{
    try{
        const allreview = await ratingandreview.find({}).sort({rating:-1}).populate({
            path:'user',
            select:"firstname lastname image email"
        }).populate({
            path:'course',
            select:"name"
        }).exec();
        return res.status(200).json({
            success:true,
            message:"all reviews fetched",
            data:allreview
        })
    }catch(e){
          return res.status(500).json({
            success:false,
            message:'failed to get all reviews',
            error:e.message
        })
    }
}