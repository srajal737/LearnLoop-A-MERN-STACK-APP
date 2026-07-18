const express = require('express');
const router = express.Router();

//middle ware 

const {auth,isstudent,isadmin,isinstructor} =require('../middleware/auth')

//course routes
const {createcourse,showcourses,getallcoursedetails,editcourse,deletecourse,getinstructorcourses,getcoursedetailediting}=require('../controller/course');

//categories
const {createcategory,showcategory,categorypage}=require('../controller/category');

//section

const {createsection,updatesection,deletesection}=require('../controller/section');

//subsection
const {createsubsection,updatesubsection,deletesubsection}=require('../controller/subsection');

//rating and review

const {createreview,getavgrating,getallratingandreviews ,getcoursereviews}=require('../controller/ratingsandreviews');

const {updatecourseprogress} = require('../controller/Courseprogress')
const {
    courseplayerdata
} = require('../controller/profile')

//routes

router.post('/editcourse',auth,isinstructor,editcourse);
router.post('/createcourse',auth,isinstructor,createcourse);
router.post('/createsection',auth,isinstructor,createsection);
router.post('/updatesection',auth,isinstructor,updatesection);
router.post('/deletesection',auth,isinstructor,deletesection);
router.post('/addsubsection',auth,isinstructor,createsubsection);
router.post('/updatesubsection',auth,isinstructor,updatesubsection);
router.post('/deletesubsection',auth,isinstructor,deletesubsection);
router.get('/getinstructorcourses',auth,isinstructor,getinstructorcourses)
router.delete('/deletecourse',auth,isinstructor,deletecourse)
router.post('/getcoursedetailediting',auth,isinstructor , getcoursedetailediting);

//one more api like for getting instructor all courses made by him. 

router.get('/getallcourses',showcourses);
router.post('/getcoursedetails',getallcoursedetails);//to get all details of specific course.

router.post('/updatacourseprogress',auth,isstudent,updatecourseprogress)


//admin routes
router.post('/createcategory',auth,isadmin,createcategory);


router.get('/showallcategories',showcategory);
router.post('/getcategorypage',categorypage);

//courseplayerdata
router.post('/courseplayerdata',auth , isstudent ,courseplayerdata)

//rating and review

router.post('/createreview',auth ,isstudent,createreview);
router.get('/getavgrating',getavgrating);
router.get('/getallreviews',getallratingandreviews);


module.exports  = router;