import { ThemeContext } from "app/providers/ThemeProvider";
import classNames from "classnames";

import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { useKeyboardEvent } from "utils/useKeyboardEvent";

import styles from "./Logo.module.scss";

export const Logo = () => {
  const navigate = useNavigate();
  const handlerLogoClick = () => {
    navigate("/");
  };

  const { theme } = useContext(ThemeContext);

  useKeyboardEvent("Enter", handlerLogoClick, "logo");
  return (
    <div
      id="logo"
      data-testId="logo"
      tabIndex={0}
      className={classNames(styles.logo, styles[theme])}
      onClick={handlerLogoClick}
    >
      Coin Tracker
    </div>
  );
};
