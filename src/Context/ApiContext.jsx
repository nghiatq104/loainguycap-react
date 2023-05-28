import React, { createContext, useEffect, useState } from "react";
import getData from "../utils/GetData";
import API from "../Constant/Api";

export const apiContext = createContext({});

function ApiProvider({ children }) {
  let [dataNghiDinh, setDataNghiDinh] = useState([]);
  let [api, setApi] = useState(API.listSpecies);
  let [apiChart, setApiChart] = useState(API.chartDetail);

  useEffect(() => {
    async function getDataNghiDinh() {
      let data = await getData(API.nghiDinh);
      setDataNghiDinh(data);
    }
    getDataNghiDinh();
  }, []);

  const value = {
    dataNghiDinh,
    api,
    setApi,
    apiChart,
    setApiChart,
  };

  return <apiContext.Provider value={value}>{children}</apiContext.Provider>;
}

export default ApiProvider;
