import classnames from "classnames";
import { useIsMobile } from "shared/hooks/useIsMobile";
import { Logo } from "widgets/Logo";

import React from "react";
import { NavLink } from "react-router-dom";

import { CustomNavLink } from "components/CustomNavLink";
import { BurgerMenu, BurgerMenuItems } from "components/UI/BurgerMenu";

import styles from "./Header.module.scss";

const navLinkStyles = ({ isActive }: { isActive: boolean }) =>
  isActive ? styles.active : styles.link;

const BurgerItems: BurgerMenuItems[] = [
  { linkTo: "/", label: "Coins" },
  { linkTo: "/categories", label: "Categories" },
];

export const Header = () => {
  const isMobile = useIsMobile();
  if (isMobile) {
    return (
      <div className={styles.header}>
        <div className={styles.wrapper}>
          <Logo />
          <BurgerMenu items={BurgerItems} />
        </div>
      </div>
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
