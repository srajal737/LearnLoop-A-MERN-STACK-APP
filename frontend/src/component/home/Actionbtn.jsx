import React from 'react'
import { Link } from 'react-router-dom'

const Actionbtn = ({children , active ,tolink}) => {
  return (
    <Link to={tolink}>
      <div className={`py-3 px-3 text-md rounded-xl font-bold transition-all duration-200 ${active?" bg-yellow-300 text-black hover:scale-95":" bg-gray-600 text-white shadow-[1px_1px_0px_1px_rgb(197,197,197)] hover:scale-95 hover:shadow-none"}`}>
      {children}
    </div>
    </Link>
   
  )
}

export default Actionbtn