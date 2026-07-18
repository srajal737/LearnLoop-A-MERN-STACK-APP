import React from 'react'

const Tab = ({tabdata,setaccounttype,accountType}) => {
  return (
    <div className='bg-gray-800 rounded-2xl py-1.5 w-fit px-2 flex gap-4 border border-b-white my-3 '>
        {
            tabdata.map((item)=>(
                <button  key={item.id} onClick={()=>setaccounttype(item.tabtype)} className={`font-md text-lg cursor-pointer rounded-2xl px-3 py-1 ${accountType===item.tabtype ?"bg-black  text-white":"bg-transparent text-gray-300"}`}>{item.tabtype}</button>
            ))
        }
    </div>
    
  )
}

export default Tab