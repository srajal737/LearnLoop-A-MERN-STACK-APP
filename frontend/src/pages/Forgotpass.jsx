import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../component/Loader';
import { Link } from 'react-router-dom';
import { getpasswordresettoken } from '../services/apicalling/authapicalling';
import { setloading } from '../slices/authslice';
const Forgotpass = () => {
    const [emailsent ,setemailsent]=useState(false);
    const [email,setemail] =useState("");
    const {loading} = useSelector((state)=>state.auth);
    const dispatch = useDispatch();
    function handlesubmit(e){
        e.preventDefault();
        dispatch(getpasswordresettoken(email,setemailsent));
    }
  return (
    <div className="bg-[#101010] flex justify-center items-center min-h-screen px-4">
    {loading ? (
      <Loader />
    ) : (
        <div className=" bg-gradient-to-br from-gray-900 via-gray-800 to-black  rounded-xl shadow-lg p-6 w-[420px] max-w-[screen]">
         {/* above you can also set max-w-md -->>md means medium md media query */}
      <div className="space-y-4">
      
        <h2 className="text-3xl font-bold text-white">
          {!emailsent ? "Reset Your Password" : "Check your Email"}
        </h2>

     
        <p className="text-gray-100 text-md">
          {!emailsent
            ? "Have no fear. We'll email you instructions to reset your password. If you don't have access to your email we can try account recovery."
            : `We have sent the reset email to your ${email}`}
        </p>


        {!emailsent && (
          <form onSubmit={handlesubmit} className="space-y-4">
            <label className="block">
              <p className="text-white font-medium text-md mb-1">
                Email Address <sup className="text-pink-600">*</sup>
              </p>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                placeholder="Enter email address"
                required
                className="w-full px-3 py-2 rounded-md bg-gray-700 text-white border-b-2 border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>

            <button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-blue-600 hover:scale-95 transition-all duration-300 py-2 rounded-md font-semibold text-black cursor-pointer"
            > Reset password
            </button>
          </form>
        )}
        {
            emailsent&& <button
              onClick={handlesubmit}
              className="w-full bg-yellow-500 hover:bg-blue-600 hover:scale-95 transition-all duration-300 py-2 rounded-md font-semibold text-black cursor-pointer"
            > Resend email
            </button>
        }
        {/* Link back */}
        <div className="text-center mt-4">
          <Link to="/login" className="text-blue-400 hover:underline text-sm">
            Back to Login
          </Link>
        </div>
      </div></div>
    )}
</div>
  )
}

export default Forgotpass