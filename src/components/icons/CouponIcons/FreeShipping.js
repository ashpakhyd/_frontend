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
        d="M13 4a2 2 0 012 2v1h4.618L22 11.764V17h-2a3 3 0 11-6 0h-4a3 3 0 11-6 0H2V6a2 2 0 012-2h9zM7 16H6v2h2v-1-1H7zm10 0h-1v2h2v-1-1h-1zM13 6H4v9h.764c.55-.614 1.347-1 2.236-1 .889 0 1.687.386 2.236 1H13V6zm5.381 3H15v5.764A2.989 2.989 0 0117 14c.889 0 1.687.386 2.236 1H20v-2.763L18.381 9z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

export default Icon;

Icon.defaultProps = {
  color: "#7E84A3"
};