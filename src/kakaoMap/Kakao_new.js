import React, { useEffect, useState } from "react";
import "../kakaoMap/kakaoMap.css";
import MainSlider from "../components/MainSlider";

const { kakao } = window;

var imageSrc = "./images/marker.svg";
var imageSize = new kakao.maps.Size(40, 42);
var imageOption = { offset: new kakao.maps.Point(20, 42) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
var currentPosition = []; //현재 위치 좌표

const KakaoNew = ({ Coords, circleList, userList }) => {
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

    const [positions, setPositions] = useState([
        // 초기엔 인자로 전달받을것 , 이후엔 현재 중심좌표가 변경될 때마다, axios태워서 가져올것 (=> 성능을위해선 범위제한)
        // 개선방향 => 특정 갯수 만큼 받아와서 보관하고 바운더리안에 특정 갯수보다 적을시 axios 태우기
        {
            title: "카카오",
            latlng: new kakao.maps.LatLng(37.479311460347, 126.8866702429908),
        }
    ]);
    useEffect(() => {
        // circleList를 순회하며 각 인덱스의 { title: cicleList.name, latlng: new kakao.maps.LatLng(좌표)로 해서 전체데이터를 positions에 set
        setMap()
    }, [Coords, circleList, userList]);

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

        const newMarkers = [];
        const HOWMANY = 100;
        var total = 0;
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
                total++;
                newMarkers.push(marker);
            }
        }
        // if(total<HOWMANY){
        // 다시 axios 가서 근처 모임을 가져온다. 이떄 count를 둬서 3번이상 조회했는데도 적으면 그냥 진행
        // // }

        setMarkers(newMarkers);
    };

    //현재위치 가져오는 함수  => 초기에 인자로 받아올거라 필요없어질듯
    const getGeolocation = () => {
        console.log("geolocation 시작");
        if (navigator.geolocation) {
            // GeoLocation을 이용해서 접속 위치를 얻어옵니다
            navigator.geolocation.getCurrentPosition(success, error);

            //성공했을떄
            function success(position) {
                setUserLocation(Coords); //현재 좌표 저장
                setLocationAvailable(true); //위치사용 가능
                currentPosition = position.coords; //현재 좌표 저장
                const time = new Date(position.timestamp); //시각 저장
                const latlng = new kakao.maps.LatLng(
                    Coords.latitude,
                    Coords.longitude
                );
                map.setCenter(latlng); // 사용자의 현재 위치를 지도의 중심 좌표로 설정
                console.log("사용자의 현재 위치: ", latlng);
                console.log(`시간 : ${time} `);

                var locPosition = new kakao.maps.LatLng(latlng.Ma, latlng.La), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
                    messageMarker = '<div style="padding:5px;">여기에 계신가요?!</div>'; // 인포윈도우에 표시될 내용입니다
                // 마커와 인포윈도우를 표시합니다
                var message = "변경된 지도 중심좌표는 " + latlng.getLat() + " 이고, ";
                message += "경도는 " + latlng.getLng() + " 입니다";
                setMessage(message);

                console.log(currentPosition);

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
        kakao.maps.event.addListener(map, "dragend",  ()=>{
            // setIsDrag(true);
            // 지도 중심좌표를 얻어옵니다
            var latlng = map.getCenter();
            setDragMapCenter(latlng);
            setUserLocation({ latitude: latlng.Ma, longitude: latlng.La });
            currentPosition = latlng;
            console.log(currentPosition);

            var message = "변경된 지도 중심좌표는 " + latlng.getLat() + " 이고, ";
            message += "경도는 " + latlng.getLng() + " 입니다";
            setMessage(message);

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

    // getCurrentLocation 함수 호출 추가
    // useEffect(() => {
    //   if (isLocationAvailable || isGeolocaation) {
    //     getCurrentLocation(); // 위치 정보 사용 가능할 때마다 현재 위치 가져오기
    //   }
    // }, [isLocationAvailable, isGeolocaation]);

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

        // 마우스 드래그와 모바일 터치를 이용한 지도 이동을 막음
        // map.setDraggable(false);

        // 마우스 휠과 모바일 터치를 이용한 지도 확대, 축소를 막음
        // map.setZoomable(false);

        // 지도 타입 변경 컨트롤을 생성하고 지도의 상단 우측에 추가
        // var mapTypeControl = new kakao.maps.MapTypeControl();
        // map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

        // 확대 축소 컨트롤을 생성하고 지도의 우측에 추가
        // var zoomControl = new kakao.maps.ZoomControl();
        // map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

        // 마커 초기화
        // initializeMarkers(map);
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

        // 마우스 휠과 모바일 터치를 이용한 지도 확대, 축소를 막음
        // map.setZoomable(false);

        // 확대 축소 컨트롤을 생성하고 지도의 우측에 추가
        // var zoomControl = new kakao.maps.ZoomControl();
        // map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

        // 마커 초기화
        initializeMarkers(map);
    };

    //마커 보이기 클릭시
    const showMarkers = () => {
        markers.forEach((marker) => marker.setMap(map));
    };

    //마커 숨기기 클릭시
    const hideMarkers = () => {
        markers.forEach((marker) => marker.setMap(null));
    };

    //내 위치 보기 클릭시
    const myLocation = () => {
        console.log("내위치보기 클릭");
        document.querySelector(".dragTarget").style.display = "none";
        setIsGeolocation(true);
        setIsDrag(false);
        getCurrentLocation(); // getCurrentLocation 함수 호출
        // getGeolocation();
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
                <MainSlider></MainSlider>
                <div className="flex flex-col absolute bottom-[20px] right-[20px] z-50 gap-2">
                    {/* <button onClick={hideMarkers}>마커 감추기</button> */}
                    {/* <button onClick={showMarkers}>마커 보이기</button> */}
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


export default KakaoNew;