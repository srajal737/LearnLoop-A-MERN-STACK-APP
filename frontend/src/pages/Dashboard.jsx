import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Loader from '../component/Loader';
import Sidebar from '../component/dashboard/Sidebar';
import { Outlet } from 'react-router-dom';

const Dashboard = () => {
    const {loading:profileloading} = useSelector(state=>state.profile);//here we are doing loading naming 
    const {loading:authloading} = useSelector(state=>state.auth);
    if(profileloading || authloading){
        return(<div className='grid min-h-[calc(100vh-3.5rem)] place-items-center'>
            <Loader/>
        </div>) 
    }
  return (
    <div className='flex '>
       <Sidebar/>
       <div className='min-h-screen bg-slate-950 w-full  pt-20 '>
       <div className='mx-auto w-10/12'>
         <Outlet/>
       </div>
       
       </div>
    </div>
  )
}

export default Dashboard