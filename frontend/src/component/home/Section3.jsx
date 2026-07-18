import React from 'react'
import instructor from '../../assets/Images/Instructor.png'
import Highlight from './Highlight'
import Actionbtn from './Actionbtn'
import { FaArrowRight } from 'react-icons/fa'
import ReviewSlider from '../common/ReviewSlider'

const Section3 = () => {
  return (
    <div className='bg-[#000000]'>
       <div className='w-11/12 mx-auto flex flex-col py-20'>
        {/* instructor */}
            <div className='flex lg:flex-row flex-col gap-30 items-center justify-around'>
              <div  className='lg:w-[40%]'>
                <img className='shadow-[-20px_-20px_0px_0px_rgb(256,256,256)]' src={instructor}></img>
              </div>
              <div className='flex gap-8 flex-col lg:w-[40%]'>
                 <p className='text-white text-center text-4xl'>Become An <br/><Highlight  text={"Instructor"}/></p>
                 <p className='text-gray-400 font-bold'>Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.</p>
                 <div className='lg:w-fit text-center'>
                 <Actionbtn tolink={'/signup'} active={true}>Start Teaching Today <FaArrowRight className='inline'/></Actionbtn>
                 </div>
              </div>
            </div>

          

            <div className='flex flex-col items-center my-10'>
              <p className='text-4xl bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-400 bg-clip-text text-transparent font-semibold'>Reviews from other learners</p>

              <div className='w-full my-2'>
                <ReviewSlider/>
              </div>
            </div>
       </div>
    </div>
  )
}

export default Section3