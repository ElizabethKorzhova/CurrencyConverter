import React, { useEffect, useState } from "react";
import CurrencyField from "../../components/CurrencyField";
import { currencies } from "../../utils/api";
import styles from "./styles.module.css";

const Home = () => {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [quantityInFromInput, setQuantityInFromInput] = useState(true);
  const [exchangeCurrency, setExchangeCurrency] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const data = await currencies.getAllCurrencies("UAH");
      const currencyData = Object.keys(data.conversion_rates);
      const initialFromCurrency = currencyData[0];
      const initialToCurrency = currencyData.find(
        (currentValue) => currentValue === "USD"
      );
      setCurrencyOptions(currencyData);
      setFromCurrency(initialFromCurrency);
      setToCurrency(initialToCurrency);
      setExchangeCurrency(data.conversion_rates[initialToCurrency]);
    };
    fetchData();
  }, []);

  let toQuantity,
    fromQuantity = 1;
  if (quantityInFromInput) {
    fromQuantity = quantity;
    toQuantity = quantity * exchangeCurrency;
  } else {
    toQuantity = quantity;
    fromQuantity = quantity / exchangeCurrency;
  }

  const handleChangeFromCurrency = (e) => {
    e.preventDefault();
    setFromCurrency(e.target.value);
  };

  const handleChangeToCurrency = (e) => {
    e.preventDefault();
    setToCurrency(e.target.value);
  };

  const handleChangeQuantityFrom = (e) => {
    setQuantity(e.target.value);
    setQuantityInFromInput(true);
  };

  const handleChangeQuantityTo = (e) => {
    setQuantity(e.target.value);
    setQuantityInFromInput(false);
  };

  useEffect(() => {
    if (fromCurrency && toCurrency) {
      const fetchData = async () => {
        const exchangeData = (
          await currencies.getCurrencies(fromCurrency, toCurrency)
        ).conversion_rate;
        setExchangeCurrency(exchangeData);
      };
      fetchData();
    }
  }, [fromCurrency, toCurrency]);

  return (
    <main className={styles.converterSection}>
      <h1 className={styles.converterTitle}>
        Hey, it's your favorite currency converter!
      </h1>
      <h2 className={styles.converterSubtitle}>
        By default, we've selected
        <span className={styles.converterSubtitleSpan}> UAH as a base</span>
      </h2>
      <CurrencyField
        currencyOptions={currencyOptions}
        selectedCurrency={fromCurrency}
        onChangeCurrency={handleChangeFromCurrency}
        quantity={fromQuantity}
        onChangeQuantity={handleChangeQuantityFrom}
      />
      <CurrencyField
        currencyOptions={currencyOptions}
        selectedCurrency={toCurrency}
        onChangeCurrency={handleChangeToCurrency}
        quantity={toQuantity}
        onChangeQuantity={handleChangeQuantityTo}
      />
    </main>
  );
};

export default Home;
