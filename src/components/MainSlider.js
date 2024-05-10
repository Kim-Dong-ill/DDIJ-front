import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "../assets/mainSlider.css";

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
                  <img src={item.img} alt="" />
                </div>
                <div className="text-sm">{item.name}</div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}

export default MainSlider;
