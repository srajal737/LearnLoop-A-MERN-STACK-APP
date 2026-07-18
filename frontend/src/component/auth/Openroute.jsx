import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from "react-router-dom"

const Openroute = ({children}) => {//so that if someone write in url like /signup now to handle this if token present then it will redirect to dashboard and if not token then signup route.
  const {token} = useSelector((state)=>state.auth);

  if(token===null){
    return children;
  }else{
    return <Navigate to='/dashboard/my-profile' />
  }

}

export default Openroute