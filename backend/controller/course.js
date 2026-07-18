const category = require('../model/category');
const course = require('../model/course');
const user = require('../model/User');
const subsection = require('../model/subsection');
const section = require('../model/section');
const uploadfile = require('../util/fileuploader');
require('dotenv').config();
const cloudinary = require("cloudinary").v2;
exports.createcourse = async (req, res) => {
    try {
        //for testing and for frontend write all these in formdata part otherwise GIVES ERROR.
        let { name, description, whatwilllearn, price, tag, status, instructions, } = req.body;//category id can easily get in frontend as when display category we can also fetch category._id
        let categoryid = req.body.category
        const thumbnail = req.files.thumbnail;
        if (!name || !description || !whatwilllearn || !price || !categoryid || !thumbnail) {
            return res.status(400).json({
                success: false,
                message: "all indicated fields are required"
            })
        }

        if (!status || status === undefined) {
            status = "Draft"; //pending you have to update status like confirmed status when admin approves....
        }
        //as instructor is already login so auth is done hence req.user = have user info

        const userid = req.user.id;
        const intructordetail = await user.findById(userid);//fetched this so that we can update courses array in instructordetails.
        if (!intructordetail) {
            return res.status(404).json({
                success: false,
                message: "instructor details not found"
            })
        }

        const thumbnailupload = await uploadfile(thumbnail, process.env.FOLDER_NAME);
        const newcourse = await course.create({
            name, description, whatwilllearn, price, category: categoryid, tag, thumbnail: thumbnailupload.secure_url, instructor: intructordetail._id,
            status: status,
            instructions: instructions,
            totalstudent: 0
        });

        //updataing course array in instructor

        await user.findByIdAndUpdate(intructordetail._id, { $push: { courses: newcourse._id } }, { new: true });


        //update category
        const updatedcategory = await category.findByIdAndUpdate(categoryid, { $push: { course: newcourse._id } }, { new: true });

        const courseId = newcourse._id;
        const updatedCourse = await course.findById(courseId).populate({
            path: "instructor",
            populate: {
                path: "additionalDetails",
            },
        }).populate("category").populate("ratingandreview").populate({
            path: "coursecontent",
            populate: {
                path: "subsection"
            }
        }).exec();

        return res.status(200).json({
            success: true,
            message: "coures created successfully",
            data: updatedCourse
        })
    }
    catch (e) {
        return res.status(500).json({
            success: false,
            message: 'failed to create course',
            error: e.message
        })
    }
}

exports.editcourse = async (req, res) => {
    try {
        const { courseId, ...updates } = req.body;

        const coursedetail = await course.findById(courseId);

        if (!coursedetail) {
            return res.status(404).json({
                error: "course not found",
            });
        }


        // update category reference if category changed
        if (updates.category && coursedetail.category.toString() !== updates.category.toString()) {

            // remove course from old category
            await category.findByIdAndUpdate(
                coursedetail.category,
                {
                    $pull: {
                        course: courseId
                    }
                }
            );


            // add course to new category
            await category.findByIdAndUpdate(
                updates.category,
                {
                    $push: {
                        course: courseId
                    }
                }
            );
        }


        // update thumbnail
        if (req.files && req.files.thumbnail) {

            const thumbnail = req.files.thumbnail;

            const thumbnailimage = await uploadfile(
                thumbnail,
                process.env.FOLDER_NAME
            );

            coursedetail.thumbnail = thumbnailimage.secure_url;
        }


        // update fields
        for (const key in updates) {

            if (!updates.hasOwnProperty(key)) continue;


            if (key === "tag" || key === "instructions") {

                coursedetail[key] =
                    typeof updates[key] === "string"
                        ? JSON.parse(updates[key])
                        : updates[key];

            } else {

                coursedetail[key] = updates[key];

            }
        }


        await coursedetail.save();


        const updatedCourse = await course
            .findById(courseId)
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
            message: "Course updated successfully",
            data: updatedCourse,
        });


    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });

    }
};


exports.showcourses = async (req, res) => {
    try {
        const allcourses = await course.find({}).populate('instructor').exec();
        return res.status(200).json({
            success: true,
            message: "courese fetched successfully",
            data: allcourses
        })
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: 'failed to fetch course',
            error: e.message
        })
    }
}


