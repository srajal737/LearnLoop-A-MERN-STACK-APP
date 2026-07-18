import React, { useEffect, useState } from 'react'
import learnloop from '../../assets/Images/learnloop_nav.png'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { NavbarLinks } from '../../data/navbar-links'
import { useDispatch, useSelector } from 'react-redux'
import { FaCartArrowDown } from "react-icons/fa";
import Profiledropdown from '../core/Profiledropdown'
import {showcategoryurl} from '../../services/api'
import apiconnector from '../../services/apiconnector'
import { IoIosArrowDown } from "react-icons/io";
import { FaTimes ,FaBars} from "react-icons/fa";
import { sidebarLinks } from '../../data/dashboard-links'
import Loader from '../Loader'
import Sidebaritem from '../dashboard/Sidebaritem'
import { VscSignOut } from "react-icons/vsc";
import Confirmationmodal from './Confirmationmodal'
import { logout } from '../../services/apicalling/authapicalling'
const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => (state.auth));
  const { user } = useSelector((state) => state.profile);
  const { totalitems } = useSelector((state) => state.cart);
  const [loading ,setloading] = useState(false);
  const [showcategory ,setcategory] =useState([]);
   const fetchcategory = async () => {
    try {
      setloading(true);
      const response = await apiconnector("GET", showcategoryurl);
      const result = response.data.data;
      setcategory(result);          
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
    setloading(false);
  };

  const [menuopen , setmenuopen]  = useState(false);

  const [scrolled, setScrolled] = useState(false);

useEffect(() => {
  const handleScroll = () => {
    if (window.scrollY > 60) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };
  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);

  useEffect(() => {
    fetchcategory()
  }, []);

   const [catalogopen , setcatalogopen] = useState(false);//mobile
    const [menuup , setmenuup] = useState(false);//for dashboard menu
    const [logoutmodaldata ,setlogoutmodaldata] =useState(null);//mobile sidebar
    
    return (
    // if not do w-screen then glitch occurs in navbar as w is not fixed and just shift if anything changes so fixed w lost my 3hr in this

    // left-1/2 -translate-x-1/2 origin centre
    <>

    {/*for dashborad menu put outside navbar so overlay and full screen come */}


    {/**for mobile sidbar menuup */}
    {
      menuup &&(
        <div onClick={()=>setmenuup(false)} className='fixed inset-0 bg-black/50 backdrop-blur-sm z-[80] lg:hidden'>
        </div>
      )
    }
    {
      menuup && (
        <div className={`fixed bottom-0 left-0 w-full bg-black text-white rounded-t-3xl py-6 px-2 z-[90] lg:hidden transform transition-transform duration-200 ease-in-out ${menuup?"translate-y-0":"-translate-y-full"}`}>
         
          <div className="w-16 h-1 bg-gray-500 rounded-full mx-auto mb-5"></div>
          
     
          <div className='flex justify-center'>
             <img src={user?.image}
            alt={user?.firstname}
            className='rounded-full w-[80px] h-[80px] '
        />
          </div>

          <p className='text-2xl my-3 text-center'>{user?.firstname} {user?.lastname}</p>

           {
            sidebarLinks.map((item)=>{
                if(item.type && item.type!==user?.accountType){
                    return null
                }
              return <div key={item.id}  onClick={()=>setmenuup(false)}>
                 <Sidebaritem item={item}/>
              </div>
        })
        }

        <hr className='border-gray-600 my-5'></hr>
        <div onClick={()=>setmenuup(false)}>
             <Sidebaritem  item={{name:"Setting" ,path:"/dashboard/setting" ,icon:"VscSettingsGear"}}/>
        </div>
      

        <button onClick={()=>{
          setlogoutmodaldata({
          text1:"Are You Sure?",
          text2:"You will be logged out of your account",
          btn1:"Logout",
          btn2:"Cancel",
          btnhandle1:()=>{dispatch(logout(navigate)),setlogoutmodaldata(null) ; setmenuup(false)},
          btnhandle2:()=>{setlogoutmodaldata(null)}
        })
         setmenuup(false);
        }} className="flex flex-row items-center gap-2 px-3 py-1 text-gray-100 cursor-pointer">
              <VscSignOut className="text-lg" />
              <span>Logout</span>
        </button>

        </div>
      )
    }
    {
          logoutmodaldata && <Confirmationmodal data={logoutmodaldata} setdata={setlogoutmodaldata}/>
        
    }
        <div
  className={`fixed py-1 top-0 left-1/2 -translate-x-1/2 z-50 border-b border-gray-500 transitizon-all duration-500
    ${scrolled
      ? "bg-black/40 backdrop-blur-md shadow-lg w-[85%] rounded-2xl mt-2 "
      : "bg-black w-screen"
    }`}
>
      <div className='w-11/12 gap-2 py-1 flex items-center justify-between mx-auto'>
        {/* logo */}
       <div className='flex items-center justify-between gap-4'>
       <button className='lg:hidden text-white text-2xl' onClick={()=>setmenuopen(!menuopen)}>
         {menuopen ?<FaTimes/>:<FaBars/>}
       </button>

       <Link to={'/'}>
        <img loading='lazy' src={learnloop} alt='learnloop' className='object-cover w-[210px] lg:w-[250px]'/>
       </Link>
       </div>
        <div className=' hidden lg:flex text-white items-center gap-4'>

          {
            NavbarLinks.map((ele, ind) =>
              <div key={ind}>
                {ele.title === "Catalog" ? (
                  <div className={`group relative cursor-pointer ${(location.pathname.split("/")[1]==="category")?"text-blue-500":""}`}>
                    Catalog <IoIosArrowDown className='inline' />
                    
                      <div className='invisible opacity-0 absolute z-10 group-hover:visible group-hover:opacity-100 w-[280px] flex flex-col text-black text-sm font-bold bg-gray-100 p-3 text-lg rounded-2xl top-8 right-[50%] translate-x-[50%] transition-all duration-500'>
                    <div className='w-5 h-5 bg-gray-100 absolute rotate-45 -top-2 right-[37%]'></div>
                      {  loading?<div>loading...</div>:
                       showcategory.length >0 && showcategory.map((obj,indx)=>(
                          <Link key={indx} className='hover:bg-gray-300 py-4 rounded-2xl px-3' to={`/category/${obj.name.split(/[\/\s]+/).join("-").toLowerCase()}`}>{obj.name}</Link>
                        ))
                      }
                    </div>
                    
                    
                  </div>
                ) : (
                  <Link
                    to={ele?.path}
                    className={`px-4 py-2 rounded-3xl text-center text-md transition-all duration-300 cursor-pointer
          ${location.pathname === ele.path ? "bg-blue-500 text-white" : "hover:bg-gray-500"}
        `}
                  >
                    {ele.title}
                  </Link>
                )}
              </div>

            )
          }

        </div>

        {/* login/signup/dashboard */}
        <div className='flex items-center gap-3 lg:gap-8'>
          {
            (user && user?.accountType !== "Instructor") && (
              <Link to={"/dashboard/cart"}>
                <div>
                  <FaCartArrowDown fill='white' className='scale-130'/>
                </div>
              </Link>
            )
          }

          {
            (token === null) && (
              <Link to={"/login"}>
                <button className="text-md hidden lg:block px-4 py-2 bg-gray-600 text-white rounded-lg border-white cursor-pointer hover:bg-blue-900 hover:text-white transition-all duration-200 active:scale-95">Login</button>
              </Link>

            )
          }

          {
            (token === null) && (
              <Link to={"/signup"}>
                <button className='text-md hidden lg:block px-4 px-4 py-2 bg-gray-600 text-white rounded-lg border-white cursor-pointer hover:bg-blue-900 hover:text-white transition-all duration-200 active:scale-95'>Signup</button>
              </Link>
            )
          }

          {
            
            (token !== null) && <Profiledropdown setmenuup={setmenuup}/>
          }
        </div>

      </div>

    </div>

    {/* mobile */}
      {/* overlay */}
    {

      menuopen && ( 
        <div onClick={()=>setmenuopen(false)} className='fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden'>
        </div>
      )
    }

    <div className={`fixed rounded-r-xl top-0 left-0 h-screen w-72 bg-black text-white z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${menuopen? "translate-x-0" :"-translate-x-full"}`}>
    <div className='py-5'>
    <button onClick={()=>setmenuopen(false)} className='mb-6 text-3xl'> <FaTimes/> </button>

  <div className='flex justify-around mb-4'>
    {
            (token === null) && (
              <Link to={"/login"}>
                <button onClick={()=>setmenuopen(false)} className="text-md  px-4 py-2  text-white rounded-lg border border-gray-600 cursor-pointer bg-blue-800 ">Login</button>
              </Link>

            )
          }

          {
            (token === null) && (
              <Link to={"/signup"}>
                <button onClick={()=>setmenuopen(false)} className='text-md   px-4 py-2  text-white rounded-lg border border-gray-600 cursor-pointer bg-blue-800 '>Signup</button>
              </Link>
            )
          }

  </div>

    <div className='flex flex-col gap-4'>
     {
  NavbarLinks.map((ele,index)=>(
    <div key={index}>

      {ele.title === "Catalog" ? (
        <div>
          <button
            onClick={() => setcatalogopen(!catalogopen)}
            className={`w-full flex justify-between items-center py-3 px-3 rounded-lg bg-gray-900/80
            ${
              location.pathname.split("/")[1] === "category"
                ? "text-blue-500"
                : ""
            }`}
          >
            <span>Catalog</span>
            <IoIosArrowDown
              className={`transition-transform duration-300 ${
                catalogopen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Category dropdown */}
          <div
            className={`overflow-hidden transition-all duration-300 ${
              catalogopen ? "max-h-96 mt-2" : "max-h-0"
            }`}
          >
            {
              loading ? (
                <p className="px-5 py-2 text-gray-400">
                  Loading...
                </p>
              ) : (
                showcategory.map((obj, indx) => (
                  <Link
                    key={indx}
                    to={`/category/${obj.name
                      .split(/[\/\s]+/)
                      .join("-")
                      .toLowerCase()}`}
                    onClick={() => {
                      setcatalogopen(false);
                      setmenuopen(false);
                    }}
                    className="block py-2 pl-8 rounded-lg my-2 mx-2 bg-gray-800 hover:text-blue-400"
                  >
                    {obj.name}
                  </Link>
                ))
              )
            }
          </div>
        </div>

      ) : (

        <Link
          to={ele.path}
          onClick={() => setmenuopen(false)}
          className={`block py-3 pl-3 rounded-lg bg-gray-900/80 transition
          ${
            location.pathname === ele.path
              ? "text-blue-500"
              : "hover:text-blue-400"
          }`}
        >
          {ele.title}
        </Link>

      )}

    </div>
  ))
}
 
    </div>
 
    </div>
    </div>
    </>
  
  )
}

export default Navbar
