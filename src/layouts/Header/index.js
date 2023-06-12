import { useContext, useEffect, useState } from "react";
import "./header.scss";
import getData from "../../utils/GetData";
import React from "react";
import { Link } from "react-router-dom";
import { apiContext } from "../../Context/ApiContext";
import useDebounce from "../../hook/Debounce";
import MenuBtn from "../../components/Button/MenuBtn/MenuBtn";
import styled from "styled-components";

const NavLink = styled.div`
  height: 100%;
  align-items: center;
  .head-link {
    height: 100%;
    display: flex;
    align-items: center;
    min-width: 6.4rem;
    padding: 0 1.6rem;
    border-radius: 0.5rem;
    border-left: 0.05rem solid #fff;
    cursor: pointer;
    text-decoration: none;
    p {
      color: #fff;
      text-decoration: none;
      font-size: 1.6rem;
      font-weight: 700;
      height: 2.1rem;
      &:hover {
        border-bottom: 2px solid #fff;
      }
    }
    .contact {
      color: #404f5a;
      &:hover {
        border-bottom: 2px solid #404f5a;
      }
    }
    &:nth-child(4) {
      border: none;
      background-color: #ffc476;
      border-radius: 0;
      padding: 0 3.2rem;
      &:hover {
        background-color: #ffc476;
      }
    }
    &:hover {
      background-color: #b83329;
    }
  }
  @media (min-width: 1000px) {
    display: flex;
  }
  @media (max-width: 999px) {
    display: none;
  }
`;
const ContainMenuBtn = styled.div`
  @media (min-width: 1000px) {
    display: none;
  }
  @media (max-width: 999px) {
    display: flex;
  }
`;
const MiniNavLink = styled.div`
  width: 120px;
  position: absolute;
  padding: 10px;
  background-color: #fff;
  right: 20px;
  top: 100px;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.4);
  z-index: 2;
  a {
    font-size: 1.6rem;
    p {
      margin: 0;
      height: 30px;
      display: flex;
      align-items: center;
      &:hover {
        background-color: rgba(255, 0, 0, 0.1);
      }
    }
  }
  display: ${(props) => (props.showMenu ? "block" : "none")};
  @media (min-width: 1000px) {
    display: none;
  }
`;

const Header = React.memo(() => {
  console.log("header-load");
  const value = useContext(apiContext);
  const [keys, setkeys] = useState("");
  const [oldkeys, setoldkeys] = useState("");
  const [searchApi, setSearchApi] = useState(value.api);
  const [searchData, setSearchData] = useState([]);
  const [showMenu, setShowMenu] = useState(false);

  const onInputHandle = useDebounce((valueInput) => {
    valueInput = valueInput.replace(/[. -]/g, "+");

    valueInput === ""
      ? setkeys("")
      : setkeys("&search=" + valueInput) && oldkeys === ""
      ? setSearchApi(value.api + keys)
      : setSearchApi(value.api.replace(oldkeys, keys));
  }, 300);

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
      {localStorage.getItem("user") ? (
        <Link to="/hethong" className="login">
          <button id="login">
            {JSON.parse(localStorage.getItem("user")).username}
          </button>
        </Link>
      ) : (
        <Link to="/dangnhap" className="login">
          <button id="login">Đăng nhập</button>
        </Link>
      )}

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
        <ContainMenuBtn>
          <MenuBtn color="#fff" eventClick={() => setShowMenu(!showMenu)} />
        </ContainMenuBtn>

        <NavLink>
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
        </NavLink>

        <MiniNavLink showMenu={showMenu}>
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
        </MiniNavLink>
      </div>
    </div>
  );
});
export default Header;
