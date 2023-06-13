import { memo } from "react";
import styled, { css, keyframes } from "styled-components";

const StBtnContainer = styled.div`
  height: 100%;
  margin: 0 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const StButton = styled.button`
  width: 100%;
  height: 100%;
  outline: none;
  background: none;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  color: ${(props) => (props.iscolor ? "#da2a1c" : "#000")};
  font-size: 14px;
  font-weight: 600;
  display: flex;
  cursor: pointer;
  align-items: center;
  white-space: nowrap;
  justify-content: center;
  padding: 10px;
  i {
    padding-right: 10px;
  }
  &:hover {
    background-color: ${(props) =>
      props.iscolor ? "rgba(225,0,0,0.1)" : "rgba(0, 0, 0, 0.1)"};
    border: ${(props) =>
      props.iscolor ? "1px solid #da2a1c" : "1px solid rgba(0, 0, 0, 0.1)"};
  }
`;
const loading = keyframes`
  from{
      transform: rotate(0turn);
  }
  to{
      transform: rotate(1turn);
    }
`;
const StLoading = styled.div`
  ${(props) =>
    props.isloading &&
    css`
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      background-color: rgba(0, 0, 0, 0.4);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 2;
      &::after {
        content: "";
        width: 20px;
        height: 20px;
        border: 2px solid rgba(0, 0, 0, 0.8);
        border-radius: 50%;
        border-right: 2px solid #fff;
        animation: ${loading} 0.5s ease infinite;
      }
    `}
  ${(props) =>
    !props.isloading &&
    css`
      display: none;
    `};
`;
const Btn = memo((props) => {
  const handleClick = props.handleClick;
  return (
    <StBtnContainer>
      <StButton
        type={props.type}
        iscolor={props.iscolor}
        onClick={() => {
          handleClick();
        }}
      >
        {props.icon ? <i className={props.icon}></i> : <></>}
        {props.title}
      </StButton>
      <StLoading isloading={props.isloading}></StLoading>
    </StBtnContainer>
  );
});
export default Btn;
