import React from "react";
import styled, { css, keyframes } from "styled-components";

const PuShow = keyframes`
 0% {
    top:-100px;
  }
  25%{
    top:25px;
  }
  50%{
    top:25px;
  }
  75%{
    top:25px;
  }
  100% {
  top: -100px;
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
    color: #da2a1c;
  }
  ${(props) =>
    props.isFail &&
    css`
      animation: ${PuShow} 3s ease-in;
    `};
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

const ErrorLoginFail = (props) => {
  return (
    <PuContainer isFail={props.isFail}>
      <i className="fa-solid fa-triangle-exclamation"></i>
      <DivError>
        <h3>Lỗi</h3>
        <StPara>Tên đăng nhập hoặc mật khẩu không đúng</StPara>
      </DivError>
      <i className="fa-solid fa-xmark"></i>
    </PuContainer>
  );
};
export default ErrorLoginFail;
