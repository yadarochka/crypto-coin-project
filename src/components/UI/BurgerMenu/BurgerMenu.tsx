import classnames from "classnames";

import React, { FC, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

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
  const burgerIsVisibleChange = () => setActive(!isActive);

  useKeyboardEvent("Esc", burgerIsVisibleChange, "burgerMenu", [isActive]);
  useKeyboardEvent("Enter", burgerIsVisibleChange, "burgerMenu-icon", [
    isActive,
  ]);
  useKeyboardEvent("Enter", burgerIsVisibleChange, "burgerMenu-cross", [
    isActive,
  ]);

  const Menu = () => (
    <div className={styles.menu}>
      <div className={styles.blur} />
      <nav
        className={classnames(isActive ? styles.menuActive : "", styles.list)}
      >
        <h2>Pages</h2>
        {items.map((link) => (
          <li>
            <NavLink
              className={styles.item}
              to={link.linkTo}
              onClick={burgerIsVisibleChange}
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </nav>
    </div>
  );

  return (
    <>
      <div
        className={classnames(styles.btn, isActive ? styles.btnActive : "")}
        onClick={burgerIsVisibleChange}
      >
        <span
          className={classnames(styles.top, isActive ? styles.btnActive : "")}
        />
        <span
          className={classnames(
            styles.middle,
            isActive ? styles.btnActive : ""
          )}
        />
        <span
          className={classnames(
            styles.bottom,
            isActive ? styles.btnActive : ""
          )}
        />
      </div>
      {isActive && <Menu />}
    </>
  );
};
