import {toast} from 'react-hot-toast'
import {setuser,setloading}  from '../../slices/profileslice'
import apiconnector from '../apiconnector'
import {profileendpoints} from '../api'
import { logout } from './authapicalling'
const {GET_USER_PROFILE_DETAIL_API,GET_USER_ENROLLED_COURSE_API , GET_INSTRUCTOR_STATS_API} =profileendpoints;

export function getuserdetails(token,navigate){
   return async(dispatch)=>{
     const toastid = toast.loading("loading..");
    dispatch(setloading(true));
    try{
        const res = await apiconnector("GET",GET_USER_PROFILE_DETAIL_API,null,{
            Authorization:`Bearer ${token}`
        });
        if(!res.data.success){
            throw new Error(res.data.message);
        }
        dispatch(setuser({...res.data.data}))
    }catch(e){
        dispatch(logout(navigate));
        console.log(e);
        toast.error("unable to fetch profile detail");
    }
    toast.dismiss(toastid)
    dispatch(setloading(false))
   }
}


export async function getuserenrolledcourses(token){
    
    const toastid = toast.loading("loading...")
    let result=[];
    try{
        const res = await apiconnector("GET",GET_USER_ENROLLED_COURSE_API,null,{
            Authorization:`Bearer ${token}`
        })
        if(!res.data.success){
            throw new Error(res.data.message);
        }
        result = res.data.data;
    }catch(e){
        toast.error("could not get enrolled courses");
    }
    toast.dismiss(toastid);
    return result;
    
}


export async function getinstructorstats(token){
    
    const toastid = toast.loading("loading...")
    let result=[];
    try{
        const res = await apiconnector("GET",GET_INSTRUCTOR_STATS_API,null,{
            Authorization:`Bearer ${token}`
        })
        if(!res.data.success){
            throw new Error(res.data.message);
        }
        result = res.data.data;
    }catch(e){
        toast.error("could not get stats");
    }
    toast.dismiss(toastid);
    return result;
    
}


