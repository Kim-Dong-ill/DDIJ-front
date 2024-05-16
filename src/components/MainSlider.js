import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "../assets/mainSlider.css";
import { Link } from "react-router-dom";

function MainSlider() {
  const myDog = [
    {
      img: "./images/main_dog1.svg",
      name: "나무",
    },
    {
      img: "./images/main_dog1.svg",
      name: "나무",
    },
    {
      img: "./images/main_dog1.svg",
      name: "나무",
    },
    {
      img: "./images/main_dog1.svg",
      name: "나무",
    },
    {
      img: "./images/main_dog1.svg",
      name: "나무",
    },
    {
      img: "./images/main_dog1.svg",
      name: "나무",
    },
    {
      img: "./images/main_dog1.svg",
      name: "나무",
    },
    {
      img: "./images/main_dog1.svg",
      name: "나무",
    },
    {
      img: "./images/main_dog1.svg",
      name: "나무",
    },
    {
      img: "./images/main_dog1.svg",
      name: "나무",
    },
    {
      img: "./images/main_dog1.svg",
      name: "나무",
    },
    {
      img: "./images/main_dog1.svg",
      name: "나무",
    },
    {
      img: "./images/main_dog1.svg",
      name: "나무",
    },
    {
      img: "./images/main_dog1.svg",
      name: "나무",
    },
    {
      img: "./images/main_dog1.svg",
      name: "나무",
    },
  ];
  return (
    <>
      <Swiper
        slidesPerView={5}
        spaceBetween={0}
        pagination={{
          clickable: true,
        }}
        // modules={[Pagination]}
        className="mapDogList"
      >
        {myDog.map((item, idx) => {
          return (
            <SwiperSlide key={idx} className="mapDogListCard ">
              <div>
                <div className=" w-[55px] h-[55px] rounded-full overflow-hidden">
                  <Link to="/appeal/:petid">
                    <img src={item.img} alt="" />
                  </Link>
                </div>
                <div className="text-sm nanumBold">{item.name}</div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}

export default MainSlider;
