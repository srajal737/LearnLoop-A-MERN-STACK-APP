import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form';
import { FaStar } from 'react-icons/fa';
import { MdCancel } from "react-icons/md";
import { useSelector } from 'react-redux';
import { createreview } from '../../services/apicalling/courseapicalling'
const Reviewmodal = ({ data, setdata }) => {
    const { user } = useSelector(state => state.profile);
    const { token } = useSelector(state => state.auth);
    const { courseEntireData, } = useSelector(state => state.viewcourse);

    const { register, handleSubmit, getValues, setValue, formState: { errors } } = useForm();

    useEffect(() => {
        setValue("rating", 0);
        setValue("review", "");

    }, [])
    const [hover, sethover] = useState(0);
    const [rating, setrating] = useState(0);
    const [loading ,setloading] =useState(false);
    const ref = useRef();
    useEffect(()=>{
        const handleoutsideclick= (e)=>{
            if(ref.current && !ref.current.contains(e.target)){
                setdata(false);
            }
        }

        document.addEventListener("mousedown",handleoutsideclick)

     return  () => {
        document.removeEventListener("mousedown", handleoutsideclick);
    };
    },[])
    const submitreview = async (data) => {
        setloading(true);
        await createreview({
            rating:data.rating,
            courseid:courseEntireData._id,
            review:data.review
        },token)
        setloading(false);
        setdata(false);
    }

    return (
        <div className='fixed inset-0 backdrop-blur-sm flex z-50 justify-center p-10'>
            <div ref={ref}  onMouseDown={(e) => e.stopPropagation()} className='bg-slate-900/97 pb-5 w-full lg:w-[35%] rounded-md h-fit'>
                <div className='text-md font-bold bg-gray-700/90 py-3 px-2 flex justify-between'><span>Add Review</span><button className='cursor-pointer text-xl'><MdCancel onClick={() => setdata(false)} /></button></div>

                
                    <div className='flex justify-center my-4 gap-4 items-center p-3'>
                        <div className='w-17 h-17 rounded-full overflow-hidden'>
                            <img src={user?.image} alt='user' className='object-cover ' />
                        </div>
                        <div>
                            {user?.firstname} {user?.lastname}
                            <p>Posting Publicly</p>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit(submitreview)} >
                        <p className='text-sm text-center text-red-600'>{
                            getValues("rating") <= 0 && <span>please select atleast one star</span>
                        }</p>
                        <div className='flex justify-center py-2 pb-4'>
                            {
                                [1, 2, 3, 4, 5].map((val, idx) => (
                                    <FaStar key={val} onClick={() => {
                                        setrating(val);
                                        setValue("rating", val);
                                    }}
                                        onMouseEnter={() => sethover(val)}
                                        onMouseLeave={() => sethover(0)} className={`cursor-pointer text-2xl transition-colors ${val <= (hover || rating)
                                            ? "text-yellow-400"
                                            : "text-gray-300"
                                            }`} />
                                ))
                            }
                        </div>

                        <div className='flex p-3 flex-col gap-2'>
                            <label htmlFor='review'>Add Your Review <span className='text-pink-600'>*</span></label>
                            <textarea id='review' className='bg-gray-700/60 my-1 rounded-lg p-2 text-white placeholder-gray-300  outline-none focus:bg-slate-700 focus:ring-1 focus:ring-blue-400 transition border-b-1' type='text' placeholder='Add Your Experience' rows={6} {...register("review", { required: true })}></textarea>

                            {errors.review && <span>Please Add Review</span>}
                        </div>

                        <div className='flex justify-end gap-3 mx-4'>
                            <button type='button' className='text-black font-medium px-3 py-2 bg-gray-400 rounded-lg hover:bg-gray-600 cursor-pointer' disabled={loading}  onClick={()=>setdata(false)}> Cancel</button>
                            <button className='text-black font-medium px-3 py-2 bg-yellow-400 hover:bg-yellow-600 rounded-lg cursor-pointer'  disabled={loading} type='submit'>{
                                loading?'saving':'save'
                            }</button>
                        </div>
                    </form>
                </div>

        


        </div>
    )
}

export default Reviewmodal