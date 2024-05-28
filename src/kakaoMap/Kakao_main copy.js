import React, { useEffect, useState } from "react";
import "../kakaoMap/kakaoMap.css";
import MainSlider from "../components/MainSlider";

//내위치 허용 안하면 아예 아무것도 안된다.
//추가로 오류창 뜨지 않게 해줘야한다.

// 지도 로드

// <geolocation가능할때>

//    ->현재 위치좌표 가져와서 지도 중심으로 이동(2024-05-01 수정완료)

//    ->현재 위치기준 바운더리 설정해서 true인것만 지도에 보여주기(2024-05-01 수정완료)

//    ->마커 클릭시 해당 약속정보 간략하게 띄워주고 클릭 마커가 지도 중심으로 이동
// 	-약속정보 닫기 누르면 "여기서 검색" 누를시에 이동된 좌표에서 검색
// 	-<2안> 마커 클릭하면 지도 이동하지 않고 map 하단에 1개 리스트 약속정보 올라옴(추천)

//    ->지도 중심좌표가 이동되었을때 "내 위치 보기" 버튼 생성해서 클릭시에만 현 위치 받아와서 뿌려줌(2024-05-01 수정완료)

//    ->지도 드래그 해서 중심좌표 변경되었을때 "여기서 검색" 버튼 생성해서 클릭시 해당 중심좌표 기준으로 바운더리 잡고 마커 생성(2024-05-01 수정완료)

//    ->

// <geolocation불가능할때>

//    ->절대 좌표 설정해서 해당 기본 좌표에 이동

//    ->나머지 동일...

// 1. 회원가입한 본인 주소 기준으로 근처(반경 계산) 해서 근처에 있는 강아지(다른 유저의 주소를 가지고)를 맵 상단에 띄운다. (화면 이동해도 변하지x)
// 2. 본인 위치를 실시간으로 받아서 근처 (반경계산) 해서 근처의 약속 모임을 지도에 띄워진다. (리스트화 시킨다면 정렬 필요할듯? 정렬 기준 필요)
// 3. 처음에 현재 위치의 시.도.군 을 가져와서 해당되는 기준에 대한 데이터만 가져오게 한다.
// 4. 지도를 로드할때 모든 지도에 있는 마커를 다 가져오면 너무 느리다.

//----<추가할 필요가 있는 기능>----
//키워드로 장소검색하고 목록으로 표출하기 --(하)
//좌표로 주소를 얻어내기                --(최상)
//주소로 장소 표시하기                  --(최상)
//마커 클러스터러 사용하기              --(중)

//----<수정할 필요가 있는 부분>----
//마커 클릭시 순간 전체 마커들이 겹쳐지게 찍히고 사라짐 --> ( 마커 그림자 지우면 가능할듯 )
//맨 처음 지도 로드될때나 새로고침할때 마커 안찍힘(2024-05-01 수정완료)
//커스텀 오버레이가 마커보다 우선순위가 낮음
//지도를 클릭하여 마커가 나오면 현재위치마커는 사라짐 (둘다 동시에 나와야하게끔 수정 필요)(클릭시 마커 찍히는 기능 삭제 수정완료)

//----------------------------------(2024-05-01 수정부분 추가)-----------------------//
//마커 클릭시 다른 마커 전부 안보임 (마커 클릭시 오류가 다양하다)
//드래그후 마커 클릭시 다른 오류
//지도를 움직여 중앙좌표 변경후 "현 위치에서 검색"클릭시 마커 새로고침화(2024-05-02 수정완료)
//지도 움직인 후 "내 위치 보기"로 geolocation 사용시 마커 변하지 않음
//현위치로 마커찍는거는 맨 처음 지도 로드될때 찍고 "현위치"버튼 누르면 현위치로 이동하면서 마커 찍기
//드래그후 마커찍는거는 드래그 하면 중심 좌표만 바뀌다가 "이 위치에서 검색" 클릭시 마커 찍히도록(2024-05-02 수정완료)
//마커 보이기, 마커 감추기 수정 필요
//내 위치 보기 계속 클릭시 내 위치 마커 중복 찍힘. (2024-05-02 수정완료)

//----------------------------------(2024-05-02 수정부분 추가)-----------------------//
//드래그시 현재위치 마커 사라지지 않음

