import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectRouter({ isAuth }) {
  console.log("isAuth", isAuth);
  return isAuth ? (
    <div>
      <Outlet />
    </div>
  ) : (
    <Navigate to="/login" />
  );
}

export default ProtectRouter;
