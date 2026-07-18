import React from 'react'

const Highlight = ({text}) => {
  return (
    <span className=' font-bold text-transparent bg-gradient-to-b from-[#11c1bb] via-[#0cb0ab] to-amber-200  bg-clip-text'>
    {text}
    </span>
  )
}

export default Highlight