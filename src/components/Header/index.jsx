import React, { useEffect, useState } from "react";
import { currencies } from "../../utils/api";
import styles from "./styles.module.css";

const Header = () => {
  const [usdCurrency, setUsdCurrency] = useState("");
  const [eurCurrency, setEurCurrency] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setUsdCurrency(
        (await currencies.getCurrencies("USD", "UAH")).conversion_rate
      );
      setEurCurrency(
        (await currencies.getCurrencies("EUR", "UAH")).conversion_rate
      );
    };

    fetchData();
  }, [usdCurrency, eurCurrency]);

  return (
    <header className={styles.currenciesHeader}>
      <h3 className={styles.headerName}>currency converter</h3>
      <ul className={styles.headerList}>
        <li className={styles.headerListItem}>
          <span className={styles.currenciesTitles}>usd</span>
          {usdCurrency}
        </li>
        <li className={styles.headerListItem}>
          <span className={styles.currenciesTitles}>eur</span>
          {eurCurrency}
        </li>
      </ul>
    </header>
  );
};

export default Header;
