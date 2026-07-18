import React from 'react'
import { updateprofile } from '../../../services/apicalling/settingapi'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom'
const Personalinfo = () => {
         const { user } = useSelector(state => state.profile);
         const {token} = useSelector(state=>state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
        register, handleSubmit, formState: { errors }
    } = useForm();

    const submitprofileform = async (data) => {
        try {
            dispatch(updateprofile(token, data))
        } catch (e) {
            console.log("error message ", e.message);
        }
            navigate('/dashboard/my-profile');
    }
    return (<div className="bg-zinc-800/60 py-6 px-6 rounded-2xl mt-10 flex flex-col gap-6">
  <p className="text-white text-xl font-semibold">Change Personal Information</p>

  <form onSubmit={handleSubmit(submitprofileform)} className="flex flex-col gap-6">
    {/* Name Row */}
    <div className="flex flex-col md:flex-row gap-5">
      {/* First Name */}
      <div className="flex-1 flex flex-col">
        <label htmlFor="firstname" className="text-white mb-1">First Name</label>
        <input
          readOnly
          type="text"
          id="firstname"
          name="firstname"
          placeholder="Enter your first name"
          defaultValue={user?.firstname}
          {...register("firstname", { required: true })}
          className="w-full bg-slate-800 rounded-lg p-2 text-white placeholder-gray-300 outline-none focus:bg-slate-700 focus:ring-1 focus:ring-blue-400 border-b-2 transition"
        />
        {errors.firstname && <span className="text-yellow-100 text-sm mt-1">Please enter your first name.</span>}
      </div>

      {/* Last Name */}
      <div className="flex-1 flex flex-col">
        <label htmlFor="lastname" className="text-white mb-1">Last Name</label>
        <input
          readOnly
          type="text"
          id="lastname"
          name="lastname"
          placeholder="Enter your last name"
          defaultValue={user?.lastname}
          {...register("lastname")}
          className="w-full bg-slate-800 rounded-lg p-2 text-white placeholder-gray-300 outline-none focus:bg-slate-700 focus:ring-1 focus:ring-blue-400 border-b-2 transition"
        />
        {errors.lastname && <span className="text-yellow-100 text-sm mt-1">Please enter your last name.</span>}
      </div>
    </div>

    {/* Gender  Contact Row */}
    <div className="flex flex-col md:flex-row gap-5">
      {/* Gender */}
      <div className="flex-1 flex flex-col">
        <label htmlFor="gender" className="text-white mb-1">Gender</label>
        <select
          id="gender"
          name="gender"
          defaultValue={user?.additionalDetails?.gender || "Male"}
          {...register("gender", { required: true })}
          className="w-full bg-slate-800 rounded-lg p-2 text-white outline-none focus:bg-slate-700 focus:ring-1 focus:ring-blue-400 border-b-2 transition"
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="NOT APPLICABLE">NOT APPLICABLE</option>
        </select>
        {errors.gender && <span className="text-yellow-100 text-sm mt-1">Please select gender.</span>}
      </div>

      {/* Contact Number */}
      <div className="flex-1 flex flex-col">
        <label htmlFor="contactnumber" className="text-white mb-1">Phone Number</label>
        <input
          type="number"
          id="contactnumber"
          name="contactnumber"
          placeholder="12345 67890"
          defaultValue={user?.additionalDetails?.contactnumber}
          {...register("contactnumber", {
            required: "Enter your phone number",
            minLength: { value: 10, message: "Invalid phone number" },
            maxLength: { value: 12, message: "Invalid phone number" },
          })}
          className="w-full bg-slate-800 rounded-lg p-2 text-white placeholder-gray-300 outline-none focus:bg-slate-700 focus:ring-1 focus:ring-blue-400 border-b-2 transition"
        />
        {errors.contactnumber && <span className="text-yellow-100 text-sm mt-1">{errors.contactnumber.message}</span>}
      </div>
    </div>

    {/* About + Date of Birth Row */}
    <div className="flex flex-col md:flex-row gap-5">
      {/* About */}
      <div className="flex-1 flex flex-col">
        <label htmlFor="about" className="text-white mb-1">About</label>
        <input
          type="text"
          id="about"
          name="about"
          placeholder="Enter about you"
          defaultValue={user?.additionalDetails?.about}
          {...register("about", { required: true })}
          className="w-full bg-slate-800 rounded-lg p-2 text-white placeholder-gray-300 outline-none focus:bg-slate-700 focus:ring-1 focus:ring-blue-400 border-b-2 transition"
        />
        {errors.about && <span className="text-yellow-100 text-sm mt-1">Please enter about yourself.</span>}
      </div>

      {/* Date of Birth */}
      <div className="flex-1 flex flex-col">
        <label htmlFor="dateofbirth" className="text-white mb-1">Date of Birth</label>
        <input
          type="date"
          id="dateofbirth"
          name="dateofbirth"
          defaultValue={user?.additionalDetails?.dateofbirth}
          {...register("dateofbirth", {
            required: "Please enter your Date of Birth.",
            max: { value: new Date().toISOString().split("T")[0], message: "Date cannot be in the future." },
          })}
          className="w-full bg-slate-800 rounded-lg p-2 text-white outline-none focus:bg-slate-700 focus:ring-1 focus:ring-blue-400 border-b-2 transition"
        />
        {errors.dateofbirth && <span className="text-yellow-100 text-sm mt-1">{errors.dateofbirth.message}</span>}
      </div>
    </div>

    {/* Buttons */}
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
</div>
    )
}

export default Personalinfo