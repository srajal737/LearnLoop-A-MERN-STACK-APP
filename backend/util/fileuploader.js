const cloudinary = require('cloudinary').v2;

const uploadfile = async (file ,folder ,quality,height)=>{
    options ={
        folder,
        resource_type:"auto"
    };
    if(quality){
        options.quality=quality
    }
    if(height){
        options.height=height
    }
    const response = await cloudinary.uploader.upload(file.tempFilePath,options);
    return response;
}
module.exports = uploadfile;