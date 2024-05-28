import React, { useEffect, useState } from "react";
import "../kakaoMap/kakaoMap.css";
import MainSlider from "../components/MainSlider";
import axiosInstance from "../utils/axios";

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

  useEffect(() => {
    if (!map) {
      mapscript();
    } else {
      initializeMarkers(map);
      //geolocation start
      if (isDrag === false) {
        getGeolocation(); //현재위치 가져오는 함수
      }
      getDragLocation(); //드래그위치 가져오는 함수
    }
  }, [map]);

  const mapscript = () => {
    var mapContainer = document.getElementById("map"),
      mapOption = {
        center: new kakao.maps.LatLng(37.4800384, 126.8842496), // 지도의 중심좌표
        level: 5, // 지도의 확대 레벨
        mapTypeId: kakao.maps.MapTypeId.ROADMAP, // 지도종류
      };

    const map = new kakao.maps.Map(mapContainer, mapOption);
    setMap(map);
    initializeMarkers(map);
  };

  //현재위치 가져오는 함수
  const getGeolocation = () => {
    console.log("geolocation 시작");
    if (navigator.geolocation) {
      var options = {
        // 가능한 경우, 높은 정확도의 위치(예를 들어, GPS 등) 를 읽어오려면 true로 설정
        // 그러나 이 기능은 배터리 지속 시간에 영향을 미친다.
        enableHighAccuracy: true,

        // 위치 정보를 받기 위해 얼마나 오랫동안 대기할 것인가?
        // 기본값은 Infinity이므로 getCurrentPosition()은 무한정 대기한다.
        timeout: 15000, // 15초 이상 기다리지 않는다.
      };

      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(success, error, options);

      //성공했을떄
      async function success(position) {
        setLocationAvailable(true); //위치사용 가능
        // currentPosition = position.coords; //현재 좌표 저장
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
      // setIsDrag(true);
      // 지도 중심좌표를 얻어옵니다
      var latlng = map.getCenter();
      setDragMapCenter(latlng);
      setUserLocation({ latitude: latlng.Ma, longitude: latlng.La });

      document.querySelector(".dragTarget").style.display = "block";
    });

    setIsDrag(true);
  };

  //반경 구해서 모임 가져오기
  useEffect(() => {
    async function findCircle() {
      // const body = userLocation;
      const body = {
        //임시
        lon: 126.943232,
        lat: 37.5062528,
      };
      console.log(body);
      const res = await axiosInstance.post("/index/geolocation", body);
      console.log(res.data);
      setCircles(res.data.circles);
      initializeMarkers(map);
      // for (let i = 0; i < res.data.circles.length; i++) {
      //   console.log(res.data.circles[i]);
      // }
    }
    findCircle();
  }, [userLocation]);

  // 초기 마커 추가해놓기
  const initializeMarkers = (map) => {
    console.log("aaaaaaaaa");
    console.log(circles);
    const newMarkers = [];
    if (circles) {
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
    }
    setMarkers(newMarkers);
  };
  // initializeMarkers();

  const initializeMap = () => {
    setMap(null);
    console.log("initializeMap : true");
    console.log(userLocation);
    var mapContainer = document.getElementById("map");
    var mapOption = {
      center: new kakao.maps.LatLng(
        userLocation.latitude,
        userLocation.longitude
      ),
      level: 5,
      mapTypeId: kakao.maps.MapTypeId.ROADMAP,
    };
    const map = new kakao.maps.Map(mapContainer, mapOption);
    setMap(map);

    // 마커 초기화
    initializeMarkers(map);
  };

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
      // title: title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
      image: markerImage, // 마커 이미지
    });

    // 마커를 클릭
    kakao.maps.event.addListener(marker, "click", function () {
      console.log("마커 클릭event");

      //마커 클릭시 해당 마커로 중심좌표 이동
      var mapContainer = document.getElementById("map"),
        mapOption = {
          center: new kakao.maps.LatLng(
            marker.getPosition().Ma,
            marker.getPosition().La
          ), // 지도의 중심좌표
          level: 5, // 지도의 확대 레벨
          mapTypeId: kakao.maps.MapTypeId.ROADMAP, // 지도종류
        };
      const map = new kakao.maps.Map(mapContainer, mapOption);
      setMap(map);
    });
  };

  //위치정보 동작, 드래그 동작, 내위치 클릭 useEffect
  // useEffect(() => {
  //   if (!map) {
  //     mapscript();
  //   } else {
  //     if (isLocationAvailable || isDrag || isGeolocaation) {
  //       initializeMap(); // 위치 정보 사용 가능할 때마다 지도 초기화
  //     }
  //   }
  // }, [isLocationAvailable, isDrag, isGeolocaation]);

  //내 위치 보기 클릭시
  const myLocation = () => {
    console.log("내위치보기 클릭");
    document.querySelector(".dragTarget").style.display = "none";
    setIsGeolocation(true);
    setIsDrag(false);
    // getCurrentLocation(); // getCurrentLocation 함수 호출
    getGeolocation();
    setMap(null);
  };

  //현 위치에서 보기 클릭시
  const dragLocation = () => {
    setIsDrag(true);
    setIsGeolocation(false);
    document.querySelector(".dragTarget").style.display = "block";
    setMap(null);
  };

  function displayMarker(locPosition, message) {
    // 이전 마커가 있으면 제거
    // if (currentLocationMarker) {
    //   currentLocationMarker.setMap(null);
    // }

    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({
      map: map,
      position: locPosition,
    });

    var iwContent = message, // 인포윈도우에 표시할 내용
      iwRemoveable = true;

    // 인포윈도우를 생성합니다
    var infowindow = new kakao.maps.InfoWindow({
      content: iwContent,
      removable: iwRemoveable,
    });

    // 인포윈도우를 마커위에 표시합니다
    infowindow.open(map, marker);

    // 현재 마커를 상태 변수에 저장
    // setCurrentLocationMarker(marker);

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
            현재 위치로
            <i class="fa-regular fa-compass"></i>
          </button>
        </div>
      </div>
    </>
  );
}

export default Kakao_main;
