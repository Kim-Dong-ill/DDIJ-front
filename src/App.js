import "./assets/tStyle.css";
import "./assets/index.scss";
import React from "react";

function App() {
  return (
    <div>
      App
      <div className="nanum" style={{ fontSize: "100px", fontWeight: [100] }}>
        s나눔고딕
      </div>
      <div style={{ fontSize: "100px" }}>s나꿱뷁뉅눔고딕</div>
      <div style={{ fontSize: "12px" }}>s나꿱뷁눔고딕 12px</div>
      <div style={{ fontSize: "16px" }}>s나꿱뷁눔고딕 16px</div>
      <div style={{ fontSize: "20px" }}>s나꿱뷁눔고딕 20px</div>
      <div style={{ fontSize: "22px" }}>s나꿱뷁눔고딕 22px</div>
      <div style={{ fontSize: "26px" }}>s나꿱뷁눔고딕 26px</div>
      <div style={{ fontSize: "30px" }}>s나꿱뷁눔고딕 30px</div>
      <div style={{ fontSize: "40px" }}>s나꿱뷁눔고딕 40px</div>
      <div className="nanum" style={{ fontSize: "12px" }}>
        s나꿱뷁눔고딕 12px
      </div>
      <div className="nanum" style={{ fontSize: "16px" }}>
        s나꿱뷁눔고딕 16px
      </div>
      <div className="nanum" style={{ fontSize: "20px" }}>
        s나꿱뷁눔고딕 20px
      </div>
      <div className="nanum" style={{ fontSize: "22px" }}>
        s나꿱뷁눔고딕 22px
      </div>
      <div className="nanum text-ye-400" style={{ fontSize: "26px" }}>
        s나꿱뷁눔고딕 26px
      </div>
      <div className="nanum bg-da-100" style={{ fontSize: "30px" }}>
        s나꿱뷁눔고딕 30px
      </div>
      <div className="nanum bg-ye-400" style={{ fontSize: "40px" }}>
        s나꿱뷁눔고딕 40px
      </div>
    </div>
  );
}

export default App;
