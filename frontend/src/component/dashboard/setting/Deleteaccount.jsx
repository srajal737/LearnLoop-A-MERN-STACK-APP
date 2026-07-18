import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { deleteprofile } from '../../../services/apicalling/settingapi';
import { FiTrash2 } from "react-icons/fi"
import Confirmationmodal from '../../common/Confirmationmodal';
const Deleteaccount = () => {
    const { token } = useSelector(state => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [deletemodaldata, setdeletemodaldata] = useState(null);
    async function handleDeleteAccount() {
        try {
            dispatch(deleteprofile(token, navigate))
        } catch (error) {
            console.log("ERROR MESSAGE - ", error.message)
        }
    }
    return (
        <div className="my-10 lg:flex flex-row gap-x-5 rounded-md bg-red-500/20 text-red-400 border border-pink-700 p-8 px-12">
            <div className="flex aspect-square h-14 w-14 items-center justify-center rounded-full bg-pink-700">
                <FiTrash2 className="text-3xl text-pink-200" />
            </div>
            <div className="flex flex-col space-y-2">
                <h2 className="text-lg font-semibold ">
                    Delete Account
                </h2>
                <div className="lg:w-3/5 text-white">
                    <p>Would you like to delete account?</p>
                    <p>
                        This account may contain Paid Courses. Deleting your account is
                        permanent and will remove all the contain associated with it.
                    </p>
                </div>
             
            </div>   
            <button
                    type="button"
                    className="w-fit cursor-pointer italic text-pink-300"
                    onClick={() => setdeletemodaldata({
                        text1: "Delete Account ?",
                        text2: "Deletion of Account is Permanent",
                        btn1: "Delete",
                        btn2: "Cancel",
                        btnhandle1:()=>(handleDeleteAccount()),
                        btnhandle2:()=>{setdeletemodaldata(null)}
                    })}
                >
                    I want to delete my account.
                </button>
            {
                deletemodaldata &&  <Confirmationmodal data={deletemodaldata} setdata={setdeletemodaldata}/> //here naming issue as i use logout modal with delete modal so no problem
            }
        </div>
    )
}

export default Deleteaccount