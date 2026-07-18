import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import * as Icons from "react-icons/vsc"
const Sidebaritem = ({item}) => {
       const location = useLocation();
    const navigate=useNavigate();
    const routematch = (route)=>{
        return (route===location.pathname)
    }
    const Icon = Icons[item.icon];
  return (
    <Link to={item?.path}>
         <div className={`${routematch(item.path)?"font-bold text-blue-500 border-l-5 bg-gray-800/70 p-6 rounded-lg  border-l-blue-600":" text-gray-100"} flex flex-row items-center gap-2 px-3 py-1 `}>
       <Icon/>
       {item.name}
    </div>
    </Link>
   
  )
}

export default Sidebaritem