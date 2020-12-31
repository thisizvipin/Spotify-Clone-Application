import React from "react";
import "./Header.css";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import { Avatar } from "@material-ui/core";
import { useDataLayerValue } from "./DataLayer";

const Header = ({ spotify }) => {
  const [{ user }, dispatch] = useDataLayerValue();

  return (
    <div className="header">
      <div className="header__left">
        <SearchRoundedIcon />
        <input
          type="text"
          placeholder="Search for Artists, Songs and Podcasts"
        />
      </div>
      <div className="header__right">
        <Avatar src={user?.images[0]?.url} alt={user?.display_name} />
        <h4>{user?.display_name}</h4>
      </div>
    </div>
  );
};

export default Header;
