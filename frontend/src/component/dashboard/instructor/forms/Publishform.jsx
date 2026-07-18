import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {useSelector,useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { resetcoursedetail, setstep } from '../../../../slices/courseslice'
import { editcoursecall } from '../../../../services/apicalling/courseapicalling'
import toast from 'react-hot-toast'
const Publishform = () => {
  const {
    register ,
    handleSubmit,
    getValues,
    setValue,
    formState:{errors}
  } = useForm();
  const [loading , setloading] =useState();
  const dispatch = useDispatch();
  const navigate =useNavigate();
  const {token}= useSelector((state)=>state.auth);
  const {course} = useSelector((state)=>state.course);

  useEffect(()=>{
    if(course?.status==="Published"){
      setValue("status",true);
    }
  },[]);
  const handleback = ()=>{
    dispatch(setstep(2));
  }

  const navigateMycourse= ()=>{
    dispatch(resetcoursedetail());
    navigate('/dashboard/my-courses');
  }

  const handlepublish = async ()=>{
    if(course?.status === 'Published'){
      toast.error("Published Course can't be unpublished")
      navigateMycourse();
      return ;
    }
    if((course?.status === "Published" && getValues("status")===true)  || course?.status ==='Draft' && getValues("status")===false){
      //no change 
      navigateMycourse();
      return;
    }

    const formdata = new FormData();
    formdata.append("courseId",course._id);
    const status = getValues("status")?"Published":"Draft"

    formdata.append("status",status);

    setloading(true);
    const result = await editcoursecall(formdata,token);
    if(result){
      navigateMycourse();
    }
    setloading(false);
  }
  return (
    <div className='text-white bg-slate-900 p-4 rounded-lg border-1 border-gray-700'>
      <p className='text-xl py-3 font-bold'>Publish Course?</p>
      <form onSubmit={handleSubmit(handlepublish)}>
        <div >
      <input id='status' type='checkbox' {...register("status")}/>
      <label htmlFor='status' className='text-gray-300 px-3 py-3'>Make Your Course Public</label>
      </div>
      <p className='text-md font-medium text-red-600 pt-4'> note: once course is published, can't be deleted</p>
      <div className='flex justify-end gap-5'>
        <button className='p-3 bg-gray-500' type = 'button' onClick={handleback}>Back</button>
        <button className='p-3 bg-yellow-500' type='submit'>Save</button>
      </div>
      </form>
      
    </div>
  )
}

export default Publishform