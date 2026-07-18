import React, { useState } from 'react'
import { formatDate } from './Formatdate'
import { FaCheck } from "react-icons/fa"
import { HiClock } from "react-icons/hi"
import { RiDeleteBin6Line } from "react-icons/ri"
import { FiEdit2 } from "react-icons/fi"
import { useSelector } from 'react-redux'
import { getinstructorcourses,deletecourse } from '../../../services/apicalling/courseapicalling'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import Confirmationmodal from '../../common/Confirmationmodal'
const Coursetable = ({courses,setcourses}) => {
    const [loading,setloading] =useState(false);
    const {token} = useSelector((state)=>state.auth);
    const [deletecoursemodal ,setdeletecoursemodal] = useState(null);
    const navigate = useNavigate();
    const deletecoursehandle = async(courseid)=>{
      
        setloading(true);
        await deletecourse({courseid:courseid},token);
        const result = await getinstructorcourses(token);
        if(result){
            setcourses(result);
        }
        setdeletecoursemodal(null);
        setloading(false);
    }
    const handleedit =(courseid)=>{
        navigate(`/dashboard/edit-course/${courseid}`);
    }
    const handledelete = async(courseid,status)=>{
          if(status === 'Published'){
            toast.error("Published courses can't be deleted");
            return;
        }
          const modalData = {
        text1:"Delete the Course?",
        text2:"Are You Sure You Want to Delete the Course",
        btn1:"Delete",
        btn2:"Cancel",
        btnhandle1:()=>deletecoursehandle(courseid),
        btnhandle2:()=>setdeletecoursemodal(null)
    };

        setdeletecoursemodal({
            text1:"Delete the Course?",
            text2:"Are You Sure You Want to Delete the Course",
            btn1:"Delete",
            btn2:"Cancel",
            btnhandle1:()=>deletecoursehandle(courseid),
            btnhandle2:()=>setdeletecoursemodal(null)
        })
    }

  return (
    <>
        <div className='hidden lg:block'>
    <div className='grid lg:grid-cols-[4fr_1fr_1fr_1fr] gap-5 text-gray-100 text-md font-medium py-3 px-2 rounded-md bg-white/30'>
       <div>COURSES</div>
       <div>DURATIONS</div>
       <div>PRICE</div>
       <div>ACTIONS</div>
    </div>

    {/* //courses */}

    {
        (courses.length===0)?<p className='text-gray-100 text-center text-2xl font-medium'>No Course Found</p>:(
        courses.map((course)=>(
           <div key={course._id} className='grid grid-cols-[4fr_1fr_1fr_1fr] gap-5 border-b-1 border-b-gray-700 text-gray-100  py-3 px-2 rounded-md'>
           <div className='flex gap-2'>
            <div className='w-[250px] h-full flex-shrink-0'><img src={course.thumbnail} alt={course.name}  className='rounded-lg object-cover h-full'/>
</div>
           <div>
            <p className='text-lg font-medium'>{course.name}</p>
             <div className='text-sm text-gray-400 my-3'>
            {course?.category?.name}
           </div>
            <p className='text-sm text-gray-400 my-3'>{(course.description.length>30)?course.description.slice(0,30)+'...':course.description}</p>
            <p className='text-sm py-2'>Created : {formatDate(course.createdAt)}</p>
            {
               (course.status === 'Draft')?<p className={` flex items-center gap-1 bg-gray-800 w-fit px-2 py-1 rounded-2xl text-sm text-red-500`}><HiClock className='inline' size={14}/>Draft</p>:<p className='text-green-500 flex items-center gap-1 bg-gray-800 w-fit px-2 py-1 rounded-2xl text-sm'>{<FaCheck className='inline'/>}Published</p>
            }
           </div>
           </div>
           <div>
            5hr 40min
           </div>
           <div>
            ₹{course.price}
           </div>
          
           <div className='flex items-start gap-4'>
            <button
        disabled={loading}
        onClick={()=>handleedit(course._id)}
        className="p-2 rounded-lg bg-blue-600 cursor-pointer"
      >
        <FiEdit2 size={20}/>
      </button>


      <button
        disabled={loading}
        onClick={()=>handledelete(course._id,course.status)}
        className="p-2 rounded-lg bg-red-600 cursor-pointer"
      >
        <RiDeleteBin6Line size={20}/>
      </button>
           </div>
           </div> 
        )))
    }
   
 {
    deletecoursemodal && <Confirmationmodal data={deletecoursemodal} setdata={setdeletecoursemodal}/>
 } 
     
    </div>
  

  {/**mobile  */}

<div className="lg:hidden flex flex-col gap-4">

{
courses.length === 0 ? (
  <p className="text-gray-100 text-center text-2xl font-medium">
    No Course Found
  </p>
)
:
(
courses.map((course)=>(
  
<div
key={course._id}
className="bg-white/10 rounded-xl p-4 text-white border border-gray-700"
>

  {/* Image */}
  <div className="w-full h-44">
    <img
      src={course.thumbnail}
      alt={course.name}
      className="w-full h-full object-cover rounded-lg"
    />
  </div>


  {/* Details */}
  <div className="mt-3">

    <p className="text-lg font-semibold">
      {course.name}
    </p>


    <p className="text-sm text-gray-400 mt-2">
      {course?.category?.name}
    </p>


    <p className="text-sm text-gray-400 mt-2">
      {
        course.description.length > 80
        ? course.description.slice(0,80)+"..."
        : course.description
      }
    </p>


    <p className="text-sm mt-3">
      Created : {formatDate(course.createdAt)}
    </p>


    {
      course.status === "Draft"
      ?
      <p className="flex items-center gap-1 bg-gray-800 w-fit px-3 py-1 rounded-2xl text-sm text-red-500 mt-3">
        <HiClock size={14}/>
        Draft
      </p>
      :
      <p className="flex items-center gap-1 bg-gray-800 w-fit px-3 py-1 rounded-2xl text-sm text-green-500 mt-3">
        <FaCheck/>
        Published
      </p>
    }


    {/* Bottom info */}
    <div className="flex justify-between mt-4">

      <div>
        <p className="text-gray-400 text-sm">
          Duration
        </p>
        <p>
          5hr 40min
        </p>
      </div>


      <div>
        <p className="text-gray-400 text-sm">
          Price
        </p>
        <p>
          ₹{course.price}
        </p>
      </div>

    </div>


    {/* Actions */}
    <div className="flex gap-5 mt-5">

      <button
        disabled={loading}
        onClick={()=>handleedit(course._id)}
        className="p-2 rounded-lg bg-blue-600"
      >
        <FiEdit2 size={20}/>
      </button>


      <button
        disabled={loading}
        onClick={()=>handledelete(course._id,course.status)}
        className="p-2 rounded-lg bg-red-600"
      >
        <RiDeleteBin6Line size={20}/>
      </button>

    </div>


  </div>

</div>

))
)
}

</div>
    </>
    
  )
}

export default Coursetable