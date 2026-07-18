import React from 'react'
import StepComponent from './StepComponent'
import { useSelector } from 'react-redux'
import Addcoursefrom from './forms/Addcoursefrom';
import Coursebuilder from './forms/Coursebuilder';
import Publishform from './forms/Publishform';

const Addcourse = () => {
  const {step} = useSelector((state)=>state.course);

  return (
    <div className='w-full py-4'>
        <p className='text-3xl text-white font-medium py-3'>Add course</p>
         <div className='flex lg:flex-row flex-col gap-7 mt-6'>
            <div className='lg:w-[70%]'>
              <StepComponent/>
              {
                (step==1)&&(
                  <Addcoursefrom/>
                )
              }
              {
                (step==2)&&(
                  <Coursebuilder/>
                )
              }
              {
                (step==3)&&(
                  <Publishform/>
                )
              }
            </div>
            <div className='text-white lg:w-[40%] h-fit min-h-[400px] p-5 bg-gray-800 rounded-2xl border-slate-700 border'>
              <p className=' text-2xl font-medium py-4'>✨Course Upload Tips</p>
              <ul className=' list-disc pl-5 gap-3.5'>
                <li>Set the Course Price option or make it free.</li>
                <li>Standard size for the course thumbnail is 1024x576.</li>
                <li>Video section controls the course overview video.</li>
                <li>Course Builder is where you create & organize a course.</li>
                <li>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
                <li>Information from the Additional Data section shows up on the course single page.</li>
              </ul>
            </div>
        </div>
    </div>
  )
}

export default Addcourse