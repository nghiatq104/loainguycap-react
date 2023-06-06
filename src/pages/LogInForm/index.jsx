import { useForm } from "react-hook-form";
import "./LoginForm.scss";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { authContext } from "../../Context/AuthContext";

function LoginForm() {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(authContext);
  isAuthenticated ? navigate("/hethong") : console.log("Login");
  const { Login } = useContext(authContext);
  const [showPass, setShowPass] = useState("password");
  const [show, setShow] = useState("fa-regular fa-eye");
  const [loadLogin, setLoadLogin] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const showPassworrd = (e) => {
    e.preventDefault();
    if (showPass === "password") {
      setShowPass("text");
      setShow("fa-regular fa-eye-slash");
    } else {
      setShowPass("password");
      setShow("fa-regular fa-eye");
    }
  };

  const onSubmit = async (data) => {
    setLoadLogin("load-login");
    try {
      await Login(data);
      navigate("/hethong");
    } catch (error) {
      console.error("Error :" + error);
      alert("username or password is not correct");
    } finally {
      setLoadLogin("");
    }
  };

  return (
    <div className="login-form-container">
      <div className="title-header">
        <Link to="/" className="img_contain">
          <img src="/images/logoColor.png" alt="" />
        </Link>
        <div className="title">
          <h2>
            HỆ THỐNG BÁO CÁO VỀ HIỆN TRẠNG LOÀI NGUY CẤP, QUÝ, HIẾM ĐƯỢC ƯU TIÊN
            BẢO VỆ
          </h2>
        </div>
      </div>
      <div className="form-container">
        <div className="img">
          <img alt="logo" src="/images/logoColor.png" />
        </div>
        <h2>Đăng nhập</h2>

        {/* useForm */}
        <form className="form" action="" onSubmit={handleSubmit(onSubmit)}>
          <div className="input-form">
            <i className="fa-regular fa-user"></i>
            <input
              name="username"
              type="text"
              placeholder="Tên đăng nhập"
              {...register("username", { required: true })}
            />
          </div>
          {errors.name && <span className="validator">Name is required</span>}

          <div className="input-form">
            <i className="fa-solid fa-lock"></i>
            <input
              type={showPass}
              placeholder="Mật khẩu"
              name="password"
              {...register("password", { required: true })}
            />
            <button className="eye" onClick={(e) => showPassworrd(e)}>
              <i className={show}></i>
            </button>
          </div>
          {errors.password && (
            <span className="validator">Password is required</span>
          )}
          <div className="btn">
            <div className={loadLogin}></div>
            <button type="submit" className="submitBtn">
              Đăng nhập
            </button>
            <div className="submitBtn forget-pass">Quên mật khẩu</div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
