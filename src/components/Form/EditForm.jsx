import { memo, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import Btn from "../Button/Btn";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useContext } from "react";
import { AdminContext } from "../../Context/AdminPageContext";
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
  min-height: 86px;
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
  ${(props) =>
    props.isActive &&
    css`
      &:after {
        position: absolute;
        content: "";
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0);
        left: 0;
      }
      input {
        color: rgba(0, 0, 0, 0.2);
      }
    `};
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
    top: 30px;
    pointer-events: none;
    font-size: 1.6rem;
    font-weight: 500;
    color: #00000099;
    transition: all 0.3s ease-in-out;
  }
`;
const StSpan = styled.span`
  font-size: 1.2rem;
  color: red;
  padding: 0;
`;
const DropdownInt = styled.div`
  width: 100%;
  height: 14px;
  padding: 0 12px;
  margin-bottom: 8px;
`;

let token = localStorage.getItem("token");

const EditForm = memo(() => {
  const [isLoad, setIsLoad] = useState(false);

  const { setIsAdd, userId } = useContext(AdminContext);
  const [dataErrors, setDataErrors] = useState([]);
  // idRole
  const [selectedRoles, setSelectedRoles] = useState([]);
  // roles
  const [roles, setRoles] = useState([]);
  const { register, handleSubmit } = useForm();
  // console.log(userId);
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
      const userRoles = userId.roles.map((role) => {
        return { id: role.id, name: role.name };
      });
      setSelectedRoles(userRoles);
    };
    getRoles();
  }, [userId]);
  console.log(userId);
  // Edit user
  console.log(selectedRoles);
  const onSubmit = (data) => {
    setIsLoad(true);
    const user = {
      username: userId.username,
      name: data.name ? data.name : userId.name,
      email: data.email ? data.email : userId.email,
      mobile: data.mobile ? data.mobile : "",
      role_ids: selectedRoles.map((role) => role.id),
      id: userId.id,
      khubaoton: data.khubaoton ? data.khubaoton : userId.khubaoton,
      provinces: data.provinces ? data.provinces : userId.provinces,
    };
    console.log(typeof user.id);
    try {
      axios.put(`http://wlp.howizbiz.com/api/users/${userId.id}`, user);
      console.log("Sửa thành công");
      setIsAdd(false);
    } catch (error) {
      console.log("Sửa thất bại");
      setDataErrors(error.response.data.errors);
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
              defaultValue={userId.name}
              name="name"
              type="text"
              required
              {...register("name")}
            />

            <label>Tên hiển thị</label>
          </InputText>
          <DropdownInt>
            {dataErrors.name && <StSpan>{dataErrors.name}</StSpan>}
          </DropdownInt>
        </InputContainer>
        <InputContainer>
          <InputText isActive={true}>
            <input
              name="username"
              type="text"
              defaultValue={userId.username}
              required
              {...register("username")}
            />{" "}
            <label>Tên đăng nhập</label>
          </InputText>
          <DropdownInt>
            {dataErrors.username && <StSpan>{dataErrors.username}</StSpan>}
          </DropdownInt>
        </InputContainer>
        <InputContainer>
          <InputText>
            <input
              defaultValue={userId.email}
              type="email"
              name="email"
              required
              {...register("email")}
            />

            <label>Email</label>
          </InputText>
          <DropdownInt>
            {dataErrors.email && <StSpan>{dataErrors.email}</StSpan>}
          </DropdownInt>
        </InputContainer>
        <InputContainer>
          <InputText>
            <input
              defaultValue={userId.mobile}
              name="mobile"
              type="text"
              {...register("mobile")}
            />

            <label>Điện thoại</label>
          </InputText>

          <DropdownInt>
            <span style={{ color: "rgba(0,0,0,0.7)" }}>
              Trường có thể để trống
            </span>

            {dataErrors.mobile && <StSpan>{dataErrors.mobile}</StSpan>}
          </DropdownInt>
        </InputContainer>
        <InputContainer>
          <MultiSelectOptions
            role={userId.roles}
            data={roles}
            get_role={setSelectedRoles}
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
            title="Cập nhật"
            icon="fa-solid fa-pencil"
            iscolor={true}
            isloading={isLoad}
          />
        </div>
      </Footer>
    </StyleForm>
  );
});

export default EditForm;
