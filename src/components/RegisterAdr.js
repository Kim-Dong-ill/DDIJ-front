import React, { useEffect, useState } from "react";
import TextFieldLine from "../components/TextField";
import { address } from "../utils/validation";

function RegisterAdr({ hasDog, errors, register, handleAddLoc }) {
  const { kakao } = window;
  const [uAddress, setUAddress] = useState("");

  //주소 좌표로 변경하기
  useEffect(() => {
    var geocoder = new kakao.maps.services.Geocoder();

    var callback = function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        const coordinates = [
          Number(result[0].road_address.x),
          Number(result[0].road_address.y),
        ];
        console.log(coordinates);
        handleAddLoc(coordinates);
      }
    };

    geocoder.addressSearch(`${uAddress}`, callback);
  }, [uAddress]);

  //주소 검색하기
  useEffect(() => {
    // 스크립트가 이미 로드되어 있는지 확인
    if (!window.daum) {
      const script = document.createElement("script");
      script.src =
        "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
      script.async = true;
      // script.onload = () => {
      //   openPostcode();
      // };
      document.head.appendChild(script);
    } else {
      // openPostcode();
    }
  }, []);

  const openPostcode = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        // 팝업에서 검색결과 항목을 클릭했을 때 실행할 코드를 작성하는 부분입니다.
        // 예제를 참고하여 다양한 활용법을 확인해 보세요.
        console.log(data.address); // 주소 데이터를 처리하는 코드를 작성합니다.
        setUAddress(data.address);
      },
    }).open();
  };

  const handleTextFieldClick = () => {
    openPostcode(); // TextFieldLine 클릭 시 주소 입력 창 열기
  };

  return (
    <div className="flex flex-col gap-2 mb-10">
      <div className="flex gap-2">
        <label className={hasDog ? `` : ` text-da-500`} htmlFor="address">
          주소
        </label>
        <button type="button">
          <i className="fa-regular fa-map"></i>
        </button>
      </div>
      <div>
        <TextFieldLine
          onClick={handleTextFieldClick}
          value={uAddress}
          required
          disabled={hasDog ? false : true}
          id="address"
          label="주소"
          fullWidth
          {...register("address", address)}
        />
        {errors.address && (
          <div className="nanumBold text-red-500 text-xs mt-1">
            {errors.address.message}
          </div>
        )}
      </div>
    </div>
  );
}

export default RegisterAdr;
