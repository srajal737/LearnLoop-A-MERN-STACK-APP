import React from 'react'
import { FaCheck } from "react-icons/fa"
import { useSelector, useDispatch } from 'react-redux'
import {setstep} from '../../../slices/courseslice'
const StepComponent = () => {
    const {step} = useSelector((state)=>state.course);
    const stepdetail = [
        {
            id:1,
            desc:"Course information"
        },
        {
            id:2,
            desc:"Course builder "
        },
        {
            id:3,
            desc:"Publish"
        }
    ]
  return (
    <div className='flex py-3 mb-6'>
       {
        stepdetail.map((item)=>(
            <div key={item.id} className='w-full'>
            <div className='flex items-center'>
                <div className={`${(step>=item.id)?"bg-green-400/20 text-green-300  rounded-full border border-green-600 font-medium":" bg-zinc-300/15 text-gray-400 rounded-full font-medium"} text-lg w-[40px] h-[40px] flex justify-center items-center` }>{(item.id<step)?<FaCheck/>:item.id}
                </div>
                  {(item.id === 1) && (
                        <div className={`flex-1 border-2 border-dashed  mx-2 ${(step>1)?"border-green-500 ":"border-gray-500 "}`}></div>
                   )}
                   {(item.id === 2) && (
                        <div className={`flex-1 border-2 border-dashed  mx-2 ${(step>2)?"border-green-500 ":"border-gray-500 "}`}></div>
                   )}
            </div>
            <div className= {`${(step>=item.id)?" text-white flex font-bold":"text-md text-gray-500"}  font-bold text-md`}>{item.desc}</div>
           </div>
        ))
       }
    </div>
  )
}

export default StepComponent