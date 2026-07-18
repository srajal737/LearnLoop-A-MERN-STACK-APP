import { combineReducers } from "@reduxjs/toolkit";
import authreducer from '../slices/authslice';
import profilereducer from '../slices/profileslice'
import cartreducer from '../slices/cartslice'
import courseslice from '../slices/courseslice'
import viewcourseslice from '../slices/courseviewslice'

//combine reducers/slices here
const rootreducer = combineReducers({
    auth:authreducer,
    profile:profilereducer,
    cart:cartreducer,
    course:courseslice,
    viewcourse:viewcourseslice
})
export default rootreducer;