import React from "react";

import Routing from "pages/Routing";
import { useQueryParamsStoreInit } from "store/RootStore/hooks/useQueryParamsStoreInit";

import styles from "./App.module.scss";
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
