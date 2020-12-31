import React from "react";
import "./Sidebar.css";
import SidebarOption from "./SidebarOption";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import LibraryMusicRoundedIcon from "@material-ui/icons/LibraryMusicRounded";
import { useDataLayerValue } from "./DataLayer";

const Sidebar = () => {
  const [{ playlists }, dispatch] = useDataLayerValue();

  return (
    <div className="sidebar">
      <img
        className="sidebar__logo"
        src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
        alt=""
      />
      <SidebarOption Icon={HomeRoundedIcon} option="Home" />
      <SidebarOption Icon={SearchRoundedIcon} option="Search" />
      <SidebarOption Icon={LibraryMusicRoundedIcon} option="Your Library" />
      <br />
      <strong className="sidebar__title">PLAYLISTS</strong>
      <hr />
      {playlists?.items?.map((playlist) => (
        <SidebarOption option={playlist.name} />
      ))}
    </div>
  );
};

export default Sidebar;
