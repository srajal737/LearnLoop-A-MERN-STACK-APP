import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { RiEditBoxLine } from "react-icons/ri"
import { formattedDate } from '../../utils/Dateformate';
import {toast} from 'react-hot-toast';
import {setloading ,setuser} from '../../slices/profileslice'
import Loader from '../Loader';

const Myprofile = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate();
  const {token} = useSelector(state=>state.auth);
  const dispatch=useDispatch();
  const [loading ,setloading] = useState();
  async function fetchingdata(token,navigate){
    setloading(true);
      if (!token) return;
    try {
      const res = await fetch(
        `${BASE_URL}/profile/getalluserdetails`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      dispatch(setuser(data.data))
    
    } catch (e) {
      toast.error(`Unable to fetch profile details: ${e.message}`);
      console.error("FETCH USER ERROR:", e);
    }
    setloading(false);
  }
  useEffect(() => {
    if (token) {
      fetchingdata(token,navigate);
    }
  }, []);
  return (
    <div>
    {
      loading?<Loader/>:(
        <div className='text-white py-20'>
        <p className='text-3xl pb-10'>My Profile</p>
        <div className='flex gap-10 flex-col'>

          <div className='bg-zinc-800/60 flex-col lg:flex-row gap-3 flex lg:justify-between p-6 rounded-2xl'>
            <div className='flex gap-4 items-center'>
              <img src={user?.image}
                alt={user?.firstname} className='w-[75px] h-[75px] rounded-full' />
              <div>
                <p className='text-lg font-medium'>{user?.firstname} {" "} {user?.lastname}</p>
                <p className='text-gray-200'>{user?.email}</p>
              </div>
            </div>

            <div className='flex  items-center cursor-pointer text-black font-medium '>
              <button className='flex items-center py-2 px-4 rounded-lg cursor-pointer bg-yellow-500' onClick={() => navigate('/dashboard/setting')}>
                <span>Edit</span> <RiEditBoxLine />
              </button>
            </div>
          </div>


          <div className='bg-zinc-800/60 flex-col lg:flex-row gap-3 flex lg:justify-between p-6 rounded-2xl'>
            <div className='flex gap-4 items-center'>
              <div>
                <p className='text-lg font-medium pb-4'>About</p>
                <p   className={`${
            user?.additionalDetails?.about
              ? "text-white"
              : "text-gray-400"
          } text-sm font-medium`}>{(user?.additionalDetails?.about)?(user?.additionalDetails?.about):"Write something About Yourself"}</p>
              </div>
            </div>

            <div className='flex items-center cursor-pointer text-black font-medium '>
              <button className='flex items-center py-2 px-4 rounded-lg cursor-pointer bg-yellow-500' onClick={() => navigate('/dashboard/setting')}>
                <span>Edit</span> <RiEditBoxLine />
              </button>
            </div>
          </div>

          <div className='bg-zinc-800/60 p-6 rounded-2xl'>
         
  <p className="text-lg font-medium pb-4">Personal Details</p>

  <div className='flex justify-between'>
  <div className="min-w-[500px] grid grid-cols-1 md:grid-cols-2 gap-6">

    {/* First Name */}
    <div>
      <div className="text-gray-400 text-sm">First Name</div>
      <div>{user?.firstname}</div>
    </div>

    {/* Last Name */}
    <div>
      <div className="text-gray-400 text-sm">Last Name</div>
      <div>{user?.lastname}</div>
    </div>

    {/* Email */}
    <div>
      <div className="text-gray-400 text-sm">Email</div>
      <div>{user?.email}</div>
    </div>

    {/* Phone Number */}
    <div>
      <div className="text-gray-400 text-sm">Phone Number</div>
      <div>{user?.additionalDetails?.contactnumber ?? "Add Contact Number"}</div>
    </div>

    {/* Gender */}
    <div>
      <div className="text-gray-400 text-sm">Gender</div>
      <div>{user?.additionalDetails?.gender ?? "Add Gender"}</div>
    </div>

    {/* Date of Birth */}
    <div>
      <div className="text-gray-400 text-sm">Date Of Birth</div>
      <div>{formattedDate(user?.additionalDetails?.dateofbirth) ?? "Add Date Of Birth"}</div>
    </div>

  </div>


            <div className='flex items-start cursor-pointer text-black font-medium '>
              <button className='flex items-center py-2 px-4 rounded-lg cursor-pointer bg-yellow-500' onClick={() => navigate('/dashboard/setting')}>
                <span>Edit</span> <RiEditBoxLine />
              </button>
            </div>
  </div>

          </div>

        </div>

      </div>
      )
    }
      

    </div>

  )
}

export default Myprofile