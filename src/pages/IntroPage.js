import React from "react";
import $ from "jquery";
import { NavLink } from "react-router-dom";

//css
import "../assets/animation.css";

function IntroPage() {
  // const locationHook = useLocation();
  // const [currentFirstUrl, setCurrentFirstUrl] = useState(null);
  // const splitUrl = locationHook?.pathname?.split("/") ?? null;
  function scrollTop() {
    $("html, body").scrollTop("0");
  }

  // useEffect(() => {
  //   const location = splitUrl?.length > 0 ? splitUrl[1] : splitUrl[0];
  //   setCurrentFirstUrl(location);
  // }, [locationHook]);
  // console.log("위치", currentFirstUrl);

  // if (currentFirstUrl === "intro") {
  //   //스크롤시 섹션 이동 start
  //   var mHtml = $("html");
  //   var page = 1;

  //   mHtml.animate({ scrollTop: 0 }, 10);

  //   $(window).on("wheel", function (e) {
  //     if (mHtml.is(":animated")) return;
  //     if (e.originalEvent.deltaY > 0) {
  //       // if (page === 6) return;
  //       page++;
  //     } else if (e.originalEvent.deltaY < 0) {
  //       if (page === 1) return;
  //       page--;
  //     }
  //     if (page > 5) {
  //       page = 6;
  //       $(".infoArrow").css("display", "none");
  //     }
  //     if (page < 6) {
  //       $(".infoArrow").css("display", "block");
  //     }
  //     var posTop = (page - 1) * $(window).height();
  //     mHtml.animate({ scrollTop: posTop });
  //   });
  //   //스크롤시 섹션 이동 end
  // }

  return (
    <div className="box w-[100%] bg-ye-600">
      {/* section 01 */}
      <div className="section h-[100vh] px-2" id="section1">
        <div className="text-white flex justify-end gap-2 p-3">
          <div>
            <NavLink to="/login">로그인</NavLink>
          </div>
          |
          <div>
            <NavLink to="/register">회원가입</NavLink>
          </div>
        </div>
        <div className=" absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
          <img src="./images/intro_logo.svg" alt="" />
        </div>
        <div className="infoArrow fixed bottom-[40px] left-1/2 -translate-x-1/2 text-white text-3xl">
          <i class="fa-solid fa-angles-down"></i>
        </div>
      </div>
      {/* section 01 */}

      {/* section 02 */}
      <div
        className="section h-[100vh] grid lg:grid-cols-2 px-4 "
        id="section2"
      >
        <div className="order-2 lg:order-1 text-white flex justify-center items-center lg:text-7xl text-2xl">
          <div>
            지도를 통해 주변 <br />
            산책 모임 위치를 확인해보세요!
          </div>
        </div>
        <div className="order-1 lg:order-2 flex justify-center items-center">
          <img
            className="lg:w-[400px] w-[300px] "
            src="./images/intro_map.svg"
            alt=""
          />
        </div>
      </div>
      {/* section 02 */}

      {/* section 03 */}
      <div className="section h-[100vh] grid lg:grid-cols-2 px-4" id="section3">
        <div className=" flex justify-center items-center">
          <img
            className="lg:w-[400px] w-[300px] "
            src="./images/intro_list.svg"
            alt=""
          />
        </div>
        <div className="text-white flex justify-center items-center lg:text-7xl text-2xl">
          <div>
            내 주변 모임의 리스트를
            <br />
            확인할 수 있어요!
          </div>
        </div>
      </div>
      {/* section 03 */}

      {/* section 04 */}
      <div className="section h-[100vh] grid lg:grid-cols-2 px-4" id="section4">
        <div className="order-2 lg:order-1 text-white flex justify-center items-center lg:text-7xl text-2xl">
          <div>
            여러 강아지들과 함께하는
            <br />
            산책 모임에 참석해 보세요!
          </div>
        </div>
        <div className="order-1 lg:order-2 flex justify-center items-center">
          <img
            className="lg:w-[400px] w-[300px] "
            src="./images/intro_cc.svg"
            alt=""
          />
        </div>
      </div>
      {/* section 04 */}

      {/* section 05 */}
      <div className="section h-[100vh] grid lg:grid-cols-2 px-4" id="section5">
        <div className=" flex justify-center items-center">
          <img
            className="lg:w-[400px] w-[300px] "
            src="./images/intro_appeal.svg"
            alt=""
          />
        </div>
        <div className="text-white flex justify-center items-center lg:text-7xl text-2xl">
          <div>
            나 혼자 보기 아까운
            <br />
            이쁘고 귀여운 내 강아지를
            <br />
            자랑해 보세요!
          </div>
        </div>
      </div>
      {/* section 05 */}

      {/* section 06 */}
      <div className="section h-[100vh] grid" id="section6">
        <div className="bg-white sm:w-[700px] w-[500px] h-[100vh] m-auto flex flex-col items-center">
          <div>
            <img src="./images/intro_logo_wh.svg" alt="" />
          </div>
          <div className="-2 rounded-md border-ye-400 h-[0] w-[80%] mb-40"></div>
          <div className="mb-3 text-da-300 text-2xl">
            우리 동네 댕댕이들 만나러 가볼까요?
          </div>
          <div className="mb-40 flex gap-3">
            <img
              className="w-[45px] h-[35px]"
              src="./images/intro_dog1.png"
              alt=""
            />
            <img
              className="w-[40px] h-[40px]"
              src="./images/intro_dog2.png"
              alt=""
            />
            <img
              className="w-[45px] h-[35px]"
              src="./images/intro_dog3.png"
              alt=""
            />
          </div>
          <div>
            <div>
              <NavLink className="text-da-300" to="/login">
                {/* <button className="w-[250px] h-[50px] rounded-full bg-ye-600 mb-3 hover:bg-ye-800"> */}
                <button className="w-[250px] h-[50px] rounded-full bg-da-300 text-wh-100 mb-3 hover:bg-da-500">
                  로그인
                </button>
              </NavLink>
            </div>
            <div>
              <NavLink
                onClick={scrollTop}
                className="text-da-300"
                to="/register"
              >
                <button className="w-[250px] h-[50px] rounded-full bg-ye-600 hover:bg-ye-800">
                  회원가입
                </button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
      {/* section 06 */}
    </div>
  );
}

export default IntroPage;
