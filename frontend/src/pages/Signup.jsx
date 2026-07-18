import React from 'react'
import Template from '../component/auth/Template';
import signupImg from '../assets/Images/signup.webp'
const Signup = () => {
    const heading1='Join the millions learning to code with LEARNLOOP for free';
     const heading2='Build skills for today, tomorrow, and beyond.';
     const heading3='Education to future-proof your career.';
     
  return (
     <div >
        <Template flaglogin={false} heading1={heading1} heading2={heading2} heading3={heading3} img={signupImg}/>
    </div>
  )
}

export default Signup