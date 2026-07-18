import React from 'react'

const Textupdown = ({fromcolor , tocolor,text}) => {
  return (
    <span className={`text-transparent bg-gradient-to-b from-${fromcolor} to-${tocolor} bg-clip-text`}>
    {text}
    </span>
  )
}

export default Textupdown