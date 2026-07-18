import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Loader';
import getAvgRating from '../category/Getavgratig';
import Ratingcomponent from '../category/Ratingcomponent';
import { RiDeleteBin6Line } from "react-icons/ri"
import { useNavigate } from 'react-router-dom';
import { removefromcart } from '../../slices/cartslice';
import { buycourse } from '../../services/apicalling/Payment';
const Cart = () => {
  const {totalitems ,totalprice,cart} = useSelector(state=>state.cart);
  const {coursepaymentloading} = useSelector(state=>state.course);
  const dispatch = useDispatch();
  const {token}= useSelector(state=>state.auth)
  const {user}= useSelector(state=>state.profile)
  const navigate = useNavigate();
  const handlebuy =()=>{
    const courses = cart.map((course)=>course._id)
    buycourse(token,courses,user,navigate,dispatch)
  }
  if(coursepaymentloading){
    return <Loader/>
  }


  return (
    <div className='text-white pb-5'>
      <p className='text-4xl font-medium my-8'>My Cart</p>
      <p className='text-xl font-bold text-gray-400 pb-2 border-b-1 border-b-gray-700'>{totalitems} Courses in Cart</p>

      {
        totalitems>0 ?<div className='lg:flex items-start gap-12 justify-between pt-5'>
          {/* two things */}
          <div className='lg:w-[80%] w-full' >
               {
            cart.map((course,idx)=>(
              <div key={course._id} className=' lg:flex border-b-1 border-b-gray-700 p-3 justify-between'>
              <div className='w-full lg:flex gap-4'>
                <div className='overflow-hidden flex-shrink-0 '>
                <img alt='img' className="h-[148px] lg:w-[220px] rounded-lg object-cover" src={course?.thumbnail}/>
               </div>
               <div className=''>
                <p onClick={()=>navigate(`/courses/${course._id}`)} className='hover:underline cursor-pointer break-words text-xl font-medium'>{course?.name}</p>
                <p className='break-words text-gray-300 py-1'>{course?.category?.name}</p>
                <div className='flex items-center gap-1'>{(getAvgRating(course?.ratingandreview))} {<Ratingcomponent rating={(getAvgRating(course?.ratingandreview))}/>}</div>
               </div>
              </div>
               
               <div className='lg:block flex justify-between py-3'>
                <button className='text-red-500 flex items-center gap-1 text-md bg-slate-600/70 border border-gray-600 rounded-md px-3 py-2 cursor-pointer mb-4' onClick={()=>dispatch(removefromcart(course._id))}>
                   <RiDeleteBin6Line /> <span>Remove</span>
                </button>

                <p className='text-green-500 text-xl font-medium'>Rs. {course?.price}</p>
               </div>
              </div>
            ))
          }
          </div>
        <div className='p-7 text-lg bg-gray-700/60 border-2 border-gray-700 rounded-md lg:w-[30%]'>
         Total Amount :
         <p className='text-yellow-500 text-2xl font-bold py-4'>Rs. {totalprice}</p>
         <button onClick={handlebuy} className='text-black bg-green-500 px-4 py-2 hover:scale-97 duration-200 cursor-pointer rounded-md hover:bg-green-600 w-full font-medium'>
            Buy Now
         </button>
        </div>
        </div> :<div className='text-center text-lg text-gray-400 font-medium py-4'>Cart is empty</div>
      }
    </div>
  )
}

export default Cart