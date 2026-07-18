import {paymentendpoints} from '../api'
import toast from 'react-hot-toast'
import apiconnector from '../apiconnector';
import {setpaymentloading} from '../../slices/courseslice'
import logo from  '../../assets/Images/learnloop_nav.png'
import { resetcart } from '../../slices/cartslice';
const {
    CAPTURE_PAYMENT_API,VERIFY_SIGNATURE_API,SENDPAYMENT_EMAIL_API
} = paymentendpoints;


//sccirpt loading like modal of razorpay

function loadscript(src){//like script tag creating
    return new Promise((resolve,reject)=>{
        const script = document.createElement("script");
        script.src = src;
        script.onload =()=>{
            resolve(true)
        }
        script.onerror = ()=>{
            resolve(false)
        }

        document.body.appendChild(script);
    })
}

export const buycourse= async(token,courses,user_details,navigate,dispatch)=>{
    const toastid = toast.loading("loading...");
    try{
        const res = await loadscript("https://checkout.razorpay.com/v1/checkout.js")
        if(!res){
            toast.error("Razorpay GateWay Failed to load Try Again Later");
            return;
        }

        const ordercreate = await apiconnector("POST",CAPTURE_PAYMENT_API,{courses},{
           Authorization: `Bearer ${token}`,
        })

        if(!ordercreate?.data?.success){
            throw new Error(ordercreate?.data?.message)
        }

        // modal detail filling  -->>            // image:logo, later add if wnat

        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            currency:ordercreate.data.data.currency,
            amount:`${ordercreate.data.data.amount}`,
            order_id:ordercreate.data.data.id,
            name:"LearnLOOP",
            description:"Pleased to See You",
            prefill:{
                name:`${user_details.firstname} ${user_details.lastname}`,
                email:user_details.email,
            },
            handler :function(res){
                sendpaymentsuccessemail(res,ordercreate.data.data.amount ,token)
                verifypayment({...res,courses},token,navigate,dispatch)
            }
        } 

        const payobj = new window.Razorpay(options)
        payobj.open();
        payobj.on("payment.failed",function(response){
            taost.error("Payment failed");
        })

    }catch(e){
        toast.error("payment failure occured")
        console.log(e.message)
    }
    toast.dismiss(toastid)
}

const verifypayment=async (resdata,token,navigate,dispatch)=>{
    const toastid = toast.loading(true);
    dispatch(setpaymentloading(true));
    try{
        const response = await apiconnector('POST',VERIFY_SIGNATURE_API,resdata,{
            Authorization: `Bearer ${token}`,
        })

        if(!response?.data?.success){
            throw new Error(response?.data?.message);
        }

        toast.success("PAYMENT SUCCESSFULL ,COURSES ADDED")
        navigate('/dashboard/enrolledcourse');
        dispatch(resetcart());
    }
    catch(e){
        toast.error("could not verify payment")
    }
    toast.dismiss(toastid);
    dispatch(setpaymentloading(false));
}

const sendpaymentsuccessemail = async(res,amount,token)=>{
    try{
        await apiconnector("POST",SENDPAYMENT_EMAIL_API,{
            orderid:res.razorpay_order_id,
            paymentid:res.razorpay_payment_id,
            amound,
        },{
            Authorization: `Bearer ${token}`
        })
    }catch(e){

    }
}