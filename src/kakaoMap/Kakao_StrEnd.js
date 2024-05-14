import React, { useEffect, useState } from "react";
import "../assets/KakaoStrEnd.css";

const { kakao } = window;

//draggable 마커 이벤트 적용하기

//출발지 입력시 해당 주소로 이동하여 마커 찍기
//이후 상세하게 지도 or 마커 움직여서 정확한 중심점 찾기

//
//------------------------------kakao map start----------------------------//
//

function Kakao_StrEnd() {
  const [map, setMap] = useState(null); //카카오 map
  const [positions, setPositions] = useState([
    {
      title: "출발지",
      latlng: new kakao.maps.LatLng(33.452505, 126.578977),
    },
    {
      title: "목적지",
      latlng: new kakao.maps.LatLng(33.450936, 126.569477),
    },
  ]);

  const startMa = positions[0].latlng.Ma;
  const startLa = positions[0].latlng.La;
  const endMa = positions[1].latlng.Ma;
  const endLa = positions[1].latlng.La;

  const centerMa = (startMa + endMa) / 2;
  const centerLa = (startLa + endLa) / 2;

  const a = Math.abs(startMa - endMa);
  const b = Math.abs(startLa - endLa);
  const c = (a + b) * 1000;
  const [level, setLevel] = useState(c < 9 ? 4 : c < 13 ? 5 : c < 17 ? 6 : 7);

  //출발지 검색start--------------------------------------------------------출발지 검색start----------------------------------------------------------------출발지 검색 start
  useEffect(() => {
    if (!map) {
      mapscript();
    } else {
      for (var i = 0; i < positions.length; i++) {
        // 마커 이미지의 이미지 주소입니다
        var imageSrc = `../images/StartEndLoc${i}.svg`;
        // 마커 이미지의 이미지 크기 입니다
        var imageSize = new kakao.maps.Size(41, 49);

        // 마커 이미지를 생성합니다
        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

        // 마커를 생성합니다
        var marker = new kakao.maps.Marker({
          map: map, // 마커를 표시할 지도
          position: positions[i].latlng, // 마커를 표시할 위치
          title: positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
          image: markerImage, // 마커 이미지
        });
      }
    }
  }, [map]);
  //출발지 검색end------------------------------------------------------출발지 검색end-----------------------------------------------------------------출발지 검색 end

  //

  //

  //mapscript start---------------------------------------------------------------------------------------mapscript start
  const mapscript = () => {
    var mapContainer = document.getElementById("map"),
      mapOption = {
        center: new kakao.maps.LatLng(centerMa, centerLa), // 지도의 중심좌표
        level: level, // 지도의 확대 레벨
        mapTypeId: kakao.maps.MapTypeId.ROADMAP, // 지도종류
      };

    const map = new kakao.maps.Map(mapContainer, mapOption);
    setMap(map);

    // 마우스 휠과 모바일 터치를 이용한 지도 확대, 축소를 막음
    map.setZoomable(false);

    // 확대 축소 컨트롤을 생성하고 지도의 우측에 추가
    var zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
  };
  //mapscript end------------------------------------------------------------------------------------------mapscript end

  //

  return (
    <>
      <div id="map" className="w-[100%] h-[100%]">
        <div className="startEndLocMarker">
          {positions.map((item, idx) => {
            return (
              <div key={idx} style={{ listStyle: "none" }}>
                <div className="startEndMarkerImg">
                  <img src={`../images/StartEndLoc${idx}.svg`} alt="" />
                </div>
                <div className="startEndTitle">{item.title}</div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Kakao_StrEnd;
