import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { FiUploadCloud } from "react-icons/fi"
const Videoupload = ({errors ,registername,register,loading , setValue,view=false,edit=false ,videoURL} ) => {
     const [selectedfile , setselectedfile] =useState(null);
     const [duration, setDuration] = useState("");
      const [previewurl,setpreviewurl] = useState(null);
      const inputref = useRef();
    useEffect(()=>{
          register(registername,{required:true});
          register("duration",{required:true});
    },[])

     useEffect(()=>{
        setValue(registername,selectedfile);
     
      },[selectedfile])

      useEffect(()=>{
        setValue("duration",duration);
      },[duration]);
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

  const handleLoadedMetadata =(e)=>{
     const total = Math.floor(e.target.duration);

  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = total % 60;

  const formatted =
    hours > 0
      ? `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
          .toString()
          .padStart(2, "0")}`
      : `${minutes}:${seconds.toString().padStart(2, "0")}`;

  setDuration(formatted);
     
  }
  return (
    <div className='p-7 bg-gray-700/60 rounded-2xl '>
      <input
           id='videoURL'
            type='file'
            ref={inputref}
           accept="video/mp4,video/webm,video/ogg,video/quicktime"
            onChange={handlefileselect}
            className='hidden object-contain'
           /> 
        {
          (previewurl || videoURL)?(
            <div><video src={previewurl || videoURL} alt='video'
            className='w-full h-full' controls controlsList="nodownload" onContextMenu={(e)=>e.preventDefault()} onLoadedMetadata={handleLoadedMetadata}
          />
         
          {!view &&  <div className='flex gap-3'>
           <p>Video Duration : {duration}</p>
              <button type='button' className='cursor-pointer underline' onClick={()=>(handleclear())}>
                clear
              </button>
              { edit && <button type='button' className='underline cursor-pointer' onClick={handleselect}>Edit</button>
    
              }
            </div>}
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

export default Videoupload