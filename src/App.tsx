import React from "react";

import "./App.css";

import CoinListPage from "@pages/CoinListPage";
import CoinPage from "@pages/CoinPage";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/coins/" element={<CoinListPage />}></Route>
          <Route path="/coins/:name" element={<CoinPage />} />
          <Route path="*" element={<Navigate to="/coins" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
