import classnames from "classnames";

import React, { FC } from "react";
import { NavLink } from "react-router-dom";

import styles from "./CustomNavLink.module.scss";

type LinkProps = {
  children: string;
  to: string;
  className: string | ((props: { isActive: boolean }) => string | undefined);
};

const cx = classnames.bind(styles);

export const CustomNavLink: FC<LinkProps> = ({
  className,
  children,
  to,
  ...props
}) => {
  return (
    <NavLink to={to} {...props} className={classnames(styles.link, className)}>
      {children}
    </NavLink>
  );
};
