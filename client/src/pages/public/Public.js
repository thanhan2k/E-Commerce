import React from "react";
import { Outlet } from "react-router-dom";
const Public = () => {
  return (
    <div>
      <h1>Public Page</h1>
      <Outlet />
    </div>
  );
};
export default Public;
