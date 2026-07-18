import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { showcategoryurl } from '../services/api';
import apiconnector from '../services/apiconnector';
import { getcategorypagedetail } from '../services/apicalling/categorycall';
import toast from 'react-hot-toast';
import Loader from '../component/Loader';
import CourseSlider from '../component/category/CourseSlider';
import Footer from '../component/common/Footer';
const Category = () => {
  const { categoryname } = useParams();
  const [categoryid, setcategoryid] = useState(null);
  const [loading, setloading] = useState(false);
  const [active, setactive] = useState(1);
  const [categorypagedata, setcategorypagedata] = useState(null);

  useEffect(() => {
    const fetchcategory = async () => {
      try {

        const response = await apiconnector("GET", showcategoryurl);
        const result = response?.data?.data;
        const categoryget = result?.find(
          (item) =>
            item.name.replace(/[\/\s]+/g, "-").toLowerCase() === categoryname.toLowerCase()
        );
        setcategoryid(categoryget._id)
      } catch (error) {
      }

    };

    fetchcategory();
  }, [categoryname]);

  useEffect(() => {
    const getcategorypagefun = async () => {
      setloading(true);
      try {
        if (categoryid) {
          const res = await getcategorypagedetail(categoryid);
          setcategorypagedata(res);


        }
      }
      catch (e) {
        console.log(e.message);
      }
      setloading(false);
    }

    getcategorypagefun();

  }, [categoryid])




  return (
    <div className='bg-black text-white w-full text-xl min-h-screen pt-15'>
      {
        loading && <Loader />
      }
      {
        !loading && <div className=''>
          <div className='bg-zinc-700/30 min-h-80 '>
            <div className='w-11/12 mx-auto'>
              <div className='pt-10 text-md  text-gray-500'><span >Home/category/</span><span className='text-blue-500 '>{`${categorypagedata?.selectedcategory?.name}`}</span></div>

              <p className='py-7 text-5xl'>{`${categorypagedata?.selectedcategory?.name}`}</p>

              <p className='text-md text-gray-500 font-semibold'>{`${categorypagedata?.selectedcategory?.description}`}</p>
            </div>

          </div>

          <div className='py-15 w-11/12 mx-auto'>

            <p className='text-transparent bg-gradient-to-b from-blue-700 to-white bg-clip-text text-3xl font-bold pb-7'>{`Course To Get You A Start in`} <span className='text-white'>{ `${categorypagedata?.selectedcategory?.name}`}</span></p>

            <div className='pb-5 border-b-1 border-b-gray-600 text-md font-semibold text-transparent bg-gradient-to-b from-orange-700 via-yellow-500 to-white bg-clip-text'>
              <span className={`px-4 py-2 cursor-pointer ${active == 1 ? "border-b border-b-amber-500" : "text-white"}`} onClick={() => setactive(1)}>Most Popular</span>
              <span className={`px-4 py-2 cursor-pointer ${active == 2 ? "border-b border-b-amber-500" : "text-white"}`} onClick={() => setactive(2)}>New</span>
            </div>

            <div className='mt-5 border-b border-b-gray-600 pb-2'>
              <CourseSlider courses={categorypagedata?.selectedcategory?.course} />
            </div>

            <p className='text-6xl my-10 italic text-gray-400'>Recommended Courses</p>
            <div className='text-3xl font-bold p-5'>
              <p className='text-transparent bg-gradient-to-b from-blue-700 to-white bg-clip-text py-4'>Top Courses in {categorypagedata?.differentcategory?.name}</p>

              <div>
                <CourseSlider courses={categorypagedata?.differentcategory?.course} />
              </div>
            </div>

            <div className='text-3xl font-bold p-5'>
              <p className='text-transparent bg-gradient-to-b from-blue-700 to-white bg-clip-text py-4'>Most Selling Courses</p>
              <CourseSlider courses={categorypagedata?.mostsellingcourse} />
            </div>

          </div>
 <Footer/>
        </div> 

       
      }
     
    </div>
  )
}

export default Category

// {
// [SERVER]   _id: new ObjectId('699b251c6a29e22f996a6988'),
// [SERVER]   name: 'Cyber Security',
// [SERVER]   description: 'Ethical hacking and network security',
// [SERVER]   course: [
// [SERVER]     {
// [SERVER]       _id: new ObjectId('6a509c24fe3750b56719bebb'),
// [SERVER]       name: 'new course',
// [SERVER]       description: 'this course is good to watch',
// [SERVER]       whatwilllearn: 'hellow',
// [SERVER]       price: 234,
// [SERVER]       thumbnail: 'https://res.cloudinary.com/dgdjwmqzq/image/upload/v1783667747/cloudupload/yxq2oirmdryhtejx1doy.jpg',
// [SERVER]       tag: [Array],
// [SERVER]       category: new ObjectId('699b251c6a29e22f996a6988'),
// [SERVER]       studentsEnrolled: [],
// [SERVER]       totalstudent: 0,
// [SERVER]       instructor: [Object],
// [SERVER]       coursecontent: [Array],
// [SERVER]       ratingandreview: [],
// [SERVER]       instructions: [Array],
// [SERVER]       status: 'Draft',
// [SERVER]       createdAt: 2026-07-10T07:15:48.743Z,
// [SERVER]       __v: 0
// [SERVER]     }
// [SERVER]   ]
// [SERVER] }