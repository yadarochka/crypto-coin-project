import React from "react";
import { Route, Routes } from "react-router-dom";

import CategoriesPage from "./CategoriesPage";
import CoinListPage from "./CoinListPage";
import CoinPage from "./CoinPage";

const Rounting = () => {
  return (
    <Routes>
      <Route path="/" element={<CoinListPage />} />
      <Route path=":name" element={<CoinPage />} />
      <Route path="/categories" element={<CategoriesPage />} />
    </Routes>
  );
};

export default Rounting;
