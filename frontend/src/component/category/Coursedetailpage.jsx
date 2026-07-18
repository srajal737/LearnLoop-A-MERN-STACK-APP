import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getonecoursedetails } from '../../services/apicalling/courseapicalling';
import getAvgRating from './Getavgratig';
import Loader from '../Loader';
import Confirmationmodal from '../common/Confirmationmodal';
import { HiOutlineGlobeAlt } from "react-icons/hi"
import Ratingcomponent from './Ratingcomponent';
import { formatDate } from '../dashboard/instructor/Formatdate';
import { FaShare } from "react-icons/fa";
import toast from 'react-hot-toast';
import { FaVideo } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa";
import { buycourse } from '../../services/apicalling/Payment';
import { addtocart } from '../../slices/cartslice';

const Coursedetailpage = () => {
    const [loading ,setloading] = useState(false);
    const {token} = useSelector((state)=>state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {user} = useSelector((state)=>state.profile)
    const {courseid}= useParams();
  const {cart} = useSelector(state=>state.cart)
    const [coursedata ,setcoursedata] = useState(null);
    const {coursepaymentloading} = useSelector(state=>state.course);
    const [sectionopen , setsectionopen] = useState([]);
    const durationfun = (total)=>{
        
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = total % 60;

  const formatted =
    hours > 0
      ? `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
          .toString()
          .padStart(2, "0")}`
      : `${minutes}:${seconds.toString().padStart(2, "0")}`;

      return formatted;
    }
    useEffect(()=>{
        const fetchcoursedata = async()=>{
            try{
                setloading(true);
                const res = await getonecoursedetails({courseid});
                if(res){
                     setcoursedata(res);
              
                }
               
            }catch(e){
               
            }
            setloading(false);
        }

        fetchcoursedata();
    },[courseid])


    const [totallecture,settotallecture]= useState(0);
    useEffect(()=>{
        let lec = 0;
        coursedata?.coursedetail?.coursecontent?.forEach(sec => {
            lec+=sec?.subsection?.length ||0
        });

        settotallecture(lec);
      
    },[coursedata])

    const [avgrating ,setavgrating]=useState(0);
    useEffect(()=>{
        const rating = getAvgRating(coursedata?.coursedetail?.ratingandreview);
        setavgrating(rating);
    },[coursedata])

      const [modaldata , setmodaldata] = useState(null) // to see login or not for buying

      const handlebuy = ()=>{
        if(token){
           buycourse(token,[courseid],user,navigate,dispatch)
            return ;
        }
        else{
            setmodaldata({
                text1:"You Are Not Login",
                text2:"Login first ,to buy Course",
                btn1:"Login",
                btn2:"Cancel",
                btnhandle1 :()=>{navigate('/login')},
                btnhandle2:()=>{setmodaldata(null)}
            })
        }
      }
      const handleshare = async()=>{
        try{
           await navigator.clipboard.writeText(window.location.href);
           toast.success("copied to clipboard")
        }
        catch(e){
            toast.error("Could not copy")
        }
      }

      const handlesectionopen = (i)=>{
      const newarr =   sectionopen.includes(i) ?sectionopen.filter((item)=>item!==i):[...sectionopen,i];
      setsectionopen(newarr);
      }

      const handleaddtocart = ()=>{
        if(token){
           const idx = cart.findIndex((item)=>item._id===coursedata?.coursedetail?._id);
          if(idx>=0){
             navigate('/dashboard/cart')
             return;
          }
          dispatch(addtocart(coursedata?.coursedetail));
          return ;
        }
         else{
            setmodaldata({
                text1:"You Are Not Login",
                text2:"Login first ,to Add Course",
                btn1:"Login",
                btn2:"Cancel",
                btnhandle1 :()=>{navigate('/login')},
                btnhandle2:()=>{setmodaldata(null)}
            })
        }

      }
      if(coursepaymentloading){
        return <div className='min-h-screen py-18 w-screen bg-slate-600'>
        <Loader/>
        </div>
      }
     
  return (
    <div className='bg-black min-h-screen'>
    {
        loading?<Loader/>:
        <div>
        <div className='min-h-[400px] bg-slate-800/90 '>
 <div className=' py-18 w-10/12 mx-auto max-w-[1240px] relative'> 
 {
  !(user?.accountType ==='Instructor' || user?.accountType ==='Admin')  && ( <div className='rounded-lg  text-white shadow-md shadow-gray-700 bg-gray-700 w-80 hover:scale-104 duration-200 lg:absolute lg:right-0 lg:-bottom-40  mx-auto'>
        <div className=" overflow-hidden ">
          <img
            src={coursedata?.coursedetail?.thumbnail}
            alt={coursedata?.coursedetail?.name}
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-103 object-center"
          />
        </div>

        <div className='p-5'>
            <p className='text-2xl font-medium py-3 '>Rs. {coursedata?.coursedetail?.price}</p>
            {
              coursedata?.coursedetail?.studentsEnrolled.includes(user?._id)?(
                <div className='flex flex-col gap-7'>
                     <button className='bg-green-600 rounded-md py-3 cursor-pointer hover:scale-97 border border-gray-400 hover:text-white text-black font-medium text-md' onClick={()=>navigate('/dashboard/enrolledcourse')}>Go to Course</button>
                 <button onClick={handleshare} className='text-yellow-500 hover:underline hover:scale-104 cursor-pointer duration:400 mx-auto '><FaShare className='inline '/>Share</button>
                </div>
             
              ):( <div className='flex flex-col gap-7'>
            <button className='bg-green-600 rounded-md py-3 cursor-pointer hover:scale-97 border border-gray-400 hover:text-white text-black font-medium text-md' onClick={handlebuy}>Buy Now</button>
            <button className='bg-gray-600 rounded-md py-3 cursor-pointer hover:scale-97 border border-gray-400 hover:text-yellow-500 text-white font-medium text-md' onClick={handleaddtocart}>{
               (user && cart.findIndex((item)=>item._id===coursedata?.coursedetail?._id)>=0)?"Go To Cart" : "Add to Cart" 
            }</button>

            <button onClick={handleshare} className='text-yellow-500 hover:underline hover:scale-104 cursor-pointer duration:400 mx-auto '><FaShare className='inline '/>Share</button>
            </div>
            )
            }
           
        </div>
      </div>)
 }
 
     <div className='text-white  lg:w-[65%]  break-words'>
          <p className='text-md text-gray-400 mt-9 pb-5 font-medium'>Home/Learning/<span className='text-blue-500'>{`${coursedata?.coursedetail?.category?.name}`}</span></p>

         <p className='text-4xl font-bold text-white pb-7'>{`${coursedata?.coursedetail?.name}`}</p>
         <p className='text-lg text-gray-300'>{`${coursedata?.coursedetail?.description}`}</p>

         <div className='lg:flex py-3 items-center gap-3 text-gray-300 font-bold' ><span className='text-yellow-500 '>{avgrating} </span><Ratingcomponent className='lg:inline' rating={avgrating} /><span>{`(${coursedata?.coursedetail?.ratingandreview?.length} reviews)`}</span> <span>{`${coursedata?.coursedetail?.totalstudent} Enrolled Students`}</span></div>

         <div className='text-gray-300 font-medium'>{`Created By | ${coursedata?.coursedetail?.instructor?.firstname} ${coursedata?.coursedetail?.instructor.lastname}`}</div>

         <div className=''>
             <p className='text-md font-medium text-gray-300 py-2 '>Created : {formatDate(coursedata?.coursedetail?.createdAt) }
             <br/>
             <span className=''><HiOutlineGlobeAlt className='inline' />Language: English + Hindi</span></p>
         </div>

        
      </div>

    
    </div>
    </div>

    <div className='mt-10  py-8 w-10/12 mx-auto max-w-[1240px]  '>

      <div className='text-white lg:w-[65%]'> 
         <div className='border text-white border-gray-400 p-5 rounded-md'>
           <p>{coursedata?.coursedetail?.whatwilllearn}</p>
         </div>
        
        <div>
            <p className='text-3xl font-medium mt-4 py-4'>Course Content</p>
            <div className='lg:flex justify-between'>
                 <p className='py-2'>{`${coursedata?.coursedetail?.coursecontent?.length || 0} section(s) •  ${totallecture} Lecture(s) • ${durationfun(coursedata?.totalduration)} Total Duration`}</p>

                 <p className=' bg-clip-text bg-gradient-to-b from-orange-600 font-medium text-lg cursor-pointer hover:underline to-yellow-400 text-transparent' onClick={()=>setsectionopen([])}>Close all Sections</p>
            </div>
           <div>
           {
            coursedata?.coursedetail?.coursecontent && coursedata?.coursedetail?.coursecontent.map((sec,idx)=>(
                <div key={sec._id} className='border rounded-md overflow-hidden'>
                    <p className='flex justify-between items-center py-2 px-1  bg-gray-400/70' onClick={()=>handlesectionopen(idx)}><span><FaAngleDown className='inline mr-2' /><span>{sec?.name}</span></span> <span>{sec?.subsection.length || 0} Lecture(s) </span></p>
               {     sec?.subsection &&  sec?.subsection.map((subsec)=>(<div key={subsec._id}  className={`text-white overflow-hidden transition-all duration-300 ${
      sectionopen.includes(idx)
        ? "max-h-20 opacity-100"
        : "max-h-0 opacity-0"
    }`}>
                <p className='flex justify-between px-3 bg-gray-800 py-2.5'><span><FaVideo className='inline mx-2'/>{subsec?.title}</span><span>{subsec?.duration}</span></p>
               </div>))}
                </div>
            ))
           }
           </div>
        </div>


        <div>
            <p className='text-2xl font-medium my-8'>Author</p>
            <div>
            <div className='flex gap-5 items-center'> 
            <img src={coursedata?.coursedetail?.instructor?.image} alt='imageAuthor' className='w-20 h-20 rounded-full object-center'/>
             <p className='text-lg text-gray-300'>{coursedata?.coursedetail?.instructor?.firstname} {coursedata?.coursedetail?.instructor?.lastname}</p></div>
            <p>{coursedata?.coursedetail?.instructor?.additionalDetails?.about}</p>
            </div>
        </div>
      </div>
       
    </div>
</div>
    
   
    }
    
    {
        modaldata && <Confirmationmodal data={modaldata} setdata = {setmodaldata}/>
     }
    </div>
    
  )
}

export default Coursedetailpage