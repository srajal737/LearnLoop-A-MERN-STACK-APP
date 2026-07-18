import React from 'react'
import Section1 from '../component/home/Section1'
import Section2 from '../component/home/Section2'
import Section3 from '../component/home/Section3'
import Footer from '../component/common/Footer'
const Home = () => {
  return (
    <div className='w-screen'>
    <Section1/>
    <Section2/>
    <Section3/>
     <Footer/>
    </div>
  )
}

export default Home