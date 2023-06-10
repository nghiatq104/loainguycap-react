import { memo, useEffect, useState } from "react";
import styled from "styled-components";
import Btn from "../Button/Btn";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AdminContext } from "../../Context/AdminPageContext";
import axios from "axios";
import MultiSelectOptions from "../Button/SelectOption";

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
  min-height: 86px;
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
`;
const StSpan = styled.span`
  font-size: 1.2rem;
  color: red;
  padding: 0;
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
  const [dataErrors, setDataErrors] = useState({});
  // idRole
  const [arrRole, setArrRole] = useState([]);

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
      password_confirmation: data.passwordConfirm,
      role_ids: arrRole && arrRole.map((role) => role.id),
      // role_ids: [1, 2, 3, 4, 5],

      khubaoton: data.khubaoton ? data.khubaoton : [],
      provinces: data.provinces ? data.provinces : [],
    };
    // console.log(datauser);

    setIsLoad(true);
    try {
      await axios.post(urlUser, datauser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIsAdd(false);
      alert("Thêm mới thành công");
    } catch (error) {
      const Errors = error.response.data.errors;
      setDataErrors(Errors);
      alert("Khởi tạo thất bại");
    } finally {
      setIsLoad(false);
    }
  };
  const password = watch("password");

  return (
    <StyleForm action="" onSubmit={handleSubmit(onSubmit)}>
      <Body>
        <InputContainer>
          <InputText>
            <input name="name" type="text" {...register("name")} />
            <label>Tên hiển thị</label>
          </InputText>
          <DropdownInt>
            {dataErrors.name && <StSpan>{dataErrors.name}</StSpan>}
          </DropdownInt>
        </InputContainer>
        <InputContainer>
          <InputText>
            <input name="username" type="text" {...register("username")} />
            <label>Tên đăng nhập</label>
          </InputText>
          <DropdownInt>
            {dataErrors.username && <StSpan>{dataErrors.username}</StSpan>}
          </DropdownInt>
        </InputContainer>
        <InputContainer>
          <InputText>
            <input type="email" name="email" {...register("email")} />
            <label>Email</label>
          </InputText>
          <DropdownInt>
            {dataErrors.email && <StSpan>{dataErrors.email}</StSpan>}
          </DropdownInt>
        </InputContainer>
        <InputContainer>
          <InputText>
            <input name="mobile" type="text" {...register("mobile")} />
            <label>Điện thoại</label>
          </InputText>

          <DropdownInt>
            <StSpan style={{ color: "rgba(0,0,0,0.7)" }}>
              Trường có thể để trống
            </StSpan>

            {dataErrors.mobile && <StSpan>{dataErrors.mobile}</StSpan>}
          </DropdownInt>
        </InputContainer>
        <InputContainer>
          <InputText>
            <InputWithFeature>
              <input
                name="password"
                type={showPass1}
                {...register("password")}
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
            {dataErrors.password && <StSpan>{dataErrors.password}</StSpan>}
          </DropdownInt>
        </InputContainer>
        <InputContainer>
          <InputText>
            <InputWithFeature>
              <input
                name="passwordConfirm"
                type={showPass2}
                {...register("passwordConfirm", {
                  required: true,
                  validate: (value) =>
                    value === password ||
                    "Mật khẩu xác nhận phải giống mật khẩu đã nhập",
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
            {errors.passwordConfirm && (
              <StSpan>{errors.passwordConfirm.message}</StSpan>
            )}
          </DropdownInt>
        </InputContainer>
        <InputContainer>
          <MultiSelectOptions
            role={arrRole}
            data={roles}
            get_role={setArrRole}
          />

          <DropdownInt>
            {dataErrors.role_ids && <StSpan>{dataErrors.role_ids}</StSpan>}
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
            isloading={isLoad}
          />
        </div>
      </Footer>
    </StyleForm>
  );
});

export default Form;
