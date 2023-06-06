import { memo, useEffect, useState } from "react";
import styled from "styled-components";
import Btn from "../Button/Btn";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AdminContext } from "../../Context/AdminPageContext";
import useDebounce from "../../hook/Debounce";
import axios from "axios";

const StyleForm = styled.form`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: calc(100% - 60px);
`;
const Body = styled.div`
  width: 100%;
  flex: 1;
  height: calc(100% - 66px);
  padding: 20px 20px 0 20px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background: #5f5f5f;
  }
`;

const Footer = styled.div`
  width: 100%;
  height: 66px;
  padding: 8px 28px 22px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: end;
  div {
    height: 100%;
    width: 50%;
    display: flex;
    align-items: center;
  }
`;

const InputContainer = styled.div`
  width: 100%;
  height: 86px;
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
  span {
    font-size: 1.2rem;
    color: red;
    padding: 0;
  }
`;

const InputText = styled.div`
  width: 100%;
  flex: 1;
  padding: 0 12px;
  margin-bottom: 4px;
  position: relative;
  display: flex;
  align-items: center;
  input {
    outline: none;
    padding: 27px 10px 0 10px;
    border-top-left-radius: 2px;
    border-top-right-radius: 2px;
    width: 100%;
    height: 100%;
    font-size: 1.6rem;
    border: none;
    border-bottom: 1px solid #00000099;
    background-color: #f0f0f0;
    &:valid + label {
      color: #00000099;
      top: 12px;
      font-size: 1.2rem;
    }
    &:valid {
      border-bottom: 1px solid #00000099;
    }
    &:focus + label {
      top: 12px;
      color: #da2a1c;
      font-size: 1.2rem;
    }
    &:focus {
      border-bottom: 1px solid #da2a1c;
    }
  }
  label {
    position: absolute;
    padding: 0 12px;
    left: 10px;
    top: 34px;
    pointer-events: none;
    font-size: 1.6rem;
    font-weight: 500;
    color: #00000099;
    transition: all 0.3s ease-in-out;
  }
`;

const InputWithFeature = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #00000099;
  background-color: #f0f0f0;
  input {
    border: none;
    background: none;
    &:valid + div {
      border-bottom: 1px solid #00000099;
    }
    &:focus + div {
      border-bottom: 1px solid #da2a1c;
    }
    &:valid,
    &:focus {
      border: none;
      background: none;
    }
  }
  label {
    position: absolute;
    padding: 0 12px;
    left: 10px;
    top: 34px;
    pointer-events: none;
    font-size: 1.6rem;
    font-weight: 500;
    color: #00000099;
    transition: all 0.3s ease-in-out;
  }
  button {
    width: 30px;
    height: 30px;
    color: rgba(0, 0, 0, 0.6);
    font-size: 1.6rem;
    outline: none;
    border: none;
    background: none;
    border-radius: 50%;
    margin: 0 20px;
    &:hover {
      background-color: rgba(0, 0, 0, 0.2);
    }
  }
`;

const DropdownInt = styled.div`
  width: 100%;
  height: 14px;
  padding: 0 12px;
  margin-bottom: 8px;
