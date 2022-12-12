import { PageLoader } from "widgets/PageLoader";

import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import CoinListPage from "./CoinListPage";

const CategoriesPage = React.lazy(() => import("./CategoriesPage"));
const CoinPage = React.lazy(() => import("./CoinPage"));

const Rounting = () => {
  return (
    <Routes>
      <Route path="/" element={<CoinListPage />} />
      <Route
        path=":name"
        element={
          <Suspense fallback={<PageLoader />}>
            <CoinPage />
          </Suspense>
        }
      />
      <Route
        path="/categories"
        element={
          <Suspense fallback={<PageLoader />}>
            <CategoriesPage />
          </Suspense>
        }
      />
    </Routes>
  );
};

export default Rounting;
