import React from 'react'
import { useState } from 'react'
import {Chart,registerables } from 'chart.js'
import {Pie} from 'react-chartjs-2'

Chart.register(...registerables)
const Chartcomponent = ({data}) => {
    const [currchart,setcurrchart] = useState("students");

    const randomcolor = (num)=>{
        const colors = [];
        for(let i=0 ;i<num; i++){
            const color = `rgb(${Math.floor(Math.random()*256)} ,${Math.floor(Math.random()*256)} ,${Math.floor(Math.random()*256)})`

            colors.push(color);
        }
        return colors;
    }

    const chartdatastudents = {
        labels : data.map((course)=>course.name),
        datasets :[
            {
                data: data.map((course)=>course.totalstudent),
                backgroundColor : randomcolor(data.length)
            }
        ]
    }

    const chartincomedata = {
        labels :data.map((course)=>course.name),
        datasets:[
            {
                data:data.map((course)=>course.totalamount),
                 backgroundColor : randomcolor(data.length)
            }
        ]
    }

    const options ={
        maintainAspectRation:false,
        
    }
  return (
    <div>
     <p className='text-xl my-3 font-medium'>Visualize</p>
     <div className='flex gap-3'>
        <button   className={`rounded-sm text-lg p-1 px-3 transition-all cursor-pointer font-medium duration-200 ${
            currchart === "students"
              ? "bg-gray-600 text-yellow-50"
              : "text-yellow-400"
          }`} onClick={()=>setcurrchart("students")}>Students</button>
        <button   className={`rounded-sm p-1 px-3 transition-all cursor-pointer text-lg font-medium duration-200 ${
            currchart === "Income"
              ? "bg-gray-600 text-yellow-50"
              : "text-yellow-400"
          }`} onClick={()=>setcurrchart("Income")}>Income</button>
     </div>

     <div className='relative mx-auto w-fit '>
     <Pie 
        data={currchart === 'students' ? chartdatastudents :chartincomedata} options={options}
     />
     </div>
    </div>
  )
}

export default Chartcomponent