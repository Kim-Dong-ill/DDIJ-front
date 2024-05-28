import React,{useState} from "react";
import Navbar from "../components/Navbar";
import Kakao_new from "../kakaoMap/Kakao_new";
import Load from "../components/Load"
// 여기서 현재좌표를 받아오고 이를가지고 get요청을 보내서 주변마커[] 와 주변유저[] 를 생성해서 kakao_main에 전달한다. kakao_main에서는 중심좌표가 바뀔때마다 새로 get요청을 보낸다.

// 현재 수정중인 파일입니다.

// 1. 페이지 로드시 좌표를 받는다.
// 2. 좌표를 받고 나면 유저의 id로 get 을 보내는데, 이때 body에 좌표를 태운다.
// 3. 서버에서는 해당 좌표를 가지고 1)주변모임, 2)주변강아지를 가져온다. 이때 특정 갯수보다 적으면, 특정개수로 만큼 뽑아오게 쿼리한다.
// 4. 응답의 body에서 주변모임, 주변강아지를 가져와 각각 담아둔다.
// 5. 위 값들을 가지고 map을 그린다.
//맵그리기 ->
// 주변모임을 가지고 마커를 찍기위해 전달 받는다.
// 주변 강아지를 mainslider에 전달한다.

function MainDevPage() {
    const [LoadData, setLoadData] = useState({
        Coords: {
            latitude: 40.51501771854569,
            longitude: 127.91874014610266           //기본값 => 이건 거의 사용되지 않는다.
        },
        circleList: [],
        userList: []
    });
    const updateData = (newData) => {
        setLoadData(newData);
        console.log("데이터가 변경되었습니다."+newData.Coords.latitude)
    };

    return (

        <div className="bg-ye-100" style={{height: "calc(100vh - 65px)"}}>
            <Load LoadData={LoadData} updateData={updateData} />
            <Kakao_new Coords={LoadData.Coords} circleList={LoadData.circleList} userList={LoadData.userList} />
            <Navbar/>
        </div>

    );
}

export default MainDevPage;
