import classNames from "classnames";

import React, { FC, useState } from "react";

import styles from "./Favourites.module.scss";

type FavouritesProps = {
  onClick: () => void;
  active: boolean;
};

export const Favourites: FC<FavouritesProps> = ({
  onClick,
  active = false,
}) => {
  const [isActive, setIsActive] = useState<boolean>(active);

  const handleClick = () => {
    setIsActive((prevState) => !prevState);
    onClick();
  };

  return (
    <button
      className={classNames(styles.favourites, isActive && styles.active)}
      onClick={handleClick}
    />
  );
};
