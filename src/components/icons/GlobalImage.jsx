import React from "react";

function GlobalImage({ width = 64, height = 64 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 64 64"
    >
      <path
        fill="#A1A7C4"
        d="M13.333 29.601l5.334-5.333 14.666 14.667 9.334-9.334 8 8V13.333H13.333v16.268zM10.667 8h42.666A2.667 2.667 0 0156 10.667v42.666A2.667 2.667 0 0153.333 56H10.667A2.667 2.667 0 018 53.333V10.667A2.667 2.667 0 0110.667 8zm30.666 18.667a4 4 0 110-8 4 4 0 010 8z"
      ></path>
    </svg>
  );
}

export default GlobalImage;
