import { createSlice } from "@reduxjs/toolkit";

const initialstate ={
    token: JSON.parse(localStorage.getItem("token")) ||null,
    loading:false,
    signupdata:null
};
const authslice = createSlice({
    name:"auth",
    initialState:initialstate,
    reducers:{
        settoken:(state,action)=>{
            state.token=action.payload
        },
        setloading:(state,action)=>{
            state.loading = action.payload;
        },
        setsignup_data:(state,action)=>{
            state.signupdata = action.payload;
        }
    }
});
export const {settoken,setsignup_data,setloading} = authslice.actions;
export default authslice.reducer;