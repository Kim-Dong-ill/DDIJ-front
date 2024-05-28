import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Header from "../components/Header";
import Navbar from "../components/Navbar";

function Layout({ isAuth }) {

  return isAuth ? (
    <>
      <div>
        <Header />
        <Outlet />
        <Navbar />
      </div>
    </>
  ) : (
    <Navigate to="/login" />
  );

}

export default Layout;
