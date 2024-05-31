import React, { useEffect, useState } from "react";
import "../assets/KakaoStrEnd.css";

const { kakao } = window;

//draggable 마커 이벤트 적용하기

//출발지 입력시 해당 주소로 이동하여 마커 찍기
//이후 상세하게 지도 or 마커 움직여서 정확한 중심점 찾기

//
//------------------------------kakao map start----------------------------//
//
// const [centerMa, setCenterMa] = useState();
// const [centerLa, setCenterLa] = useState();
// const [level, setLevel] = useState();

// useEffect(() => {
//   console.log("스타트 엔드");
//   if (startLoc && endLoc) {
//     setPositions([
//       {
//         title: "출발지",
//         latlng: new kakao.maps.LatLng(startLoc[1], startLoc[0]),
//       },
//       {
//         title: "목적지",
//         latlng: new kakao.maps.LatLng(endLoc[1], endLoc[0]),
//       },
//     ]);
//   }
// }, [startLoc, endLoc]);

function Kakao_StrEnd({ startLoc, endLoc }) {
  console.log("@@@@@@@@@", startLoc, endLoc);
  const [map, setMap] = useState(null); //카카오 map
  const [positions, setPositions] = useState([]);
  const [centerMa, setCenterMa] = useState(null);
  const [centerLa, setCenterLa] = useState(null);
  const [level, setLevel] = useState(7); // 초기 zoom level을 기본값으로 설정

  // startLoc와 endLoc가 변경될 때마다 positions 배열을 업데이트
  useEffect(() => {
    if (startLoc && endLoc) {
      const newPositions = [
        {
          title: "출발지",
          latlng: new kakao.maps.LatLng(startLoc[1], startLoc[0]),
        },
        {
          title: "목적지",
          latlng: new kakao.maps.LatLng(endLoc[1], endLoc[0]),
        },
      ];
      setPositions(newPositions);

      const startMa = newPositions[0].latlng.Ma;
      const startLa = newPositions[0].latlng.La;
      const endMa = newPositions[1].latlng.Ma;
      const endLa = newPositions[1].latlng.La;

      const newCenterMa = (startMa + endMa) / 2;
      const newCenterLa = (startLa + endLa) / 2;

      setCenterMa(newCenterMa);
      setCenterLa(newCenterLa);

      const a = Math.abs(startMa - endMa);
      const b = Math.abs(startLa - endLa);
      const c = (a + b) * 1000;
      setLevel(
        c < 9 ? 5 : c < 13 ? 6 : c < 19 ? 6 : c < 26 ? 7 : c < 45 ? 8 : 9
      );
    }
  }, [startLoc, endLoc]);
  // console.log(positions);
  // console.log(centerLa);
  // console.log(centerMa);
  // console.log(level);

  //map, postions가 있을때 마커 생성
  useEffect(() => {
    if (map && positions.length > 0) {
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
          position: positions[i]?.latlng, // 마커를 표시할 위치
          title: positions[i]?.title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
          image: markerImage, // 마커 이미지
        });
      }
    }
  }, [map, positions]);

  //데이터 잘 들어왔을때 지도 생성
  useEffect(() => {
    if (centerMa && centerLa) {
      const mapContainer = document.getElementById("map");
      const mapOption = {
        center: new kakao.maps.LatLng(centerMa, centerLa), // 지도의 중심좌표
        level: level, // 지도의 확대 레벨
        mapTypeId: kakao.maps.MapTypeId.ROADMAP, // 지도종류
      };

      const map = new kakao.maps.Map(mapContainer, mapOption);
      setMap(map);

      // 마우스 휠과 모바일 터치를 이용한 지도 확대, 축소를 막음
      map.setZoomable(false);

      // 확대 축소 컨트롤을 생성하고 지도의 우측에 추가
      const zoomControl = new kakao.maps.ZoomControl();
      map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
    }
  }, [centerMa, centerLa, level]);

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
