import React from "react";
import $ from "jquery";

function IntroPage() {
  //스크롤시 섹션 이동 start
  var mHtml = $("html");
  var page = 1;

  mHtml.animate({ scrollTop: 0 }, 10);

  $(window).on("wheel", function (e) {
    if (mHtml.is(":animated")) return;
    if (e.originalEvent.deltaY > 0) {
      if (page == 6) return;
      page++;
    } else if (e.originalEvent.deltaY < 0) {
      if (page == 1) return;
      page--;
    }
    var posTop = (page - 1) * $(window).height();
    mHtml.animate({ scrollTop: posTop });
  });
  //스크롤시 섹션 이동 end
  return (
    <div className="box w-[100%] bg-ye-600">
      <div className="section h-[100vh]" id="section1">
        section 01
      </div>
      <div className="section h-[100vh]" id="section2">
        section 02
      </div>
      <div className="section h-[100vh]" id="section3">
        section 03
      </div>
      <div className="section h-[100vh]" id="section4">
        section 04
      </div>
      <div className="section h-[100vh]" id="section5">
        section 05
      </div>
      <div className="section h-[100vh]" id="section6">
        section 06
      </div>
    </div>
  );
}

export default IntroPage;
