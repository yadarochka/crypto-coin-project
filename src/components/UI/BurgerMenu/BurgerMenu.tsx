import React, { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useKeyboardEvent } from "utils/useKeyboardEvent";

import logo from "images/Logo.svg";

import styles from "./BurgerMenu.module.scss";

export type BurgerMenuItems = {
  linkTo: string;
  label: string;
};

type BurgerMenuProps = {
  items: BurgerMenuItems[];
};

export const BurgerMenu: FC<BurgerMenuProps> = ({ items }) => {
  const [isActive, setActive] = useState<boolean>(false);
  const burgerIsVisibleChange = () => {
    setActive(!isActive);
  };
  useKeyboardEvent("Esc", burgerIsVisibleChange, "burgerMenu", [isActive]);
  useKeyboardEvent("Enter", burgerIsVisibleChange, "burgerMenu-icon", [
    isActive,
  ]);
  useKeyboardEvent("Enter", burgerIsVisibleChange, "burgerMenu-cross", [
    isActive,
  ]);

  if (isActive) {
    return (
      <>
        <div id="burgerMenu" className={styles.burger}>
          <div className={styles["burger__blur"]} />
          <div className={styles["burger__header"]}>
            <span
              tabIndex={0}
              id="burgerMenu-cross"
              className={styles.cross}
              onClick={burgerIsVisibleChange}
            />
            <img src={logo} className={styles.logo} />
          </div>
          <div className={styles["burger__items"]}>
            {items?.map((item) => (
              <Link
                onClick={burgerIsVisibleChange}
                key={item.label}
                className={styles["burger__item"]}
                to={item.linkTo}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <span
          className={styles["burger__icon"]}
          onClick={burgerIsVisibleChange}
        />
      </>
    );
  } else
    return (
      <span
        id="burgerMenu-icon"
        tabIndex={0}
        className={styles["burger__icon"]}
        onClick={burgerIsVisibleChange}
      />
    );
};
