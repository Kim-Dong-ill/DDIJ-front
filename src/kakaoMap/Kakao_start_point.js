import React, { useEffect, useState } from "react";

function Kakao_start_point({ startCoord, startToggleBox, handleDragLoc }) {
  const { kakao } = window;
  const [map, setMap] = useState(null); // 카카오 map

  useEffect(() => {
    if (startCoord) {
      const mapContainer = document.getElementById("startMap");
      const mapOption = {
        center: new kakao.maps.LatLng(startCoord[1], startCoord[0]), // 지도의 중심좌표
        level: 4, // 지도의 확대 레벨
        mapTypeId: kakao.maps.MapTypeId.ROADMAP, // 지도종류
      };

      const newMap = new kakao.maps.Map(mapContainer, mapOption);
      setMap(newMap);

      // 확대 축소 컨트롤을 생성하고 지도의 우측에 추가
      const zoomControl = new kakao.maps.ZoomControl();
      newMap.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

      // 마우스 드래그로 지도 이동이 완료되었을 때 호출
      kakao.maps.event.addListener(newMap, "dragend", function () {
        const latlng = newMap.getCenter();
        // console.log("출발지 좌표", latlng);
        const coordinates = [Number(latlng.La), Number(latlng.Ma)];
        console.log("출발지 좌표", coordinates);
        handleDragLoc(coordinates);
      });
    }
  }, [startCoord]);

  return (
    <div>
      <div
        className="relative"
        id="startMap"
        style={{ width: "100%", height: "400px" }}
      >
        <div className="endMarker z-50">
          <img className="w-[35px]" src="./images/marker.svg" alt="" />
        </div>
      </div>
      <div
        onClick={startToggleBox}
        className="result p-2 border border-da-200 rounded-md m-2 text-center"
      >
        여기로 하기
      </div>
    </div>
  );
}

export default Kakao_start_point;
