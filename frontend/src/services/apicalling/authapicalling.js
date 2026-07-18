import { toast } from 'react-hot-toast'
import { setloading, settoken } from '../../slices/authslice'
import { authendpoints } from '../../services/api'
import apiconnector from '../apiconnector'

import { setuser } from '../../slices/profileslice'

import { resetcart } from '../../slices/cartslice'


const {
    SENDOTP_API,
    SIGNUP_API,
    LOGIN_API,
    RESETPASS_API,
    RESETPASSWORD_TOKEN_API,
    ISEXPTOKEN
} = authendpoints;

export function isexptoken(token, navigate) {
  return async (dispatch) => {
    try {
      await apiconnector("GET", ISEXPTOKEN, null, {//auto send error
        Authorization: `Bearer ${token}`,
      });
    //   console.log("everything is ok");
    } catch (e) {
      dispatch(logout(navigate));
    //   console.log(`sorry token expired ${e.message}`);
    }
  };
}

export function sendOTP(email, navigate) {
    return async (dispatch) => {//see normal redux can be async to make async use dispatch thunk that is pass in function simple learn and thunk take anyfunction ans parameter not just slice reducers
        dispatch(setloading(true));
        const toastid = toast.loading("loading..");
        try {
            const response = await apiconnector("POST", SENDOTP_API, {
                email,
            });
            if (!response.data.success) {
                throw new Error;
            }

            toast.success("OTP SEND SUCCESSFULLY");
            navigate('/verify-email')
        } catch (err) {
            const msg = err?.response?.data?.message || //backend message     
                "Something went wrong";

            toast.error(msg);
        }
        dispatch(setloading(false));
        toast.dismiss(toastid);
    }
}

export function signup(accountType, firstname, lastname, email, password, confirmpassword, otp, navigate) {
    return async (dispatch) => {
        const toastid = toast.loading("loading..");
        dispatch(setloading(true));
        try {
            const response =await apiconnector("POST", SIGNUP_API, {
                // accountType, firstname, lastname, email, password, confirmpassword, otp
                firstname , email ,password ,confirmpassword ,otp ,accountType,lastname
            })
            if (!response.data.success) {
                throw new Error;
            }
            toast.success("Signup successfully");
            navigate("/login")
        } catch (err) {
            const msg = err?.response?.data?.message || //backend message     
                "Something went wrong";
            toast.error(msg);
            navigate("/signup");
        }
        dispatch(setloading(false));
        toast.dismiss(toastid);
    }
}


export function login(email, password, navigate) {
    return async (dispatch) => {
        const toastid = toast.loading("loading..");
        dispatch(setloading(true));
        try {
            const response = await apiconnector("POST", LOGIN_API, {
                email, password
            })
            if (!response.data.success) {
                throw new Error;//this creates an error with message that is in constructor
            }
            toast.success("login successfully");
            dispatch(settoken(response.data.token));
            dispatch(setuser(response.data.loginuser));
            localStorage.setItem("token", JSON.stringify(response.data.token));
            localStorage.setItem("user", JSON.stringify(response.data.loginuser));
            navigate('/');
        } catch (err) {
            const msg = err?.response?.data?.message  || //backend message     
                "Something went wrong";

            toast.error(msg);
        }
        dispatch(setloading(false));
        toast.dismiss(toastid);
    }
}

export function getpasswordresettoken(email,setemailsent) {
    return async (dispatch) => {
        dispatch(setloading(true));
       
        try {
            const response = await apiconnector("POST", RESETPASSWORD_TOKEN_API, {
                email,
            })
            if (!response.data.success) {
                throw new Error;
            }
            toast.success("RESET LINK SEND TO EMAIL");
            setemailsent(true);
        }
        catch (err) {
            const msg = err?.response?.data?.message|| //backend message     
                "Something went wrong";

            toast.error(msg);
        }
        dispatch(setloading(false));

    }
}


export function resetpassword(password, confirmpassword, token, navigate) {
    return async (dispatch) => {
        dispatch(setloading(true));
        try {
            const response = await apiconnector("POST", RESETPASS_API, {
                password, confirmpassword, token
            });
            if (!response.data.success) {
                throw new Error;
            }
            toast.success("password reset successfully");
            navigate('/login');
        } catch (err) {
                 const msg = err?.response?.data?.message  || //backend message     
                "Something went wrong";

            toast.error(msg);
        }
        dispatch(setloading(false));
    }
}



export function logout(navigate) {
    return (dispatch) => {
        dispatch(settoken(null));
        dispatch(setuser(null));
        dispatch(resetcart());
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        toast.success("Logged Out")
        navigate("/");
    }
}