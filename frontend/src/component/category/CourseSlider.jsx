import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Pagination } from 'swiper/modules';
import 'swiper/css/pagination';
import Course_cad from './Course_cad';
import './slider.css'

const CourseSlider = ({ courses }) => {
  console.log(courses)
  return (
    <div>
      {
        (!courses || courses?.length === 0) ? <div className='text-xl font-medium text-gray-500'>"No Courses found"</div> : <div>
          <Swiper
            modules={[Pagination]}
            pagination={{ clickable: true }}
            spaceBetween={20}
             slidesPerView={1}
            breakpoints={{
              1024: {
                slidesPerView: 3.5,
              },
            }}

          >
            {
              courses?.map((course, idx) => (
                <SwiperSlide  key={idx}>
                  <Course_cad course={course} />
                </SwiperSlide>
              ))
            }
          </Swiper>
        </div>
      }
    </div>
  )
}

export default CourseSlider
