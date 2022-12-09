import React from "react";

import { useQueryParamsStoreInit } from "store/RootStore/hooks/useQueryParamsStoreInit";

import styles from "./App.module.scss";
import { Routing } from "./pages";
import { Header } from "./widgets/Header";

function App() {
  useQueryParamsStoreInit();
  return (
    <div className={styles.app}>
      <Header />
      <Routing />
    </div>
  );
}

export default App;
