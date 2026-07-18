import React from 'react'
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
const Ratingcomponent = ({rating }) => {
  return (
    <div className='flex gap-2 text-sm'>
    {
      [1,2,3,4,5].map((star)=>{
        if(rating>=star) return <FaStar key={star}  color="#facc15"/>
        else if(rating+0.5>=star) return <FaStarHalfAlt  key={star} color="#facc15"/>
        else return <FaRegStar key={star} color="#facc15"/>
    })
    }
    </div>
  )
}

export default Ratingcomponent