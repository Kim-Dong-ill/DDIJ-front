import React, { useEffect, useState } from "react";
import "../kakaoMap/kakaoMap.css";
import MainSlider from "../components/MainSlider";
import axiosInstance from "../utils/axios";
import { toast } from "react-toastify";

const { kakao } = window;
// 마커 이미지의 이미지 주소입니다
var imageSrc = "./images/marker.svg";
var imageSize = new kakao.maps.Size(40, 42);
var imageOption = { offset: new kakao.maps.Point(20, 42) }; // 마커이미지의 옵션입니다.
function Kakao_main({ indexPet }) {
  const [map, setMap] = useState(null); //카카오 map
  const [userLocation, setUserLocation] = useState(null); //사용자의 현재 위치 좌표
  const [dragMapCenter, setDragMapCenter] = useState(); //드래그시 맵 중심 좌표
  const [isLocationAvailable, setLocationAvailable] = useState(false); // 사용자 위치가 사용 가능한지 여부
  const [isDrag, setIsDrag] = useState(false); //드래그
  const [isGeolocaation, setIsGeolocation] = useState(false); //내위치
  const [circles, setCircles] = useState([]); //모임 배열
  const [markers, setMarkers] = useState([]); //마커들 표시
  const [currentLocationMarker, setCurrentLocationMarker] = useState(null); // 위치 정보 상태 변수 추가
  const [markersInitialized, setMarkersInitialized] = useState(false);

  useEffect(() => {
    if (!map) {
      mapscript();
    } else {
      getGeolocation(); //현재위치 가져오는 함수

      getDragLocation(); //드래그위치 가져오는 함수
    }
  }, [map]);

  const mapscript = () => {
    console.log("mapscript시작");
    var mapContainer = document.getElementById("map"),
      mapOption = {
        center: new kakao.maps.LatLng(37.4800384, 126.8842496), // 지도의 중심좌표
        level: 5, // 지도의 확대 레벨
        mapTypeId: kakao.maps.MapTypeId.ROADMAP, // 지도종류
      };

    const map = new kakao.maps.Map(mapContainer, mapOption);
    setMap(map);
  };

  //현재위치 가져오는 함수
  const getGeolocation = () => {
    console.log("geolocation 시작");
    if (navigator.geolocation) {
      var options = {
        // 가능한 경우, 높은 정확도의 위치(예를 들어, GPS 등) 를 읽어오려면 true로 설정
        enableHighAccuracy: true,

        // 위치 정보를 받기 위해 얼마나 오랫동안 대기할 것인가?
        timeout: 15000, // 15초 이상 기다리지 않는다.
      };

      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(success, error, options);

      //성공했을떄
      async function success(position) {
        setLocationAvailable(true); //위치사용 가능
        const time = new Date(position.timestamp); //시각 저장
        const coordinates = {
          lon: position.coords.longitude,
          lat: position.coords.latitude,
        };
        setUserLocation(coordinates); //현재 좌표 저장
        console.log(coordinates);

        const latlng = new kakao.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        );
        map.setCenter(latlng); // 사용자의 현재 위치를 지도의 중심 좌표로 설정
        console.log(`시간 : ${time} `);

        var locPosition = new kakao.maps.LatLng(latlng.Ma, latlng.La), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
          messageMarker = '<div style="padding:5px;">여기에 계신가요?!</div>'; // 인포윈도우에 표시될 내용입니다

        setIsGeolocation(false);
        displayMarker(locPosition, messageMarker);
      }

      //실패했을때
      function error(error) {
        setLocationAvailable(false); //위치 사용 불가
        console.log("geolocation 오류" + error.code + ":" + error.message);
        toast.info("GPS로 위치를 가져올수 없어요ㅠㅠ", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
      var locPosition = new kakao.maps.LatLng(33.450701, 126.570667), //geolocation 실패했을때 기본좌표
        message = "이 브라우저에서는 geolocation을 사용할수 없어요..";

      // 마커와 인포윈도우를 표시합니다
      displayMarker(locPosition, message);
    }
  };

  //드래그위치 가져오는 함수
  const getDragLocation = () => {
    console.log("드래그 위치 시작");

    //드래그 중심좌표 얻어오는 함수
    kakao.maps.event.addListener(map, "dragend", function () {
      // setMarkers(null);
      // setIsDrag(true);
      // 지도 중심좌표를 얻어옵니다
      var latlng = map.getCenter();

      setDragMapCenter([latlng.Ma, latlng.La]); //드래그 중심좌표 저장

      document.querySelector(".dragTarget").style.display = "block";
    });
  };

  //현재 위치로 보기 버튼 클릭시 좌표반경 데이터 가져오기
  async function findDragLoc() {
    try {
      console.log("현재위치로 보기 버튼 클릭시 데이터가져오기");
      // console.log("@@@@@@@@@@", dragMapCenter);
      const body = {
        lon: dragMapCenter[1],
        lat: dragMapCenter[0],
      };
      const res = await axiosInstance.post("/index/geolocation/drag", body);
      console.log("드래그좌표 근처 모임 찾기", res.data);
      setCircles(res.data.circles);
      clearMarkers();
      initializeMarkers(map);
    } catch (error) {
      console.log(error);
    }
  }

  //내 위치로 보기 클릭시 좌표반경 데이터 가져오기
  async function findCircle() {
    console.log("내위치로 보기 클릭시 죄표 반경");
    const body = userLocation;
    // const body = {
    //   //임시
    //   lon: 126.943232,
    //   lat: 37.5062528,
    // };
    console.log(body);
    try {
      const res = await axiosInstance.post("/index/geolocation", body);
      console.log("geoLoc위치로 모임 가져오기", res.data);
      setCircles(res.data.circles || []);
      clearMarkers();
      initializeMarkers(map);
    } catch (error) {
      console.log(error);
    }
  }

  //반경 구해서 모임 가져오기
  useEffect(() => {
    console.log("반경 구해서 모임 가져오기");
    async function findCircle() {
      const body = userLocation;

      console.log(body);
      try {
        const res = await axiosInstance.post("/index/geolocation", body);
        console.log(res.data);
        setCircles(res.data.circles);
        setMarkersInitialized(true);
        initializeMarkers(map);
      } catch (error) {
        console.log(error);
      }
    }
    findCircle();
  }, []);

  useEffect(() => {
    initializeMarkers(map);
  }, [markersInitialized, circles, map]);

  //모임 마커 추가
  const initializeMarkers = (map) => {
    console.log("초기 마커 추가");
    console.log(circles);

    clearMarkers();
    const newMarkers = [];
    if (circles && circles.length > 0) {
      //기존 마커 배열 지도에 표시
      for (let i = 0; i < circles.length; i++) {
        let latlng = new kakao.maps.LatLng(
          circles[i].startLoc.coordinates[1],
          circles[i].startLoc.coordinates[0]
        );
        console.log(latlng);
        const marker = addMarker(latlng, map, imageSrc, imageSize, imageOption);
        newMarkers.push(marker);
      }
      setMarkers(newMarkers);
    }
  };

  // 마커 제거 함수
  const clearMarkers = () => {
    if (markers) {
      markers.forEach((marker) => {
        if (marker && marker.setMap) {
          marker.setMap(null);
        }
      });
      setMarkers([]); // markers 배열 초기화
    }
  };

  //마커 생성
  const addMarker = (latlng, map, imageSrc, imageSize, imageOption) => {
    if (!map) return;
    console.log("마커 생성(addMarker)");

    // 마커 이미지를 생성합니다
    var markerImage = new kakao.maps.MarkerImage(
      imageSrc,
      imageSize,
      imageOption
    );
    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({
      map: map, // 마커를 표시할 지도
      position: latlng, // 마커를 표시할 위치
      image: markerImage, // 마커 이미지
    });
    console.log("마커 생성 완료");
    return marker; // 마커 객체 반환
  };

  //내 위치 보기 클릭시
  const myLocation = () => {
    console.log("내위치보기 클릭");
    clearMarkers();
    document.querySelector(".dragTarget").style.display = "none";
    setIsGeolocation(true);
    setIsDrag(false);
    getGeolocation();
    findCircle(); //axios 태우는 함수
  };

  //현 위치에서 보기 클릭시
  const dragLocation = () => {
    document.querySelector(".dragTarget").style.display = "block";
    findDragLoc(); //axios 태우는 함수
  };

  //유저 위치 마커 추가
  function displayMarker(locPosition, message) {
    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({
      map: map,
      position: locPosition,
    });

    // 현재 마커를 상태 변수에 저장
    setCurrentLocationMarker(marker);

    // 지도 중심좌표를 접속위치로 변경합니다
    map.setCenter(locPosition);
  }

  return (
    <>
      <div
        className="relative"
        id="map"
        style={{
          width: "500px",
          height: "calc(100vh - 65px)",
          // position: "relative",
        }}
      >
        <div className="dragTarget">
          <i className="fa-solid fa-location-crosshairs"></i>
        </div>
        <MainSlider indexPet={indexPet} />
        <div className="flex flex-col absolute bottom-[20px] right-[20px] z-50 gap-2">
          <button
            className="bg-ye-600 px-3 py-1 rounded-full flex items-center gap-1"
            onClick={myLocation}
          >
            내위치 보기
            <i className="fa-solid fa-location-crosshairs"></i>
          </button>
          <button
            className="bg-ye-600 px-3 py-1 rounded-full flex items-center gap-1"
            onClick={dragLocation}
          >
            현위치 검색
            <i class="fa-regular fa-compass"></i>
          </button>
        </div>
      </div>
    </>
  );
}

export default Kakao_main;
