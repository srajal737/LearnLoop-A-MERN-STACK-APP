import React from 'react'
import Template from '../../src/component/auth/Template'
import  loginImg from '../assets/Images/login.webp'

const Login = () => {
     const heading1='Welcome Back!!';
     const heading2='Build skills for today, tomorrow, and beyond.';
     const heading3='Education to future-proof your career.';
     const btntext="Login"
  return (
    <div >
    
        <Template flaglogin={true} heading1={heading1} heading2={heading2} heading3={heading3} img={loginImg}/>
    </div>
  )
}

export default Login