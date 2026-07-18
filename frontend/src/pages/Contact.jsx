import React from 'react'
import * as icon1 from "react-icons/bi"
import * as icon3 from "react-icons/hi2"
import * as icon2 from "react-icons/io5"
import Contactform from '../component/common/Contactform'
import Footer from '../component/common/Footer'
import ReviewSlider from '../component/common/ReviewSlider'
const contactDetails = [
  {
    icon: "HiChatBubbleLeftRight",
    heading: "Chat on us",
    description: "Our friendly team is here to help.",
    details: "learnloop100@info.com",
  },
  {
    icon: "BiWorld",
    heading: "Visit us",
    description: "Come and say hello at our office HQ.",
    details:
      "Baner Road Phase 2, Opposite Orchid Hotel, Pune - 411045",
  },
  {
    icon: "IoCall",
    heading: "Call us",
    description: "Mon - Fri From 8am to 5pm",
    details: "+123 456 7869",
  },
]
const Contact = () => {
  return (
    <div className='bg-[#181818] w-screen'>
     <div className='w-11/12 pt-20 mx-auto max-w-maxContent'>
       <div className='flex gap-10 flex-col lg:flex-row justify-around text-white'>
          {/* left part */}
          <div className=' flex flex-col bg-[#313030] p-10 rounded-xl h-fit gap-5 lg:w-[35%]'>
           {
            contactDetails.map((item,idx)=>{
                let Icon = icon1[item.icon] || icon2[item.icon] || icon3[item.icon];
                return (
                    <div key={idx}>
                    <div className='flex items-center gap-2'> <Icon/> <span>{item.heading}</span></div>
                     <p>{item.description}</p>
                     <p>{item.details}</p>
                    </div>
                )
            }
                
            )
           }
          </div>
          <div className='lg:w-[50%] w-full bg-black p-8 rounded-lg border-1 border-gray-600'>
          <p className='text-3xl font-bold text-white'>Have a vision? We have the expertise. Let's join forces!</p>
          <p className='text-gray-500 pt-4'>Share a bit about yourself and what you’re imagining.</p>
          <Contactform flagfull={true} />
          </div>
       </div>
           <div>
               <div className=" mx-auto my-20 flex flex-col w-11/12  gap-8 text-white">
        {/* Reviws from Other Learner */}
        <h1 className="text-center text-4xl font-semibold mt-8">
          Reviews from other learners
        </h1>
   <div className='mb-10'>
          <ReviewSlider/>
      </div>
      </div>
   
        </div>
     </div>  

      <Footer/>
    </div>
  )
}

export default Contact