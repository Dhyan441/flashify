import React from "react";
import { BsCardList, BsCloudUpload } from "react-icons/bs";
import { FaPencilAlt } from "react-icons/fa";

const SideBarIcon = ({ icon }) => <div className="sidebar-icon ">{icon}</div>;
const SideBarIconTop = ({ icon }) => <div className="sidebar-icon mt-24">{icon}</div>;

const SideBar = () => {
  return (
    <div className="fixed top-0 left-0 h-screen w-36 m-0 flex flex-col bg-primary-main text-white shadow-lg z-[100]">
      <a href="/app/upload"></>} /></a>
      <a href="/app/upload"><SideBarIconTop icon={<BsCloudUpload size="30" />} /></a>
      <a href="/app/decks"><SideBarIcon icon={<BsCardList size="30" />} /></a>
      <a href="/app/study"><SideBarIcon icon={<FaPencilAlt size="30" />} /></a>
    </div>
  );
};

export default SideBar;
