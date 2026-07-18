import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getuserenrolledcourses } from '../../services/apicalling/Profileapi'
import { LoaderIcon } from 'react-hot-toast';
import Loader from '../Loader';
 import { FaPhotoVideo } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
const Enrolledcoures = () => {
  const [enrolledcourse, setenrolledcourse] = useState(null);
  const { token } = useSelector(state => state.auth);
 
  const [loading ,setloading] = useState(false);
  const navigate = useNavigate();
  const getcourses = async () => {
    try {
      setloading(true);
      const result = await getuserenrolledcourses(token);
      setenrolledcourse(result);
    } catch (e) {
      console.log("not fetched courses of a student")
    }
    setloading(false)
  }

  useEffect(() => {
    getcourses();
  }, []);
return (
  <div className="text-white py-7">
    <p className="text-3xl my-5 text-white font-medium">
      My Enrolled Courses
    </p>

    {/* filter adding component do later */}

    <div>
      {loading ? (
        <Loader />
      ) : enrolledcourse && enrolledcourse.length === 0 ? (
        <div className="text-2xl text-center text-gray-400">
          No Course Found
        </div>
      ) : (
        <div className="lg:grid flex flex-col grid-cols-[1fr_1fr_1fr] gap-6">
          {enrolledcourse &&
            enrolledcourse.map((course) => (
              <div
                onClick={() => navigate(`/view-course/${course._id}`)}
                key={course._id}
                className="flex overflow-hidden flex-col bg-white rounded-md hover:scale-102 cursor-pointer duration-300 hover:shadow-md shadow-gray-400"
              >
                <div className="flex-shrink-0 overflow-hidden">
                  <img
                    alt={course?.name}
                    src={course?.thumbnail}
                    className="w-full hover:scale-102 duration-300 object-center object-cover"
                  />
                </div>

                <div className="p-1 py-2">
                  <p className="text-lg font-medium text-gray-700 leading-tight">
                    {course?.name}
                  </p>

                  <p className="text-gray-500 text-md py-1">
                    By: {course?.instructor?.firstname}
                  </p>

                  <div className="w-full h-2 bg-gray-400 my-3 rounded-lg overflow-hidden">
                    <div
                      className="h-full bg-blue-700 rounded-full"
                      style={{
                        width: `${course?.progresspercentage}%`,
                      }}
                    ></div>
                  </div>

                  <p className="text-purple-600 text-sm">
                    <span className="text-purple-800 font-bold">
                      {course?.progresspercentage}%
                    </span>{" "}
                    completed
                  </p>

                  <div className="flex justify-between">
                    <p>
                      <span className="text-gray-400">
                        Valid Till :
                      </span>{" "}
                      <span className="text-green-400">
                        Lifetime
                      </span>
                    </p>

                    <FaPhotoVideo className="text-purple-600" />
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  </div>
);
}
export default Enrolledcoures;