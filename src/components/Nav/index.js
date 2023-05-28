import "./Nav.scss";
import NavBtn from "../NavBtn";
import React, { useContext, useEffect, useState } from "react";
import getData from "../../utils/GetData";
import * as XLSX from "xlsx";
import { apiContext } from "../../Context/ApiContext";
import { NavTab } from "../../Context/NavTab";
import useDebounce from "../../hook/Debounce";

const Nav = React.memo(() => {
  console.log("Nav loaded");

  const context = useContext(NavTab);
  const value = useContext(apiContext);
  const [exportData, setExportData] = useState([]);

  useEffect(() => {
    async function getDataExport() {
      const data = await getData(value.api);
      let newData = data.list;
      const arr = [];
      newData.forEach((data) => {
        arr.push({
          id: data.id,
          name: data.ten,
          ten_khoa_hoc: data.ten_khoa_hoc,
          dac_diem_nhan_dang: data.dac_diem_nhan_dang,
          ten_tac_gia: data.ten_tac_gia,
        });
      });
      setExportData(arr);
    }
    getDataExport();
  }, [value.api]);

  const exportExcel = useDebounce(() => {
    let filename = "loai.xlsx";
    var wb = XLSX.utils.book_new();
    var ws = XLSX.utils.json_to_sheet(exportData);
    XLSX.utils.book_append_sheet(wb, ws, "loai");
    XLSX.writeFile(wb, filename);
  }, 500);

  const navBtn = [
    {
      name: "Lưới",
      icon: (
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="grid"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          <path
            fill="currentColor"
            d="M0 72C0 49.9 17.9 32 40 32H88c22.1 0 40 17.9 40 40v48c0 22.1-17.9 40-40 40H40c-22.1 0-40-17.9-40-40V72zM0 232c0-22.1 17.9-40 40-40H88c22.1 0 40 17.9 40 40v48c0 22.1-17.9 40-40 40H40c-22.1 0-40-17.9-40-40V232zM128 392v48c0 22.1-17.9 40-40 40H40c-22.1 0-40-17.9-40-40V392c0-22.1 17.9-40 40-40H88c22.1 0 40 17.9 40 40zM160 72c0-22.1 17.9-40 40-40h48c22.1 0 40 17.9 40 40v48c0 22.1-17.9 40-40 40H200c-22.1 0-40-17.9-40-40V72zM288 232v48c0 22.1-17.9 40-40 40H200c-22.1 0-40-17.9-40-40V232c0-22.1 17.9-40 40-40h48c22.1 0 40 17.9 40 40zM160 392c0-22.1 17.9-40 40-40h48c22.1 0 40 17.9 40 40v48c0 22.1-17.9 40-40 40H200c-22.1 0-40-17.9-40-40V392zM448 72v48c0 22.1-17.9 40-40 40H360c-22.1 0-40-17.9-40-40V72c0-22.1 17.9-40 40-40h48c22.1 0 40 17.9 40 40zM320 232c0-22.1 17.9-40 40-40h48c22.1 0 40 17.9 40 40v48c0 22.1-17.9 40-40 40H360c-22.1 0-40-17.9-40-40V232zM448 392v48c0 22.1-17.9 40-40 40H360c-22.1 0-40-17.9-40-40V392c0-22.1 17.9-40 40-40h48c22.1 0 40 17.9 40 40z"
          ></path>
        </svg>
      ),
    },
    {
      name: "Bảng",
      icon: <i className="fa-solid fa-bars"></i>,
    },
    {
      name: "Thống kê",
      icon: <i className="fa-solid fa-chart-simple"></i>,
    },
  ];

  return (
    <div className="nav-bar d-flex align-items-center">
      <div className="nav-left"></div>
      <div className="nav-right d-flex align-items-center">
        <div className="tab">
          {navBtn.map((data, i) => {
            return (
              <NavBtn
                key={i}
                id={i}
                name={data.name}
                icon={data.icon}
                onClick={context.handleClick}
                active={context.tabIndex === i ? "current" : ""}
              />
            );
          })}
        </div>
        <div className="export-EX d-flex align-items-center justyfy-content-center">
          <button className="export btn" onClick={exportExcel}>
            <i className="fa-solid fa-file-excel"></i>
          </button>
          <div></div>
        </div>
      </div>
    </div>
  );
});
export default Nav;