//----------------------------------(2024-05-03 수정부분 추가)-----------------------//
//내위치를 두번 클릭해야 현재 좌표에서 마커를 찍어준다.

const { kakao } = window;
//
//------------------------------kakao map start----------------------------//
//
// 마커 이미지의 이미지 주소입니다
var imageSrc = "./images/marker.svg";
var imageSize = new kakao.maps.Size(40, 42);
var imageOption = { offset: new kakao.maps.Point(20, 42) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

var currentPosition = []; //현재 위치 좌표
function Kakao_main({ indexPet }) {
  const [message, setMessage] = useState(""); //지도 클릭시 위도 경도 메세지
  const [map, setMap] = useState(null); //카카오 map
  const [markers, setMarkers] = useState([]); //마커들 표시
  const [currentOverlay, setCurrentOverlay] = useState(null); //오버레이 있으면 (overlay) 오버레이 없으면 null
  const [currentLocationMarker, setCurrentLocationMarker] = useState(null); // 위치 정보 상태 변수 추가
  const [userLocation, setUserLocation] = useState(null); //사용자의 현재 위치 좌표
  const [dragMapCenter, setDragMapCenter] = useState(); //드래그시 맵 중심 좌표
  const [isLocationAvailable, setLocationAvailable] = useState(false); // 사용자 위치가 사용 가능한지 여부
  const [isDrag, setIsDrag] = useState(false); //드래그
  const [isGeolocaation, setIsGeolocation] = useState(false); //내위치
  // const [isBoundery, setIsBoundery] = useState(); //바운더리 안에 있는지 없는지

  //초기 마커 배열
  const [positions, setPositions] = useState([
    {
      title: "카카오",
      latlng: new kakao.maps.LatLng(37.479311460347, 126.8866702429908),
    },
    {
      title: "생태연못",
      latlng: new kakao.maps.LatLng(37.4761376343048, 126.8843235209789),
    },
    {
      title: "텃밭",
      latlng: new kakao.maps.LatLng(37.47941009051748, 126.87717317821058),
    },
    {
      title: "근린공원",
      latlng: new kakao.maps.LatLng(37.48622254460432, 126.87797612110123),
    },
    {
      title: "아무곳",
      latlng: new kakao.maps.LatLng(37.48587053082275, 126.88638897195683),
    },
    {
      title: "아무곳",
      latlng: new kakao.maps.LatLng(37.48184075616303, 126.89363105403429),
    },
    {
      title: "아무곳",
      latlng: new kakao.maps.LatLng(37.472827784332004, 126.89047846655862),
    },
    {
      title: "아무곳",
      latlng: new kakao.maps.LatLng(37.48839922696368, 126.89267194986982),
    },
    {
      title: "아무곳",
      latlng: new kakao.maps.LatLng(37.47798819362497, 126.89788743524126),
    },
    {
      title: "아무곳",
      latlng: new kakao.maps.LatLng(37.47198455870856, 126.8760096376654),
    },
    {
      title: "아무곳",
      latlng: new kakao.maps.LatLng(37.46896653243736, 126.88528413136493),
    },
    {
      title: "아무곳",
      latlng: new kakao.maps.LatLng(37.49268343334169, 126.88773559566658),
    },
    {
      title: "아무곳",
      latlng: new kakao.maps.LatLng(37.473483034315564, 126.89775790505735),
    },
  ]);

  //초기 마커 추가해놓기
  const initializeMarkers = (map) => {
    //바운더리 설정
    const bounds = new kakao.maps.LatLngBounds();
    bounds.extend(
      //중심값에서 바운더리 확장
      new kakao.maps.LatLng(
        userLocation.latitude - 0.007,
        userLocation.longitude - 0.007
      )
    );
    bounds.extend(
      new kakao.maps.LatLng(
        userLocation.latitude + 0.007,
        userLocation.longitude + 0.007
      )
    );
    //  {
    //   title: "카카오",
    //   latlng: new kakao.maps.LatLng(37.479311460347, 126.8866702429908),
    // },
    const newMarkers = [];
    //기존 마커 배열 지도에 표시
    for (let i = 0; i < positions.length; i++) {
      const latlng = positions[i].latlng;
      //바운더리 안에 있다면 (true라면)
      if (bounds.contain(latlng)) {
        console.log(bounds.contain(latlng));
        const marker = addMarker(
          positions[i],
          map,
          imageSrc,
          imageSize,
          imageOption
        );
        newMarkers.push(marker);
      }
    }
    setMarkers(newMarkers);
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
      navigator.geolocation.getCurrentPosition(success, error);

      //성공했을떄
      function success(position) {
        setUserLocation(position.coords); //현재 좌표 저장
        setLocationAvailable(true); //위치사용 가능
        // currentPosition = position.coords; //현재 좌표 저장
        const time = new Date(position.timestamp); //시각 저장
        const latlng = new kakao.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        );
        map.setCenter(latlng); // 사용자의 현재 위치를 지도의 중심 좌표로 설정
        console.log("사용자의 현재 위치: ", latlng);
        console.log(`시간 : ${time} `);

        var locPosition = new kakao.maps.LatLng(latlng.Ma, latlng.La), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
          messageMarker = '<div style="padding:5px;">여기에 계신가요?!</div>'; // 인포윈도우에 표시될 내용입니다
        // 마커와 인포윈도우를 표시합니다
        // var message = "변경된 지도 중심좌표는 " + latlng.getLat() + " 이고, ";
        // message += "경도는 " + latlng.getLng() + " 입니다";
        // setMessage(message);

        // console.log(currentPosition);

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
      setMessage(message);
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
      currentPosition = latlng;
      console.log(currentPosition);

      // var message = "변경된 지도 중심좌표는 " + latlng.getLat() + " 이고, ";
      // message += "경도는 " + latlng.getLng() + " 입니다";
      // setMessage(message);

      document.querySelector(".dragTarget").style.display = "block";
    });

    setIsDrag(false);
  };

  // getCurrentLocation 함수 정의
  const getCurrentLocation = () => {
    console.log("getCurrentLocation 시작");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);

      function success(position) {
        setUserLocation(position.coords); // 사용자의 현재 위치 좌표 상태 업데이트
        console.log("사용자의 현재 위치: ", position.coords);
      }

      function error(error) {
        console.log("geolocation 오류" + error.code + ":" + error.message);
      }
    } else {
      console.log("geolocation 사용 불가능");
    }
  };
  //
  //
  //
  //
  //
  //
  //
  //

  //map, postions, currentOverlay 동작 useEffect
  useEffect(() => {
    if (!map) {
      mapscript();
    } else {
      //geolocation start
      if (isDrag === false) {
        getGeolocation(); //현재위치 가져오는 함수
      }
      getDragLocation(); //드래그위치 가져오는 함수
    }
  }, [map, positions, currentOverlay]);

  //위치정보 동작, 드래그 동작, 내위치 클릭 useEffect
  useEffect(() => {
    if (isLocationAvailable || isDrag || isGeolocaation) {
      initializeMap(); // 위치 정보 사용 가능할 때마다 지도 초기화
    }
  }, [isLocationAvailable, isDrag, isGeolocaation]);

  // 지도에 마커와 인포윈도우를 표시하는 함수입니다
  function displayMarker(locPosition, message) {
    // 이전 마커가 있으면 제거
    if (currentLocationMarker) {
      currentLocationMarker.setMap(null);
    }

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
    setCurrentLocationMarker(marker);

    // 지도 중심좌표를 접속위치로 변경합니다
    map.setCenter(locPosition);
  }
  //mapscript 시작---------------------------------------------------------------------------------------mapscript start
  const mapscript = () => {
    var mapContainer = document.getElementById("map"),
      mapOption = {
        center: new kakao.maps.LatLng(37.4800384, 126.8842496), // 지도의 중심좌표
        level: 5, // 지도의 확대 레벨
        mapTypeId: kakao.maps.MapTypeId.ROADMAP, // 지도종류
      };

    const map = new kakao.maps.Map(mapContainer, mapOption);
    setMap(map);
  };
  //mapscript 끝------------------------------------------------------------------------------------------mapscript end

  //위치정보 사용 가능하면 (true)
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

  //내 위치 보기 클릭시
  const myLocation = () => {
    console.log("내위치보기 클릭");
    document.querySelector(".dragTarget").style.display = "none";
    setIsGeolocation(true);
    setIsDrag(false);
    // getCurrentLocation(); // getCurrentLocation 함수 호출
    getGeolocation();
  };

  //현 위치에서 보기 클릭시
  const dragLocation = () => {
    setIsDrag(true);
    setIsGeolocation(false);
    document.querySelector(".dragTarget").style.display = "block";
  };

  //addMarker
  const addMarker = (position, map, imageSrc, imageSize, imageOption) => {
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
      position: position.latlng, // 마커를 표시할 위치
      title: position.title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
      image: markerImage, // 마커 이미지
    });
    setMarkers((prevMarkers) => [...prevMarkers, marker]);

    // 마커를 클릭했을 때 커스텀 오버레이를 표시합니다
    kakao.maps.event.addListener(marker, "click", function () {
      console.log("마커 클릭event");

      //오버레이가 있을때 오버레이 지우기
      if (currentOverlay) {
        return currentOverlay.setMap(null);
      } else {
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

        var overlayContent = `
          <div class="wrap">
          <div class="info">
          <div class="title">
          ${position.title}
          <button><div class="close" title="닫기"></div></button>
          </div>
                  <div class="body">
                    <div class="img">
                    <img src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/thumnail.png" style={{width:"73px",height:"70px"}}>
                    </div>
                    <div class="desc">
                    <div class="ellipsis">aaaaaaa 242</div>
                    <div class="jibun ellipsis">(우) 63309 (지번) 영평동 2181</div>
                    <div><a href="https://www.kakaocorp.com/main" class="link">홈페이지</a></div>
                    </div>
                    </div>
                    </div>
                    </div>`;

        // 마커 위에 커스텀오버레이를 표시합니다
        // 마커를 중심으로 커스텀 오버레이를 표시하기위해 CSS를 이용해 위치를 설정했습니다
        var overlay = new kakao.maps.CustomOverlay({
          content: overlayContent,
          position: marker.getPosition(),
        });

        // overlayContent를 DOM 요소로 변환합니다.
        var overlayElement = document.createElement("div");
        overlayElement.innerHTML = overlayContent.trim();

        // 닫기 버튼을 선택합니다.
        var closeButton = overlayElement.querySelector(".close");
        console.log(closeButton);

        // 닫기 버튼에 클릭 이벤트를 추가합니다.
        closeButton.addEventListener("click", function (event) {
          console.log("closeBtn 클릭");
          event.stopPropagation(); //지도 클릭 이벤트 전파되는걸 방지
          closeOverlay(overlay);
        });

        // overlay에 클릭 이벤트를 추가하여 닫기 버튼을 클릭할 때 오버레이만 닫히도록 설정합니다.
        kakao.maps.event.addListener(overlay, "click", function (event) {
          console.log("오버레이 클릭event");
          // 클릭한 요소가 닫기 버튼인 경우에만 오버레이를 닫음
          if (event.target.classList.contains("close")) {
            console.log("오버레이 닫기 클릭");
            closeOverlay(overlay);
          }
        });

        // 지도를 클릭했을 때 마커가 추가되는 것을 방지합니다.
        const mapClickListener = function () {
          console.log("지도 클릭으로 오버레이 닫기");
          // 커스텀 오버레이가 열려있는 경우 닫기 함수를 호출합니다.

          closeOverlay(overlay);
        };

        // 커스텀 오버레이 닫기 함수에서 호출되므로 오버레이가 닫힌 후에 지도 클릭 이벤트 리스너를 다시 등록합니다.
        kakao.maps.event.addListener(overlay, "close", function () {
          console.log("오버레이가 닫혔습니다.");
          // 지도 클릭 이벤트 리스너를 다시 등록합니다.
          kakao.maps.event.addListener(map, "click", mapClickListener);
        });

        // 기존에 등록된 클릭 이벤트 리스너를 삭제합니다.
        kakao.maps.event.removeListener(map, "click", mapClickListener);
        // 새로운 클릭 이벤트 리스너를 등록합니다.
        kakao.maps.event.addListener(map, "click", mapClickListener);

        overlay.setMap(map);
        setCurrentOverlay(overlay); //CurrentOverlay를 overlay로 변경
      }
    });
  };

  //커스텀 오버레이 닫기 함수
  function closeOverlay(overlay) {
    console.log("오버레이 닫힘");
    overlay.setMap(null); //이거 오버레이 닫기 기능 안됨 수정 필요
    setMap(null); //이거 오버레이 닫기 기능 안됨 수정 필요
    setCurrentOverlay(null); //오버레이 null로 변경
  }

  function test() {
    alert("주변 강아지 클릭 event");
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
