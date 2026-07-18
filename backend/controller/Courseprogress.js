const mongoose = require('mongoose');
const section = require('../model/section');
const subsection = require('../model/subsection')
const course = require('../model/course');
const courseprogress = require('../model/courseprogress');


exports.updatecourseprogress = async (req,res)=>{
    const {courseid , subsectionid} = req.body;
    const userid = req.user.id;

    try{
        const subsectionget = await subsection.findById(subsectionid)
        if(!subsectionget){
            return res.status(404).json({success:false,error:"invalid subsection"})
        }

        let courseprogressget = await courseprogress.findOne({courseid,userid})

        if(!courseprogressget){
            return res.status(404).json({
                success:false,
                message:"course progress not found"
            })
        }
        if(courseprogressget.videocompleted.includes(subsectionid)){
            return res.status(404).json({
                success:false,
                message:"subsection already included"
            })
        }

        courseprogressget.videocompleted.push(subsectionid);

        await courseprogressget.save();

        return res.status(200).json({
            success:true,
            message:"Course progress updated"
        })
        
    }
    catch(e){
        console.log(e.message)
            return res.status(500).json({
                success:false,
                message:"internal serval error"
            })
        }
}