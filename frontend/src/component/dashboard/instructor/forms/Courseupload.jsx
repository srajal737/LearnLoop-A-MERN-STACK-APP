import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { FiUploadCloud } from "react-icons/fi"
const Courseupload = ({errors , setValue , registername ,register,isvideo=false}) => {
  const {editcourse,course} = useSelector((state)=>state.course)
  const [selectedfile , setselectedfile] =useState(null);
  const [previewurl,setpreviewurl] = useState(null);
  const inputref = useRef();
  useEffect(()=>{
    register(registername,{required:true})
  },[])
  
  useEffect(()=>{
    setValue(registername,selectedfile);
  },[selectedfile])
  const handleselect = ()=>{
    inputref.current.click();
  }

  const handlefileselect = (e)=>{
    const file = e.target.files[0];
    if(file){
      setselectedfile(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend  =()=>{
        setpreviewurl(reader.result);
      }
    }
  }

  const handleclear = ()=>{
    setpreviewurl(null);
    setselectedfile(null);
  }

 
  return (
    <div className='p-7 bg-black/60 rounded-2xl '> 
    <input
       id='thumbnail'
        type='file'
        className='hidden'
        ref={inputref}
        accept='image/png,image/gif,image/jpg,image/jpeg'
        onChange={handlefileselect}
       />
    {
      (previewurl ||editcourse)?(
        <div><img src={previewurl || course?.thumbnail} alt='thumbnail'
        className='w-full h-full'
      />

        <div className='flex gap-3'>
          <button type='button' className='cursor-pointer underline' onClick={()=>(handleclear())}>
            clear
          </button>
          { editcourse && <button type='button' className='underline cursor-pointer' onClick={handleselect}>Edit</button>

          }
        </div>
      </div>
        ):(<div>
        <div className='text-center'>
         <FiUploadCloud className="text-2xl text-yellow-500  rounded-full inline " />
       </div>

       <div className='text-yellow-400'>
       <div className='text-center'><button type='button' className='cursor-pointer underline' onClick={handleselect}>
          Browse
        </button></div>
        
       </div>

       <div className='text-sm text-gray-300 py-3 font-medium text-center'>
        MAXSIZE 12MB
       </div>
       
       <div className='flex justify-around'>
        <div className=' list-disc text-gray-300'>Aspect ration 16:9</div>
        <div className='list-disc text-gray-300 '>Recommended size 1024*578</div>
       </div>
      </div>)
    }
    </div>
  )
}

export default Courseupload
