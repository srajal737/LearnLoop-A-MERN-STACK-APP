

import apiconnector from "../apiconnector";
import toast from "react-hot-toast";
import {courseendpoints , ratingsendpoints} from '../api';
import {showcategoryurl} from '../api'
const {
    GET_ALL_COURSES_API,
    GET_COURSE_DETAIL_API,
    SHOW_ALL_CATEGORY_API,
    CREATE_COURSE_API,
    CREATE_SECTION_API,
    CREATE_SUBSECTION_API,
    UPDATE_SECTION_API,
    UPDATE_SUBSECTION_API,
    DELETE_SECTION_API,
    DELETE_SUBSECTION_API,
    EDIT_COURSE_API,
    GET_INSTRUCTOR_COURSE_API,
    DELETE_COURSE_API,
    GET_COURSE_FOR_EDITING_API,
    GET_COURSE_PLAYER_DATA_API,
    UPDATE_COURSE_PROGESS_API
} =courseendpoints;

const {
    CREATE_RATING_API ,REVIEWS_DETAILS_API
} = ratingsendpoints ;
export const fetchallcourses = async()=>{
    let result = [];
    try{
        const response = await apiconnector('GET' ,GET_ALL_COURSES_API );
    
        if(!response?.data?.success){
            throw new Error("could not fetch courses");
        }
        result = response?.data?.data
    }catch(err){
        toast.error(err.message);
    }
    return result;
}

 export const fetchcategory = async () => {
    let result = [];
    try {
      const response = await apiconnector("GET", showcategoryurl);
       result = response?.data?.data;
    } catch (error) {
        toast.error("category fetching failed")
      console.error("Error fetching categories:", error);
    }
    return result;
  };

//editcourse
export const editcoursecall = async(formdata,token)=>{
    let result = null;
    const toastid = toast.loading("uploading..")
    try{
        const response = await apiconnector('POST',EDIT_COURSE_API ,formdata,{
            'Content-Type':"multipart/form-data",
            Authorization :`Bearer ${token}`
        });


        if(!response?.data?.success){
            throw new Error("could not update course")
        }

        toast.success("course updated successfully");
        result = response?.data?.data;

    }catch(e){
        toast.error(e.message);
    }

    toast.dismiss(toastid);
    return result;
}
//createcourse

