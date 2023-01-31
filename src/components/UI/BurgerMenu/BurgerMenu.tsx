import classnames from "classnames";

import React, { FC, useState } from "react";
import { NavLink } from "react-router-dom";

import { useKeyboardEvent } from "utils/useKeyboardEvent";

import styles from "./BurgerMenu.module.scss";

export type BurgerMenuItems = {
  linkTo: string;
  imgSrc?: any;
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
    <div className={styles.menu} data-testid="menu">
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
              key={link.label}
              data-testId={`${link.label.toLocaleLowerCase()}-nav`}
              className={styles.item}
              to={link.linkTo}
              onClick={burgerIsVisibleChange}
            >
              <div className={styles.link}>
                <img
                  src={link.imgSrc}
                  alt={link.label}
                  className={styles.linkImg}
                />
                {link.label}
              </div>
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
        data-testId="burger-menu"
        tabIndex={0}
        className={classnames(styles.btn, { [styles.btnActive]: isActive })}
        onClick={burgerIsVisibleChange}
      >
        <span
          className={classnames(styles.top, { [styles.btnActive]: isActive })}
        />
        <span
          className={classnames(styles.middle, {
            [styles.btnActive]: isActive,
          })}
        />
        <span
          className={classnames(styles.bottom, {
            [styles.btnActive]: isActive,
          })}
        />
      </div>
      {isActive && <Menu />}
    </>
  );
};
