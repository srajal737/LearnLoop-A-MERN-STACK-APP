const mongoose = require('mongoose');
require("dotenv").config();
const dpconnect = ()=>{
    mongoose.connect(process.env.DATABASE_URL)
    .then(()=>{console.log("db connected....")})
    .catch((e)=>{console.log("db not connected");console.log(e) ; process.exit(1)});
}

module.exports = dpconnect ;