const mongoose = require('mongoose');
const profileschema = new mongoose.Schema({
    gender:{
        type:String
    },
    dateofbirth:{
        type:String
    },
    contactnumber :{
        type:Number,
        trim:true
    },
    about:{
        type:String,
        trim:true
    }
});
module.exports = mongoose.model("Profile",profileschema);