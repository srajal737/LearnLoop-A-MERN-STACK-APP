import React, { useState } from 'react'
import OtpInput from 'react-otp-input';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../services/apicalling/authapicalling';
import Loader from '../component/Loader';
import { FaArrowLeftLong } from "react-icons/fa6";
import { sendOTP } from '../services/apicalling/authapicalling';
const VerifyEmail = () => {
    const [otp,setotp] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {loading,signupdata} =useSelector((state)=>state.auth);
    function handlesubmit(e){
        e.preventDefault();
        if(!signupdata){
            navigate('/signup');
            return ;
        }
        const {
           accountType,firstname,lastname,email,password,confirmpassword
        }=signupdata;
        dispatch(signup(accountType,firstname,lastname,email,password,confirmpassword,otp,navigate));

    }

    const handleresend = async()=>{
      dispatch(sendOTP(signupdata.email,navigate));
    }
  return (

<div className="bg-[#101010] flex justify-center items-center min-h-screen px-4">
  {loading ? (
    <Loader />
  ) : (
    <div className="w-[430px] max-w-[90vw] py-8 px-6 text-white bg-gray-900 rounded-2xl shadow-lg">
      {/* Heading */}
      <p className="font-semibold text-3xl mb-2">Verify Email</p>
      <p className="text-gray-400 text-lg mb-6">
        A verification code has been sent to your email
      </p>

      {/* OTP Form */}
      <form className="py-5 flex flex-col gap-6" onSubmit={handlesubmit}>
        <OtpInput
          value={otp}
          onChange={setotp}
          numInputs={6}
          renderSeparator={<span className="w-3" />}
          renderInput={(props) => (
            <input
              {...props}
              placeholder="-"
              className="
                w-14 h-14
                text-center
                bg-gray-800
                text-white
                font-bold
                rounded-xl
                border border-gray-600
                focus:outline-none
                focus:ring-2 focus:ring-yellow-400
                transition
              "
            />
          )}
          inputStyle={{
            width: "3rem",
            height: "3rem"
          }}
          containerStyle="w-full flex justify-between"
        />

        {/* Submit Button */}
        <button
          type="submit"
          onClick={handlesubmit}
          className="
            w-full
            py-3
            rounded-lg
            bg-yellow-500
            hover:bg-yellow-400
            hover:scale-95
            transition-all
            duration-300
            font-semibold
            text-black
          "
        >
          Verify OTP
        </button>
      </form>

      {/* Links */}
      <div className="mt-6 flex justify-between items-center text-sm">
        <Link
          to="/login"
          className="text-blue-400 hover:underline flex items-center gap-1"
        >
          <FaArrowLeftLong />
          Back to Login
        </Link>
        <button type='button' onClick={()=>handleresend()} className="text-green-400 cursor-pointer hover:underline">
          Resend OTP
        </button>
      </div>
    </div>
  )}
</div>

   
  )
}

export default VerifyEmail