export const createcourse = async(formdata,token)=>{
    let result =null;
    const toastid = toast.loading("creating course...");
    try{
        const response = await apiconnector("POST",CREATE_COURSE_API,formdata ,{
             "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        })

        if(!response?.data?.success){
            throw new Error(response?.data?.message);
        }

        toast.success("creation successful");
        result = response?.data?.data;
    }
    catch(e){
        toast.error(e.message || "failed to create course");
    }

    toast.dismiss(toastid);
    return result;
}

export const createsection = async(data,token)=>{
    let result = null;
    const toastid = toast.loading("loading..");
    try{
        const response = await apiconnector("POST",CREATE_SECTION_API,data,{
            Authorization:`Bearer ${token}`
        })

        if(!response?.data?.success){
            throw new Error("failed to add section")
        }

        toast.success("course section added");
        result = response?.data?.data
    }
    catch(e){
        toast.error(e.message);
    }

    toast.dismiss(toastid);
    return result;
}


export const updatesection = async(data,token)=>{
    let result = null;
    const toastid = toast.loading("loading..");
    try{
        const response = await apiconnector("POST",UPDATE_SECTION_API,data,{
            Authorization:`Bearer ${token}`
        })

        if(!response?.data?.success){
            throw new Error("failed to add section")
        }

        toast.success("course section updated");
        result = response?.data?.data
    }
    catch(e){
        toast.error(e.message);
    }

    toast.dismiss(toastid);
    return result;
}





export const deletesection = async(data,token)=>{
    let result = null;
    const toastid = toast.loading("loading..");
    try{
        const response = await apiconnector("POST",DELETE_SECTION_API,data,{
            Authorization:`Bearer ${token}`
        })

        if(!response?.data?.success){
            throw new Error("failed to add section")
        }

        toast.success("course section deleted");
        result = response?.data?.data
    }
    catch(e){
        toast.error(e.message);
    }

    toast.dismiss(toastid);
    return result;
}


export const createsubsection = async(data,token)=>{

    let result = null;
    const toastid = toast.loading("loading..");
    try{
        const response = await apiconnector("POST",CREATE_SUBSECTION_API,data,{
            Authorization:`Bearer ${token}`
        })

        if(!response?.data?.success){
            throw new Error("failed to add subsection")
        }

        toast.success("subsection added ");
        result = response?.data?.data
    }
    catch(e){
        toast.error(e.message);
    }

    toast.dismiss(toastid);
    return result;
}



export const updatesubsection = async(data,token)=>{
    let result = null;
    const toastid = toast.loading("loading..");
    try{
        const response = await apiconnector("POST",UPDATE_SUBSECTION_API,data,{
            Authorization:`Bearer ${token}`
        })

        if(!response?.data?.success){
            throw new Error("failed to update section")
        }

        toast.success("subsection updated ");
        result = response?.data?.data
    }
    catch(e){
        toast.error(e.message);
    }

    toast.dismiss(toastid);
    return result;
}



export const deletesubsection = async(data,token)=>{
    let result = null;
    const toastid = toast.loading("loading..");
    try{
        const response = await apiconnector("POST",DELETE_SUBSECTION_API,data,{
            Authorization:`Bearer ${token}`
        })

        if(!response?.data?.success){
            throw new Error("failed to delete subsection")
        }

        toast.success("subsection deleted ");
        result = response?.data?.data
    }
    catch(e){
        toast.error(e.message);
    }

    toast.dismiss(toastid);
    return result;
}



export const getinstructorcourses = async(token)=>{
    let result = [];
    const toastid = toast.loading("loading..");
    try{
        const response = await apiconnector("GET",GET_INSTRUCTOR_COURSE_API,null,{
            Authorization:`Bearer ${token}`
        })

        if(!response?.data?.success){
            throw new Error("failed to get courses")
        }

        result = response?.data?.data
    }
    catch(e){
        toast.error(e.message);
    }

    toast.dismiss(toastid);
    return result;
}



export const deletecourse = async(data,token)=>{
    const toastid = toast.loading("loading..");
    try{
        const response = await apiconnector("DELETE",DELETE_COURSE_API,data,{
            Authorization:`Bearer ${token}`
        })

        if(!response?.data?.success){
            throw new Error("failed to delete courses")
        }

       toast.success("course deleted");
    }
    catch(e){
        toast.error(e.message);
    }

    toast.dismiss(toastid);
  
}




export const getcoursedetailsedit = async(data,token)=>{
   
    let result = null;
    const toastid = toast.loading("loading..");
    try{
        const response = await apiconnector("POST",GET_COURSE_FOR_EDITING_API,data,{
            Authorization:`Bearer ${token}`
        })

        if(!response?.data?.success){
            throw new Error("failed to get course")
        }
        result = response?.data?.data;
       
    }
    catch(e){
        toast.error(e.message);
    }

    toast.dismiss(toastid);
  return result
}

//for one course disply in category

export const getonecoursedetails = async(data)=>{
   
    let result = null;
    const toastid = toast.loading("loading..");
    try{
        const response = await apiconnector("POST",GET_COURSE_DETAIL_API,data)

        if(!response?.data?.success){
            throw new Error("failed to get course")
        }
        result = response?.data?.data;
       
    }
    catch(e){
        toast.error(e.message);
    }

    toast.dismiss(toastid);
  return result
}



export const getcourseplayerdata =async(courseid , token) => {
    let result = null;
    const toastid = toast.loading("loading..");
    try{
        const response = await apiconnector("POST",GET_COURSE_PLAYER_DATA_API,{courseid},
            {
                  Authorization:`Bearer ${token}`
            }
        )

        if(!response?.data?.success){
            throw new Error("failed to get course")
        }
        result = response?.data?.data;
       
    }
    catch(e){
        toast.error(e.message);
    }

    toast.dismiss(toastid);
  return result
}
export const createreview = async (data, token) => {
    const toastid = toast.loading("Loading...");
    let success = false;

    try {
        const response = await apiconnector(
            "POST",
            CREATE_RATING_API,
            data,
            {
                Authorization: `Bearer ${token}`,
            }
        );

        if (!response?.data?.success) {
            throw new Error(response?.data?.message || "Could not create rating");
        }

        toast.success("Rating created");
        success = true;
    } catch (e) {
        toast.error(e.response?.data?.message || e.message);
        success = false;
    }

    toast.dismiss(toastid);
    return success;
};

export const courseprogressupdate = async(data,token)=>{
    let result = false;
    const toastid = toast.loading("loading...");
    try{
        const response = await apiconnector("POST",UPDATE_COURSE_PROGESS_API,data ,{
            Authorization:`Bearer ${token}`
        })

        if(!response.data.message){
            throw new Erro(response.data.message);
        }

        toast.success("lecture completed");
        result = true;
    }
    catch(e){
        toast.error(e.response?.data?.message ||"something went wrong")

    }

    toast.dismiss(toastid);
    return result
}

export const getallreviews = async()=>{
    let result = [];
    const toastid = toast.loading("loading...");
    try{
        const response = await apiconnector("GET",REVIEWS_DETAILS_API)

        if(!response.data.message){
            throw new Erro(response.data.message);
        }
        result = response?.data?.data;
    }
    catch(e){
      
    }

    toast.dismiss(toastid);
    return result
}