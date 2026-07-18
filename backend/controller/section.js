const section = require('../model/section');
const course = require('../model/course');
const subsection = require('../model/subsection');
const cloudinary =require("cloudinary").v2
//creating a section
exports.createsection = async (req,res)=>{
  try{
    const {name,courseid}=req.body;
    if(!name || !courseid){
       return res.status(400).json({
				success: false,
				message: "Missing required properties",
			});
    }
     const courseExists = await course.findById(courseid);
    if (!courseExists) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    const newsection = await section.create({name});
    //updating in course detail and getting all section +subsection populate (nested populate)
    const courseget = await course.findByIdAndUpdate(courseid,{
      $push:{coursecontent:newsection._id}
    },{new:true}).populate({
        path:"instructor",
        populate:{
            path:"additionalDetails",
        },
    }).populate("category").populate("ratingandreview").populate({
        path:"coursecontent",
        populate:{
            path:"subsection"
        }
    }).exec();

    	res.status(200).json({
			success: true,
			message: "section created",
			data:courseget
		});
  }catch(e){
    res.status(500).json({
			success: false,
			message: "internal server error while section creation",
			error:e.message
		});
  }
}

//section update


exports.updatesection = async (req,res)=>{
  try{
    const {name,sectionid,courseid}=req.body;
    if(!name || !sectionid || !courseid) {
       return res.status(400).json({
				success: false,
				message: "Missing required properties",
			});
    }
    const updatedsection = await section.findByIdAndUpdate(sectionid,{name:name},	{ new: true });

    const updatedcourse = await course.findById(courseid).populate({
        path:"instructor",
        populate:{
            path:"additionalDetails",
        },
    }).populate("category").populate("ratingandreview").populate({
        path:"coursecontent",
        populate:{
            path:"subsection"
        }
    }).exec();

    
    	res.status(200).json({
			success: true,
			message: "section updated",
      data:updatedcourse
		});
  }catch(e){
    res.status(500).json({
			success: false,
			message: "internal server error while section updation",
			error:e.message
		});
  }
}


//delete section


exports.deletesection = async (req, res) => {
  try {
    const { sectionid, courseid } = req.body;

    const sectioncurr = await section.findById(sectionid);

    if (!sectioncurr) {
      return res.status(404).json({
        success: false,
        message: "Section not found"
      });
    }

    // Find all subsections
    const subsections = await subsection.find({
      _id: { $in: sectioncurr.subsection }
    });

    // Delete videos from cloudinary
    for (const sub of subsections) {
      if (sub.public_id) {
        await cloudinary.uploader.destroy(sub.public_id, {
          resource_type: "video"
        });
      }
    }

    // Delete subsection documents
    await subsection.deleteMany({
      _id: { $in: sectioncurr.subsection }
    });

    // Remove section from course
    await course.updateMany(
      { coursecontent: sectionid },
      { $pull: { coursecontent: sectionid } }
    );

    // Delete section
    await section.deleteOne({ _id: sectionid });

    const updatecourse = await course.findById(courseid)
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingandreview")
      .populate({
        path: "coursecontent",
        populate: {
          path: "subsection"
        }
      })
      .exec();

    return res.status(200).json({
      success: true,
      message: "Section deleted successfully",
      data: updatecourse
    });

  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: e.message
    });
  }
};


