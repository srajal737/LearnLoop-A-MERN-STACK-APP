import {toast} from 'react-hot-toast';
import {setuser} from '../../slices/profileslice'
import apiconnector from '../apiconnector';
import {settingsendpoints} from '../api'
import {logout} from '../apicalling/authapicalling'


const {
    UPDATE_PROFILE_API,DELETE_ACCOUNT_API,UPDATE_DISPLAY_IMG_API,CHANGE_PASSWORD_API
} = settingsendpoints;

export function udatedisplayimg(token,formdata){
    return async(dispatch)=>{
        const toastid = toast.loading("loading...");
        try{
            const res  = await apiconnector("PUT",UPDATE_DISPLAY_IMG_API,formdata,{
                "Content-Type":"multipart/form-data",
                Authorization:`Bearer ${token}`
            })
             if (!res.data.success) {
        throw new Error(res.data.message);
      }
       toast.success("DP Updated successfully");
      dispatch(setuser(res.data.data))
        }catch(e){
            console.log(e);
        toast.error("could not update DP");
    }
    toast.dismiss(toastid);
    }
}


export function updateprofile(token,formdata){
    console.log(token)
    return async (dispatch)=>{
        const toastid=toast.loading("loading...");
        console.log(formdata);
        try{
            const res = await apiconnector("PUT",UPDATE_PROFILE_API,formdata,{
                Authorization:`Bearer ${token}`
            });
            if(!res.data.success){
                throw new Error(res.data.message)
            }
            dispatch(setuser({...res.data.userprofile}))
            toast.success("profile updated")
        }catch(e){
            console.log(e.message);
            toast.error("could not update profile")
        }
        toast.dismiss(toastid);
    }
}
export async function changepassword(token, formdata) {
    const toastid = toast.loading("Loading...");
    try {
        const res = await apiconnector("POST", CHANGE_PASSWORD_API, formdata, {
            Authorization: `Bearer ${token}` 
        });

        if (!res.data.success) {
            throw new Error(res.data.message);
        }

        toast.success("Password changed successfully");
        return res.data;
    } catch (e) {
        toast.error(e?.response?.data?.message || e.message || "Could not change password");
    } finally {
        toast.dismiss(toastid);
    }
}

export function deleteprofile(token,navigate){
    return async(dispatch)=>{
        const toastid = toast.loading("loading...");
        try{
            const res = await apiconnector("DELETE",DELETE_ACCOUNT_API,null,{
                Authorization:`Bearer ${token}`
            });
            if(!res.data.success){
                throw new Error(res.data.message);
            }
            dispatch(logout(navigate))
            toast.success("Account Deletion successfull");
        }catch(e){
            toast.error("Account deletion failed")
            console.log(e);
        }
        toast.dismiss(toastid)
    }
}