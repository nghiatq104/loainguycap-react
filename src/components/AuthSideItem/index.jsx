import { memo } from "react";
import "./AuthSideItem.scss";
import { NavLink } from "react-router-dom";

const AuthSideItem = memo((props) => {
  return (
    <div className="side-item">
      <NavLink to={props.link} activeclassname="active" className="d-flex">
        <div className="item-icon">{props.icon}</div>
        <div className="side-title">{props.title}</div>
        {props.dropBtn ? (
          <div className="icon-drop-down">
            <i className="fa-solid fa-sort-down"></i>
          </div>
        ) : (
          <div></div>
        )}
      </NavLink>
    </div>
  );
});
export default AuthSideItem;
