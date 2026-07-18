import React, { useEffect, useState } from 'react'
import { VscAdd } from "react-icons/vsc"
import { useNavigate } from "react-router-dom"
import { getinstructorcourses } from '../../../services/apicalling/courseapicalling';
import { useSelector } from 'react-redux';
import Loader from '../../Loader';
import Coursetable from './Coursetable';
const Mycourse = () => {
  const [courses,setcourses] = useState([]);
  const [loading,setloading] =useState(false);
  const navigate =  useNavigate();
  const {token} =useSelector((state)=>state.auth);
  useEffect(()=>{
    const coursesget = async ()=>{
      setloading(true);
      const result = await getinstructorcourses(token);
      if(result){
        setcourses(result);
      }
      setloading(false);
    }
    coursesget();
  },[]);
  return (
    <div className='text-white py-2 mb-4'>
    <div className='flex justify-between py-8 mb-10' >
       <p className='text-3xl font-medium '>My Courses</p>
       <button onClick={()=>navigate('/dashboard/add-course')} className='bg-yellow-500 hover:text-black duration-300 hover:scale-97 rounded-lg font-medium cursor-pointer p-3'>Add Course <VscAdd size={20} className='font-medium inline'/></button>
    </div>

    {
      (loading)? <Loader/> : <Coursetable courses={courses} setcourses={setcourses}/>
    }

    
    </div>
  )
}

export default Mycourse