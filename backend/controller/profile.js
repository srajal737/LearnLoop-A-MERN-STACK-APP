const profile = require('../model/profile');
const user = require('../model/User');
const uploadfile  = require('../util/fileuploader');
require('dotenv').config();
const courseprogress = require('../model/courseprogress')
const course = require('../model/course')
const cloudinary = require('cloudinary').v2
const subsection = require('../model/subsection')
//as we set all things to null while sign up so here we upate

exports.updateprofile = async(req,res)=>{
    try{
        const {gender,contactnumber,about,dateofbirth} = req.body;//frontend flages the changes in here only that will appear
        const currentuserid = req.user.id;
        const currentuser = await user.findById(currentuserid);
        if(!currentuser){
            return res.status(404).json({
                success:false,
                message:"something went wrong or user not exist"
            })
        }
        const userprofile = await profile.findById(currentuser.additionalDetails);
         if (gender !== undefined) userprofile.gender = gender;
        if (about !== undefined) userprofile.about = about;
        if (contactnumber !== undefined) userprofile.contactnumber = contactnumber;
        if (dateofbirth !== undefined) userprofile.dateofbirth = dateofbirth;

        await userprofile.save();
        return res.json({
			success: true,
			message: "Profile updated successfully",
			data: userprofile,
		});
	}catch (error) {
		console.log(error);
		return res.status(500).json({
			success: false,
			error: error.message,
		});
	}
}

//get all details
exports.getAllUserDetails = async (req, res) => {
	try {
		const id = req.user.id;
		const userDetails = await user.findById(id).populate("additionalDetails").exec();
        userDetails.password=null;
		res.status(200).json({
			success: true,
			message: "User Data fetched successfully",
			data: userDetails,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};



//updating display img

exports.updatedisplayimage = async (req,res)=>{
    try{
        const userid = req.user.id;
        const imagefile = req.files.imagefile;
        if(!imagefile){
            return res.status(404).json({
                success:false,
                message:"image to upload not found"
            })
        }
        const response = await uploadfile(imagefile ,process.env.FOLDER_NAME);
       const updateduser =await user.findByIdAndUpdate(userid, { image: response.secure_url }, { new: true });
        //findbyid -->>expect only id not object -->>pending to delete existing image.
        return res.status(200).json({
            success:true,
            message:"profile photo updated",
            updateduser
        })
    }catch(e){
        res.status(500).json({
            success:false,
            message:"profile not updated",
            error:e.message
        })
    }
}


exports.getenrolledcourses = async (req, res) => {
  try {
    const userId = req.user.id;

    const userDetails = await user.findById(userId)
      .populate({
        path: "courses",
        select: "name thumbnail instructor coursecontent",
        populate: [
          {
            path: "coursecontent",
            select: "subsection"
          },
          {
            path: "instructor",
            select: "firstname lastname"
          }
        ]
      })
      .exec();


    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: "User not found"
      });
    }


    const enrolledcourses = userDetails.courses.map(course =>
      course.toObject()
    );

    for (let i = 0; i < enrolledcourses.length; i++) {

      const courseget = enrolledcourses[i];

      const progress = await courseprogress.findOne({
        userid: userId,
        courseid: courseget._id
      });


      let totalvideos = 0;

      courseget.coursecontent.forEach((section) => {
        totalvideos += section.subsection.length;
      });


      const completedvideos = progress
        ? progress.videocompleted.length
        : 0;


      courseget.completedvideos = completedvideos;

      courseget.progresspercentage =
        totalvideos === 0
          ? 100
          : Math.round((completedvideos / totalvideos) * 100);


      // remove coursecontent because card doesn't need it
      delete courseget.coursecontent;
    }

  

    return res.status(200).json({
      success: true,
      data: enrolledcourses
    });


  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }
};




