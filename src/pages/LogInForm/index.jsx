import { useForm } from "react-hook-form";
import "./LoginForm.scss";
import { Link } from "react-router-dom";

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onHandleSubmit = (data) => {
    console.log(data);
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
        <form
          className="form"
          action=""
          onSubmit={handleSubmit(onHandleSubmit)}
        >
          <div className="input-form">
            <i className="fa-regular fa-user"></i>
            <input
              name="name"
              type="text"
              placeholder="Tên đăng nhập"
              {...register("name", { required: true })}
            />
          </div>
          {errors.name && <span className="validator">Name is required</span>}

          <div className="input-form">
            <i className="fa-solid fa-lock"></i>
            <input
              type="password"
              placeholder="Mật khẩu"
              name="password"
              {...register("password", { required: true })}
            />
            <button>
              <i className="fa-regular fa-eye"></i>
            </button>
          </div>
          {errors.password && (
            <span className="validator">Password is required</span>
          )}

          <button type="submit" className="submitBtn">
            Đăng nhập
          </button>
          <button className="submitBtn forget-pass">Quên mật khẩu</button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
