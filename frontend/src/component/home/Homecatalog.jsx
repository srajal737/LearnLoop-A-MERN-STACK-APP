import React, { useState } from 'react'
import Highlight from './Highlight'
import {HomePageExplore} from '../../data/homepage-explore'
const Homecatalog = () => {
  const tags = [
    "Free","New to coding","Most popular","Skills paths","Career paths"
  ]
  const [currenttag , setcurrenttag]=useState(tags[0]);
  const [currentcourses,setcurrentcourses] = useState(HomePageExplore[0].courses);
  const [clickedcourse , setclickedcourse] = useState(currentcourses[0]);
  function handletagchange(tag){
    setcurrenttag(tag);
    const res = HomePageExplore.filter((curr)=>curr.tag===tag);//filter return an array;
    setcurrentcourses(res[0].courses);
    setclickedcourse(res[0].courses[0]);
  }
  function handlechangeclick(course){
    setclickedcourse(course);
  }
  return (
    <div className='flex flex-col items-center mt-12 mb-[200px]'>
    <p className='text-4xl font-medium text-white'>Unlock the <Highlight text={"Power of Code"}/></p>
    <p className='text-lg font-bold text-gray-400 mt-2'>Learn to Build Anything You Can Imagine</p>

     <div className='flex flex-wrap justify-center lg:flex-nowrap lg:justify-start gap-3 lg:gap-12 px-4 lg:px-7 shadow-2 bg-[#343639] py-2 rounded-4xl mt-7 shadow-amber-50 shadow-sm w-fit max-w-full'>
  {
    tags.map((tag, indx) => {
      return (
        <div
          onClick={() => handletagchange(tag)}
          key={indx}
          className={`cursor-pointer text-sm md:text-lg font-medium py-1 px-3 md:px-4 rounded-4xl transition-all duration-200 whitespace-nowrap ${
            currenttag === tag
              ? "bg-black text-white"
              : "text-gray-300 hover:bg-gray-600 hover:text-white"
          }`}
        >
          {tag}
        </div>
      )
    })
  }
</div>
    <div className='relative w-full mx-auto'>
      <div className='flex lg:flex-row flex-col  gap-10 w-full lg:w-[80%] text-white relative lg:absolute top-[75px] left-1/2 -translate-x-1/2'>
         {currentcourses.map((course,indx)=>{
          return <div onClick={()=>handlechangeclick(course)} className={`flex flex-col w-full lg:w-1/3  min-h-[280px] justify-between p-6 rounded-md ${clickedcourse===course?"bg-white shadow-[_7px_7px_0px_0px_rgb(255,234,0)]":"bg-[#003747]"}`} key={indx}>
            <div> 
            <p className={`font-bold text-xl ${clickedcourse===course?"text-black":"text-white "}`}>{course.heading}</p>
             <p className={`text-md font-medium  mt-3  ${clickedcourse===course?"text-blue-900":"text-gray-400"}`}>{course.description}</p></div>

             <div className='flex justify-between flex-col text-gray-400'>
              <div className='w-full border-dashed border-t-2'></div>
              <div className='flex justify-between'><p>{course.level}</p>
              <p>{course.lessonNumber} Lessons</p></div>
             </div>
          </div>
         })}
       </div>
    </div>
       
    </div>

   
   
   
  )
}

export default Homecatalog