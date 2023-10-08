import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./smaller_components/SideBar";
import TopBar from "./smaller_components/TopBar";

const AppLayout = () => {
  return (
    <>
      <div className="flex">
        <SideBar />
      </div>
      <div className="flex">
        <TopBar />
      </div>
      <div className="content">
        <Outlet />
      </div>
    </>
  );
};

export default AppLayout;
