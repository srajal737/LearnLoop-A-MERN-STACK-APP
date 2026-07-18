import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    courseSectionData :[],
    courseEntireData :[],
    completedLectures :[],
    totalLectures:0,
}


const viewcourseslice = createSlice({
    name:"viewcourse",
    initialState,
    reducers:{
        setCourseSectionData:(state,action)=>{
            state.courseSectionData = action.payload
        },
        setEntireData :(state,action)=>{
            state.courseEntireData = action.payload
        },
        setTotalLectures : (state,action)=>{
            state.totalLectures = action.payload
        },
        updateCompletedLectures :(state,action)=>{
            state.completedLectures =  action.payload || []
        }
    }
})

export const {
    setTotalLectures,
    setEntireData,
    setCourseSectionData,
    updateCompletedLectures
} = viewcourseslice.actions

export default viewcourseslice.reducer