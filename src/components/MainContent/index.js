import MainContentItem from "../MainContentItem";
import BreakLine from "../SideBar/BreakLine";
import "./MainContent.scss";
import API from "../../Constant/Api";
import getData from "../../utils/GetData";
// import getAxiosData from "../../utils/AxiosData";
import React, { useContext, useEffect, useState } from "react";
import Charts from "./Chart";
import TableHeader from "./TableHeader";
import { apiContext } from "../../Context/ApiContext";
import { NavTab } from "../../Context/NavTab";

const MainContent = React.memo((props) => {
  console.log("load main content");
  const { tabIndex } = useContext(NavTab);
  const value = useContext(apiContext);
  const [postList, setPostList] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [newpostList, setnewPostList] = useState([]);
  const [loading, setLoading] = useState("");
  const [hideLoad, setHideLoad] = useState("");
  const [btnLoad, setBtnLoad] = useState("");

  useEffect(() => {
    async function getApiData() {
      try {
        setLoading("loading");
        setHideLoad("hideLoad");
        const Data = await getData(value.api);
        const data = Data.list;
        const count = Data.pagination;
        const newData = [];
        setTotal(count.total);
        data.forEach((item) => {
          let loai_hien_trang = null;
          let sach_dos = null;
          let iucns = null;
          let images = API.domain + "/static/img/image4.5aecb9b5.png";
          if (item.loai_hien_trang) {
            loai_hien_trang = item.loai_hien_trang.ten;
          }
          if (item.sach_dos.length > 0) {
            sach_dos = item.sach_dos[0].ma_danh_muc;
          }
          if (item.iucns.length > 0) {
            iucns = item.iucns[0].ma_danh_muc;
          }
          if (item.attachments.length > 0) {
            images = API.domain + item.attachments[0].path;
          }
          newData.push({
            id: item.id,
            name: item.ten,
            ten_khoa_hoc: item.ten_khoa_hoc,
            images: images,
            kingdom: item.kingdom.ten,
            phylumn: item.phylumn.ten,
            loai_hien_trang: loai_hien_trang,
            sach_dos: sach_dos,
            iucns: iucns,
          });
        });
        setLoading("");
        setHideLoad("");
        setPostList(newData);
        setPage(1);
      } catch (error) {
        console.log("ERROR: " + error);
      }
    }
    getApiData();
  }, [value.api]);

  // load them data
  useEffect(() => {
    async function getApiData() {
      if (page > 1) {
        try {
          setBtnLoad("loading");
          const newData = [];
          let oldPage = "page=1";
          let newPage = "page=" + page;
          let newApi = value.api.replace(oldPage, newPage);
          const Data = await getData(newApi);
          const data = Data.list;
          const count = Data.pagination;
          setTotal(count.total);
          data.forEach((item) => {
            console.log(item);
            let loai_hien_trang = null;
            let sach_dos = null;
            let iucns = null;
            let images = API.domain + "/static/img/image4.5aecb9b5.png";
            if (item.loai_hien_trang) {
              loai_hien_trang = item.loai_hien_trang.ten;
            }
            if (item.sach_dos.length > 0) {
              sach_dos = item.sach_dos[0].ma_danh_muc;
            }
            if (item.iucns.length > 0) {
              iucns = item.iucns[0].ma_danh_muc;
            }
            if (item.attachments.length > 0) {
              images = API.domain + item.attachments[0].path;
            }
            newData.push({
              id: item.id,
              name: item.ten,
              ten_khoa_hoc: item.ten_khoa_hoc,
              images: images,
              kingdom: item.kingdom.ten,
              phylumn: item.phylumn.ten,
              loai_hien_trang: loai_hien_trang,
              sach_dos: sach_dos,
              iucns: iucns,
            });
          });
          setnewPostList((prevData) => [...prevData, ...newData]);
          setBtnLoad("");
        } catch (error) {
          console.log("ERROR: " + error);
        }
      } else {
        setnewPostList([]);
      }
    }
    getApiData();
  }, [page, value.api]);

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        backgroundColor: [],
        data: [],
      },
    ],
  });

  useEffect(() => {
    async function drawChart() {
      const chart = await getData(value.apiChart);
      const data = chart.hesinhthai;
      setChartData({
        labels: data.map((data) => data.ten),
        datasets: [
          {
            backgroundColor: ["#000", "#333", "#9b4f96", "#d81e05", "#fc7f3f"],
            data: data.map((data) => data.species_count),
          },
        ],
      });
    }
    drawChart();
  }, [value.apiChart]);

  let html1 = [];
  let html2 = [];
  let html3 = [];
  let hidden = "";

  tabIndex === 1
    ? html1.push(<TableHeader key={-1} />) &&
      html2.push(<TableHeader key={-2} />)
    : html1.push(<div key={-1}></div>) && html2.push(<div key={-2}></div>);

  tabIndex < 2
    ? postList.map((data, i) => {
        if (i >= 0 && i < 6) {
          return html1.push(
            <MainContentItem
              key={i}
              imgState={true}
              data={data}
              active={tabIndex}
            />
          );
        } else {
          return html2.push(
            <MainContentItem
              key={i}
              imgState={false}
              data={data}
              active={tabIndex}
            />
          );
        }
      })
    : (hidden = "hidden") && (html1 = <Charts data={chartData} />);

  newpostList.length > 0
    ? newpostList.map((data, i) => {
        return html3.push(
          <MainContentItem
            key={i}
            imgState={false}
            data={data}
            active={tabIndex}
          />
        );
      })
    : (html3 = []);

  return (
    <div className="main-content">
      <div className="outstanding-content mb-5">
        <h4>Kết quả ({total}) </h4>
        <div className={loading}></div>
        <div className={props.className + " " + hideLoad}>{html1}</div>
      </div>
      <div className={hidden}>
        <BreakLine />
        {total >= 6 ? (
          <div className="other-content">
            <h4>Kết quả khác</h4>
            <div className={loading}></div>
            <div className={props.className + " " + hideLoad}>
              {html2}
              {html3}
            </div>
            <div className={"text-center " + btnLoad + " " + hideLoad}>
              <button className="btn-more" onClick={() => setPage(page + 1)}>
                Tải thêm
              </button>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
});
export default MainContent;
