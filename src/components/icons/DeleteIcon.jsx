function DeleteIcon({ fill = "#4F4F4F" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        fill={fill}
        fillRule="evenodd"
        d="M18 8v11a2 2 0 01-2 2H8a2 2 0 01-2-2V8h12zm-2 2H8v9h8v-9zm-4-7a1 1 0 011 1v1h5a1 1 0 110 2H6a1 1 0 010-2h5V4a1 1 0 011-1z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

export default DeleteIcon;
