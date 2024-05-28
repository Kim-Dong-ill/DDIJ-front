import React, { useEffect, useState } from "react";

function Kakao_point({ endCoord, endToggleBox }) {
  const { kakao } = window;
  const [map, setMap] = useState(null); // 카카오 map

  useEffect(() => {
    if (endCoord) {
      const mapContainer = document.getElementById("endMap");
      const mapOption = {
        center: new kakao.maps.LatLng(endCoord[1], endCoord[0]), // 지도의 중심좌표
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
        console.log("목적지 좌표", latlng);
      });
    }
  }, [endCoord]);

  return (
    <div>
      <div id="endMap" style={{ width: "100%", height: "400px" }}></div>
      <div
        onClick={endToggleBox}
        className="result p-2 border border-da-200 rounded-md m-2 text-center"
      >
        여기로 하기
      </div>
    </div>
  );
}

export default Kakao_point;
