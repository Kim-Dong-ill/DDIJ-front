import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axiosInstance from "../utils/axios";
import { useSelector } from "react-redux";
import MyPetModifyPage from "./MyPetModifyPage";

function MyPetListPage() {
  const { userId } = useParams();
  const [mypetList, setMyPetList] = useState([]);
  const [petId, setPetId] = useState([]);
  const [realignment, setRealignment] = useState([]);
  console.log(userId);

  //로그인된 유저 반려견 가져옴
  const pets = useSelector((state) => {
    return state.user.petsData;
  });
  console.log("pets", pets);

  // 로그인된 유저 _id값 가져오는과정
  const loginState = useSelector((state) => {
    return state.user.userData.user.id;
  });

  useEffect(() => {
    const loadPetList = async () => {
      try {
        const res = await axiosInstance.get(`/pet/list/${userId}`);
        console.log("펫리스트가지금??", res.data.myPetList);
        setMyPetList(res.data.myPetList);
      } catch (error) {}
    };
    loadPetList();
  }, [realignment]);

  // ===== gpt
  useEffect(() => {
    if (mypetList.length > 0) {
      const ids = mypetList.map((item) => item._id);
      setPetId(ids);
    }
  }, [mypetList]);

  // const deletePet = async (petId) => {
  //   try {
  //     await axiosInstance.delete(`/pet/${petId}`);
  //     setMyPetList(mypetList.filter((pet) => pet._id !== petId));
  //   } catch (error) {
  //     console.error("Error deleting pet:", error);
  //   }
  // };

  //  펫 Id
  async function petDelete(petId) {
    try {
      const res = await axiosInstance.delete(`/pet/list/${userId}/${petId}`);
      console.log("펫 삭제 성공!!!!!!:", res);
      setMyPetList(mypetList.filter((pet) => pet._id !== petId)); // 삭제 후 목록 업데이트
      //                                    배열에 있는 각 펫의 id , 삭제할 petId
    } catch (error) {
      console.log("펫 삭제 실패ㅠㅠㅠ", error);
    }
  }

  return (
    <div
      className="w-[500px] bg-white pt-[90px] pb-[115px] border border-da-100"
      style={{ height: "calc(100% - 65px)" }}
    >
      {/* 상단 버튼 시작 */}
      <div className="flex mb-[30px]">
        <Link to="/userinfo" className="flex-1">
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
      {/* 상단 버튼 끝  */}
      {/* 강아지1 시작 */}
      {mypetList.map((item, idx) => {
        console.log("펫 리스트 펫이미징 item.image", item.image);
        async function changeMainPet() {
          const body = {
            // mypetList 배열에서 ObjectId 추출
            petId1: mypetList[0]._id, // 수정
            petId2: item._id, // 수정
          };

          try {
            const res = await axiosInstance.patch("/pet/mainpetindex", body);
            console.log("patch");
            setRealignment(res.data);
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
                  <>
                    <p className="text-right pr-[15px] pt-[15px]">
                      <button
                        className="bg-ye-600 h-[30px] px-[5px] rounded-lg "
                        onClick={changeMainPet}
                      >
                        <img
                          src="/images/star1.svg"
                          className="inline-block align-middle w-[14px] h-[14px] mr-[3px] "
                        />
                        <span className="inline-block  text-[14px]">대표</span>
                      </button>
                    </p>
                  </>
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

                      <span className="inline-block  text-[14px]">대표</span>
                    </button>
                  </p>
                )}

                {/* 여기가 펫 이미지 넣는 공간이에용 */}
                {item.image ? (
                  <img
                    src={`${process.env.REACT_APP_NODE_SERVER_URL}/uploads/${item.image}`}
                    alt=""
                    className="w-[100px] h-[100px] rounded-full m-auto"
                  />
                ) : (
                  <img
                    src="/images/dog1.svg"
                    className="w-[100px] h-[100px] rounded-full m-auto"
                  />
                )}

                <div>
                  <span className="inline-block leading-[40px] mr-[10px] nanumBold">
                    {item.pName}
                  </span>
                  {item.pGender == "male" || item.pGender == "남" ? (
                    <i className="text-blue-600 text-[14px] fa-solid fa-mars"></i>
                  ) : (
                    <i className="text-pink-600 fa-solid text-[14px] fa-venus"></i>
                  )}
                </div>
                <div className="border-t relative">
                  <Link to={`/mypet/mod/${item._id}`}>
                    <button className="inilne-block leading-[40px] nanum text-[14px] text-da-500">
                      수정하기
                    </button>
                  </Link>
                  {item.index == 1 ? null : (
                    <button
                      className="inline-block leading-[40px] nanum text-[14px] text-da-500 absolute right-5"
                      onClick={() => {
                        if (window.confirm("정말 삭제하시겠습니까?")) {
                          petDelete(item._id);
                        }
                      }}
                    >
                      삭제하기
                    </button>
                  )}
                </div>
              </div>
            </div>
          </>
        );
      })}
      {mypetList.length == 1 && (
        <div className="w-[450px] m-auto grid bg-white text-center mb-[25px]">
          <div className="border border-da-100 rounded-lg">
            <p className="text-right pr-[15px] pt-[45px]"></p>
            <div className="bg-ye-500 h-[100px] w-[100px] rounded-full flex justify-center items-center m-auto">
              <img
                src="/images/camera1.svg"
                className="w-[60px] h-[60px] m-auto"
                alt="camera"
              />
            </div>
            <div>
              <span className="inline-block leading-[40px] mr-[10px]"></span>
            </div>
            <div className="border-t">
              <Link to="/mypet/add">
                <button className="inline-block leading-[40px] nanum text-[14px] text-da-500 w-full">
                  추가하기
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
      {mypetList.length < 3 ? (
        <div className="w-[450px] m-auto grid bg-white text-center">
          <div className="border border-da-100 rounded-lg">
            <p className="text-right pr-[15px] pt-[45px]"></p>
            <div className=" bg-ye-500 h-[100px] w-[100px] rounded-full flex justify-center items-center m-auto ">
              <img
                src="/images/camera1.svg"
                className="w-[60px] h-[60px] m-auto"
              />
            </div>
            <div>
              <span className="inline-block leading-[40px] mr-[10px]"></span>
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
