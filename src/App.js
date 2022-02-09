import React from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import styles from "./App.styles.module.css";

const App = () => {
  return (
    <div className={styles.app}>
      <Header />
      <Home />
    </div>
  );
};

export default App;
