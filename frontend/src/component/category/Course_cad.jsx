import React, { useState, useEffect  } from "react";
import { Link } from "react-router-dom";
import getAvgRating from "./Getavgratig";
import Ratingcomponent from "./Ratingcomponent";
import Footer from "../common/Footer";

const Course_cad = ({ course }) => {
  const [avgrating, setavgrating] = useState(0);

  useEffect(() => {
    const rating = getAvgRating(course?.ratingandreview);
    setavgrating(rating);
  }, [course]);

  
  return (
    <div className="w-[260px] sm:w-[280px] lg:w-80 mx-auto m-5 overflow-hidden rounded-2xl border border-gray-700 bg-black/80 transition-all duration-300 hover:scale-103 hover:border-yellow-500/40 hover:bg-gray-900 hover:shadow-2xl h-[400px]">
      <Link to={`/courses/${course?._id}`}>
       
        <div className="h-44 overflow-hidden">
          <img
            src={course?.thumbnail}
            alt={course?.name}
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-103"
          />
        </div>

     
        <div className="p-5">
       
          <h2 className=" text-lg font-semibold text-white">
            {course?.name}
          </h2>

          {/* Instructor */}
          <p className="mt-2 text-sm text-gray-400">
            {course?.instructor?.firstname} {course?.instructor?.lastname}
          </p>

          {/* Rating */}
          <div className="mt-4 flex text-sm items-center gap-2">
            <span className="font-semibold text-yellow-400">
              {avgrating || 0}
            </span>

            <Ratingcomponent rating={avgrating} />

            <span className="text-sm text-gray-500">
              ({course?.ratingandreview?.length || 0})
            </span>
          </div>

          {/* Price */}
          <div className="mt-5 flex items-center justify-between">
            <p className="text-2xl font-bold text-green-400">
              ₹{course?.price}
            </p>

            <button className="rounded-lg bg-yellow-500 px-4 py-2 text-sm font-semibold text-black transition-colors duration-300 hover:bg-yellow-400 cursor-pointer">
              View
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Course_cad;