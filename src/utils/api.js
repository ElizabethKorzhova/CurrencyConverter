import axios from "axios";

const { REACT_APP_API_HOST: API_HOST, REACT_APP_API_KEY: API_KEY } =
  process.env;

export const currencies = {
  getCurrencies: async (baseCode, targetCode) =>
    (await axios.get(`${API_HOST}/${API_KEY}/pair/${baseCode}/${targetCode}`))
      .data,
  getAllCurrencies: async (baseCode) =>
    (await axios.get(`${API_HOST}/${API_KEY}/latest/${baseCode}`)).data,
};
