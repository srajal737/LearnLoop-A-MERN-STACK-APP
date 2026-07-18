import { createSlice } from '@reduxjs/toolkit'
const initialstate ={
    step:1,
    course:null,
    editcourse:false,
    coursepaymentloading:false
}

const courseslice = createSlice({
    name:"course",
    initialState:initialstate,  //here S is capital vvvv important.
    reducers :{
        setstep:(state , action)=>{
            state.step = action.payload
        }
        ,
        setcourse:(state,action)=>{
            state.course = action.payload
        },
        seteditcourse:(state,action)=>{
            state.editcourse = action.payload
        },
        setpaymentloading:(state,action)=>{
            state.coursepaymentloading = action.payload
        },
        resetcoursedetail:(state,action)=>{
            state.course = null
            state.step = 1
            state.editcourse= false;
        }
    }
})

export const {
    setcourse,
    setstep,
    seteditcourse,
    setpaymentloading,
    resetcoursedetail
} = courseslice.actions
export default courseslice.reducer