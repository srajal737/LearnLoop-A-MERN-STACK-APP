const BASE_URL = import.meta.env.VITE_BASE_URL;

export const showcategoryurl =BASE_URL +'/course/showallcategories';
//auth endpoints 
export const authendpoints = {
    SENDOTP_API : BASE_URL+"/auth/sendotp",
    SIGNUP_API :BASE_URL+'/auth/signup',
    LOGIN_API:BASE_URL +'/auth/login',
    RESETPASS_API :BASE_URL +'/auth/reset-password',
    RESETPASSWORD_TOKEN_API : BASE_URL +'/auth/reset-password-token',
    ISEXPTOKEN :BASE_URL+'/auth/isexptoken'
}


//profile endpoints 

export const profileendpoints ={
    GET_USER_PROFILE_DETAIL_API : BASE_URL +'/profile/getalluserdetails',
    GET_USER_ENROLLED_COURSE_API : BASE_URL +'/profile/getenrolledcourse',
    GET_INSTRUCTOR_STATS_API :BASE_URL + '/profile/getinstructorstats'
}

//paymnet endpoints 
export const paymentendpoints ={
    CAPTURE_PAYMENT_API :BASE_URL+"/payment/capturepayment",
    VERIFY_SIGNATURE_API :BASE_URL +'/payment/verifysignature',
    SENDPAYMENT_EMAIL_API:BASE_URL +'/payment/sendpaymentemail'
}

//COURSE ENDPOINTS 
export const courseendpoints = {
    GET_ALL_COURSES_API :BASE_URL+'/course/getallcourses',
    GET_COURSE_DETAIL_API:BASE_URL +'/course/getcoursedetails',
    SHOW_ALL_CATEGORY_API:BASE_URL +'/course/showallcategories',
    CREATE_COURSE_API :BASE_URL +'/course/createcourse',
    EDIT_COURSE_API : BASE_URL +'/course/editcourse',
    CREATE_SECTION_API :BASE_URL +'/course/createsection',
    CREATE_SUBSECTION_API:BASE_URL+'/course/addsubsection',
    UPDATE_SECTION_API:BASE_URL+'/course/updatesection',
    UPDATE_SUBSECTION_API:BASE_URL +'/course/updatesubsection',
    //one more api like for getting instructor all courses made by him. 
    DELETE_SECTION_API:BASE_URL +'/course/deletesection',
    DELETE_SUBSECTION_API:BASE_URL +'/course/deletesubsection',
    DELETE_COURSE_API:BASE_URL +'/course/deletecourse',
    GET_INSTRUCTOR_COURSE_API :BASE_URL +'/course/getinstructorcourses',
    GET_COURSE_FOR_EDITING_API:BASE_URL + '/course/getcoursedetailediting',
   GET_COURSE_PLAYER_DATA_API :BASE_URL + '/course/courseplayerdata',
   UPDATE_COURSE_PROGESS_API :BASE_URL + '/course/updatacourseprogress'

}

export const ratingsendpoints ={
    CREATE_RATING_API:BASE_URL +'/course/createreview',
    REVIEWS_DETAILS_API:BASE_URL+'/course/getallreviews',
    GET_AVG_RATING_API:BASE_URL+'/course/getavgrating'
}

export const catalogdata = {
    CATALOGPAGEDATA_API:BASE_URL+'/course/getcategorypage'
}


//contact us api
export const contactusendpoint = {
    CONTACT_US_API:BASE_URL+'/contactus/contactusform'
}


//SETTING-PAGE

export const settingsendpoints = {
    UPDATE_PROFILE_API :BASE_URL +'/profile/updateprofile',
    DELETE_ACCOUNT_API : BASE_URL +'/profile/deleteaccount',
    UPDATE_DISPLAY_IMG_API:BASE_URL +'/profile/updatedisplayimg',
    CHANGE_PASSWORD_API :BASE_URL +'/auth/changepassword'
}