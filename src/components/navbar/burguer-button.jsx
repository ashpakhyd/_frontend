import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCollapsed } from "@/redux/slice";
import { StyledBurgerButton } from "./navbar.styles";

export const BurguerButton = () => {
  const dispatch = useDispatch();
  const collapsed = useSelector((state) => state.collapsed);

  const handleSetCollapsed = () => {
    dispatch(setCollapsed(!collapsed));
  };

  return (
    <div className={StyledBurgerButton()} onClick={handleSetCollapsed}>
      <div />
      <div />
    </div>
  );
};
