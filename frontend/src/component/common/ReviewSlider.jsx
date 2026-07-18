import React, { useEffect, useState } from "react";
import { getallreviews } from "../../services/apicalling/courseapicalling";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import './slider.css'
import { Autoplay, Pagination } from "swiper/modules";
import Ratingcomponent from "../category/Ratingcomponent";

const ReviewSlider = () => {
  const [reviews, setReviews] = useState([]);
  const words = 15;

  useEffect(() => {
    const getReview = async () => {
      const reviewget = await getallreviews();

      if (reviewget) {
        setReviews(reviewget);
      }
    };

    getReview();
  }, []);

  return (
    <div className="text-white">
      <div className="h-[184px]">
        <Swiper
          slidesPerView={4}
          spaceBetween={25}
            pagination={{ clickable: true , dynamicBullets:true }}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
           breakpoints={{
              0: {
                slidesPerView: 1,
              },
             768: {
               slidesPerView: 4,
             },
         }}
          modules={[Pagination, Autoplay]}
          className="w-full"
        >
          {reviews.slice(0, 10).map((review, idx) => (
            <SwiperSlide key={idx}>
              <div className="bg-gray-800 p-4 h-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <img
                    src={review?.user?.image}
                    alt="user"
                    className="h-9 w-9 rounded-full object-cover"
                  />

                  <div>
                    <p className="font-semibold">
                      {review?.user?.firstname} {review?.user?.lastname}
                    </p>

                    <p className="text-sm text-richblack-300">
                      {review?.review?.split(" ").length > words
                        ? review.review
                            .split(" ")
                            .slice(0, words)
                            .join(" ") + "..."
                        : review?.review}
                    </p>
                  </div>
                </div>

                <div className="mt-3 flex justify-center">
                  <Ratingcomponent rating={review?.rating} />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ReviewSlider;