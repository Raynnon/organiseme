import React from "react";
import "./menu.css";

import Image from "react-bootstrap/Image";

import miniLogo from "./images/organise-me-mini-logo.png";
import listImage from "./images/list.png";
import profileImage from "./images/profile.png";

function Menu(props) {
  const handleClick = (e) => {
    let currentClass = e.currentTarget.className;
    const parentChildren = e.currentTarget.parentNode.childNodes;

    if (currentClass === "active") {
      return;
    }

    parentChildren.forEach((child) => {
      child.className = "inactive";
    });

    e.currentTarget.className = "active";
    props.onChange(e.currentTarget.id);
  };

  return (
    <ul>
      <li>
        <Image
          className="img-fluid menu-icon"
          src={miniLogo}
          alt="mini-logo-organise-me"
          roundedCircle
        />
      </li>
      <li id="List" className="active" onClick={(e) => handleClick(e)}>
        <Image
          className="img-fluid menu-icon"
          src={listImage}
          alt="mini-logo-organise-me"
          roundedCircle
        />
      </li>
      <li id="Profile" className="inactive" onClick={(e) => handleClick(e)}>
        <Image
          className="img-fluid menu-icon"
          src={profileImage}
          alt="mini-logo-organise-me"
          roundedCircle
        />
      </li>
    </ul>
  );
}

export default Menu;
