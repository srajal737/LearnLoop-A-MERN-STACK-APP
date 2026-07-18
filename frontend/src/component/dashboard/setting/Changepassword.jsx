import React, { useState } from 'react'
import { changepassword } from '../../../services/apicalling/settingapi'
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
const Changepassword = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { token } = useSelector((state) => state.auth)
    const navigate = useNavigate();

    const [showcurrpass,setshowcurrpass]=useState(false)
    const [showpass, setshowpass] = useState(false);
    const [showconfirmpass, setshowconfirmpass] = useState(false);

   const submitPasswordForm = async (data) => {
    try {
        await changepassword(token, data);  
    } catch (e) {
        console.log("Error changing password:", e.message);
    }
        navigate('/dashboard/my-profile')
}
    return (
        <form className="bg-zinc-800/60 py-10 px-6 rounded-2xl my-10 flex flex-col gap-6" onSubmit={handleSubmit(submitPasswordForm)}>
            <div className="text-white text-xl font-semibold">Password</div>
            <div className="flex flex-col md:flex-row gap-5">

                <div className="flex-1 flex flex-col relative">
                    <label htmlFor="currentpassword" className="text-white mb-1">Current Password</label>
                    <input
                        type={`${showcurrpass ? "text" : "password"}`} 
          id="currentpassword"
                        name="currentpassword"
                        placeholder='Enter your current password'
                        {...register("oldpassword", { required: true })}
                        className="w-full bg-slate-800 rounded-lg p-2 text-white outline-none focus:bg-slate-700 focus:ring-1 focus:ring-blue-400 border-b-2 transition"
                    />
                    {errors.oldpassword && <span className="text-yellow-100 text-sm mt-1">Please Enter</span>}
                    <span className='absolute right-1 top-[60%]'>
                        {
                            (showcurrpass) ? (
                                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" onClick={() => setshowcurrpass(!showcurrpass)} />
                            ) : (
                                <AiOutlineEye fontSize={24} fill="#AFB2BF" onClick={() => setshowcurrpass(!showcurrpass)} />
                            )
                        }
                    </span>
                </div>


                <div className="flex-1 flex flex-col relative">
                    <label htmlFor="newpassword" className="text-white mb-1">New Password</label>
                    <input
                         type={`${showpass ? "text" : "password"}`} 
                        id="newpassword"
                        name="newpassword"
                        placeholder='Enter new password'
                        {...register("newpassword",{ required: true })}
                        className="w-full bg-slate-800 rounded-lg p-2 text-white placeholder-gray-300 outline-none focus:bg-slate-700 focus:ring-1 focus:ring-blue-400 border-b-2 transition"
                    />
                    {errors.newpassword && <span className="text-yellow-100  text-sm mt-1">{errors.newpassword.message}</span>}
                       <span className='absolute right-1 top-[60%]'>
                        {
                            (showpass) ? (
                                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" onClick={() => setshowpass(!showpass)} />
                            ) : (
                                <AiOutlineEye fontSize={24} fill="#AFB2BF" onClick={() => setshowpass(!showpass)} />
                            )
                        }
                    </span>
                </div>

                <div className="flex-1 flex flex-col relative">
                    <label htmlFor="confirmpassword" className="text-white mb-1">Confirm New Password</label>
                    <input
                         type={`${showconfirmpass ? "text" : "password"}`} 
                        id="confirmpassword"
                        name="confirmpassword"
                        placeholder='confirm new password'
                        {...register("confirmpassword",{ required: true })}
                        className="w-full bg-slate-800 rounded-lg p-2 text-white placeholder-gray-300 outline-none focus:bg-slate-700 focus:ring-1 focus:ring-blue-400 border-b-2 transition"
                    />
                    {errors.confirmpassword && <span className="text-yellow-100 text-sm mt-1">{errors.confirmpassword.message}</span>}
                       <span className='absolute right-1 top-[60%]'>
                        {
                            (showconfirmpass) ? (
                                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" onClick={() => setshowconfirmpass(!showconfirmpass)} />
                            ) : (
                                <AiOutlineEye fontSize={24} fill="#AFB2BF" onClick={() => setshowconfirmpass(!showconfirmpass)} />
                            )
                        }
                    </span>
                </div>
            </div>
             <div className="flex justify-center gap-4 mt-6">
      <button
        type="button"
        onClick={() => navigate("/dashboard/my-profile")}
        className="rounded-md bg-gray-500 py-2 px-5 font-semibold cursor-pointer"
      >
        Cancel
      </button>
      <button
        type="submit"
        className="rounded-md bg-yellow-500 py-2 px-5 font-semibold cursor-pointer"
      >
        Save
      </button>
    </div>
        </form>
    )
}

export default Changepassword