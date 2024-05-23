import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axiosInstance from "../utils/axios";
import { useSelector } from "react-redux";

function MyPetListPage() {
  const { userId } = useParams();
  const [mypetList, setMyPetList] = useState([]);
  const [petId, setPetId] = useState([]);
  const [realignment, setRealignment] = useState([]);
  console.log(userId);
  //   useEffect(() => {
  //     const loadPetList = async () => {};
  //     loadPetList();
  //   }, []);

  // 로그인된 유저 _id값 가져오는과정
  const loginState = useSelector((state) => {
    return state.user.userData.user.id;
  });
  console.log(loginState);

  useEffect(() => {
    const loadPetList = async () => {
      try {
        const res = await axiosInstance.get(`/pet/list/${userId}`);
        console.log("펫리스트가지금??", res.data.myPetList);
        setMyPetList(res.data.myPetList);
      } catch (error) {}
    };
    loadPetList();
  }, []);

  // ===== gpt
  useEffect(() => {
    if (mypetList.length > 0) {
      const ids = mypetList.map((item) => item._id);
      setPetId(ids);
    }
  }, [mypetList]);

  // // 펫 index patch로 꽂아넣을예정 ( 대표강아지 1, 대표강아지 아니면 0으로 전부 통일)
  // useEffect(() => {
  //   const changeMainPet = async () => {
  //     try {
  //       const petId1 = "664d520e1fea5d6d9c5fbd9f";
  //       const petId2 = "664da0181ed9992e4d18e38d";
  //       const res = await axiosInstance.patch("/pet/mainpetindex", {
  //         petId1,
  //         petId2,
  //       });
  //       const { pet1, pet2 } = res.data;
  //       setRealignment(pet1, pet2);
  //     } catch (error) {}
  //   };
  //   changeMainPet();
  // }, []);
  // // console.log("real머시기", realignment);

  return (
    <div
      className="w-[500px] bg-white pt-[90px] pb-[115px] border border-da-100"
      style={{ height: "calc(100% - 65px)" }}
    >
      {/* {mypetList.map((item, idx) => {
        return <>{item.pName}</>;
      })} */}
      {/* 상단 버튼 시작 */}
      <div className="flex mb-[30px]">
        <Link to={`/userinfo/${loginState}`} className="flex-1">
          <button className="w-full border-b  border-gray-200 shadow-bottom px-2 py-3 text-[15px] hover:border-gray-800 ">
            보호자 정보
          </button>
        </Link>
        <Link to={`/mypet/${loginState}`} className="flex-1">
          <button className="w-full  border-b border-gray-200 shadow-bottom px-2 py-3 text-[15px] hover:border-gray-800">
            반려견 정보
          </button>
        </Link>
      </div>
      {/* 상단 버튼 끝 */}

      {/* 강아지1 시작 */}

      {mypetList.map((item, idx) => {
        async function changeMainPet() {
          const body = {
            // mypetList 배열에서 ObjectId 추출
            petId1: mypetList[0]._id, // 수정
            petId2: item._id, // 수정
            // petId1: mypetList[0].index,
            // petId2: item.index,
          };
          // alert("change");
          // console.log(item.index, mypetList[0].index);
          try {
            const res = await axiosInstance.patch("/pet/mainpetindex", body);
            console.log(res.data);
          } catch (error) {
            console.error(
              "Error:",
              error.response ? error.response.data : error.message
            ); // 에러메시지 gpt
          }
        }
        return (
          <>
            <div className="w-[450px] m-auto grid mb-[25px] bg-white text-center">
              <div className="border border-da-100 rounded-lg">
                {/* {petId==} */}
                {item.index == 1 ? (
                  <p className="text-right pr-[15px] pt-[15px]">
                    <button
                      className="bg-ye-600 h-[30px] px-[5px] rounded-lg "
                      onClick={changeMainPet}
                    >
                      <img
                        src="/images/star1.svg"
                        className="inline-block align-middle w-[14px] h-[14px] mr-[3px] "
                      />
                      <span className="inline-block  text-[14px]">
                        대표 / {item.index}/{item._id}
                      </span>
                    </button>
                  </p>
                ) : (
                  <p className="text-right pr-[15px] pt-[15px]">
                    <button
                      className="bg-white h-[30px] px-[5px] rounded-lg border border-da-100"
                      onClick={changeMainPet}
                    >
                      <img
                        src="/images/star1.svg"
                        className="inline-block align-middle w-[14px] h-[14px] mr-[3px] "
                      />
                      <span className="inline-block  text-[14px]">
                        대표 / {item.index}/{item._id}
                      </span>
                    </button>
                  </p>
                )}
                {/* <button className="bg-ye-600 h-[30px] px-[5px] rounded-lg">
                  <img
                    src="/images/star1.svg"
                    className="inline-block align-middle w-[14px] h-[14px] mr-[3px] "
                  />
                  <span className="inline-block  text-[14px]">대표</span>
                </button> */}

                <img
                  src="/images/dog1.svg"
                  className="w-[100px] h-[100px] rounded-full m-auto"
                />
                <div>
                  <span className="inline-block leading-[40px] mr-[10px] nanumBold">
                    {item.pName}
                  </span>
                  <i class="fa-solid fa-mars"></i>
                </div>
                <div className="border-t">
                  <Link to="/mypet/mod/:petid">
                    <button className="inilne-block leading-[40px] nanum text-[14px] text-da-500">
                      수정하기
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </>
        );
      })}

      {mypetList.length < 3 ? (
        <div className="w-[450px] m-auto grid bg-white text-center">
          <div className="border border-da-100 rounded-lg">
            <p className="text-right pr-[15px] pt-[45px]">
              {/* <button className="bg-white h-[30px] px-[5px] rounded-lg border border-da-100">
                <img
                  src="/images/star1.svg"
                  className="inline-block align-middle w-[14px] h-[14px] mr-[3px] "
                />
                <span className="inline-block  text-[14px]">대표</span>
              </button> */}
            </p>
            <div className=" bg-ye-500 h-[100px] w-[100px] rounded-full flex justify-center items-center m-auto ">
              <img
                src="/images/camera1.svg"
                className="w-[60px] h-[60px] m-auto"
              />
            </div>
            <div>
              <span className="inline-block leading-[40px] mr-[10px]"></span>
              {/* <i class="fa-solid fa-mars"></i> */}
            </div>
            <div className="border-t">
              <Link to="/mypet/add">
                <button className="inilne-block leading-[40px] nanum text-[14px] text-da-500">
                  추가하기
                </button>
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default MyPetListPage;
