import React from "react";
import styles from "./styles.module.css";

const CurrencyField = ({
  currencyOptions,
  selectedCurrency,
  onChangeCurrency,
  quantity,
  onChangeQuantity,
}) => {
  return (
    <div className={styles.currencyField}>
      <input
        type="number"
        value={quantity}
        onChange={onChangeQuantity}
        min={1}
        className={styles.currencyQuantity}
      />
      <select
        className={styles.currencySelect}
        value={selectedCurrency}
        onChange={onChangeCurrency}
      >
        {currencyOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurrencyField;
