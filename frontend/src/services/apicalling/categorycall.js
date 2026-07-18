import { catalogdata } from "../api";
import toast from 'react-hot-toast'
import apiconnector from "../apiconnector";

const {
    CATALOGPAGEDATA_API,
}=catalogdata ;

export const getcategorypagedetail =async (categoryid)=>{
    let result = [];
    const toastid = toast.loading("loading..");
    try{
        const response = await apiconnector("POST" , CATALOGPAGEDATA_API , {categoryid});

        if(!response?.data?.success){
            throw new Error("Category Detail fetching failed")
        }

        result =response?.data?.data;
    }
    catch(err){
        toast.error(err.message);
    }
    toast.dismiss(toastid);
    return result;
}