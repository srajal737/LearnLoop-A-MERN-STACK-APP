import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useOutletContext, useParams } from 'react-router-dom'
import { FaBars } from "react-icons/fa";
import { MdOutlineReplay, MdFullscreen } from "react-icons/md";
import "./index.css"
import { courseprogressupdate } from '../../services/apicalling/courseapicalling'
const VideoDetails = () => {

  const { sideopen, setsideopen } = useOutletContext();

  const {
    courseSectionData,
    courseEntireData,completedLectures
  } = useSelector(state => state.viewcourse)

  const { user } = useSelector(state => state.profile)

  const location = useLocation();
  const { sectionid, subsectionid,courseid } = useParams();
  const [loading ,setloading] = useState(false);
  const [activevideo, setactivevideo] = useState(null);
  const [subsection, setsubsection] = useState(null);

  const [position, setPosition] = useState({
    top: "10%",
    left: "10%",
  });

  const [visible, setVisible] = useState(false);

  const videoref = useRef(null);
  const containerRef = useRef(null);

  const [rewatch, setrewatch] = useState(false);
  const {token} = useSelector(state=>state.auth)
  useEffect(() => {

    const getdetail = () => {
      if (!courseSectionData.length) return;
      const currsectionidx = courseSectionData.findIndex(
        (data) => data._id === sectionid
      );
      const currsubsectionidx =
        courseSectionData[currsectionidx]?.subsection.findIndex(
          data => data._id === subsectionid
        );
      setactivevideo(
        courseSectionData[currsectionidx]
        ?.subsection[currsubsectionidx]
        ?.videoURL
      );
      setsubsection(
        courseSectionData[currsectionidx]
        ?.subsection[currsubsectionidx]
      );
    }
    getdetail();

  }, [courseSectionData, courseEntireData, location.pathname]);


  useEffect(() => {
    const showWatermark = () => {
      setPosition({
        top: `${Math.floor(Math.random() * 70)}%`,
        left: `${Math.floor(Math.random() * 70)}%`,
      });
      setVisible(true);
      setTimeout(() => {
        setVisible(false);
      }, 3000);

    };
    showWatermark();
    const interval = setInterval(showWatermark, 7000);
    return () => clearInterval(interval);

  }, []);

  const openFullscreen = () => {
    if (containerRef.current) {
      containerRef.current.requestFullscreen();
    }
  };

  const handlemarkcomplete = async ()=>{
    setloading(true);
     const result = await courseprogressupdate({courseid,subsectionid},token);
     if(result){
      window.location.reload();
     }
    setloading(false);
  }
  return (
   
    <div>
       <div className='w-full h-14 px-4 bg-white text-black flex items-center justify-between  text-2xl'>
        <FaBars onClick={() => setsideopen(!sideopen)} className='cursor-pointer' />
        {
          !completedLectures.includes(subsectionid) &&      <button onClick={handlemarkcomplete} className='text-[18px] bg-purple-700 cursor-pointer rounded-md font-medium px-3 py-2' disabled={loading}>Mark as Completed</button>
        }
  
      </div>
      <div>
   
    </div>
     
      {
        !activevideo ?
        <div>
          Something went wrong
        </div>
        : <div
          ref={containerRef} className=" relative w-[90%] mx-auto my-2 h-[calc(100vh-200px)] overflow-hidden bg-black
          "
        >


          {/* fullscreen button */}

          <button
            onClick={openFullscreen}  className="absolute  top-3  right-3  z-20  bg-black/70  text-white  px-3  py-2 rounded-lg hover:bg-black flex items-center gap-1 cursor-pointer">
            Fullscreen
            <MdFullscreen className="text-xl"/>
          </button>
          <video
            ref={videoref}
            src={activevideo}
            controls
            onEnded={() => setrewatch(true)}
            className=" w-full h-full object-contain "
            controlsList="nodownload nofullscreen"
            disablePictureInPicture
          />
          {
            rewatch &&
            <button
              className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-yellow-300 via-orange-500 to-red-500 text-black font-bold px-5 py-3 rounded-full shadow-[0_0_15px_rgba(255,193,7,0.8)] hover:scale-110 transition-all duration-300 flex items-center gap-2
              "
              onClick={() => {
                setrewatch(false);
                videoref.current.currentTime = 0;
                videoref.current.play();
              }} >
              Rewatch
              <MdOutlineReplay className="text-xl"/>
            </button>
          }

          {  visible &&
            <div
 className=" absolute z-10 rounded-lg bg-gray-400/70 text-black font-bold p-2 pointer-events-none "
              style={{
                top: position.top,
                left: position.left,
              }}
            >
              <p>
                {user.firstname} {user.lastname}</p>
              <p className="text-xs">
                {user.email}</p>
            </div>
          }
        </div>
      }
      <div>
        <p className=" text-3xl text-gray-200 border-b border-gray-700 mt-7 pb-3">
          Lecture Description
        </p>
        <div
          className="  p-3  bg-gray-600/70  rounded-2xl  mt-7
          ">
          {
            !subsection?.description?
            <div>
              NO DESCRIPTION FOUND
            </div>:
            <div>
              {subsection.description}
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default VideoDetails;