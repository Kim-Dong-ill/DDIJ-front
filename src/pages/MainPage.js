import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Kakao_main from "../kakaoMap/Kakao_main";
import { useSelector } from "react-redux";
import axiosInstance from "../utils/axios";

function MainPage() {
  const [userAddress, setUserAddress] = useState();
  const [indexPet, setIndexPet] = useState([]); //상단 메인 반려견 슬라이더 배열

  const state = useSelector((state) => {
    return state;
  });

  useEffect(() => {
    try {
      async function findUser() {
        if (state) {
          const body = {
            lon: state.user.userData.user.location.coordinates[0],
            lat: state.user.userData.user.location.coordinates[1],
          };
          const res = await axiosInstance.post("/index/location", body);
          // console.log(res.data);
          setIndexPet((prevState) => [
            { ...prevState, ...res.data.filteredPets },
          ]);
        }
      }
      findUser();
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <div className="bg-ye-100" style={{ height: "calc(100vh - 65px)" }}>
      <Kakao_main indexPet={indexPet[0]} />
      <Navbar />
    </div>
  );
}

export default MainPage;
