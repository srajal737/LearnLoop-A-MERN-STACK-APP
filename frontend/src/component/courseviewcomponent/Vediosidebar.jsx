import React, { useEffect } from 'react'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { MdArrowBackIos } from "react-icons/md";
import { RxDropdownMenu } from "react-icons/rx";
import { FaVideo ,FaTimes } from "react-icons/fa";
import Reviewmodal from './Reviewmodal';


const Vediosidebar = ({sideopen ,setsideopen}) => {
  const [reviewdata, setreviewdata] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { sectionid, subsectionid } = useParams();
  //curr section and subsection highlighting
  const {
    courseSectionData, courseEntireData, completedLectures, totalLectures
  } = useSelector(state => state.viewcourse);

  function secondsToHHMMSS(seconds) {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return [
      String(hrs).padStart(2, '0'),
      String(mins).padStart(2, '0'),
      String(secs).padStart(2, '0')
    ].join(':');
  }
 
  return (
    <>
        <div className={`mt-1 hidden lg:block px-3
    ${sideopen ? "w-[22%] " : "w-0 -translate-x-full"}
    bg-black h-screen overflow-y-auto border-r border-gray-800
    transition duration-75 overflow-hidden
  `}>
 
      <div className='flex bg-gray-600/60 py-2 px-1 bg-gray-400  justify-between '>
        <button onClick={() => navigate('/dashboard/enrolledcourse')} className='rounded-full p-3 cursor-pointer bg-gray-400  flex justify-center items-center'>
          <MdArrowBackIos className='inline ml-1 text-black ' />
        </button>

        <button className=' bg-yellow-500 rounded-lg text-black font-bold px-3 py-2 hover:text-gray-600 cursor-pointer' onClick={() => setreviewdata(true)}>
          Add Review
        </button>
      </div>

      <div className='border-b-1 border-b-gray-700 pb-5'>
        <p className='text-2xl font-medium text-white pt-5'>{courseEntireData.name}</p>
        <p className='text-gray-400 py-2 font-medium'>Total duration : {secondsToHHMMSS(courseEntireData?.duration)}</p>

        <p>Completed Videos : {completedLectures.length || 0 }/{totalLectures}</p>
        <div className="w-full h-2 bg-gray-400 my-3 rounded-lg overflow-hidden">
          <div
            className="h-full bg-blue-700  rounded-full"
            style={{
              width: `${courseEntireData?.progresspercentage || 0}%`
            }}
          ></div>
        </div>
        <p className='text-purple-600 text-sm text-center'><span className='text-purple-800 bold'>{courseEntireData?.progresspercentage || 0}%</span> completed</p>


      </div>

      {/* course display */}

      <div>
        {
          courseSectionData?.map((sec) => (
            <div key={sec._id}>
              <details className=' font-medium pb-2 cursor-pointer transition-all duration-300'>
                <summary className='bg-gray-600/60 list-none py-2 hover:text-black  pl-2'><RxDropdownMenu className='inline text-xl' /> {sec.name} </summary>
                {
                  sec?.subsection.map((subsec) => (
                    <div key={subsec._id} onClick={()=>navigate(`section/${sec._id}/sub-section/${subsec._id}`)} className={`flex py-1 text-sm px-2 border-b-1 border-b-gray-700 bg-gray-700/40 items-center gap-2 ${subsectionid===subsec._id?"bg-yellow-500":""}`}>
                      {completedLectures.includes(subsec._id)&& (
                        <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs">
                          ✓
                        </div>
                      )}

                      <span>{subsec.title} </span>
                      <FaVideo />
                    </div>
                  ))
                }

              </details>
            </div>
          ))
        }

        
      </div>
      {reviewdata && <Reviewmodal data={reviewdata} setdata={setreviewdata}/>}
    </div>


    {/* mobile view */}
    <div className='lg:hidden'>
    {
      sideopen && <div className='fixed inset-0 bg-black/30 backdrop-blur-sm z-40 ' onClick={()=>setsideopen(false)}>
     </div>
    }

    {
      <div className={`fixed top-0 left-0 h-screen bg-black z-50 w-80 transform transition-transform duration-300 ${sideopen?"translate-x-0":"-translate-x-full"} overflow-x-hidden rounded-r-2xl`}>
      <div className='flex bg-gray-600/60 py-2 px-1 bg-gray-400  justify-between '>
        <button onClick={() => navigate('/dashboard/enrolledcourse')} className='rounded-full p-3 cursor-pointer bg-gray-400  flex justify-center items-center'>
          <MdArrowBackIos className='inline ml-1 text-black ' />
        </button>

        <button className=' bg-yellow-500 rounded-lg text-black font-bold px-3 py-2 hover:text-gray-600 cursor-pointer' onClick={() => setreviewdata(true)}>
          Add Review
        </button>

        <button onClick={()=>setsideopen(false)}>
        <FaTimes className='inline text-xl'/>
        </button>
      </div>

      <div className='border-b-1 border-b-gray-700 pb-5'>
        <p className='text-2xl font-medium text-white pt-5'>{courseEntireData.name}</p>
        <p className='text-gray-400 py-2 font-medium'>Total duration : {secondsToHHMMSS(courseEntireData?.duration)}</p>

        <p>Completed Videos : {completedLectures.length || 0 }/{totalLectures}</p>
        <div className="w-full h-2 bg-gray-400 my-3 rounded-lg overflow-hidden">
          <div
            className="h-full bg-blue-700  rounded-full"
            style={{
              width: `${courseEntireData?.progresspercentage || 0}%`
            }}
          ></div>
        </div>
        <p className='text-purple-600 text-sm text-center'><span className='text-purple-800 bold'>{courseEntireData?.progresspercentage || 0}%</span> completed</p>


      </div>

      {/* course display */}

      <div>
        {
          courseSectionData?.map((sec) => (
            <div key={sec._id}>
              <details className=' font-medium pb-2 cursor-pointer transition-all duration-300'>
                <summary className='bg-gray-600/60 list-none py-2 hover:text-black  pl-2'><RxDropdownMenu className='inline text-xl' /> {sec.name} </summary>
                {
                  sec?.subsection.map((subsec) => (
                    <div key={subsec._id} onClick={()=>navigate(`section/${sec._id}/sub-section/${subsec._id}`)} className={`flex py-1 text-sm px-2 border-b-1 border-b-gray-700 bg-gray-700/40 items-center gap-2 ${subsectionid===subsec._id?"bg-yellow-500":""}`}>
                      {completedLectures.includes(subsec._id)&& (
                        <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs">
                          ✓
                        </div>
                      )}

                      <span>{subsec.title} </span>
                      <FaVideo />
                    </div>
                  ))
                }

              </details>
            </div>
          ))
        }

        
      </div>
      {reviewdata && <Reviewmodal data={reviewdata} setdata={setreviewdata}/>}
    </div>

    }
    
    </div>

    </>
  
  )
}

export default Vediosidebar