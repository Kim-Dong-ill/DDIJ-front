import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Navbar from "../components/Navbar";

function Layout() {
  return (
    <>
      <div>
        <Header />
        <Outlet />
        <Navbar />
      </div>
    </>
  );
}

export default Layout;
