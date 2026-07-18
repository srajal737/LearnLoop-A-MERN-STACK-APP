import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { createcourse,editcoursecall, fetchcategory } from '../../../../services/apicalling/courseapicalling';
import { HiOutlineCurrencyRupee } from "react-icons/hi"
import Taginput from './Taginput';
import Courseupload from './Courseupload';
import Instructioncomponent from './Instructioncomponent';
import { useDispatch, useSelector } from 'react-redux';
import { setcourse, seteditcourse, setstep } from '../../../../slices/courseslice';

import toast from 'react-hot-toast'
const Addcoursefrom = () => {
   const {
      register ,
      handleSubmit,
      getValues,
      setValue,
      formState:{errors}
    } = useForm();
    const {course,editcourse,step} = useSelector((state)=>state.course)
    const [loading,setloading] = useState(false);
    const dispatch = useDispatch();
    const {token} = useSelector((state)=>state.auth);
    
    const [coursecategory ,setcoursecategory] = useState([]);
    useEffect(()=>{
      const getcategory = async ()=>{
       const res =await fetchcategory();
       if(res.length>0){
        setcoursecategory(res);
       }
      }

      getcategory();
      if(editcourse){
        setValue("name",course?.name);
        setValue("description",course?.description);
        setValue("price",course?.price);
        // setValue("category" , course?.category._id);
        setValue("tag",course?.tag);
        setValue("thumbnail" , course?.thumbnail);
        setValue("whatwilllearn",course?.whatwilllearn);
        setValue("instructions",course?.instructions)
      }
      
    },[course, editcourse,step])


useEffect(() => {
  if(editcourse && coursecategory.length > 0){
    setValue("category", course?.category?._id);
  }

}, [editcourse, coursecategory, course, setValue]);

    const isformupdate = ()=>{
      const currval = getValues();

      if(
        currval.name !==course.name || currval.description!==course.description || currval.price !==course.price || currval.tag.toString()!==course.tag.toString() || currval.whatwilllearn!==course.whatwilllearn || currval.instructions!==course.instructions || currval.thumbnail!==course.thumbnail || currval.category!==course.category._id
      ){
        return true;
      }

      return false;
    }

    const senddata = async (data)=>{
      if(editcourse){
        if(isformupdate()){
          const formdata = new FormData();
          formdata.append("courseId",course._id);
          if(data.name!==course.name){
            formdata.append("name",data.name);
          }
          if(data.description!==course.description){
            formdata.append("description",data.description);
          }
          if(data.price!==course.price){
            formdata.append("price",data.price);
          }
          if(data.tag.toString()!==course.tag.toString()){
            formdata.append("tag",JSON.stringify(data.tag));
          }
          if(data.whatwilllearn!==course.whatwilllearn){
            formdata.append("whatwilllearn",data.whatwilllearn);
          }
          if(data.category!==course.category){
            formdata.append("category",data.category);
          }
          if(data.instructions.toString()!==course.instructions.toString()){
            formdata.append("instructions",JSON.stringify(data.instructions));
          }

          if(course.thumbnail !==data.thumbnail){
            formdata.append("thumbnail",data.thumbnail)
          }
          setloading(true)
        const res = await editcoursecall(formdata ,token);
        console.log(res);
        setloading(false);
        if(res){
          dispatch(setstep(2));
          dispatch(seteditcourse(true));
          dispatch(setcourse(res))
        }
        else{
          toast.error("upadation failed")
        }

        return ;
        }
      }



      const formdata = new FormData();
       formdata.append("name",data.name);
      formdata.append("description",data.description);
      formdata.append("thumbnail",data.thumbnail)
      formdata.append("instructions",JSON.stringify(data.instructions));
       formdata.append("category",data.category);
       formdata.append("whatwilllearn",data.whatwilllearn);
       formdata.append("tag",JSON.stringify(data.tag));
       formdata.append("price",data.price);
       formdata.append("status","Draft")

       setloading(true);
       const result = await createcourse(formdata,token);
       if(result){
        dispatch(setstep(2));
        dispatch(setcourse(result));
        dispatch(seteditcourse(true));
           
       }
       else{
        toast.error("course creation failed")
       }
       setloading(false);

    }
   
 
  return (
    <form className='text-white bg-gray-800 border-white/20 rounded-lg border p-8' onSubmit={handleSubmit(senddata)}>
    <div className='flex flex-col pb-3'>
       <label htmlFor='name' className='text-lg'>Course Title<sup className='text-pink-600'>*</sup></label>
        <input className='bg-black my-1 rounded-lg p-2 text-white placeholder-gray-300  outline-none focus:bg-slate-700 focus:ring-1 focus:ring-blue-400 transition border-b-1' id='name' placeholder='Enter Course Title'  {...register("name" ,{required:true})}/>
        {
          errors.name &&(<span className='text-pink-600 text-sm'>title required</span>)
        }
    </div>

    <div className='flex flex-col pb-3'>
       <label htmlFor='description' className='text-lg'>Course short Description<sup className='text-pink-600'>*</sup></label>
        <textarea className='bg-black my-1 rounded-lg p-2 text-white placeholder-gray-300  outline-none focus:bg-slate-700 focus:ring-1 focus:ring-blue-400 transition border-b-1' rows={5} id='description' placeholder='Enter Course Description'  {...register("description" ,{required:true})}></textarea>
        {
          errors.description &&(<span className='text-pink-600 text-sm'>description required</span>)
        }
    </div>
       
       
    <div className='flex flex-col relative pb-3'>
       <label htmlFor='price' className='text-lg'> ₹ Course Price<sup className='text-pink-600'>*</sup></label>
        <input id='price' className='bg-black my-1 rounded-lg p-2 text-white placeholder-gray-300  outline-none focus:bg-slate-700 focus:ring-1 focus:ring-blue-400 transition border-b-1' type="number" placeholder='Enter Price'  {...register("price" ,{
          required:true,
          valueAsNumber:true
          })}/>
        {
          errors.price &&(<span className='text-pink-600 text-sm'>price required</span>)
        }

      

    </div>

    <div className='flex flex-col pb-3'>
    <label htmlFor='category' className='text-lg pb-2'>Category <sup  className='text-pink-600'>*</sup></label>
      <select className='bg-black p-2 rounded-lg border-b-1' id='category'{...register("category",{required:true})}>
      <option disabled value="">choose category</option>
        {
          coursecategory?.map((item,idx)=>(
            <option key={item._id} value={item._id}>{item.name}</option>
          ))
        }
      </select>


     { errors.category && (<span className='text-pink-600 text-sm'>category required</span>)}
    </div>

    <div className='flex flex-col pb-3'>
    <label htmlFor='tag' className='text-lg '>Tags<sup className='text-pink-600'>*</sup></label>
       <Taginput id={'tag'}  errors={errors} setValue={setValue} register={register}/>
    </div>

    <div className='flex flex-col pb-3'>
      <label htmlFor='thumbnail' className='text-lg '> Course Thumbnail <sup className='text-pink-600'>*</sup></label>
    <Courseupload errors={errors} setValue={setValue} registername="thumbnail" register={register}/>
{     errors.thumbnail &&<span className='text-pink-600'>thumbnail required</span>}
    </div>
    

    <div className='flex flex-col pb-3'>
      <label htmlFor='whatwilllearn' className='text-lg'> Benefits of the course <sup className='text-pink-600'>*</sup></label>
        <input id='whatwilllearn' className='bg-black my-1 rounded-lg p-2 text-white placeholder-gray-300  outline-none focus:bg-slate-700 focus:ring-1 focus:ring-blue-400 transition border-b-1' type='text' placeholder='Enter Benefits of course' {...register("whatwilllearn",{required:true})}/>

      {  errors.whatwilllearn && <span className='text-pink-600'>field required</span>}
    </div>

    <div className='flex flex-col pb-3'>
      <label htmlFor='instructions' className='text-lg'> Instructions <sup className='text-pink-600'>*</sup></label>
        <Instructioncomponent setValue={setValue} errors={errors} register={register}/>
    </div>
    

    <div className='lg:flex justify-between'>

      {
        editcourse && (
          <button onClick={
            ()=>{dispatch(setstep(2))}
          } type='button' disabled={loading}
          className='p-3 mb-3 bg-yellow-600 text-black font-medium rounded-lg cursor-pointer duration-200 hover:scale-97 focus:scale-95'> continue without changes</button>
        )
      }


      <div >
        <button disabled={loading}
        className='p-3 bg-green-600 text-black font-medium rounded-lg cursor-pointer duration-200 hover:scale-97 focus:scale-95'>{(editcourse)?(
          (loading)?"updating...":"Update"
        ):(
          (loading)?"creating...":"Next >"
        )}</button>
      </div>


    </div>

    </form>
  )
}

export default Addcoursefrom