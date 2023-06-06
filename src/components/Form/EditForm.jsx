import { memo, useEffect, useState } from "react";
import styled from "styled-components";
import Btn from "../Button/Btn";
import { useForm } from "react-hook-form";
// import { useContext } from "react";
// import { AdminContext } from "../../Context/AdminPageContext";
import axios from "axios";
import { useContext } from "react";
import { AdminContext } from "../../Context/AdminPageContext";

const StyleForm = styled.form`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: calc(100% - 60px);
`;
const Body = styled.div`
  width: 100%;
  flex: 1;
  max-height: calc(100% - 66px);
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
    justify-content: end;
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

const DropdownInt = styled.div`
  width: 100%;
  height: 14px;
  padding: 0 12px;
  margin-bottom: 8px;
`;

let token = localStorage.getItem("token");

const EditForm = memo((props) => {
  const { setIsAdd } = useContext(AdminContext);
  // roles
  const [roles, setRoles] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const getRoles = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const respone = await axios.get(
        "http://wlp.howizbiz.com/api/roles",
        config
      );
      setRoles(respone.data);
    };
    getRoles();
  }, []);
  console.log(roles);

  // Edit user

  const onSubmit = (data) => {
    const user = {
      name: data.name,
      username: data.username,
      email: data.email,
      mobile: data.mobile ? data.mobile : "",
      roles: [data.roles],
    };
    console.log(user);
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
            {errors.name && <span>Trường này không được để trống</span>}
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
            {errors.name && <span>Trường này không được để trống</span>}
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

            {errors.phone && errors.phone.type === "pattern" && (
              <span>Số điện thoại phải có ít nhất 9 số</span>
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
            {errors.name && <span>Trường này không được để trống</span>}
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
            title="Cập nhật"
            icon="fa-solid fa-pencil"
            iscolor={true}
          />
        </div>
      </Footer>
    </StyleForm>
  );
});

export default EditForm;
