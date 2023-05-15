import "./SideBar.scss";
import BreakLine from "./BreakLine.js";
import ListCheckBox from "../ListCheckBox";
import { useState } from "react";
import { useEffect } from "react";
import getData from "../../Data/GetData";
import API from "../../Data/Api";

function SideBar(props) {
  let [lisCurrent, setListCurrent] = useState([]);
  let [listProvince, setListProvince] = useState([]);
  let [listRedBook, setListRedBook] = useState([]);
  let [listIUCN, setListIUCN] = useState([]);

  const dataFilter = [
    {
      name: "Hiện trạng loài",
      data: lisCurrent,
      filter: "&loaihientrang_ids[]=",
    },
    {
      name: "Địa giới hành chính",
      data: listProvince,
      filter: "&province_ids[]=",
    },
    {
      name: "Sách đỏ",
      data: listRedBook,
      filter: "&sach_do_ids[]=",
    },
    {
      name: "IUCN",
      data: listIUCN,
      filter: "&iucn_ids[]=",
    },
  ];
  useEffect(() => {
    async function returnData() {
      let data = await getData(API.ListProvince);
      const newArr = [];
      data.forEach((data) => {
        newArr.push({
          id: data.id,
          name: data.name,
        });
      });
      setListProvince(newArr);
    }
    returnData();
  }, []);
  useEffect(() => {
    async function returnData() {
      let data = await getData(API.ListRedBook);
      let data1 = data[0].childs;
      let data2 = data[1].childs;
      const newArr1 = [];
      const newArr2 = [];
      data1.forEach((data) => {
        newArr1.push({
          id: data.id,
          name: data.ma_danh_muc + " " + data.ten,
        });
      });
      data2.forEach((data) => {
        newArr2.push({
          id: data.id,
          name: data.ma_danh_muc + " " + data.ten,
        });
      });
      setListIUCN(newArr2);
      setListRedBook(newArr1);
    }
    returnData();
  }, []);
  useEffect(() => {
    async function returnData() {
      let data = await getData(API.ListCurrent);
      const newArr = [];
      data.forEach((data) => {
        newArr.push({
          id: data.id,
          name: data.ten,
        });
      });
      setListCurrent(newArr);
    }
    returnData();
  }, []);

  return (
    <div className="sideBar">
      <div className="sideBar-type">
        <div className="sideBar-title d-flex align-items-center">
          <div className="text-uppercase">loại</div>
          <div className="sideBar-icon d-flex align-items-center">
            <i className="fa-solid fa-circle-question"></i>
          </div>
        </div>
        <BreakLine />
        <div className="radio-container">
          <div className=" d-flex align-items-center">
            <input name="type-radio-sideBar" type="radio" />
            <div>Loài</div>
          </div>
          <div className=" d-flex align-items-center">
            <input name="type-radio-sideBar" type="radio" />
            <div>Văn bản tài liệu</div>
          </div>
        </div>
      </div>

      <div className="sideBar-type">
        <div className="sideBar-title d-flex align-items-center">
          <div className="text-uppercase">Bộ lọc</div>
          <div className="sideBar-icon d-flex align-items-center">
            <i className="fa-solid fa-circle-question"></i>
          </div>
        </div>
        <BreakLine />
        {dataFilter.map((item, i) => {
          return (
            <ListCheckBox
              key={i}
              filter={item.filter}
              name={item.name}
              data={item.data}
              api={props.api}
              setApi={props.setApi}
              apiChart={props.apiChart}
              setApiChart={props.setApiChart}
            />
          );
        })}
      </div>
    </div>
  );
}
export default SideBar;
