import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./smaller_components/SideBar";
import TopBar from "./smaller_components/TopBar";
import Upload from "./smaller_components/Upload";

const AppLayout = () => {
  return (
    <>
      <div className="flex">
        <SideBar />
      </div>
      <div className="flex">
        <TopBar />
      </div>
      <div className="flex">
        <Upload />
      </div>
      <div className="content">
        <Outlet />
      </div>
    </>
  );
};

export default AppLayout;
