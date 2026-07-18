import React, { use, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom';
import { resetpassword } from '../services/apicalling/authapicalling';
import { IoMdCheckmarkCircle } from "react-icons/io";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import Loader from '../component/Loader';
import {toast} from 'react-hot-toast'
const Updatepass = () => {
    const { loading } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [formdata, setformdata] = useState({
        password: "",
        confirmpassword: ""
    });
    const location = useLocation();
    const dispatch = useDispatch();
    const [showpass, setshowpass] = useState(false);
    const [showconfirmpass, setshowconfirmpass] = useState(false);
    function handlechange(e) {
        setformdata((prev) => ({
            ...prev, [e.target.name]: e.target.value
        }))
    }
    const handlesubmit = (e) => { 
         e.preventDefault();
         if(formdata.password !== formdata.confirmpassword){
              toast.error("Passwords Do Not Match")
      return}
        const token = location.pathname.split('/').at(-1);
        dispatch(resetpassword(formdata.password, formdata.confirmpassword, token, navigate));
    }
    const checkdata = [
        {
            id: 1,
            txt: "one lowercase character"
        },
        {
            id: 2,
            txt: "one uppercase character"
        },
        {
            id: 3,
            txt: "one special character"
        },
        {
            id: 4,
            txt: "one symbol character"
        },
        {
            id: 5,
            txt: "one number character"
        }
    ]
    return (
        <div className="bg-[#101010] flex justify-center items-center min-h-screen px-4">
            {loading ? (
                <Loader />
            ) : (<div className='w-[430px] max-w-[90vw] py-2'>
                <p className='text-3xl text-white font-medium py-2'>Choose new Password</p>
                <p className='text-gray-100 text-md'>Enter your new password. Almost done. </p>
                <form className='mt-7' onSubmit={handlesubmit}>
                    <label className='relative'><p className='text-white  font-sm text-md'>New Password <sup className='text-pink-800'>*</sup></p>
                        <input className='text-white my-1 w-full bg-gray-700 border-gray-200 border-b-2 rounded-md px-3 py-2
                         focus:outline-blue-500 focus:outline-2 shadow' type={`${showpass ? "text" : "password"}`} name='password' value={formdata.password} onChange={handlechange} placeholder="Enter Password" required></input>
                        <span className='absolute right-1 top-[60%]'>
                            {
                                (showpass) ? (
                                    <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" onClick={() => setshowpass(!showpass)} />
                                ) : (
                                    <AiOutlineEye fontSize={24} fill="#AFB2BF" onClick={() => setshowpass(!showpass)} />
                                )
                            }
                        </span>
                    </label>
                    <label className='relative'>
                        <p className='text-white font-sm text-md'>Confirm Password <sup className='text-pink-800'>*</sup></p>
                        <input className='text-white my-1 bg-gray-700 w-full border-gray-200 border-b-2 rounded-md px-3 py-2
                         focus:outline-blue-500 focus:outline-2 shadow' type={`${showconfirmpass ? "text" : "password"}`} name='confirmpassword' value={formdata.confirmpassword} onChange={handlechange} placeholder="Confirm Password" required></input>
                        <span className='absolute right-1 bottom-0'>
                            {
                                (showconfirmpass) ? (
                                    <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" onClick={() => setshowconfirmpass(!showconfirmpass)} />
                                ) : (
                                    <AiOutlineEye fontSize={24} fill="#AFB2BF" onClick={() => setshowconfirmpass(!showconfirmpass)} />
                                )
                            }
                        </span>
                    </label>

                    <div className='flex flex-wrap gap-2 my-6'>
                        {
                            checkdata.map((item) => (
                                <div className='text-[#00FF00]' key={item.id}><IoMdCheckmarkCircle className='inline' fill='#00FF40' /> {item.txt}</div>
                            ))
                        }
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-yellow-500 hover:bg-green-600 hover:scale-95 transition-all duration-300 py-2 rounded-md font-semibold text-black cursor-pointer"
                    > Reset password
                    </button>
                </form>
                    <div className="mt-4 text-left">
          <Link to="/login" className="text-blue-400 hover:underline text-sm  flex items-center gap-1">
           <FaArrowLeftLong className=' '/><p>Back to Login</p> 
          </Link>
        </div>
            </div>
            )
            }
        </div>
    )
}

export default Updatepass