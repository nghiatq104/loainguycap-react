import { memo } from "react";
import styled from "styled-components";

const InputContainer = styled.div`
  width: 100%;
  height: 86px;
  display: flex;
  flex-direction: column;
`;

const InputText = styled.div`
  width: 100%;
  flex: 1;
  padding: 0 12px;
  margin-bottom: 4px;
  position: relative;
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
const NmInput = memo(() => {
  return (
    <InputContainer>
      <InputText>
        <input required />
        <label>Tên hiển thị</label>
      </InputText>
      <DropdownInt></DropdownInt>
    </InputContainer>
  );
});

export default NmInput;
