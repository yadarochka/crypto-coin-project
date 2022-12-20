import React from "react";
import { useNavigate } from "react-router-dom";

import { useKeyboardEvent } from "utils/useKeyboardEvent";

import logo from "images/Logo.svg";

import styles from "./Logo.module.scss";

export const Logo = () => {
  const navigate = useNavigate();
  const handlerLogoClick = () => {
    navigate("/");
  };
  useKeyboardEvent("Enter", handlerLogoClick, "logo");
  return (
    <img
      id="logo"
      tabIndex={0}
      src={logo}
      data-testId="logo"
      className={styles.logo}
      onClick={handlerLogoClick}
    />
  );
};
