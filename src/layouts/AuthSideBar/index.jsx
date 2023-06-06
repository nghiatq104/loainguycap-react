import { memo } from "react";
import "./AuthSideBar.scss";
import AuthSideItem from "../../components/AuthSideItem";
import SideItem from "../../Constant/SideItem";

const AuthSideBar = memo(() => {
  return (
    <div className="side-container">
      <div className="auth-sidebar">
        {SideItem.map((item, i) => {
          return (
            <AuthSideItem
              key={i}
              id={i}
              icon={item.icon}
              title={item.title}
              dropBtn={item.dropBtn}
            />
          );
        })}
      </div>
    </div>
  );
});

export default AuthSideBar;
