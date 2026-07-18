const mongoose = require('mongoose');
const subsectionschema = new mongoose.Schema({//video
  title:{
    type:String,
    trim:true
  },
  duration:{
    type:String,
  },
  description:{
    type:String,
    trim:true
  },
  videoURL:{
    type:String
  },
  public_id:{
    type:String
  }
});
module.exports = mongoose.model("SubSection",subsectionschema);