import React, { useState } from 'react'
import {sidebarLinks} from '../../data/dashboard-links';
import {logout} from '../../services/apicalling/authapicalling'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { VscSignOut } from "react-icons/vsc";
import Sidebaritem from './Sidebaritem';
import Confirmationmodal from '../common/Confirmationmodal';
const Sidebar = () => {
    const {user} = useSelector(state=>state.profile);
    const location = useLocation();
    const navigate=useNavigate();
    const dispatch =useDispatch();
    const [logoutmodaldata ,setlogoutmodaldata] =useState(null);
    
  return (
    <div className='bg-black hidden lg:block min-h-screen min-w-[210px] flex flex-col gap-2 p-3 py-7  pt-20'>
        {
            sidebarLinks.map((item)=>{
                if(item.type && item.type!==user?.accountType){
                    return null;
                }
              return  <Sidebaritem key={item.id} item={item}/>
        })
        }

        <hr className='border-gray-600 my-5'></hr>

       <Sidebaritem item={{name:"Setting" ,path:"/dashboard/setting" ,icon:"VscSettingsGear"}}/>

        <button onClick={()=>setlogoutmodaldata({
          text1:"Are You Sure?",
          text2:"You will be logged out of your account",
          btn1:"Logout",
          btn2:"Cancel",
          btnhandle1:()=>{dispatch(logout(navigate)) ; setlogoutmodaldata(null)},
          btnhandle2:()=>{setlogoutmodaldata(null)}
        })} className="flex flex-row items-center gap-2 px-3 py-1 text-gray-100 cursor-pointer">
              <VscSignOut className="text-lg" />
              <span>Logout</span>
        </button>

        {
          logoutmodaldata && <Confirmationmodal data={logoutmodaldata} setdata={setlogoutmodaldata}/>
        }
    </div>
  )
}

export default Sidebar