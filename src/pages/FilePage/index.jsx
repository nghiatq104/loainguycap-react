import "./FilePage.scss";
import { NavLink, Outlet } from "react-router-dom";

function FilePage() {
  // const path = window.location.pathname;

  return (
    <div className="hoso">
      <h5>Hồ sơ</h5>
      <div className="hoso-grap d-flex">
        <div className="sideMenu">
          <NavLink
            to="/hoso/gioithieu"
            className="hoso-item"
            activeclassname="active"
          >
            <i className="fa-solid fa-circle-info"></i>
            <h4>Giới thiệu</h4>
          </NavLink>
          <hr />
          <NavLink
            to="/hoso/tailieu"
            className="hoso-item"
            activeclassname="active"
          >
            <i className="fa-solid fa-file"></i>
            <h4>Tài liệu</h4>
          </NavLink>
          <hr />

          <NavLink
            to="/hoso/lienhe"
            className="hoso-item"
            activeclassname="active"
          >
            <i className="fa-solid fa-phone"></i>
            <h4>Liên hệ</h4>
          </NavLink>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
export default FilePage;
