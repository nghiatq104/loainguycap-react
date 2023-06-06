import { memo } from "react";
import "./MenuBtn.scss";

const MenuBtn = memo(() => {
  return (
    <div className="menu-btn">
      <i className="fa-solid fa-bars"></i>
    </div>
  );
});

export default MenuBtn;
