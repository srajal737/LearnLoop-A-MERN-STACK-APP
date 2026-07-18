import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getcoursedetailsedit } from '../../../services/apicalling/courseapicalling';
import { setcourse, seteditcourse } from '../../../slices/courseslice';
import Loader from '../../Loader';
import Addcourse from './Addcourse';
import toast from 'react-hot-toast';
const Editcourse = () => {
    const [loading,setloading] = useState(false);
    const {token} = useSelector((state)=>state.auth);
    const {course} = useSelector((state)=>state.course);
    const dispatch = useDispatch();
    const {courseid} = useParams();
    const navigate = useNavigate();
    useEffect(()=>{
        const getcourse = async()=>{
            setloading(true);
            const res = await getcoursedetailsedit({courseid},token);
            if(!res){
                toast.error("Invalid Course access!!"); 
                navigate('/dashboard/my-courses')
                return 
            }
            if(res){
                dispatch(seteditcourse(true));
                dispatch(setcourse(res));
            }
            setloading(false);
        }

        getcourse();
    },[])
  return (
    <div>
     {
        loading?<Loader/>:(
            course?<Addcourse/>:<p>Can't Fetch OR Course Not Found</p>
        )
     }
    </div>
  )
}

export default Editcourse