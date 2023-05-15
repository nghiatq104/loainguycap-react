import { useEffect, useState } from "react";
import "./header.scss";
import getData from "../../Data/GetData";

function Header(props) {
  let api = props.api;
  const [keys, setkeys] = useState("");
  const [oldkeys, setoldkeys] = useState("");
  const [searchApi, setSearchApi] = useState(api);
  const [searchData, setSearchData] = useState([]);

  useEffect(() => {
    async function getDataSearch() {
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
  const onInputHandle = (e) => {
    // let newParam = "&search=" + e.target.value;
    if (e.target.value !== "") {
      setkeys("&search=" + e.target.value);
      if (oldkeys === "") {
        setSearchApi(api + keys);
      } else {
        let origApi = api.replace(oldkeys, keys);
        setSearchApi(origApi);
      }
    } else {
      setkeys("");
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      searchBtn();
    }
  };
  const searchBtn = () => {
    if (oldkeys === "") {
      props.setApi(api + keys);
    } else {
      let origApi = api.replace(oldkeys, keys);
      props.setApi(origApi);
    }
    setoldkeys(keys);
  };
  console.log(searchData);
  return (
    <div className="header">
      <div className="login">
        <button id="login">Đăng nhập</button>
      </div>

      <div className="header-container">
        <div className="icon">
          <img src="/images/logoColor.png" alt="" />
        </div>
        <div className="search-bar">
          <form className="search-in">
            <input
              id="ser-input"
              type="text"
              placeholder="Tìm kiếm"
              onChange={(e) => onInputHandle(e)}
              onKeyDown={(e) => handleKeyDown(e)}
            />
            <div className="info-search">
              {keys !== "" ? (
                searchData.map((data, i) => {
                  if (i >= 0 && i < 3) {
                    return (
                      <div className="more-info">
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
          <i
            id="search-btn"
            className="fa-solid fa-magnifying-glass"
            onClick={searchBtn}
          ></i>
          <a className="enhance" href="/">
            Nâng cao
          </a>
        </div>
        <div className="navLink">
          <div className="head-link">
            <a href="/">Bản tin</a>
          </div>
          <div className="head-link">
            <a href="/">Giới thiệu</a>
          </div>
          <div className="head-link">
            <a href="/">Tài liệu</a>
          </div>
          <div className="head-link">
            <a className="contact" href="/">
              Liên hệ
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Header;
