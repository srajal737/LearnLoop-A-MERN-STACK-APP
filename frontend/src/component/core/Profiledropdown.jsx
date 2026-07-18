import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FaSortDown } from "react-icons/fa";
import { VscDashboard, VscSignOut } from "react-icons/vsc"
import {logout} from '../../services/apicalling/authapicalling'
const Profiledropdown = ({setmenuup}) => {
    const [open , setopen]=useState(false);
    const ref = useRef(null);
    const navigate = useNavigate();
    const {user} = useSelector((state)=>state.profile);
    const dispatch =useDispatch();
 
    useEffect(()=>{
        function handleclickoutside(e){
            if(ref.current && !ref.current.contains(e.target)){
                setopen(false);
            }
        }
        document.addEventListener("mousedown",handleclickoutside);
       return () => {
      document.removeEventListener("mousedown", handleclickoutside)
    }
    },[]);
    if(!user){
        return ;
    }
  return (
    <div className='relative' onClick={()=>setopen(!open)}>
       <div className='flex cursor-pointer ' onClick={()=>setmenuup(true)} >
        <img src={user?.image}
            alt={user?.firstname}
            className='rounded-full w-[30px] h-[30px] '
        />
        <FaSortDown fill='white'/>
       </div>  
       {
        open &&(
          
 <div ref={ref} onClick={(e) => e.stopPropagation()} className='lg:flex hidden absolute top-[120%] right-0 z-30 bg-gray-800 text-gray-400 p-2  flex-col gap-2 rounded-lg'  >

                   <Link to='/dashboard/my-profile' onClick={() => setopen(false)}>
                    <div className='flex w-full items-center p-1 rounded-lg gap-1 hover:bg-gray-600 hover:text-white'>
                     <VscDashboard/>
                       dashboard
                    </div>
                    </Link>

                <Link to='/' onClick={()=>{
                     dispatch(logout(navigate))
                     setopen(false)
                }}>
             <div className='flex w-full items-center gap-1 p-1 hover:bg-gray-600 hover:text-white rounded-lg'>
                  <VscSignOut/>
                    Logout 
             </div>
                </Link>
            </div>
        )
       }  


     
    </div>
  )
}

export default Profiledropdown