const express = require('express');
const router = express.Router();

const {auth , isinstructor} = require('../middleware/auth');

const {updateprofile,getAllUserDetails,updatedisplayimage,getenrolledcourses,deleteAccount ,instructorstats} = require('../controller/profile');


router.put('/updateprofile',auth,updateprofile);
router.get('/getalluserdetails',auth,getAllUserDetails);
router.delete('/deleteaccount',auth,deleteAccount);
router.put('/updatedisplayimg',auth,updatedisplayimage);
router.get('/getenrolledcourse',auth,getenrolledcourses);
router.get('/getinstructorstats',auth,isinstructor,instructorstats);


module.exports=router;