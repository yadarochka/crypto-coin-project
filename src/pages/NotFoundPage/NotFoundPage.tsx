import React from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../components/UI/Button";
import styles from "./NotFoundPage.module.scss";

export const NotFoundPage = () => {
  const navigate = useNavigate();

  const handlerButtonClick = () => navigate("/");

  return (
    <div className={styles["not-found"]}>
      <div>NOT FOUND</div>
      <Button
        className={styles["not-found__button"]}
        onClick={handlerButtonClick}
        value="Return to main page"
      />
    </div>
  );
};
