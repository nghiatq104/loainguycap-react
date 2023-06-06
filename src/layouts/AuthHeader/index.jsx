import { memo, useContext, useState } from "react";
import "./AuthHeader.scss";
import { Link } from "react-router-dom";
import { authContext } from "../../Context/AuthContext";
import MenuBtn from "../../components/Button/MenuBtn/MenuBtn";

const AuthHeader = memo((props) => {
  const { Logout } = useContext(authContext);
  const [hiddenModal, setHiddenModal] = useState(false);
  const [active, setActive] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const modalUser = () => {
    if (!hiddenModal) {
      setActive("active");
    } else {
      setActive("");
    }
    setHiddenModal(!hiddenModal);
  };

  let userAvatar =
    user["avatar_url"] !== "" ? (
      <div className="avarta-user">
        <img src={user["avatar_url"]} alt="" />
      </div>
    ) : (
      <>
        <div className="role-avatar">{user.name[0]}</div>
      </>
    );
  return (
    <>
      <div className="auth-head">
        <div className="left-auth-head">
          <MenuBtn onClick={props.onClick} />
          <Link to="/">
            <div className="home-icon">
              <img src="../images/logoColor.png" alt="" />
            </div>
            <h1>
              HỆ THỐNG BÁO CÁO VỀ HIỆN TRẠNG LOÀI NGUY CẤP, QUÝ, HIẾM ĐƯỢC ƯU
              TIÊN BẢO VỆ
            </h1>
          </Link>
        </div>
        <div className="right-auth-head" onClick={() => modalUser()}>
          <div className={"modal-user " + active}>
            {userAvatar}
            <div
              style={{
                backgroundColor: user.role.meta.color,
              }}
              className="role"
            >
              {user.role.name}
            </div>
            <div className="user-btn">
              <button className="btn info">Hồ sơ</button>
              <button className="btn logout" onClick={() => Logout()}>
                Đăng xuất
              </button>
            </div>
          </div>
          {userAvatar}
          <div
            className="acc-name"
            style={{
              color: user.role.meta["text-color"],
            }}
          >
            <p>{user.name}</p>
          </div>
        </div>
      </div>
    </>
  );
});

export default AuthHeader;
