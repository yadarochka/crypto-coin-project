import React from "react";

import CoinListPage from "pages/CoinListPage";
import CoinPage from "pages/CoinPage";
import { useQueryParamsStoreInit } from "store/RootStore/hooks/useQueryParamsStoreInit";
import { Navigate, Route, Routes } from "react-router-dom"

import styles from "./App.module.scss";

function App() {
  useQueryParamsStoreInit();
  return (
    <div className={styles.app}>
      <Routes>
        <Route path="/" element={<CoinListPage />}/>
        <Route path=":name" element={<CoinPage />}/>
      </Routes>
    </div>
  );
}

export default App;
