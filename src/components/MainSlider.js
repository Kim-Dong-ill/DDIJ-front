import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "../assets/mainSlider.css";
import { Link } from "react-router-dom";

function MainSlider({ indexPet }) {
  const [iPet, setIPet] = useState([]);
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
  useEffect(() => {
    setIPet(indexPet);
  }, [indexPet]);

  console.log(myDog);
  console.log(iPet);
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
        {/* {iPet?.map((item, idx) => {
          return (
            <SwiperSlide key={idx} className="mapDogListCard ">
              <div>
                <div className=" w-[55px] h-[55px] rounded-full overflow-hidden">
                  <Link to="/appeal/:userid">
                    <img
                      src={`${process.env.REACT_APP_NODE_SERVER_URL}/uploads/${item.image}`}
                      alt=""
                    />
                  </Link>
                </div>
                <div className="text-sm nanumBold">{item.pName}</div>
              </div>
            </SwiperSlide>
          );
        })} */}

        {myDog.map((item, idx) => {
          return (
            <SwiperSlide key={idx} className="mapDogListCard ">
              <div>
                <div className=" w-[55px] h-[55px] rounded-full overflow-hidden">
                  <Link to="/appeal/:userid">
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
