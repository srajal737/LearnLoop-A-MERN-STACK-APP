import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { useRef, useState } from "react"
import { FiUpload } from "react-icons/fi"
import { udatedisplayimg } from '../../../services/apicalling/settingapi'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const Imageupload = () => {
    const { user } = useSelector(state => state.profile);
    const {token} = useSelector(state=>state.auth);
    const dispatch = useDispatch();

    const [imagefile , setimagefile] = useState(null); 
    const [preveiwurl,setpreviewurl] = useState(null);
    const [loading,setloading] = useState(false); // fixed initialization
    const navigate = useNavigate();
    const fileinputref = useRef(); //we used this to hide the input panel and in hidden we will do our work.

    const handleselect = () => {
        fileinputref.current.click(); //when select button clicked input opened.
    }

    const handlefileselect = (e) => {
        const file = e.target.files[0];
        if(file){
            setimagefile(file);
            //setting preview user;
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () =>{
                setpreviewurl(reader.result);
            }
        }
    }

    const handlefilesubmit = async () => {
        if (!imagefile) { // check if user selected a file
            toast.error("Please select an image first");
            return;
        }

        setloading(true);  
        const formdata = new FormData();
        formdata.append("imagefile",imagefile);//key must be same as backend

        try{
            await dispatch(udatedisplayimg(token,formdata));
        }catch(e){
             
        }finally{
            setloading(false);
             navigate('/dashboard/my-profile')
        }
    }

    // useEffect not necessary here, preview handled in handlefileselect
    // useEffect(() => { 
    //   if (imagefile) {
    //     previewfile(imagefile)
    //   }
    // }, [imagefile])

    return (
        <div className='bg-zinc-800/60 py-6 lg:pl-15 rounded-2xl mt-10 flex lg:flex-row flex-col items-center gap-5'>
            <img src={preveiwurl || user?.image} alt={user?.firstname} className='w-[55px] h-[55px] rounded-full' />

            <div className='flex gap-2 flex-col'>
                <span className='text-white text-xl'>Change Profile Picture</span>
                <div className='flex gap-3'>
                    <div className='flex items-center cursor-pointer font-medium'>
                        <input 
                            type='file' 
                            className='hidden' 
                            ref={fileinputref} 
                            accept="image/png, image/gif, image/jpeg" 
                            onChange={handlefileselect} // fixed from onClick to onChange
                        />
                        <button className='flex items-center py-2 px-4 rounded-lg cursor-pointer bg-gray-500' onClick={handleselect}>
                            Select 
                        </button>
                    </div>

                    <div className='flex items-center cursor-pointer text-black font-medium'>
                        <button className='flex items-center py-2 px-4 rounded-lg cursor-pointer bg-yellow-500' onClick={handlefilesubmit}>
                            {loading ? "Uploading.." : "Upload"}
                            {!loading && (
                                <FiUpload className="text-lg ml-3 text-richblack-900" />
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Imageupload