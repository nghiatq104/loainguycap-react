import React, { useEffect, useState } from "react";
import API from "../../Constant/Api";
import "./InfoPage.scss";
import getData from "../../utils/GetData";

const InfoPage = React.memo(() => {
  let [news, setNews] = useState([]);

  useEffect(() => {
    async function getNewsData() {
      let data = await getData(API.newsData);
      data = data.list;
      setNews(data);
    }
    getNewsData();
  }, []);

  return (
    <div className="infomation">
      <h1>Danh sách bài viết</h1>
      <div className="item-number">3/3</div>
      <div className="info-container">
        {news.map((data, i) => {
          return (
            <div key={i} className="info-item">
              <div className="img-contain">
                <img src={API.domain + data.anh_dai_dien} alt="" />
              </div>
              <p>{data.ngay_viet}</p>
              <h6>{data.tieu_de}</h6>
              <p>{data.tom_tat}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
});
export default InfoPage;
