import React, { useState,useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getinstructorstats } from '../../../services/apicalling/Profileapi';
import { getinstructorcourses } from '../../../services/apicalling/courseapicalling';

import { useNavigate } from 'react-router-dom';
import Chartcomponent from './Chartcomponent';

const Instructordashboard = () => {
  const [ currchart , setcurrchart] = useState("students")
  const {token} = useSelector(state=>state.auth);
  const {user} = useSelector(state=>state.profile);
  const navigate = useNavigate();
  const [loading ,setloading] =useState(false);
  const [statdata ,setstatdata] = useState(null);
  const [courses , setcourses] = useState([])

  useEffect(()=>{
    const getstatfunc = async()=>{
      setloading(true);
      const data = await getinstructorstats(token);
      if(data.length>0){
        setstatdata(data);
      }

      const courseget = await getinstructorcourses(token);
      if(courseget){
        setcourses(courseget);
      }
      setloading(false);
    }

    getstatfunc();
  },[])

  const totalamount = statdata?.reduce((acc,curr)=>acc+=curr?.totalamount,0)

  const totalstudents = statdata?.reduce((acc,curr)=> acc+=curr?.totalstudent,0)


  return (
    <div className='text-white'>
    <p className='text-2xl font-medium'>Hello {user?.firstname} 😊</p>
    <p className='text-gray-400 text-lg font-medium py-2'>Let's see You stats</p>

    {
      !statdata?<p className='text-center font-medium text-xl text-gray-300'>No Stats Found</p>:<div>

        <div className='lg:flex  lg:min-h-[400px] gap-5 justify-between'>
          <div className='bg-gray-900 lg:w-[70%] p-4 rounded-md border border-gray-700'>
            {
              totalamount >0 || totalstudents>0 ? (
                <Chartcomponent data={statdata}/>
              ):<div><p>visualize</p>
              <p>No Enough Data to Form Chart</p></div>
            }
          </div>
          <div  className='bg-gray-800/80 lg:w-[30%] p-4 rounded-md border border-gray-700'>
            <p className='text-2xl font-medium pb-2'>Statistics</p>
            <p className='text-lg font-semibold text-gray-400 py-1'>Total Courses</p>
            <p className='text-white font-semibold text-3xl'>{courses?.length}</p>
            <p className='text-lg font-semibold text-gray-400 py-1'>Total Students</p>
            <p className='text-white font-semibold text-3xl'>{totalstudents}</p>
            <p className='text-lg font-semibold text-gray-400 py-1'>
              Total income
            </p>
            <p className='text-white font-semibold text-3xl'>Rs. {totalamount}</p>
          </div>
        </div>
      </div>
    }
    <div className='bg-gray-900/90 my-5 rounded-md p-2'>
      <div className='flex justify-between py-2 px-3'>
      <p className='text-lg font-medium'>Your Courses</p> <p className='text-md cursor-pointer font-medium text-yellow-500' onClick={()=>navigate('/dashboard/my-courses')}>View All</p></div>
      
      <div className=' lg:flex lg:gap-3 '>
        {
          courses.length>0?(
courses.slice(0,3).map((course)=>(
            <div className='lg:w-1/3 my-4' key={course._id}>
               <img src={course?.thumbnail} alt={course?.name} className="h-[200px] w-full rounded-md object-cover"/>
               <div className='text-gray-300'>
                <p>{course?.name}</p>
                <div className='flex gap-2'>
                  <p>Students: {course?.studentsEnrolled?.length ||0}</p>
                <p>|</p>
                <p>Rs. {course.price}</p>
                </div>
                
               </div>
            </div>
          ))
          ):(
            <div className='text-center text-gray-400 text-2xl'>You Have Not Created Any Course</div>
          )
        }
      </div>
    </div>
    </div>
  )
}

export default Instructordashboard