//get all course details of a course
exports.getallcoursedetails = async (req, res) => {

    try {
        const { courseid } = req.body;
        const coursedetail = await course.findOne({ _id: courseid }).populate({
            path: 'instructor',
            select: "firstname lastname image additionalDetails",
            populate: {
                path: 'additionalDetails',
                select: "about"
            }
        }).populate('category').populate('ratingandreview').populate({
            path: 'coursecontent',
            populate: {
                path: 'subsection',
                select: "-videoURL -public_id"
            }
        }).exec();

        if (!coursedetail) {
            return res.status(400).json({
                success: false,
                message: `course not found`
            })
        }
        // console.log(JSON.stringify(coursedetail, null, 2));

        let totalduration = 0;
        coursedetail.coursecontent.forEach(section => {
            section.subsection.forEach((subsec) => {
                const time = subsec.duration.split(":");
                if (time.length === 2) {
                    // mm:ss
                    totalduration += Number(time[0]) * 60 + Number(time[1]);
                }
                else if (time.length === 3) {
                    // hh:mm:ss
                    totalduration += Number(time[0]) * 3600 + Number(time[1]) * 60 + Number(time[2]);
                }
            })
        });
        return res.status(200).json({
            success: true,
            message: "course details fetched sucessfully",
            data: { coursedetail, totalduration }
        })
    } catch (e) {
        console.log(e.message)
        return res.status(500).json({
            success: false,
            message: 'failed to fetch course',
            error: e.message
        })
    }
}



exports.getinstructorcourses = async (req, res) => {
    try {
        const instructorid = req.user.id;

        const instructorcourses = await course.find({ instructor: instructorid }).sort({ createdAt: -1 }).populate({
            path:"category",
            select:"name"
        });

        res.status(200).json({
            data: instructorcourses,
            success: true
        })
    } catch (e) {
        res.status(500).json({
            success: false,
            message: "failed to load courses",
            error: error.message,
            data: instructorcourses
        })
    }
}


exports.deletecourse = async (req, res) => {
    try {
        const { courseid } = req.body;

        const courseget = await course.findById(courseid);

        if (!courseget) {
            return res.status(404).json({
                success: false,
                message: "course not found"
            });
        }

        if (courseget.status === 'Published') {
            return res.status(400).json({
                success: false,
                message: "course is published so can't delete"
            });
        }


        // delete section and subsections
        const coursesection = courseget.coursecontent;

        for (const secid of coursesection) {

            const sectionget = await section.findById(secid);

            if (sectionget) {

                const subsectionget = sectionget.subsection;

                for (const subsectionid of subsectionget) {

                    const currSubsection = await subsection.findById(subsectionid);

                    if (currSubsection?.public_id) {
                        await cloudinary.uploader.destroy(
                            currSubsection.public_id,
                            { resource_type: "video" }
                        );
                    }

                    await subsection.findByIdAndDelete(subsectionid);
                }

                await section.findByIdAndDelete(secid);
            }
        }


        // remove course id from category
        await category.findByIdAndUpdate(
            courseget.category,
            {
                $pull: {
                    course: courseid
                }
            }
        );


        // delete course
        await course.findByIdAndDelete(courseid);


        return res.status(200).json({
            success: true,
            message: "course deleted successfully"
        });


    } catch (e) {
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: e.message,
        });
    }
};



exports.getcoursedetailediting = async (req, res) => {

    try {
        const { courseid } = req.body;
        const id = req.user.id;


        if (!courseid) {
            return res.status(404).json({
                success: false,
                message: "course not found"
            })
        }

        const courseget = await course
            .findOne({
                _id: courseid,
                instructor: id,
            })
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
                    path: "subsection",
                },
            });

        if (!courseget) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to access this course",

            });
        }

        return res.status(200).json({
            success: true,
            message: "Course fetched successfully",
            data: courseget,
        });
    }
    catch (e) {
        return res.status(500).json({
            success: false,
            message: "can't get course",
            error: e.message
        })
    }
}