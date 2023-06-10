import { memo } from "react";
import "./MenuBtn.scss";

const MenuBtn = memo((props) => {
  return (
    <div onClick={() => props.eventClick()} className="menu-btn">
      <i className="fa-solid fa-bars"></i>
    </div>
  );
});

export default MenuBtn;
