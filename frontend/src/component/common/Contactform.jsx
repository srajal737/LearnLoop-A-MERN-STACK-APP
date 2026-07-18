import React, { useEffect, useState } from 'react'
import {useForm} from 'react-hook-form'
import Actionbtn from '../home/Actionbtn';
import CountryCode from '../../data/countrycode.json'
import {contactusendpoint} from '../../services/api'
import apiconnector from '../../services/apiconnector'
import Loader from '../Loader'
import {toast} from 'react-hot-toast'
const Contactform = ({flagfull}) => {
    const [loading ,setloading] = useState(false);
    const {
        register,handleSubmit,formState:{errors, isSubmitSuccessful},reset
    } = useForm();

    useEffect(()=>{
        if(isSubmitSuccessful){
           reset({
            firstname:"",
            lastname:"",
            email:"",
            number:"",
            message:"",
            countrycode:""
        }) 
        }
    },[reset,isSubmitSuccessful]);
    const submitContactForm = async (data)=>{
      try{
         console.log(data);
         setloading(true);
         const res =await apiconnector("POST",contactusendpoint.CONTACT_US_API,data) ;
         console.log(res);
         toast.success("contact us form submitted") ;
      }catch(e){
         console.log(e.message);
         toast.error("something went wrong");
      }
      setloading(false);
    }
  return (
   <div className={`${flagfull?"w-full":"w-auto"}`}>
      {
        (loading)?<Loader/>: <form className='py-15' onSubmit={handleSubmit(submitContactForm)}>
    <div className='flex flex-col gap-4'>
    <div className='lg:flex gap-3'>
    <div className='flex w-full flex-col'>
     <label htmlFor='firstname'>
        First Name
     </label>
     <input className="w-full bg-slate-800 my-1 rounded-lg p-4 text-white placeholder-gray-300  outline-none focus:bg-slate-700 focus:ring-1 focus:ring-blue-400 transition border-b-2 gap-2.5"
        type='text' placeholder='Enter First Name' {...register("firstname",{required:true})} id='firstname' name='firstname'
     />
       {errors.firstname && (
            <span className="-mt-1 text-[12px] text-yellow-100">
              Please enter your name.
            </span>
          )}
    </div>
    <div className='flex flex-col w-full'>
     <label htmlFor='lastname'>
        Last Name
     </label>
     <input className="w-full bg-slate-800 my-1 rounded-lg p-4 text-white placeholder-gray-300 outline-none focus:bg-slate-700 focus:ring-1 focus:ring-blue-400 transition border-b-2"
        type='text' placeholder='Enter Last Name' {...register("lastname")} id='lastname' name='lastname'
     />
    </div>    
    </div>
     
     <div className='flex flex-col'>
    <label htmlFor='email'>
        Email Address
     </label>
     <input className="w-full bg-slate-800  my-1 rounded-lg p-4 text-white placeholder-gray-300 outline-none focus:bg-slate-700 focus:ring-1 focus:ring-blue-400 transition border-b-2"
        type='email' placeholder='Enter Email Address' {...register("email",{required:true})} id='email' name='email'
     />
      {errors.email && (
          <span className="-mt-1 text-[12px] text-yellow-100">
            Please enter your Email address.
          </span>
        )}
     </div>


   <div className='flex flex-col'>
    <label htmlFor='number'>
        Phone number
     </label>
     <select className='text-white bg-black' type="text" defaultValue="+91"
            {...register("countrycode", { required: true })}
     >
        {
            CountryCode.map((country,idx)=>(
                <option key={idx} value={country.code}> {country.code} -{country.country}</option>
            ))
        }
     </select>
     <input className="w-full bg-slate-800 my-1 rounded-lg p-4 text-white placeholder-gray-300 outline-none focus:bg-slate-700 focus:ring-1 focus:ring-blue-400 transition border-b-2"
        type='number' placeholder='12345 67890' {...register("number",{required:{
            value:true,
            message:"enter your phone number"
        },
        maxLength: { value: 12, message: "Invalid Phone Number" },
         minLength: { value: 10, message: "Invalid Phone Number" },
        })} id='number' name='number'
     />
     {
        errors.number && (
              <span className="-mt-1 text-[12px] text-yellow-100">
             Invalid phone number
          </span>
        )
     }
     </div>

    <div className='flex flex-col'>
    <label htmlFor='message'>
        message
     </label>
     <textarea
         cols='30' rows='10' placeholder='Enter Your message' {...register("message",{required:true})} id='message' name='message'  className="w-full bg-slate-800 my-1 rounded-lg p-4 text-white placeholder-gray-300 outline-none focus:bg-slate-700 focus:ring-1 focus:ring-blue-400 transition border-b-2" />
          {errors.message && (
          <span className="-mt-1 text-[12px] text-yellow-100">
            Please enter your Message.
          </span>
        )}
     </div>

        <button type='submit' className="w-full py-2 bg-green-600 font-bold text-white rounded-lg cursor-pointer hover:text-black transition duration-200 hover:scale-98">
  Send Message
</button>

     </div>
    </form>
      }
   </div>
   
  )
}

export default Contactform