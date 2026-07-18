import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';

const Instructioncomponent = ({setValue , errors ,register}) => {
    const [requirelist ,setrequirelist] = useState([]);
    const [require , setrequire]=useState("");
    const {course ,editcourse} = useSelector((state)=>state.course);

  useEffect(() => {
    register("instructions", { required: true, validate: (value) => value.length > 0 })
    if(editcourse){
      setrequirelist(course?.instructions)
    }
  }, [])
    useEffect(()=>{
        setValue("instructions",requirelist)
    },[requirelist])
    const ref = useRef();
    const handleclick = ()=>{
        if(require){
            const newlist = [...requirelist , require];
            setrequirelist(newlist);
            setrequire("")
        }
    }

    const handleclear = (i)=>{
        const newlist = requirelist.filter((_,idx)=>idx!==i);
        setrequirelist(newlist);
    }
  return (
    <div>
       <input placeholder='Enter the instructions' className='bg-black my-1 rounded-lg p-2 text-white placeholder-gray-300  outline-none focus:bg-slate-700 mb-3 focus:ring-1 focus:ring-blue-400 transition border-b-1 w-full' type='text' value={require} onChange={(e)=>{setrequire(e.target.value)}}/>
       <button type='button' className='cursor-pointer bg-black rounded-2xl px-3 py-2 duration-200 hover:bg-gray-500 text-yellow-400' onClick={()=>handleclick()}>Add</button>
       {
        errors.instructions && (<div className='text-pink-600'>instructions required</div>)
       }
       {
        (requirelist.length>0) && requirelist.map((item,idx)=>(
            <div key={idx}>
                <span className='text-md text-white px-3'>{item}</span>
                 <button type='button' onClick={()=>{handleclear(idx)}} className='cursor-pointer underline text-yellow-500  p-1 rounded-xl text-sm'>clear</button>
            </div>
        ))
       }
    </div>
  )
}

export default Instructioncomponent