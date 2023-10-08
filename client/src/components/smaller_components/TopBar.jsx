import React from "react";
import { MdLogout } from "react-icons/md";
const SideBarIcon = ({ icon }) => (
  <div className="sidebar-icon-top ">{icon}</div>
);

const TopBar = () => {
  return (
    <div className="flex align-top w-full sticky top-0 h-24 m-0 bg-primary-light shadow-lg">
      <SideBarIcon icon={<MdLogout size="30" />} />
      
    </div>
  );
};

export default TopBar;
