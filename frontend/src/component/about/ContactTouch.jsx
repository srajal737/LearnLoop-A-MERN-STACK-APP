import React from 'react'
import Contactform from '../common/Contactform'

const ContactTouch = () => {
  return (
    <div className='text-white flex flex-col my-20 items-center '>
    <header className='text-4xl font-bold'>Reach Out Anytime</header>
    <p className='text-gray-300 py-1'>Have questions or ideas? Our team is ready to help you.</p>
    <Contactform flagfull={false}/>
    </div>
  )
}

export default ContactTouch