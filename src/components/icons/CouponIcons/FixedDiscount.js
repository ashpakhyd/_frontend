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
        d="M20 5a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V7a2 2 0 012-2h16zm0 2H4v10h16V7zm-8 1a4 4 0 110 8 4 4 0 010-8zm0 2a2 2 0 100 4 2 2 0 000-4z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

export default Icon;


"#7E84A3"

Icon.defaultProps = {
  color: "#7E84A3"
};