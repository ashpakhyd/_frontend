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
        d="M11.546 3.57a1.947 1.947 0 011.592-.558L21 3l-.012 7.862a1.947 1.947 0 01-.558 1.592l-8.976 8.976c-.76.76-1.993.76-2.753 0L2.57 15.3a1.947 1.947 0 010-2.754l8.975-8.976zM13 5l-9.053 8.923 6.13 6.13L19 11V5h-6zm1 3l2 2-2 2-2-2 2-2z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

export default Icon;

Icon.defaultProps = {
    color: "#7E84A3"
  };