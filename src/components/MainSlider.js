import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "../assets/mainSlider.css";
import { Link } from "react-router-dom";

function MainSlider({ indexPet }) {
  const [iPet, setIPet] = useState([]);

  useEffect(() => {
    if (indexPet) {
      const indexPetArray = Object.values(indexPet);
      setIPet(indexPetArray);
    }
  }, [indexPet]);

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
        {iPet?.map((item, idx) => {
          return (
            <SwiperSlide key={idx} className="mapDogListCard ">
              <div>
                <div className=" w-[55px] h-[55px] rounded-full overflow-hidden">
                  <Link to={`/appeal/${item.user}`}>
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
        })}
      </Swiper>
    </>
  );
}

export default MainSlider;
