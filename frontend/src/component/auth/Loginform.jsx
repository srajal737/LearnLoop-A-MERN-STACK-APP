import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch } from 'react-redux';
import { login } from '../../services/apicalling/authapicalling';
const Loginform = () => {
    const [showpass, setshowpass] = useState(false);
    const [showconfirmpass, setshowconfirmpass] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formdata, setformdata] = useState({
        email: "", password: ""
    });
    function handlechange(e) {
        setformdata((prev) => ({
            ...prev, [e.target.name]: e.target.value
        }))
    }
    function handlesubmit(e) {
        e.preventDefault();
        dispatch(login(formdata.email, formdata.password, navigate));
        //reset 
        setformdata({
            email: "",
            password: ""
        })
    }
    return (
        <div className=''>
            <div className='text-gray-400 font-medium my-3'>New To LearnLoop?
                <Link to='/signup' className='text-blue-400'> signup</Link>
            </div>
            <form className='flex flex-col gap-6' onSubmit={handlesubmit}>
                <div>
                    <label>
                        <p className='text-white  font-md text-md'>Email Address <sup className='text-pink-800'>*</sup></p>
                        <input className='text-white w-full  bg-gray-700 border-gray-200 border-b-2 rounded-md px-3 py-3
             focus:outline-blue-500 focus:outline-2 shadow' name="email" value={formdata.email}
                            onChange={handlechange} placeholder='Enter email address' required type="email" ></input>
                    </label>
                </div>
                <label className='relative'><p className='text-white  font-sm text-md'>Create Password <sup className='text-pink-800'>*</sup></p>
                    <input className='text-white w-full  bg-gray-700 border-gray-200 border-b-2 rounded-md px-3 py-2
                 focus:outline-blue-500 focus:outline-2 shadow' type={`${showpass ? "text" : "password"}`} name='password' value={formdata.password} onChange={handlechange} placeholder="Enter Password" required></input>
                    <span className='absolute right-1 top-[40%]'>
                        {
                            (showpass) ? (
                                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" onClick={() => setshowpass(!showpass)} />
                            ) : (
                                <AiOutlineEye fontSize={24} fill="#AFB2BF" onClick={() => setshowpass(!showpass)} />
                            )
                        }
                    </span>
                    <div className='text-right'>
                        <Link className='text-blue-500 text-sm font-medium hover:underline' to={'/forgot-password'}>
                            forgot-password
                        </Link>
                    </div>
                </label>
                <button
                    type='submit' className='text-center bg-green-400 py-2 rounded-3xl my-5 cursor-pointer font-medium hover:scale-95 transition-all duration-200'>
                    Log In
                </button>
            </form>

        </div>
    )
}

export default Loginform