import { useIsMobile } from "shared/hooks/useIsMobile";
import { Logo } from "widgets/Logo";

import React from "react";
import { NavLink } from "react-router-dom";

import { BurgerMenu, BurgerMenuItems } from "components/UI/BurgerMenu";

import coinImg from "images/Bitcoin.svg";
import categoriesImg from "images/Categories.svg";

import styles from "./Header.module.scss";

const navLinkStyles = ({ isActive }: { isActive: boolean }) =>
  isActive ? styles.active : styles.link;

const BurgerItems: BurgerMenuItems[] = [
  { linkTo: "/", label: "Coins", imgSrc: coinImg },
  { linkTo: "/categories", label: "Categories", imgSrc: categoriesImg },
];

export const Header = () => {
  const isMobile = useIsMobile();
  if (isMobile) {
    return (
      <header className={styles.header}>
        <div className={styles.wrapper}>
          <Logo />
          <BurgerMenu items={BurgerItems} />
        </div>
      </header>
    );
  } else
    return (
      <header className={styles.header}>
        <div className={styles.wrapper}>
          <Logo />
          <div className={styles.nav}>
            {BurgerItems.map((link) => (
              <NavLink
                key={link.label}
                to={link.linkTo}
                className={navLinkStyles}
              >
                {link.label}
              </NavLink>
            ))}
          </div>
          <span>Log in</span>
        </div>
      </header>
    );
};
