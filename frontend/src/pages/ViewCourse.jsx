import React, { useEffect, useState } from 'react'
import { useDispatch ,useSelector } from 'react-redux';
import { Outlet, useParams  } from 'react-router-dom'
import { getcourseplayerdata } from '../services/apicalling/courseapicalling';
import {  setCourseSectionData, setEntireData, setTotalLectures, updateCompletedLectures } from '../slices/courseviewslice';
import Vediosidebar from '../component/courseviewcomponent/Vediosidebar';
import Loader from '../component/Loader';
import { FaBars } from 'react-icons/fa';
const ViewCourse = () => {
    const {token}= useSelector((state)=>state.auth)
    const {courseid} = useParams();
    const dispatch = useDispatch();
    
    const [totalduration ,settotalduration] = useState(0)

//     useEffect(() => {
//   const blockKeys = (e) => {
//     if (
//       (e.ctrlKey && ["c", "u", "s"].includes(e.key.toLowerCase())) ||
//       e.key === "F12"
//     ) {
//       e.preventDefault();
//     }
//   };

//   document.addEventListener("keydown", blockKeys);

//   return () => {
//     document.removeEventListener("keydown", blockKeys);
//   };
// }, []);
const [loading ,setloading] = useState(false);
  useEffect(() => {
    const disableRightClick = (e) => {
      e.preventDefault();
    };

    document.addEventListener("contextmenu", disableRightClick);

    return () => {
      document.removeEventListener("contextmenu", disableRightClick);
    };
  }, []);

    useEffect(()=>{

      const fetchdata = async()=>{
        setloading(true);
             const getcoursedata = await getcourseplayerdata(courseid ,token);

        if(getcoursedata){
            dispatch(setCourseSectionData(getcoursedata?.coursecontent))
            dispatch(setEntireData(getcoursedata))
            dispatch(updateCompletedLectures(getcoursedata?.completedvideos))
            dispatch(setTotalLectures(getcoursedata?.totalvideos))
            settotalduration(getcoursedata?.duration);
          
        }
        setloading(false);
      }
       
      fetchdata();
    },[])

    const [sideopen ,setsideopen] = useState(true);
   

  return (
 
    
    <div className='text-white pt-15 min-h-screen flex bg-slate-950  w-full'>
     {
      loading && <Loader/>
     }
     {
      !loading && <div className=' w-full flex'>
    
      <Vediosidebar sideopen={sideopen} setsideopen={setsideopen} />
      <div className='w-[60%] pb-13 mt-1  min-h-screen flex-1 '>
        <Outlet   context={{ sideopen, setsideopen }}/>
      </div></div>
     }
       
    </div>
  )
}

export default ViewCourse