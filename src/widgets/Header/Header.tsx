import React from "react";
import { useNavigate } from "react-router-dom";

import { useKeyboardEvent } from "utils/useKeyboardEvent";

import { BurgerMenu, BurgerMenuItems } from "components/UI/BurgerMenu";

import logo from "images/Logo.svg";

import styles from "./Header.module.scss";

const BurgerItems: BurgerMenuItems[] = [
  { linkTo: "/", label: "Coins" },
  { linkTo: "/categories", label: "Categories" },
];

export const Header = () => {
  const navigate = useNavigate();
  const handlerLogoClick = () => {
    navigate("/");
  };

  useKeyboardEvent("Enter", handlerLogoClick, "logo");
  return (
    <div className={styles.header}>
      <BurgerMenu items={BurgerItems} />
      <img
        id="logo"
        tabIndex={0}
        src={logo}
        className={styles.logo}
        onClick={handlerLogoClick}
      />
    </div>
  );
};
