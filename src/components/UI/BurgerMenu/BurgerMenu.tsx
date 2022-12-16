import classnames from "classnames";

import React, { FC, useState } from "react";
import { NavLink } from "react-router-dom";

import { useKeyboardEvent } from "utils/useKeyboardEvent";

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

  const Menu = () => (
    <div className={styles.menu}>
      <div className={isActive ? styles.blur : ""} />
      <nav
        className={classnames(
          isActive ? styles.menuActive : styles.menuNoActive,
          styles.list
        )}
      >
        <h2 className={styles.title}>Pages</h2>
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
        id="burgerMenu-icon"
        tabIndex={0}
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
