import React from 'react'
import Actionbtn from './Actionbtn'
import { FaArrowRight } from 'react-icons/fa'
import Highlight from './Highlight'
import Timeline from './Timeline'
import LearningLanguage from './LearningLanguage'
const Section2 = () => {
  return (
    <div className='w-screen bg-[#e9e9e9d9]'>
    <div className='homebg h-[310px]'>
    <div className='w-11/12 justify-center gap-6 flex h-full items-center mt-30 text-center lg:flex-row flex-col'>
         <div>
         <Actionbtn active={true} tolink={"/login"}>Explore Full Catalog <FaArrowRight className='inline mx-3'/> </Actionbtn></div>
         <div>
         <Actionbtn active={false} tolink={"/signup"}>learn more<FaArrowRight className='inline mx-3'/> </Actionbtn>
         </div>
    </div>
    </div>

    <div className='w-11/12 mx-auto flex flex-col'>

        <div className='flex gap-10 my-20 justify-around'>
            <div className='text-4xl font-medium text-black w-[40%]'>
                Get the skills you need for a <Highlight text={"job that is in demand."}/>
            </div>
            <div className='flex flex-col gap-7 w-[40%] text-md font-medium'>
                <p>The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.</p>
                <div className='w-fit'>
                     <Actionbtn active={true} tolink={"/login"}>Learn more</Actionbtn>
                </div>
               
            </div>
        </div>

       <Timeline/>
       <LearningLanguage/>
    </div>
    </div>
  )
}

export default Section2