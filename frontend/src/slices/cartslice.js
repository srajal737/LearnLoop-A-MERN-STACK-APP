import { createSlice } from "@reduxjs/toolkit";
import {toast} from 'react-hot-toast';
//cart can be in local storage of user
const initialstate ={//local storage stores in string.
    totalitems: localStorage.getItem("totalitem")?JSON.parse(localStorage.getItem("totalitem")):0,

    cart:localStorage.getItem("cart")?JSON.parse(localStorage.getItem("cart")):[],

    totalprice:localStorage.getItem("totalprice")?JSON.parse(localStorage.getItem("totalprice")):0,

};
const cartslice = createSlice({
    name:"cart",
    initialState:initialstate,
    reducers:{
        addtocart:(state,action)=>{
            const course = action.payload;
            const idx = state.cart.findIndex(item=>item._id===course._id);
            if(idx>=0){
                toast.error("Item already in Cart");
                return ;
            }
            state.cart.push(course);
            state.totalitems++;
            state.totalprice+=course.price;
            //updating local storage 
            localStorage.setItem("cart",JSON.stringify(state.cart));
            localStorage.setItem("totalitem",JSON.stringify(state.totalitems));
            localStorage.setItem("totalprice",JSON.stringify(state.totalprice));
            toast.success("Item added to cart");
        },
        removefromcart:(state,action)=>{
            const courseid = action.payload;
            const idx = state.cart.findIndex((item)=>item._id===courseid);
            state.totalitems--;
            state.totalprice-=state.cart[idx].price;
            state.cart.splice(idx,1);//or filter state.cart.fillter((item)=>item.id!=couseid);
             localStorage.setItem("cart",JSON.stringify(state.cart));
            localStorage.setItem("totalitem",JSON.stringify(state.totalitems));
            localStorage.setItem("totalprice",JSON.stringify(state.totalprice));
            toast.success("Item removed from cart");
        },
        resetcart:(state,payload)=>{
            state.cart = [];
            state.totalitems = 0;
            state.totalprice = 0 ;
            localStorage.setItem("cart",JSON.stringify(state.cart));
            localStorage.setItem("totalitem",JSON.stringify(state.totalitems));
            localStorage.setItem("totalprice",JSON.stringify(state.totalprice));
            // toast.success("All items removed!!")
        }
    }
});
export const {addtocart,removefromcart,resetcart} = cartslice.actions;
export default cartslice.reducer;