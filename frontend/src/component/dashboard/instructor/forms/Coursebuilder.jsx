import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setcourse, seteditcourse, setstep } from '../../../../slices/courseslice'
import { useForm } from 'react-hook-form';
import { createsection, updatesection ,deletesection, deletesubsection } from '../../../../services/apicalling/courseapicalling';
import { MdEdit } from "react-icons/md"
import { RiDeleteBin6Line } from "react-icons/ri"
import Confirmationmodal from '../../../common/Confirmationmodal';
import { IoAddCircleOutline } from "react-icons/io5"
import { MdArrowDropDownCircle } from "react-icons/md";
import Videomodal from './Videomodal';
import { RxDropdownMenu } from "react-icons/rx"
import toast from 'react-hot-toast';
const Coursebuilder = () => {
  const dispatch = useDispatch();
  const {token} = useSelector((state)=>state.auth)
  const {step,course,editcourse} = useSelector((state)=>state.course)
  const {
    setValue,register ,handleSubmit ,formState:{errors} ,setFocus
  } = useForm();
  const [loading , setloading] = useState(false);
  const [editsectionname , seteditsectionname] = useState(null);
  const [sectiondeletemodal,setsectiondeletemodal]= useState(null);

  const [videoviewdata ,setvideoviewdata] = useState(null);
  const [videoeditdata,setvideoeditdata ] = useState(null);
  const [videoadddata , setvideoadddata]  =useState(null);

  const [subsectiondelete , setsubsectiondelete] = useState(null);
  const handlesubmit = async(data)=>{
    setloading(true);
    let result ;
    if(editsectionname){
      result =await updatesection({name:data.name , sectionid:editsectionname , courseid:course._id} ,token)
    }
    else{
      //create section 
      result = await createsection({
        name:data.name,
        courseid:course._id
      },token)
    }
      if(result){
        dispatch(setcourse(result))
        seteditsectionname(null);
        setValue("name","")
      }
   
    setloading(false);
  }
  const handlecancel = ()=>{
    setValue("name","");
    seteditsectionname(null);
  }

  const sectionhandleedit = (sectionid,sectionname)=>{
    seteditsectionname(sectionid);
    setValue("name",sectionname);
    setFocus("name");
  }
  
   
  const sectionhandledelete  =  (sectionid,sectionname)=>{
    setsectiondeletemodal({
      text1:"Delete This Section?",
      text2:`All lectures will be deleted from section "${sectionname}" `,
      btn1:"Delete",
      btn2:"Cancel",
      btnhandle1:()=>(sectiondeletehelper(sectionid,sectionname)),
      btnhandle2:()=>(setsectiondeletemodal(null))
    })
  }

  const sectiondeletehelper = async (sectionid , sectionanname)=>{
   const result = await deletesection({
      sectionid,courseid:course._id,
    },token);

    if(result){
      dispatch(setcourse(result));
    }

    setsectiondeletemodal(null);

  }

  const subsectiondeletehelper =async (subsectionid , sectionid)=>{
    const result = await deletesubsection({
      sectionid:sectionid,
      subsectionid:subsectionid
    },token);
    setloading(true);
    if(result){
      //update section part 
       if(result){
          const updatedcoursecontent = course.coursecontent.map((section)=>(
               section._id==sectionid ? result:section
          ))
          const updatedcourse = {...course , coursecontent:updatedcoursecontent}
          dispatch(setcourse(updatedcourse));
    }

    setloading(false);
    setsubsectiondelete(null);
  }
}
  const backhandle = ()=>{
    dispatch(setstep(1));
    dispatch(seteditcourse(trusted));
  }
  
  const nexthandle = ()=>{
    if(course.coursecontent.length===0){
      toast.error("please add Atleast one section")
      return ;
    }

    if(course.coursecontent.some((section)=>section.subsection.length===0)){
      toast.error("please add Atleast one lecture in each course")
      return ;
    }

    dispatch(setstep(3));
  }

  return (
    <div className='text-white bg-gray-800 border-white/20 rounded-lg border p-5'>
       <p className='text-2xl font-bold pb-3'>Course Builder</p>

       <form onSubmit={handleSubmit(handlesubmit)}>
       <div className='flex flex-col pb-3'>
        <label htmlFor='name'>Section Name<sup className='text-pink-500'>*</sup></label>
        <input id='name' className='bg-black my-1 rounded-lg p-2 text-white placeholder-gray-300  outline-none focus:bg-slate-700 focus:ring-1 focus:ring-blue-400 transition border-b-1' disabled={loading} placeholder={`${(editsectionname)?"Enter New Section Name":"Create a Section"}`} {...register("name",{required:true})} />

        {errors.name && <span className='text-pink-500'>section name required</span>}
       </div>

       <div>
        <button type='submit' disabled={loading} className='px-3 cursor-pointer hover:scale-97 duration-200 py-3 border-2 border-b-amber-100 border-l-amber-100 rounded-lg bg-black text-yellow-400 font-medium '>
        {
          (editsectionname)?"Edit Section":"Create Section"
        }
        </button>

        {
          (editsectionname) &&(
            <div>
              <button type='button' className='text-sm underline text-white cursor-pointer'  disabled={loading} onClick={handlecancel}>cancel</button>
            </div>
          )
        }
       </div>
       </form>
       

       {/* section display */}
      
       {
        course?.coursecontent?.length>0 && 
        <div className='p-6 bg-black/40 my-4 rounded-lg'>
          {
             course?.coursecontent.map((item,idx)=>(
          <details key={idx} className=' text-white group border-b-1 border-gray-500 py-1'>
          <summary className='list-none group-open:border-b-1 group-open:border-b-gray-700'>
          <div className='flex justify-between gap-2'>
           <RxDropdownMenu className="text-2xl flex-shrink-0 text-richblack-50 cursor-pointer inline" />
                <div className='cursor-pointer pb-3'>{item?.name}</div>
                <div className='flex items-center'>
                <div className='flex items-centerv text-gray-400 gap-2' onClick={(e)=>e.stopPropagation()}>
                <button onClick={()=>sectionhandleedit(item._id,item.name)}>  <MdEdit className="text-xl text-richblack-300 cursor-pointer" /></button>
                <button onClick={()=>sectionhandledelete(item._id,item.name)}> <RiDeleteBin6Line className="text-xl text-richblack-300 cursor-pointer" /></button> 
                <div className=''><MdArrowDropDownCircle className='text-xl  cursor-pointer' /></div>
                </div>
               
               </div> 
                </div>
              
          </summary> 
                <div className='px-3 py-2'>
                {
                 item.subsection.length>0 &&  item.subsection.map((subsec,id)=>(
                    <div className='flex border-b-1 border-b-gray-700 py-1 items-center justify-between' key={subsec._id} onClick={()=>{
                      setvideoviewdata({
                       ...subsec, sectionid:item._id,heading:"Viewing Lecture"
                      })
                    }}>
                      <div>
                       <RxDropdownMenu className="text-2xl text-richblack-50 inline mx-2 cursor-pointer" />
                        {subsec.title}
                      </div>
                      <div onClick={(e)=>e.stopPropagation()}>
                       <button disabled={loading} onClick={()=>{
                        setvideoeditdata({
                        ...subsec , sectionid:item._id,heading:"Editing Data"
                      })

                       }} >  <MdEdit className="text-xl cursor-pointer text-gray-400" /></button>
                       <button disabled={loading}
                        onClick={()=>setsubsectiondelete({
                          text1:"Delete This Lecture?",
                          text2:`Once Delete can't Undo`,
                          btn1:"Delete",
                           btn2:"Cancel",
                         btnhandle1:()=>(subsectiondeletehelper(subsec._id,item._id)),
                          btnhandle2:()=>(setsubsectiondelete(null))
                        })}
                       > <RiDeleteBin6Line className="text-xl cursor-pointer text-gray-400" /></button>
                    
                      </div>
                    </div>
                  ))
                }
             <button disabled={loading} className='px-3 mt-2 cursor-pointer hover:scale-97 duration-200 py-1 text-sm border-2 border-b-amber-100 border-l-amber-100 rounded-lg bg-black text-yellow-400 font-medium ' onClick={()=>(setvideoadddata({
               heading:"Adding Lecture",sectionid:item._id
             }))}> <IoAddCircleOutline size={20} className="text-yellow-500 inline" />Add Lecture</button>
              
                </div>
               
          </details>
     
        ))
          }
        </div>
       
       }
       <div  className='flex justify-around'>
        <button disabled={loading}  className='py-2 px-3 bg-gray-400 text-black font-medium rounded-lg cursor-pointer duration-200 hover:scale-98' onClick={()=>backhandle()}>back </button>
       
       <button disabled={loading}  className='py-2 px-3 bg-green-600 text-black font-medium rounded-lg cursor-pointer duration-200 hover:scale-98' onClick={()=>nexthandle()}> next</button>

       </div>
      
       {sectiondeletemodal && <Confirmationmodal data = {sectiondeletemodal} setdata={setsectiondeletemodal}/>}
       {subsectiondelete && <Confirmationmodal data = {subsectiondelete} setdata={setsubsectiondelete}/>}
       {videoadddata && <Videomodal add={true} data={videoadddata} setdata={setvideoadddata}/>}
       {videoeditdata && <Videomodal edit={true} data={videoeditdata} setdata={setvideoeditdata}/>}
       {videoviewdata && <Videomodal view={true} data={videoviewdata} setdata={setvideoviewdata}/>}
    </div>
  )

}
export default Coursebuilder