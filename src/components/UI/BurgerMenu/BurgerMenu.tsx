import React, { FC, useState } from "react";
import { Link } from "react-router-dom";

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
  if (isActive) {
    return (
      <>
        <div className={styles.burger}>
          <div className={styles["burger__blur"]} />
          <div className={styles["burger__header"]}>
            <span className={styles.cross} onClick={burgerIsVisibleChange} />
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
        className={styles["burger__icon"]}
        onClick={burgerIsVisibleChange}
      />
    );
};
