import axios from "axios";
import { useEffect } from "react";
import { memo } from "react";
import styled from "styled-components";
import API from "../../Constant/Api";
import { useState } from "react";
import MainContentItem from "../../components/MainContentItem";
import getData from "../../utils/GetData";

const Container = styled.div`
  width: 100%;
`;
const Pieces = styled.div`
  width: 100%;
  padding: 24px;
  h3 {
    text-transform: uppercase;
    font-size: 1.6rem;
    font-weight: 400;
    width: 100%;
    padding-bottom: 20px;
  }
`;
const InfoItem = styled.div`
  border: 1px solid #c9c9c9;
  border-radius: 4px;
  flex: 1;
  width: 100%;
  min-width: 300px;
  padding: 10px;
  margin: 5px;
  height: 400px;
  .img-contain {
    width: 100%;
    img {
      width: 100%;
      height: auto;
      max-height: 220px;
      object-fit: cover;
    }
  }
  p {
    padding-top: 1rem;
    font-size: 13px;
    &:last-child {
      font-size: 15px;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  }
  h6 {
    font-size: 18px;
  }
`;
const Home = memo(() => {
  const [dataSpecies, setDataSpecies] = useState([]);
  let [news, setNews] = useState([]);

  useEffect(() => {
    async function getNewsData() {
      let data = await getData(API.newsData);
      data = data.list;
      setNews(data);
    }
    getNewsData();
  }, []);
  useEffect(() => {
    const GetData = async () => {
      try {
        const response = await axios.get(API.loainoibat);
        const data = response.data;
        const newData = [];
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
        setDataSpecies(newData);
      } catch (error) {
        console.log(error);
      }
    };
    GetData();
  }, []);

  return (
    <Container>
      <Pieces>
        <h3>Loài nổi bật</h3>
        <div className="row">
          {dataSpecies &&
            dataSpecies.map((data, i) => {
              return (
                <MainContentItem
                  key={i}
                  imgState={true}
                  data={data}
                  active={0}
                  col="col-lg-3"
                />
              );
            })}
        </div>
      </Pieces>
      <Pieces>
        <h3>Bản tin</h3>
        <div className="d-flex flex-wrap">
          {news.map((data, i) => {
            return (
              <InfoItem key={i}>
                <div className="img-contain">
                  <img src={API.domain + data.anh_dai_dien} alt="" />
                </div>
                <p>{data.ngay_viet}</p>
                <h6>{data.tieu_de}</h6>
                <p>{data.tom_tat}</p>
              </InfoItem>
            );
          })}
        </div>
      </Pieces>
    </Container>
  );
});

export default Home;
