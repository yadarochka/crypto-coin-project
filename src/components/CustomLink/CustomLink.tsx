import React, { FC } from "react";
import { Link } from "react-router-dom";

import styles from "./CustomLink.module.scss";

type LinkProps = {
  children: string;
  to: string;
};

export const CustomLink: FC<LinkProps> = ({ children, to, ...props }) => {
  return (
    <Link to={to} {...props} className={styles.link}>
      {children}
    </Link>
  );
};
