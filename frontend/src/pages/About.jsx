import React from 'react'
import FoundingStory from "../assets/Images/FoundingStory.png"
import Highlight from '../component/home/Highlight'
import BannerImage1 from "../assets/Images/aboutus1.webp"
import BannerImage2 from "../assets/Images/aboutus2.webp"
import BannerImage3 from "../assets/Images/aboutus3.webp"
import Statscomponent from '../component/about/Statscomponent'
import Aboutgrid from '../component/about/Aboutgrid'
import ContactTouch from '../component/about/ContactTouch'
import Footer from '../component/common/Footer'
import ReviewSlider from '../component/common/ReviewSlider'
const About = () => {
  return (
<div className='w-screen '>
    <div className='bg-[#2d353a] pt-18'>
  <section className='w-11/12 mx-auto max-w-maxContent relative'>

    {/* Header */}
    <header className='py-10 sm:py-14 lg:py-20 text-center'>
      
      <p className='text-2xl sm:text-3xl md:text-4xl text-white font-bold lg:w-[60%] mx-auto'>
        Driving Innovation in Online Education for a{" "}
        <span className='text-transparent bg-gradient-to-b from-yellow-400 to-red-500 bg-clip-text'>Brighter future</span>
      </p>

      <p className='text-sm sm:text-base py-4 sm:py-5 mx-auto text-gray-400 font-medium lg:w-[60%]'>
        Learnloop is at the forefront of driving innovation in online education.
        We're passionate about creating a brighter future by offering cutting-edge
        courses, leveraging emerging technologies, and nurturing a vibrant learning community.
      </p>

    </header>

    {/* Spacer only for desktop */}
    <div className='hidden lg:block py-10'></div>

    {/* Images */}
    <div className="
      flex 
      py-3
      flex-wrap 
      lg:justify-center 
       lg:flex-row
      gap-4 sm:gap-6 lg:gap-8 
      scale-100 lg:scale-95
     lg:absolute 
     flex-col
     items-center
      lg:bottom-0 
      w-full 
      lg:translate-y-1/2
    ">
      <img 
        src={BannerImage1} 
        alt="" 
        className="w-[400px] lg:w-auto"
      />
      <img 
        src={BannerImage2} 
        alt="" 
        className="w-[400px] hidden lg:block lg:w-auto"
      />
      <img 
        src={BannerImage3} 
        alt="" 
         className="w-[400px] hidden lg:block lg:w-auto"
      />
    </div>

  </section>
  </div>
   
    <div className='bg-black pt-40'>
      <div className='w-11/12 mx-auto max-w-maxContent relative'>
      <p className='text-white text-3xl text-center font-bold lg:w-[80%] mx-auto py-10'>We are passionate about revolutionizing the way we learn. Our innovative platform <span className='text-transparent bg-clip-text bg-gradient-to-b from-indigo-500 to-cyan-400'> combines technology</span>, expertise, and community to create an <span className=' bg-gradient-to-b from-orange-800 to-yellow-400 bg-clip-text text-transparent'>unparalleled educational experience.</span> </p>
      </div>
      <hr className="mx-auto border-gray-700 py-15" />

      <div className='flex  justify-around text-white w-11/12 mx-auto max-w-maxContent relative flex-col lg:flex-row'>
         <div className='w-full lg:w-[40%]'>
          <p className='text-4xl font-bold my-10 bg-gradient-to-b from-red-800 via-red-600 to-yellow-400 text-transparent bg-clip-text'>
            Our Founding Story
          </p>
          <p className=' text-lg text-gray-300'>
            Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.
          </p>
          <br/>
          <p className=' text-lg text-gray-300'>
            As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.
          </p>
         </div>
         <div className='rounded-2xl overflow-hidden shadow-[0px_0px_15px_2px_green] my-10'>
           <img src={FoundingStory} className='w-full h-full object-cover'></img>
         </div>
      </div>

       <div className='flex justify-around text-gray-300 w-11/12 mx-auto max-w-maxContent relative flex-col lg:flex-row mt-50'>
        <div className='w-full lg:w-[40%]'>
          <p className='text-4xl py-8 text-transparent bg-clip-text bg-gradient-to-b from-indigo-500 to-cyan-400 font-bold'>
            Our Vision
          </p>
          <p>
            With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.
          </p>
        </div>
        <div className='lg:w-[40%]'>
          <p className='text-4xl py-8 bg-gradient-to-b from-red-500 via-orange-500 to-yellow-400 text-transparent bg-clip-text font-bold'>Our Mission</p>
          <p>Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.</p>
        </div>
      </div>

    <Statscomponent/>

    <div className='w-10/12 max-w-maxContent mx-auto'>
      <Aboutgrid/>
      <ContactTouch/>
    </div>
    <div className=" mx-auto my-20 flex flex-col w-11/12  gap-8 text-white">
        {/* Reviws from Other Learner */}
        <h1 className="text-center text-4xl font-semibold mt-8">
          Reviews from other learners
        </h1>
   <div className='mb-10'>
          <ReviewSlider/>
      </div>
      </div>
    
              
      <Footer />
    </div>
</div>
  )
}

export default About