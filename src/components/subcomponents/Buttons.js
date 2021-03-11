import React from "react";

function Buttons(props) {
  return (
    <p
      className={
        "buttonHover pillbutton mb-0 mr-0 p-2 mb-5 rounded-pill text-center" +
        " " +
        props.textColor
      }
      style={{ backgroundColor: props.bgColor, width: "250px" }}
      onClick={props.handleClick}
    >
      {props.description}
    </p>
  );
}

export default Buttons;
