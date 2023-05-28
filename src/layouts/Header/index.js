import { useContext, useEffect, useState } from "react";
import "./header.scss";
import getData from "../../utils/GetData";
import React from "react";
import { Link } from "react-router-dom";
import { apiContext } from "../../Context/ApiContext";
import useDebounce from "../../hook/Debounce";

const Header = React.memo(() => {
  console.log("header-load");
  const value = useContext(apiContext);
  const [keys, setkeys] = useState("");
  const [oldkeys, setoldkeys] = useState("");
  const [searchApi, setSearchApi] = useState(value.api);
  const [searchData, setSearchData] = useState([]);

  const onInputHandle = useDebounce((valueInput) => {
    valueInput = valueInput.replace(/[. -]/g, "+");
    // console.log(valueInput);

    valueInput === ""
      ? setkeys("")
      : setkeys("&search=" + valueInput) && oldkeys === ""
      ? setSearchApi(value.api + keys)
      : setSearchApi(value.api.replace(oldkeys, keys));
  }, 300);

  useEffect(() => {
    async function getDataSearch() {
      // console.log(searchApi, 3);
      const data = await getData(searchApi);
      let itemData = data.list;
      const arr = [];
      itemData.forEach((data) => {
        arr.push({
          name: data.ten,
          ten_khoa_hoc: data.ten_khoa_hoc,
        });
      });
      setSearchData(arr);
    }
    getDataSearch();
  }, [searchApi]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      searchBtn();
    }
  };
  const searchBtn = () => {
    if (oldkeys === "") {
      value.setApi(value.api + keys);
    } else {
      let origApi = value.api.replace(oldkeys, keys);
      value.setApi(origApi);
    }
    setoldkeys(keys);
  };

  return (
    <div className="header">
      <Link to="/dangnhap" className="login">
        <button id="login">Đăng nhập</button>
      </Link>

      <div className="header-container">
        <Link to="/" className="icon">
          <img src="/images/logoColor.png" alt="" />
        </Link>
        <div className="search-bar">
          <form className="search-in">
            <input
              id="ser-input"
              type="text"
              placeholder="Tìm kiếm"
              onInput={(e) => onInputHandle(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e)}
            />
            <div className="info-search">
              {keys !== "" ? (
                searchData.map((data, i) => {
                  if (i >= 0 && i < 3) {
                    return (
                      <div key={i} className="more-info">
                        <p className="search-item">
                          {data.name}
                          <i>{data.ten_khoa_hoc}</i>
                        </p>
                      </div>
                    );
                  } else {
                    return null;
                  }
                })
              ) : (
                <div></div>
              )}
            </div>
          </form>
          <Link to={"/search"}>
            <i
              id="search-btn"
              className="fa-solid fa-magnifying-glass"
              onClick={searchBtn}
            ></i>
          </Link>

          <Link className="enhance" to="/search">
            Nâng cao
          </Link>
        </div>
        <div className="navLink">
          <Link to="/tintuc" className="head-link">
            <p>Bản tin</p>
          </Link>
          <Link to="/hoso/gioithieu" className="head-link">
            <p>Giới thiệu</p>
          </Link>
          <Link to="/hoso/tailieu" className="head-link">
            <p>Tài liệu</p>
          </Link>
          <Link to="/hoso/lienhe" className="head-link">
            <p className="contact">Liên hệ</p>
          </Link>
        </div>
      </div>
    </div>
  );
});
export default Header;
