import React from "react";

function Icon({color}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        fill={color}
        fillRule="evenodd"
        d="M14 3a2 2 0 012 2v2h4v12a2 2 0 01-2 2H6a2 2 0 01-2-2V7h4V5a2 2 0 012-2h4zm4 6H6v10h12V9zm-4-4h-4v2h4V5z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

export default Icon;

Icon.defaultProps = {
  color: "#7E84A3"
};