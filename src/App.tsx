import React from "react";
import { Route, Routes } from "react-router-dom";

import CoinListPage from "pages/CoinListPage";
import CoinPage from "pages/CoinPage";
import { useQueryParamsStoreInit } from "store/RootStore/hooks/useQueryParamsStoreInit";

import {
  BurgerMenu,
  BurgerMenuItems,
} from "components/UI/BurgerMenu/BurgerMenu";

import logo from "images/Logo.svg";

import styles from "./App.module.scss";

const BurgerItems: BurgerMenuItems[] = [
  { linkTo: "/", label: "Coins" },
  { linkTo: "/category", label: "Category" },
];

function App() {
  useQueryParamsStoreInit();
  return (
    <div className={styles.app}>
      <div className={styles.header}>
        <BurgerMenu items={BurgerItems}></BurgerMenu>
        <img src={logo} className={styles.logo}></img>
      </div>
      <Routes>
        <Route path="/" element={<CoinListPage />} />
        <Route path=":name" element={<CoinPage />} />
      </Routes>
    </div>
  );
}

export default App;
