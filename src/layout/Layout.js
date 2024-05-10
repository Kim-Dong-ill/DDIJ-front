import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Navbar from "../components/Navbar";

function Layout() {
  const pageTitle = [
    { title: "함께걷개" },
    { title: "어디가개" },
    { title: "자랑하개" },
    { title: "마이펫이지" },
  ];

  return (
    <>
      <div>
        <Header pageTitle={pageTitle} />
        <Outlet />
        <Navbar />
      </div>
    </>
  );
}

export default Layout;
