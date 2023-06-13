import React, { memo, useState } from "react";
import styled, { keyframes } from "styled-components";

const PuShow = keyframes`
 0% {
    top:-100px;
  }
  25%{
    top: 25px;
  }
  50%{
    top: 25px;
  }
  75%{
    top: 25px;
  }
  100%{
    top:-100px;
  }
`;
const PuContainer = styled.div`
  width: 300px;
  background-color: #fff;
  height: 75px;
  position: absolute;
  display: flex;
  align-items: start;
  border-radius: 4px;
  padding: 10px 20px;
  left: 50%;
  top: -100px;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.8);
  transform: translateX(-50%);
  i {
    font-size: 2rem;
    color: ${(props) => props.iconcolor && props.iconcolor};
  }
  animation: ${PuShow} 3s ease-in-out;
`;
const DivError = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  h3 {
    padding: 0 10px;
  }
`;
const StPara = styled.p`
  margin: 0;
  font-size: 1.2rem;
  padding: 0 10px;
`;

const DivNotify = styled.div`
  position: relative;
  width: 100%;
`;
const Notification = memo((props) => {
  const [type, setType] = useState(props.type);
  const toast = [
    {
      title: "Thành công",
      message: "Thêm mới thành công",
      type: "CREATE_SUCCESS",
      icon: "fa-solid fa-circle-check",
      iconcolor: "#7fc18a",
    },
    {
      title: "Thất bại",
      message: "Thêm mới thất bại",
      type: "CREATE_FAIL",
      icon: "fa-solid fa-triangle-exclamation",
      iconcolor: "#da2a1c",
    },
    {
      title: "Thất bại",
      message: "Đăng nhập thất bại",
      type: "LOGIN_FAIL",
      icon: "fa-solid fa-triangle-exclamation",
      iconcolor: "#da2a1c",
    },
  ];
  return (
    <DivNotify>
      {type && (
        <Toast
          data={toast.filter((data) => {
            return props.type === data.type;
          })}
          handleClick={() => setType("")}
        />
      )}
    </DivNotify>
  );
});

const Toast = (props) => {
  let data = props.data[0];
  const handleClick = props.handleClick;
  return (
    <PuContainer iconcolor={data.iconcolor}>
      <i className={data.icon}></i>
      <DivError>
        <h3>{data.title}</h3>
        <StPara>{data.message}</StPara>
      </DivError>
      <i onClick={handleClick} className="fa-solid fa-xmark"></i>
    </PuContainer>
  );
};
export default Notification;