exports.courseplayerdata = async (req, res) => {
    try {

        const userid = req.user.id;
        const { courseid } = req.body;
        const courseget = await course.findById(courseid)
            .populate({
                path: "coursecontent",
                populate: {
                    path: "subsection",
                }
            })
            .populate({
                path: "instructor",
                select: "firstname lastname"
            })
            .exec();
        if (!courseget) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }
        // checking if user purchased course
        const userget = await user.findById(userid)
            .select("courses");
        if (!userget) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        const isenrolled = userget.courses.some(
            (id) => id.toString() === courseid
        );
        if (!isenrolled) {
            return res.status(401).json({
                success: false,
                message: "You are not enrolled in this course"
            });
        }
        let duration = 0;
        let totalvideos = 0;
        courseget.coursecontent.forEach((section) => {
           section.subsection.forEach((subsec) => {
                totalvideos++;
                const time = subsec.duration.split(":");
                if (time.length === 1) {
                    duration += Number(time[0]);
                } 
                else if (time.length === 2) {
                    duration += 
                    Number(time[0]) * 60 +
                    Number(time[1]);
                } 
                else if (time.length === 3) {
                    duration += 
                    Number(time[0]) * 3600 +
                    Number(time[1]) * 60 +
                    Number(time[2]);
                }
            });
        });
        const progress = await courseprogress.findOne({
            userid: userid,
            courseid: courseid
        });
        const courseData = courseget.toObject();
        const completedvideos = progress
            ? progress.videocompleted
            : [];

        courseData.duration = duration;
        courseData.totalvideos = totalvideos;
        courseData.completedvideos = completedvideos;


        courseData.progresspercentage =
            totalvideos === 0
            ? 0
            : Math.round(
                (completedvideos.length / totalvideos) * 100
              );

        return res.status(200).json({
            success: true,
            data: courseData
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};


///video click video send

// exports.getvideo = async(req,res)=>{
// try{
//   const userid = req.user.id;
//     const {courseid , subsectionid}=req.body;
//     const userget = await user.findById(userid).select("courses");
//     if (!userget) {
//             return res.status(404).json({
//                 success: false,
//                 message: "User not found"
//             });
//         }
//         const isenrolled = userget.courses.some(
//             (id) => id.toString() === courseid
//         );
//         if (!isenrolled) {
//             return res.status(401).json({
//                 success: false,
//                 message: "You are not enrolled in this course"
//             });
//         }

//         const videoget = await subsection.findById(subsectionid);

//         if(!videoget){
//             return res.status(404).json({
//                 success:false,
//                 message:"lesson not found"
//             })
//         }

//         const signurl = cloudinary.url(
//             videoget.public_id,
//             {
//                 resource_type:"video",
//                 type:"authenticated",
//                 sign_url:true,
//                 expires_at: Math.floor(Date.now() / 1000) + (4 * 60 * 60)
//             }
//         )

//         return res.status(200).json({
//             success:true,
//             data :{
//                 _id :videoget._id,
//                 title:videoget.title,
//                 description:videoget.description,
//                 duration:videoget.duration,
//                 videoURL:signurl
//             }
//         })
// }catch(e){
//     return res.status(500).json({
//         success:false,
//         message:"video fetch failed"
//     })
//     }
  
// }



exports.deleteAccount = async (req, res) => {
    try {
        const id = req.user.id;

        const usercurr = await user.findById(id);

        if (!usercurr) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Remove student from all enrolled courses
        if (usercurr.courses && usercurr.courses.length > 0) {
            for (const courseId of usercurr.courses) {
                await course.findByIdAndUpdate(
                    courseId,
                    {
                        $pull: {
                            studentsEnrolled: id,
                        },
                        $inc: {
                            totalstudent: -1,
                        },
                    }
                );
            }
        }

       
        await courseprogress.deleteMany({
            userid: id,
        });

        await profile.findByIdAndDelete(usercurr.additionalDetails);
        await user.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "User cannot be deleted successfully",
        });
    }
};



exports.instructorstats = async(req,res)=>{
    try{
       
        const coursedetails = await course.find({instructor:req.user.id , status:"Published"})

        const data = coursedetails.map((c)=>{
            const totalstudent = c.studentsEnrolled.length;
            const totalamount = totalstudent*c.price


            const tempdata ={
                _id :c._id,
                name:c.name,
                description :c.description,
                totalamount,
                totalstudent
            }

            return tempdata
        })

        res.status(200).json({success:true, data:data})
    }catch(e){
        res.status(500).json({success:false,message:"internal serval error"})
    }
}

//delete the account --->>pending [here scheduling is used like 5 days interval with option to revoke account deletion]
/*

const cron = require("node-cron");
const scheduledJobs = {}; // in-memory store

// Schedule account deletion
exports.scheduleAccountDeletion = async (req, res) => {
    const userId = req.user.id;

    const futureDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days later
    const minute = futureDate.getMinutes();
    const hour = futureDate.getHours();
    const day = futureDate.getDate();
    const month = futureDate.getMonth() + 1;

    const cronExpr = `${minute} ${hour} ${day} ${month} *`;

    const job = cron.schedule(cronExpr, async () => {
        await Profile.findByIdAndDelete(userId);
        await User.findByIdAndDelete(userId);
        console.log(`User ${userId} deleted via cron job`);
        job.stop();
        delete scheduledJobs[userId];
    });

    scheduledJobs[userId] = job;

    return res.status(200).json({
        success: true,
        message: "Account deletion scheduled in 7 days",
    });
};

// Revoke scheduled deletion
exports.revokeAccountDeletion = (req, res) => {
    const userId = req.user.id;
    const job = scheduledJobs[userId];

    if (job) {
        job.stop();
        delete scheduledJobs[userId];
        return res.status(200).json({
            success: true,
            message: "Account deletion canceled",
        });
    }

    return res.status(404).json({
        success: false,
        message: "No scheduled deletion found for this user",
    });
};
*/