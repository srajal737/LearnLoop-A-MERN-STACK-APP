import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import {ACCOUNT_TYPE} from '../../utils/constants'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { setsignup_data } from '../../slices/authslice';
import { sendOTP } from '../../services/apicalling/authapicalling';
import { toast } from 'react-hot-toast';
import Tab from './Tab';
const signupform = () => {
    const navigate = useNavigate();
    const dispatch=useDispatch();
    const [showpass , setshowpass] = useState(false);
    const [showconfirmpass ,setshowconfirmpass] = useState(false);
    const [accountType ,setaccounttype] = useState(ACCOUNT_TYPE.STUDENT);
    const [formdata , setformdata] = useState({
        firstname:"", lastname:"",
        email:"",
        password:"",
        confirmpassword:"",
        accountType:"",
        contactnumber:"",//optional
    })

    const tabdata = [
        {
            id:1,
            tabtype:ACCOUNT_TYPE.STUDENT
        },
        {
            id:2,
            tabtype:ACCOUNT_TYPE.INSTRUCTOR
        },
    ]

    const handlechange = (e)=>{
        setformdata((prev)=>({
            ...prev ,[e.target.name]:e.target.value
        }))
    }

     function handlesubmit(e){
        e.preventDefault();
        if(formdata.password !== formdata.confirmpassword){
              toast.error("Passwords Do Not Match")
      return
        }
        const signupdata ={
            ...formdata,
            accountType
        }

        dispatch(setsignup_data(signupdata));
        dispatch(sendOTP(formdata.email,navigate));
        // Reset
    setformdata({
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmpassword: "",
    })
    setaccounttype(ACCOUNT_TYPE.STUDENT)
    }
  return (
    <div>
    <div className='text-gray-400 font-medium my-3'>Already a Member?
    <Link to='/login' className='text-blue-400'> Log In</Link>
    </div>
    <Tab tabdata={tabdata} setaccounttype={setaccounttype} accountType={accountType}/>
    <form className='flex flex-col gap-3'  onSubmit={handlesubmit}>
    <div className='flex flex-col lg:flex-row  lg:justify-between'>
        <label><p className='text-white  font-md text-md'>First name <sup className="text-pink-800 font-bold">*</sup></p>
        <input className='text-white w-full bg-gray-700 border-gray-200 border-b-2 rounded-md px-3 py-2
             focus:outline-blue-500 focus:outline-2 shadow'
        name ="firstname"
        required type="text" onChange={handlechange} placeholder='Enter first name' value={formdata.firstname} 
        ></input>
        </label>

        <label>
            <p className='text-white font-md text-md'>Last name </p>
        <input
        name ="lastname" className='text-white w-full bg-gray-700 border-gray-200 border-b-2 rounded-md px-3 py-2
             focus:outline-blue-500 focus:outline-2 shadow'
         type="text" onChange={handlechange} placeholder='Enter last name' value={formdata.lastname} 
        ></input>
        </label>
    </div>
    <div>
        <label>
            <p className='text-white  font-md text-md'>Email Address <sup className='text-pink-800'>*</sup></p>
            <input className='text-white w-full  bg-gray-700 border-gray-200 border-b-2 rounded-md px-3 py-3
             focus:outline-blue-500 focus:outline-2 shadow' name="email" value={formdata.email} 
            onChange={handlechange} placeholder='Enter email address' required type='email'></input>
        </label>
    </div>
    <div className='flex lg:flex-row flex-col lg:justify-between'>
        <label className='relative'><p className='text-white  font-sm text-md'>Create Password <sup className='text-pink-800'>*</sup></p>
        <input className='text-white w-full bg-gray-700 border-gray-200 border-b-2 rounded-md px-3 py-2
             focus:outline-blue-500 focus:outline-2 shadow' type={`${showpass?"text":"password"}`} name='password' value={formdata.password} onChange={handlechange} placeholder="Enter Password" required></input>
        <span className='absolute right-1 top-[50%]'>
            {
                (showpass)? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" onClick={()=>setshowpass(!showpass)}/>
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" onClick={()=>setshowpass(!showpass)}/>
              )
            }
        </span>
        </label>
        <label className='relative'>
        <p className='text-white font-sm text-md'>Confirm Password <sup className='text-pink-800'>*</sup></p>
        <input className='text-white w-full bg-gray-700 border-gray-200 border-b-2 rounded-md px-3 py-2
             focus:outline-blue-500 focus:outline-2 shadow' type={`${showconfirmpass?"text":"password"}`} name='confirmpassword' value={formdata.confirmpassword} onChange={handlechange} placeholder="Confirm Password" required></input>
        <span className='absolute right-1 top-[50%]'>
            {
                (showconfirmpass)? (
                <AiOutlineEyeInvisible  fontSize={24} fill="#AFB2BF" onClick={()=>setshowconfirmpass(!showconfirmpass)}/>
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF"  onClick={()=>setshowconfirmpass(!showconfirmpass)}/>
              )
            }
        </span>
        </label>
    </div>
      <button
          type="submit" className='hover:scale-95 transition-all duration-200 text-center bg-green-400 py-2 rounded-3xl my-5 cursor-pointer font-medium'>
          Create Account
        </button>
    </form>
    </div>
  )
}

export default signupform