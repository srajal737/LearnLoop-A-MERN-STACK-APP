
const section = require('../model/section');
const uploadfile =require('../util/fileuploader');
const subsection = require('../model/subsection');
const cloudinary = require('cloudinary').v2;
require("dotenv").config();
exports.createsubsection= async (req,res)=>{
    try{
        const {title ,sectionid,description,duration} =req.body
        const video = req.files.videofile; 
        if(!sectionid || !title || !description || !duration || !video){
            return res.status(400).json({//400 bad request
                success:false,
                message:'all fields are required'
            })
        }

        //video url 
        const response =await uploadfile(video ,process.env.FOLDER_NAME);

        //CREATING SUBSECTION
        const newsubsection = await subsection.create({
            title,
            duration,
            description,
            videoURL:response.secure_url,
            public_id:response.public_id
        });
        //updatiing section 
        const currsection = await section.findByIdAndUpdate(sectionid,{$push:{subsection:newsubsection._id}},{new:true}).populate('subsection');
        return res.status(200).json({ success: true, data: currsection });


    }catch(e){
        return res.status(500).json({
			success: false,
			message: "Internal server error",
			error: e.message,
		});
    }
}

//updating subsection

exports.updatesubsection = async (req, res) => {
    try {
        const { title, subsectionid, description, duration ,sectionid} = req.body;
        const video = req?.files?.videofile;

        if (!subsectionid) {
            return res.status(400).json({
                success: false,
                message: "Missing required properties",
            });
        }

        const currentSubsection = await subsection.findById(subsectionid);

        if (!currentSubsection) {
            return res.status(404).json({
                success: false,
                message: "Subsection not found",
            });
        }

        if (title!==undefined) currentSubsection.title = title;
        if (description!==undefined) currentSubsection.description = description;
        if (duration!=undefined) currentSubsection.duration = duration;

        if (video) {

            // Delete old video
            if (currentSubsection.public_id) {
                await cloudinary.uploader.destroy(
                    currentSubsection.public_id,
                    { resource_type: "video" }
                );
            }

            // Upload new video
            const response = await uploadfile(video, process.env.FOLDER_NAME);

            currentSubsection.videoURL = response.secure_url;
            currentSubsection.public_id = response.public_id;
        }

        await currentSubsection.save();

        const updatesection = await section.findById(sectionid).populate('subsection');
        return res.status(200).json({
            success: true,
            message: "Subsection updated successfully",
            data: updatesection
        });

    } catch (e) {
        return res.status(500).json({
            success: false,
            message: "Internal server error while subsection updation",
            error: e.message
        });
    }
};

//subsection delete

exports.deletesubsection = async (req, res) => {
    try {
        const { subsectionid ,sectionid }= req.body;
        if (!subsectionid) {
            return res.status(400).json({
                success: false,
                message: "Subsection ID is required",
            });
        }

        const currSubsection = await subsection.findById(subsectionid);
        if (!currSubsection) {
            return res.status(404).json({
                success: false,
                message: "Subsection not found",
            });
        }
        if (currSubsection.public_id) {
            await cloudinary.uploader.destroy(
                currSubsection.public_id,
                { resource_type: "video" }
            );
        }
        await subsection.findByIdAndDelete(subsectionid);

        await section.updateOne(
            { subsection: subsectionid },
            { $pull: { subsection: subsectionid } }
        );

        const updatesection = await section.findById(sectionid).populate('subsection');
        return res.status(200).json({
            success: true,
            message: "Subsection deleted successfully",
            data:updatesection
        });

    } catch (e) {
        return res.status(500).json({
            success: false,
            message: "Internal server error while subsection deletion",
            error: e.message,
        });
    }
};
