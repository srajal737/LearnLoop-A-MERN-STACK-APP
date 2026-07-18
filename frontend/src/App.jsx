import React, { useEffect } from 'react'
import Home from './pages/Home'
import {Routes,Route, Link, Navigate, useNavigate} from 'react-router-dom'
import Navbar from './component/common/Navbar'
import Openroute from './component/auth/Openroute'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Forgotpass from './pages/forgotpass'
import Updatepass from './pages/Updatepass'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from './services/apicalling/authapicalling'
import VerifyEmail from './pages/VerifyEmail'
import About from './pages/About'
import Contact from './pages/Contact'
import Privateroute from './component/auth/Privateroute'
import Dashboard from './pages/Dashboard'
import Myprofile from './component/dashboard/Myprofile'
import Setting from './component/dashboard/Setting'
import Cart from './component/dashboard/Cart'
import Enrolledcoures from './component/dashboard/Enrolledcoures'
import { isexptoken } from './services/apicalling/authapicalling'
import Addcourse from './component/dashboard/instructor/Addcourse'
import Mycourse from './component/dashboard/instructor/Mycourse'
import Instructordashboard from './component/dashboard/instructor/Instructordashboard'
import Editcourse from './component/dashboard/instructor/Editcourse'
import Category from './pages/Category'
import Coursedetailpage from './component/category/Coursedetailpage'
import ViewCourse from './pages/ViewCourse'
import VideoDetails from './component/courseviewcomponent/VideoDetails'
import Error from './pages/Error'
const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user}=useSelector(state=>state.profile);
  const {token}=useSelector(state=>state.auth)
  //see if token expired just logout 
  //This won’t catch expiry while user is already inside the app
//👉 only works on refresh / first load

useEffect(()=>{

  if(token){
     dispatch(isexptoken(token,navigate));
  }
},[]);
  return (
    <div className='overflow-x-hidden'>
   <Navbar/>
    
    <Routes>

      <Route path="/" element={<Home/>}/>

      <Route path='/login' element={<Openroute><Login/></Openroute>}/>
      <Route path='/category/:categoryname' element={<Category/>}/>
      <Route path='/courses/:courseid' element={<Coursedetailpage/>}/>
      <Route path='/signup' element={<Openroute><Signup/></Openroute>}/>

      <Route path='/about' element ={<About/>}/>

      <Route path='/contact' element={<Contact/>}/>

      <Route path='/forgot-password' element={<Openroute><Forgotpass/></Openroute>}/>

      <Route path='/update-password/:id' element={<Openroute><Updatepass/></Openroute>}/>

      <Route path='/verify-email' element={<Openroute><VerifyEmail/></Openroute>}/>

      <Route path='/dashboard' element={<Privateroute>
        <Dashboard/>
      </Privateroute>}>
        <Route path='/dashboard/my-profile' element={<Myprofile/>}/>
        <Route path='/dashboard/setting' element={<Setting/>}/>

        {
          (user?.accountType === 'Student') &&(
            <>
              <Route path='/dashboard/cart' element={<Cart/>}/>
              <Route path='/dashboard/enrolledcourse' element={<Enrolledcoures/>}/>

            </>
          )
        }
        {
          (user?.accountType === 'Instructor') && (
            <>
                <Route path='/dashboard/add-course' element={<Addcourse/>}/>
            <Route path='/dashboard/my-courses' element={<Mycourse/>}/>
              <Route path='/dashboard/instructor' element={<Instructordashboard/>}/>
              <Route path='/dashboard/edit-course/:courseid' element={<Editcourse/>}/>
          
            </>
          )
        }
      </Route>

      {
        <Route  path="view-course/:courseid" element={<Privateroute><ViewCourse/></Privateroute>}>
            {
              user?.accountType === 'Student' && (
                <Route path='section/:sectionid/sub-section/:subsectionid' element={<VideoDetails/>}/>
              )
            }
        </Route>
      }
          <Route path="*" element={<Error />} />
    </Routes>

    </div>
  )
}

export default App

/*
another way--for token exp handle.

import jwt_decode from "jwt-decode";

useEffect(() => {
  if (!token) return;

  const decoded = jwt_decode(token);
  const delay = decoded.exp * 1000 - Date.now(); // milliseconds until expiry

  if (delay <= 0) {
    dispatch(logout(navigate));
  } else {
    const timer = setTimeout(() => {
      dispatch(logout(navigate));
    }, delay);

    return () => clearTimeout(timer);
  }
}, [token]);
*/