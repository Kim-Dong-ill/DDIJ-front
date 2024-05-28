import React, { useEffect, useState } from "react";

//draggable 마커 이벤트 적용하기

//출발지 입력시 해당 주소로 이동하여 마커 찍기
//이후 상세하게 지도 or 마커 움직여서 정확한 중심점 찾기

//
//------------------------------kakao map start----------------------------//
//

function Kakao_start_point({ startCoord, startToggleBox }) {
  const { kakao } = window;
  const [map, setMap] = useState(null); //카카오 map

  const [geocoder, setGeocoder] = useState();
  const [startAddress, setStartAddress] = useState("");

  //출발지 검색start--------------------------------------------------------출발지 검색start----------------------------------------------------------------출발지 검색 start
  useEffect(() => {
    if (!map) {
      mapscript();
    } else {
      setMap(null);
      var mapContainer = document.getElementById("map"),
        mapOption = {
          center: new kakao.maps.LatLng(startCoord[1], startCoord[0]), // 지도의 중심좌표
          level: 4, // 지도의 확대 레벨
          mapTypeId: kakao.maps.MapTypeId.ROADMAP, // 지도종류
        };

      const map = new kakao.maps.Map(mapContainer, mapOption);
      setMap(map);

      // 마우스 휠과 모바일 터치를 이용한 지도 확대, 축소를 막음
      map.setZoomable(false);

      // 확대 축소 컨트롤을 생성하고 지도의 우측에 추가
      var zoomControl = new kakao.maps.ZoomControl();
      map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

      // 마우스 드래그로 지도 이동이 완료되었을 때 마지막 파라미터로 넘어온 함수를 호출하도록 이벤트를 등록합니다
      kakao.maps.event.addListener(map, "dragend", function () {
        // 지도 중심좌표를 얻어옵니다
        var latlng = map.getCenter();
        console.log(latlng);

        console.log("출발 좌표", latlng);
      });
    }
  }, [startCoord, startAddress]);
  //출발지 검색end------------------------------------------------------출발지 검색end-----------------------------------------------------------------출발지 검색 end

  //

  //

  //mapscript start---------------------------------------------------------------------------------------mapscript start
  const mapscript = () => {
    var mapContainer = document.getElementById("map"),
      mapOption = {
        center: new kakao.maps.LatLng(37.4800384, 126.8842496), // 지도의 중심좌표
        level: 5, // 지도의 확대 레벨
        mapTypeId: kakao.maps.MapTypeId.ROADMAP, // 지도종류
      };

    const map = new kakao.maps.Map(mapContainer, mapOption);
    setMap(map);

    // 마우스 휠과 모바일 터치를 이용한 지도 확대, 축소를 막음
    map.setZoomable(false);

    // 확대 축소 컨트롤을 생성하고 지도의 우측에 추가
    var zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
    setStartAddress(startCoord);
  };

  return (
    <div>
      <div id="map" style={{ width: "100%", height: "400px" }}>
        <div className="startMarker">
          <div className="startName">출발지</div>
          <img src="./images/marker.svg" alt="" />
        </div>
      </div>
      <div
        onClick={startToggleBox}
        className="result p-2 border border-da-200 rounded-md m-2 text-center"
      >
        여기로 하기
      </div>
      <p id="result"></p>
    </div>
  );
}

export default Kakao_start_point;
