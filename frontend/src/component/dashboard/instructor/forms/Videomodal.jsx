import React, { useEffect ,useRef,useState} from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { MdCancel } from "react-icons/md";
import Courseupload from './Courseupload';
import Videoupload from './Videoupload';
import { createsubsection,updatesubsection } from '../../../../services/apicalling/courseapicalling';
import { setcourse } from '../../../../slices/courseslice';
import toast from 'react-hot-toast';
const Videomodal = ({data , setdata ,add=false ,view=false,edit=false}) => {

    const {
        register ,handleSubmit , formState:{errors},getValues,setValue
    }=useForm();
    const ref = useRef();
    const dispatch  = useDispatch();
    const [loading , setloading]=useState(false);
    const {token} =useSelector((state)=>state.auth);
    const {course} =useSelector((state)=>state.course);
    useEffect(()=>{
        function handleclickoutside(e){
            if(ref.current && !ref.current.contains(e.target)){
                setdata(null);
            }
        }

        document.addEventListener("mousedown",handleclickoutside)

        return ()=>{
            document.removeEventListener("mousedown",handleclickoutside)
        }
    },[])
    useEffect(()=>{
        if(view || edit){
            setValue("title",data.title);
            setValue("description",data.description);
            setValue("videoURL",data.videoURL);
            setValue("duration",data.duration);
        }
    },[]);

    const isformupdate = ()=>{
        const currval  = getValues();
        if(currval.title!=data.title || currval.duration!=data.duration || currval.description!=data.description || currval.videoURL !=data.videoURL){
            return true;
        }

        return false;
    }
    const handleedit = async(info)=>{
        const formdata = new FormData();
        formdata.append("sectionid",data.sectionid);
        formdata.append("subsectionid",data._id);
        if(info.title!=data.title){
             formdata.append("title",info.title);
        }
        if(info.description!=data.description){
             formdata.append("description",info.description);
        }
        if(info.videoURL!=data.videoURL){
             formdata.append("videofile",info.videoURL);
        }
        if(info.duration!=data.duration){
             formdata.append("duration",info.duration);
        }

        setloading(true);
        const result = await updatesubsection(formdata,token);
        if(result){
                const updatedcoursecontent = course.coursecontent.map((section)=>(
                section._id==data.sectionid ? result:section
                 ))

            const updatedcourse = {...course , coursecontent:updatedcoursecontent}

            dispatch(setcourse(updatedcourse));
        }
        setdata(null);
        setloading(false);
    }
    const submithandling=async(info)=>{
        if(view) return ;
   
        if(edit){
            if(!isformupdate()){
                toast.error("no Changes made")
            }
            else{
                handleedit(info);
            }
            return ;
        }

        const formdata = new FormData();
        formdata.append("sectionid",data.sectionid);
        formdata.append("title",info.title);
        formdata.append("description",info.description);
        formdata.append("duration",info.duration);
        formdata.append("videofile",info.videoURL);
   
    
        setloading(true);
    
        const result= await createsubsection(formdata,token);
        if(result){
            const updatedcoursecontent = course.coursecontent.map((section)=>(
                section._id==data.sectionid ? result:section
            ))

            const updatedcourse = {...course , coursecontent:updatedcoursecontent}

            dispatch(setcourse(updatedcourse));
        }

        setdata(null);
        setloading(false);
    }

     
  return (
    <div className='fixed inset-0 backdrop-blur-sm flex z-50 justify-center p-10'>
     <div ref={ref} className='text-white w-[40%] min-w-[300px] bg-black/90  border-1 border-gray-600 rounded-md overflow-y-auto'>
      <div className='bg-slate-800 flex justify-between py-3 px-3 text-lg font-bold'>
        <p>{data.heading}</p>
        <button className='cursor-pointer' onClick={()=>(!loading?setdata(null):{})}><MdCancel /></button>
      </div>

      <form onSubmit={handleSubmit(submithandling)} className='p-4'>
      <div className='flex flex-col pb-3'>
         <label htmlFor='videoURL' className='text-md py-1'>Lecture Video <sup className='text-pink-600'>*</sup></label>
         <Videoupload errors={errors} registername="videoURL" register={register} loading={loading} setValue={setValue} view={view} edit={edit} videoURL={data.videoURL}/>
         {errors.videoURL && <span>video required</span>}
      </div>

       <div className='flex flex-col pb-3'>
      <label htmlFor='title' className='text-md'> Lecture Title <sup className='text-pink-600'>*</sup> </label>
        <input id='title'  className='bg-gray-700/60 my-1 rounded-lg p-2 text-white placeholder-gray-300  outline-none focus:bg-slate-700 focus:ring-1 focus:ring-blue-400 transition border-b-1'  readOnly={view} type='text' placeholder='Enter Video Title' {...register("title",{required:true})}/>

      {  errors.title && <span className='text-pink-600'>field required</span>}
    </div>
        
       <div className='flex flex-col pb-3'>
      <label htmlFor='description' className='text-md'> Lecture decription <sup className='text-pink-600'>*</sup> </label>
        <textarea id='description' className='bg-gray-700/60 my-1 rounded-lg p-2 text-white placeholder-gray-300  outline-none focus:bg-slate-700 focus:ring-1 focus:ring-blue-400 transition border-b-1 ' rows={5} readOnly={view} type='text' placeholder='Enter Video description' {...register("description",{required:true})}/>
      {  errors.description && <span className='text-pink-600'>field required</span>}

    </div>
        
    <div>
    {
        !view && (
            <button disabled={loading} type="submit" className='bg-yellow-400 font-bold hover:scale-97 duration-250 rounded-md text-black p-3 cursor-pointer hover:text-white'> 
            {
                 !loading?(edit?"Save Changes":"Add Lecture"):("saving...")
            }
            </button>
        )
     }
        
       
    </div>
        

      </form>
    </div>
    </div>
   
  )
}

export default Videomodal