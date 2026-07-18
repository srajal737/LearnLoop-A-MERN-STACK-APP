import React from 'react'
import Loginform from './Loginform'
import Signupform from './signupform'
import frameImg from '../../assets/Images/frame.png'

const Template = ({ flaglogin, heading1, heading2 ,heading3 ,img}) => {
  return (
    <div className='w-screen bg-black pt-16'>
    <div className='w-11/12 min-h-screen mx-auto overflow-x-hidden lg:flex-row flex-col-reverse gap-5 flex justify-around py-10'>
    <div className='lg:w-[30%]'>
        <p className='text-white text-3xl font-bold'>{heading1}</p>
    <p className='text-gray-400 text-lg font-medium mt-4'>{heading2}</p>
    <p className='text-blue-400 font-bold italic text-md'>{heading3}</p>
    {
        (flaglogin)?<Loginform/>:<Signupform/>
    }
    </div>
      <div className="relative mx-auto w-11/12 max-w-[450px] md:mx-0">
            <img
              src={frameImg}
              alt="Pattern"
              width={558}
              height={504}
              loading="lazy"
            />
            <img
              src={img}
              alt="Students"
              width={558}
              height={504}
              loading="lazy"
              className="absolute -top-4 right-4 z-10"
            />
          </div>
    </div>
    </div>
   
  )
}

export default Template