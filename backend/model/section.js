const mongoose = require('mongoose');
const sectionschema = new mongoose.Schema({
   name:{
    type:String
   },
   subsection:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:'SubSection'
    }
   ]
});
module.exports = mongoose.model("Section",sectionschema);