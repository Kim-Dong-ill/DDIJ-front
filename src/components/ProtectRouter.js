import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectRouter() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default ProtectRouter;