`;

let token = localStorage.getItem("token");

const Form = memo(() => {
  // setloading
  const [isLoad, setIsLoad] = useState(false);
  const { setIsAdd } = useContext(AdminContext);
  // roles
  const [roles, setRoles] = useState([]);
  // show pass
  const [show1, setShow1] = useState("fa-regular fa-eye");
  const [showPass1, setShowPass1] = useState("password");
  const [show2, setShow2] = useState("fa-regular fa-eye");
  const [showPass2, setShowPass2] = useState("password");
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const url = "http://wlp.howizbiz.com/api/roles";
  const urlUser = "http://wlp.howizbiz.com/api/users";

  useEffect(() => {
    const getRoles = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const respone = await axios.get(url, config);
      let data = respone.data;
      setRoles(data);
    };
    getRoles();
  }, [url]);
  // console.log(roles);
  const password = watch("password");
  // function show pass
  const showPassword = (e, showPass, setShowPass, setShow) => {
    e.preventDefault();
    if (showPass === "password") {
      setShowPass("text");
      setShow("fa-regular fa-eye-slash");
    } else {
      setShowPass("password");
      setShow("fa-regular fa-eye");
    }
  };

  // Create user

  const onSubmit = async (data) => {
    const datauser = {
      name: data.name,
      username: data.username,
      email: data.email,
      mobile: data.mobile ? data.mobile : "",
      password: data.password,
      password_confirmation: data.password,
      role_ids: [2],
    };
    // console.log(datauser);

    setIsLoad(true);
    try {
      await axios.post(urlUser, datauser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Thêm mới thành công");
      setIsAdd(false);
    } catch (error) {
      const errors = error.response.data.errors;
      console.log(errors);
    } finally {
      setIsLoad(false);
    }
  };

  return (
    <StyleForm action="" onSubmit={handleSubmit(onSubmit)}>
      <Body>
        <InputContainer>
          <InputText>
            <input
              name="name"
              type="text"
              required
              {...register("name", { required: true })}
            />
            <label>Tên hiển thị</label>
          </InputText>
          <DropdownInt>
            {errors.name && <span>Trường này không được để trống</span>}
          </DropdownInt>
        </InputContainer>
        <InputContainer>
          <InputText>
            <input
              name="username"
              type="text"
              required
              {...register("username", { required: true })}
            />
            <label>Tên đăng nhập</label>
          </InputText>
          <DropdownInt>
            {errors.username && <span>Trường này không được để trống</span>}
          </DropdownInt>
        </InputContainer>
        <InputContainer>
          <InputText>
            <input
              type="email"
              name="email"
              required
              {...register("email", { required: true })}
            />
            <label>Email</label>
          </InputText>
          <DropdownInt>
            {errors.email && <span>Trường này không được để trống</span>}
          </DropdownInt>
        </InputContainer>
        <InputContainer>
          <InputText>
            <input
              name="mobile"
              type="text"
              {...register("mobile", {
                required: false,
                pattern: /^\d{9}$/,
              })}
            />
            <label>Điện thoại</label>
          </InputText>

          <DropdownInt>
            <span style={{ color: "rgba(0,0,0,0.7)" }}>
              Trường có thể để trống
            </span>

            {errors.mobile && errors.mobile.type === "pattern" && (
              <span>Số điện thoại phải có ít nhất 9 số</span>
            )}
          </DropdownInt>
        </InputContainer>
        <InputContainer>
          <InputText>
            <InputWithFeature>
              <input
                name="password"
                type={showPass1}
                required
                {...register("password", { required: true, minLength: 8 })}
              />
              <label>Mật khẩu</label>
              <button
                value={1}
                onClick={(e) =>
                  showPassword(e, showPass1, setShowPass1, setShow1)
                }
              >
                <i className={show1}></i>
              </button>
            </InputWithFeature>
          </InputText>

          <DropdownInt>
            {errors.password && errors.password.type === "required" && (
              <span>Trường này không được để trống</span>
            )}
            {errors.password && errors.password.type === "minLength" && (
              <span>Mật khẩu phải có ít nhất 8 ký tự</span>
            )}
          </DropdownInt>
        </InputContainer>
        <InputContainer>
          <InputText>
            <InputWithFeature>
              <input
                name="passwordConfirm"
                type={showPass2}
                required
                {...register("passwordConfirm", {
                  required: true,
                  validate: (value) =>
                    value === password || "Mật khẩu chưa trùng khớp",
                })}
              />
              <label>Mật khẩu xác nhận</label>
              <button
                value={2}
                onClick={(e) =>
                  showPassword(e, showPass2, setShowPass2, setShow2)
                }
              >
                <i className={show2}></i>
              </button>
            </InputWithFeature>
          </InputText>

          <DropdownInt>
            {errors.passwordConfirm &&
              errors.passwordConfirm.type === "required" && (
                <span>Trường này không được để trống</span>
              )}
            {errors.passwordConfirm && errors.passwordConfirm.message && (
              <span>{errors.passwordConfirm.message}</span>
            )}
          </DropdownInt>
        </InputContainer>
        <InputContainer>
          <InputText>
            <input
              name="roles"
              required
              {...register("roles", { required: true })}
            />
            <label>Quyền</label>
          </InputText>

          <DropdownInt>
            {errors.roles && <span>Trường này không được để trống</span>}
          </DropdownInt>
        </InputContainer>
      </Body>
      <Footer>
        <div>
          <Btn
            title="Hủy"
            handleClick={() => {
              setIsAdd(false);
            }}
          />
          <Btn
            handleClick={handleSubmit}
            type="submit"
            title="+ Thêm mới"
            iscolor={true}
            // isloading={isLoad}
          />
        </div>
      </Footer>
    </StyleForm>
  );
});

export default Form;
