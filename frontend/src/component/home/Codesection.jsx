import React from 'react'
import { FaArrowRight } from "react-icons/fa"
import { TypeAnimation } from 'react-type-animation'
import Actionbtn from './Actionbtn'
const Codesection = ({position,color,gradientcolor ,heading ,subheading ,actionbtn1,actionbtn2,codeblock}) => {
  return (
    <div className={`flex flex-col  ${position} justify-around  w-full my-15 mx-auto`}>
      {/* section1 */}
      <div className='lg:w-[40%] w-full'>
      {heading}
      {subheading}
      <div className='flex my-5 text-center gap-6 w-fit '>
        <Actionbtn active={actionbtn1.active} tolink={actionbtn1.tolink}>
          {actionbtn1.content}
            <FaArrowRight className='inline mx-3'/>
        </Actionbtn>

        <Actionbtn active={actionbtn2.active} tolink={actionbtn2.tolink}>
          {actionbtn2.content}
        </Actionbtn>
      </div>
      </div>
      {/* section2 */}
 {/*  here i not write gradient because tailwind no works with static data mostly error so do using style{{}} */}
    <div className={`lg:w-[35%] w-full flex border border-gray-500 p-5 rounded font-medium backdrop-grayscale-75`}
    style={{background: `radial-gradient(circle at top,${gradientcolor} 0%,transparent 70%)`}}> 
        <div className='w-[10%] text-gray-400'>
        <p>1</p>
        <p>2</p>
        <p>3</p>
        <p>4</p>
        <p>5</p>
        <p>6</p>
        <p>7</p>
        <p>8</p>
        <p>9</p>
        <p>10</p>
        <p>11</p>
        <p>12</p>
        <p>13</p>
        </div>
        <div className={`w-[90%] whitespace-pre`}
        style={{
            color:`${color}`
        }}> {/*whitespace pre simply works like pre tag  */}
           <TypeAnimation
            omitDeletionAnimation={true}
            sequence={[codeblock,1000,""]}
            repeat={Infinity}
           />
        </div>
      </div>
    </div>
  )
}

export default Codesection