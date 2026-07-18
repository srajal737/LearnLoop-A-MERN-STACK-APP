import React, { useEffect, useState } from 'react'
import { MdClose } from "react-icons/md"
import { useSelector } from 'react-redux';
const Taginput = ({setValue,errors ,id ,register}) => {
    const {editcourse , course} = useSelector((state)=>state.course)
    const [tags , settag] = useState([]);
    useEffect(() => {//manually register
     register("tag", { required: true, validate: (value) => value.length > 0 })
     if(editcourse){
        settag(course?.tag);
     }
}, []);
    const handlekeydown = (e)=>{
        const t = e.target.value.trim();
        if(e.key===',' && t!==""){
            e.preventDefault();
           const newtags = [...tags , t];
           settag(newtags);
           e.target.value="";
        }
    }

    const handledelete = (idx)=>{
       const newtags = tags.filter((_,i)=>idx!==i);
       settag(newtags);
    }

    useEffect(()=>{
        setValue("tag",tags);
    },[tags])
  return (
    <div>
    <div className='my-2'>
       {
        tags.length>0 &&(
            tags.map((item,idx)=>(
                <span key={idx} className='text-white mx-1 bg-black/70 p-1.5 rounded-xl'>
                    {item}

                    <button type='button' className='ml-1 cursor-pointer bg-red-600 rounded-full' onClick={()=>handledelete(idx)}>
                        <MdClose className="text-sm" />
                    </button>
                </span>
            ))
        )
      }
    </div>
     
     <input className='bg-black w-full my-1 rounded-lg p-2 text-white placeholder-gray-300  outline-none focus:bg-slate-700 focus:ring-1 focus:ring-blue-400 transition border-b-1' type='text' id={id} onKeyDown={handlekeydown} placeholder='For multiple tags use ,'/>
     {
        errors.id && (<span className='text-pink-600'>tags required</span>)
     }
    </div>
  )
}

export default Taginput