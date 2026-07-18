import React from 'react'
import { Link, replace } from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa";
import Highlight from './Highlight';
import Actionbtn from './Actionbtn';
import Bannervideo from '../../assets/Images/banner.mp4';//as continuous only two dots
import Codesection from './Codesection';
import Homecatalog from './Homecatalog';
import "./section1.css";

const Section1 = () => {

    
  return (
    <div className='w-screen bg-[#020e21] pt-16'>
        <div className='flex w-11/12 min-h-screen max-w-[screen] items-between mx-auto flex-col relative '>
         <div className='mx-auto mt-16 duration-300 transition-all hover:scale-95 group bg-[#283139] w-fit rounded-4xl overflow-hidden shadow-[0_2px_6px_-1px_rgb(238,238,238,0.5)]'>
           <Link to={"/signup"}>
                <button className='mx-auto flex gap-3 items-center cursor-pointer justify-center text-gray-100 p-2 px-4 group-hover:bg-[#000814] duration-300 text-lg'>
                    <p className='line line1'>Become an Instructor</p>
                    <FaArrowRight />
                </button>   
             </Link>
         </div>

         <div className=' text-3xl text-white font-medium mt-12 mx-auto line line2 text-center'>
          Empower Your Future with <Highlight className='' text={"Coding Skills"}/>
         </div>

         <div className='mx-auto text-lg text-gray-400 font-bold mt-7 text-center w-[80%] line line3'>
           With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
         </div>

         <div className='flex flex-row gap-7 mx-auto mt-15 line'>
            <Actionbtn active={true} tolink={"/signup"}>
                Learn More
            </Actionbtn>
            <Actionbtn active={false} tolink={"/login"}>
                Book A Demo
            </Actionbtn>
         </div>


         <div className='my-20 object-contain w-[80%] mx-auto shadow-[-15px_-15px_40px_0px_rgb(12,146,142),20px_20px_1px_10px_rgb(255,255,255)]'>
            <video autoPlay loop muted>
                <source src={Bannervideo} type='video/mp4'></source>
            </video>
         </div>

         {/* coding section */}

         <div className='w-full '>
           <Codesection
           color={"yellow"}
            position={"flex-col lg:flex-row"} 
             gradientcolor={"rgba(59,130,246,0.4)"}
            heading={
            <div className='text-3xl text-white font-medium my-6'>
            Unlock your <Highlight text={"coding potential"}/> with our online courses.
           </div>}
           subheading={<div className='text-gray-400 font-bold my-5'>
           Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you.
           </div>}

           actionbtn1={{
            active:true,
            tolink:"/signup",
            content:"Try it Yourself"
           }}

           actionbtn2={{
            active:false,
            tolink:"/login",
            content:"Learn more"
           }}

           codeblock={`<!DOCTYPE html>
<html lang="en">
<head>
    <title>example page</title>
</head>
<body>
    <h1><a href="/">Header</a></h1>
    <nav>
        <a href="/goto">Goto</a>
        <a href="/home">Home</a>
    </nav>
</body>
</html>`}
           />
         </div>

         {/* code section 2 */}
         <div>
             <Codesection
            position={" flex-col lg:flex-row-reverse"} 
            color={"white"}
            gradientcolor={"rgba(5,150,105,0.5)"}
            heading={
            <div className='text-3xl text-white font-medium my-6'>
            Start  <Highlight text={`coding in seconds`}/>
           </div>}
           subheading={<div className='text-gray-400 font-bold my-5'>
           Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson.
           </div>}

           actionbtn1={{
            active:true,
            tolink:"/signup",
            content:"Continue Lesson"
           }}

           actionbtn2={{
            active:false,
            tolink:"/login",
            content:"Learn more"
           }}

           codeblock={`<!DOCTYPE html>
<html lang="en">
<head>
    <title>example page</title>
</head>
<body>
    <h1><a href="/">Header</a></h1>
    <nav>
        <a href="/goto">Goto</a>
        <a href="/home">Home</a>
    </nav>
</body>
</html>`}
           />
         </div>

         <Homecatalog/>
         
        </div>
    </div>
   
  )
}

export default Section1