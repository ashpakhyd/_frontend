import "./MenuItem.scss";
import "remixicon/fonts/remixicon.css";
import React from "react";

const MenuItem = ({ icon, title, action, isActive = null }) => (
  <span
    className={`menu-item${isActive && isActive() ? " is-active" : ""}`}
    onClick={action}
    title={title}
    disabled={!action}
  >
    <i className={`ri-${icon}`}></i>
  </span>
);

export default MenuItem;
