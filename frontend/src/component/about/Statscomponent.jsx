import React from 'react'
const Stats = [
  { count: "5K", label: "Active Students" },
  { count: "10+", label: "Mentors" },
  { count: "200+", label: "Courses" },
  { count: "50+", label: "Awards" },
];
const Statscomponent = () => {
  return (
    <div className='bg-[#424854] p-9 flex-wrap flex justify-around my-27'>
        {
            Stats.map((item,index)=>(
                <div key={index}>
                <p className='text-white text-2xl text-center font-extrabold'>{item.count}</p>
                <p className='text-gray-300 text-lg font-medium'>{item.label}</p>
               </div>
            ))
        }
    </div>
  )
}

export default Statscomponent