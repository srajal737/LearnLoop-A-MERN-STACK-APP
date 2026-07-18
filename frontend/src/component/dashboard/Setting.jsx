import React from 'react'

import Imageupload from './setting/Imageupload';
import Personalinfo from './setting/Personalinfo';
import Changepassword from './setting/Changepassword';
import Deleteaccount from './setting/Deleteaccount';

const Setting = () => {
 
  return (
    <div>
      <p className='text-3xl text-white pt-10'>Edit Profile</p>

     <Imageupload/>

      <Personalinfo/>

      <Changepassword/>
      
    <Deleteaccount/>
    </div>
  )
}

export default Setting