import React from 'react'
import Highlight from './Highlight'
import know_your_progress from '../../assets/Images/Know_your_progress.png'
import  compare_with_other from '../../assets/Images/Compare_with_others.png'
import plan_your_lessons from '../../assets/Images/Plan_your_lessons.png'
import Actionbtn from './Actionbtn'
const LearningLanguage = () => {
  return (
    <div className='flex flex-col items-center my-20'>
        <div className='text-4xl font-medium py-6'>Your swiss knife for <Highlight text={"learning any language"}/></div>
        <div className='text-center text-lg'>Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking,<br/> custom schedule and more.</div>

        <div className='flex'>
        <div className='-mr-28'><img src={know_your_progress}></img></div>
        <div><img src={compare_with_other}></img></div>
        <div className='-ml-38'><img src={plan_your_lessons}></img></div>
        </div>
         <Actionbtn  active={false} tolink={"/login"}>Learn more</Actionbtn>
    </div>
  )
}

export default LearningLanguage