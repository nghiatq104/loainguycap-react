import { memo } from "react";
import "./AuthSideItem.scss";

const AuthSideItem = memo((props) => {
  return (
    <div className="side-item d-flex">
      <div className="item-icon">{props.icon}</div>
      <div className="side-title">{props.title}</div>
      {props.dropBtn ? (
        <div className="icon-drop-down">
          <i className="fa-solid fa-sort-down"></i>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
});
export default AuthSideItem;
