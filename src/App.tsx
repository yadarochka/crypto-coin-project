import React from "react";

import CoinListPage from "@pages/CoinListPage";
import CoinPage from "@pages/CoinPage";
import { useQueryParamsStoreInit } from "@store/RootStore/hooks/useQueryParamsStoreInit";
import { Navigate, Route, Routes } from "react-router-dom";

import styles from "./App.scss";

function App() {
  useQueryParamsStoreInit();
  return (
    <div className={styles.app}>
      <Routes>
        <Route path="/coins" element={<CoinListPage />} />
        <Route path=":name" element={<CoinPage />} />
        <Route path="*" element={<Navigate to="/coins" replace />} />
      </Routes>
    </div>
  );
}

export default App;
