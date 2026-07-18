import React from 'react'
import { useNavigate } from 'react-router-dom';
import Actionbtn from '../home/Actionbtn';
const array = [
  {
    order: -1,
    heading: "World-Class Learning for",
    highlightText: "Anyone, Anywhere",
    description:
      "LearnLoop partners with over 275 top universities and companies to deliver flexible, affordable, and career-focused online learning. Access courses anytime, from anywhere, and take your skills to the next level.",
    BtnText: "Learn More",
    BtnLink: "/",
  },
  {
    order: 1,
    heading: "Curriculum Aligned with Industry Needs",
    description:
      "Our courses are designed in close collaboration with industry experts, ensuring you learn the skills that employers value most. Save time, gain practical knowledge, and advance your career efficiently.",
  },
  {
    order: 2,
    heading: "Innovative Learning Methods",
    description:
      "Experience interactive learning with hands-on projects, real-world case studies, and engaging multimedia content. Our methods are designed to make learning enjoyable, effective, and practical.",
  },
  {
    order: 3,
    heading: "Recognized Certification",
    description:
      "Earn certificates from globally recognized universities and organizations that showcase your skills and boost your career opportunities.",
  },
  {
    order: 4,
    heading: "Smart Auto-Grading & Feedback",
    description:
      "Our intelligent auto-grading system gives instant feedback on your assignments and quizzes, helping you track your progress and improve continuously.",
  },
  {
    order: 5,
    heading: "Career-Ready Skills",
    description:
      "Our programs are designed to equip you with skills that employers demand. Gain practical experience, build a strong portfolio, and be ready to succeed in the workforce.",
  },
];
const Aboutgrid = () => {
    const navigate=useNavigate();
  return (
    <div className='grid lg:grid-cols-4 grid-cols-1 text-white'>
      {
        array.map((card,index)=>(
            <div key={index} className={`${(card.order==-1)?"lg:col-span-2":(card.order%2==0)?"bg-zinc-800":"bg-zinc-700"} ${(card.order==3)?"lg:col-start-2":""}`}>
              {
                (card.order==-1)?(
                    <div className='pb-3 pr-10'>    
                    <p className='text-4xl font-bold'>{card.heading}</p>
                    <p className='text-4xl font-bold  text-transparent bg-clip-text bg-gradient-to-b from-indigo-500 to-cyan-400 '>{card.highlightText}</p>
                    <p className='text-gray-300 font-bold py-4'>{card.description}</p>
                    <div className="w-fit py-2"><Actionbtn  active={true} tolink={card.BtnLink}>{card.BtnText}</Actionbtn></div>
                    </div>
               
                ):(
                    <div className='p-7'>
                    <p className='text-lg pb-4 font-medium'>{card.heading}</p>
                    <p className='text-gray-300'>{card.description}</p>
                    </div>
                )
              }
            </div>
        ))
      }
    </div>
  )
}

export default Aboutgrid