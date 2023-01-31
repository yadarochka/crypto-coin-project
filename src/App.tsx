import { ThemeContext } from "app/providers/ThemeProvider";
import classnames from "classnames";

import React, { useContext } from "react";

import Routing from "pages/Routing";
import { useQueryParamsStoreInit } from "store/RootStore/hooks/useQueryParamsStoreInit";

import styles from "./App.module.scss";
import { Header } from "./widgets/Header";

function App() {
  useQueryParamsStoreInit();
  const { theme } = useContext(ThemeContext);
  return (
    <div className={classnames(styles.app, styles[theme])}>
      <Header />
      <Routing />
    </div>
  );
}

export default App;
