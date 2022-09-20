import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import CategoriesPage from "pages/CategoriesPage/CategoriesPage";
import CoinListPage from "pages/CoinListPage";
import CoinPage from "pages/CoinPage";
import { useQueryParamsStoreInit } from "store/RootStore/hooks/useQueryParamsStoreInit";
import { useKeyboardEvent } from "utils/useKeyboardEvent";

import {
  BurgerMenu,
  BurgerMenuItems,
} from "components/UI/BurgerMenu/BurgerMenu";

import logo from "images/Logo.svg";

import styles from "./App.module.scss";

const BurgerItems: BurgerMenuItems[] = [
  { linkTo: "/", label: "Coins" },
  { linkTo: "/categories", label: "Categories" },
];

function App() {
  useQueryParamsStoreInit();
  const navigate = useNavigate();
  const handlerLogoClick = () => {
    navigate("/");
  };
  useKeyboardEvent("Enter", handlerLogoClick, "logo");

  return (
    <div className={styles.app}>
      <div className={styles.header}>
        <BurgerMenu items={BurgerItems} />
        <img
          id="logo"
          tabIndex={0}
          src={logo}
          className={styles.logo}
          onClick={handlerLogoClick}
        />
      </div>
      <Routes>
        <Route path="/" element={<CoinListPage />} />
        <Route path=":name" element={<CoinPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
      </Routes>
    </div>
  );
}

export default App;
