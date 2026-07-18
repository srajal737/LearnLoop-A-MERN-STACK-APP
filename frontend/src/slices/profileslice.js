import { createSlice } from "@reduxjs/toolkit";

const initialstate ={
      user: JSON.parse(localStorage.getItem("user")) || null,
      loading:false
};
const profileslice = createSlice({
    name:"profile",
    initialState:initialstate,
    reducers:{
        setuser:(state,action)=>{
            state.user=action.payload
        },
        setloading:(state,action)=>{
            state.loading=action.payload
        }
    }
});
export const {setuser,setloading} = profileslice.actions;
export default profileslice.reducer;