import React from 'react'
import Logo1 from '../../assets/TimeLineLogo/Logo1.svg'
import logo2 from '../../assets/TimeLineLogo/Logo2.svg'
import logo3 from '../../assets/TimeLineLogo/Logo3.svg'
import logo4 from '../../assets/TimeLineLogo/Logo4.svg'
import timelineimg from '../../assets/Images/TimelineImage.png'
let data = [
  {
    logo:Logo1,
    heading:"Leadership",
    description:"Fully committed to the success company"
  },
  {
    logo:logo2,
    heading:"Leadership",
    description:"Fully committed to the success company"
  },
  {
    logo:logo3,
    heading:"Leadership",
    description:"Fully committed to the success company"
  },
  {
    logo:logo4,
    heading:"Leadership",
    description:"Fully committed to the success company"
  },
]
const Timeline = () => {
  return (
    <div className='flex lg:flex-row flex-col gap-10 justify-around my-20'>
     <div className='flex flex-col'>
      { data.map((ele,ind)=>{
        return <div key={ind} className='flex flex-col'>
        <div className='flex gap-5'>
           <div className='w-[50px] h-[50px] rounded-full flex justify-center items-center bg-white'>
            <img src={ele.logo}></img>
           </div>
           <div>
            <p className='text-xl font-medium'>{ele.heading}</p>
            <p className='text-md'>{ele.description}</p>
           </div>
        </div>
           {(ind!==data.length-1)&&<div className='mx-6 w-[1px] my-4 h-13 bg-gray-400'></div>}
        </div>
       })}
     </div>
     <div className='relative lg:block hidden'>
        <img src={timelineimg} className='object-cover w-[90%] h-[90%] shadow-[-1px_-15px_20px_0px_rgb(180,180,190),20px_20px_1px_10px_rgb(255,255,255)]'></img>
        <div className='bg-green-900 text-white py-4 px-8 p-5 flex justify-between items-center w-[80%] absolute -translate-y-1/2 translate-x-[7%] text-xl'>
          <div>10</div>
          <div>Years <br/> experiences</div>
          <div className='w-[1px] h-9 bg-green-400'></div>
          <div>250</div>
          <div>types of courses</div>
        </div>
     </div>
    </div>
  )
}

export default Timeline