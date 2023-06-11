import { memo } from "react";
import styled from "styled-components";

const InputDiv = styled.label`
  width: 100%;
  height: 100%;
  border-radius: 4px;
  border: 1px solid #ccc;
  display: flex;
  align-items: center;
  i {
    width: 32px;
    height: 32px;
    font-size: 2rem;
    color: #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  input {
    height: 32px;
    flex: 1;
    width: 100%;
    outline: none;
    border: none;
    padding: 0 10px;
    font-size: 1.4rem;
    &:focus + i {
      color: #da2a1c;
    }
    &:focus + label {
      border: 1px solid #da2a1c;
    }
  }
`;

const SearchInput = memo(() => {
  return (
    <InputDiv>
      <i className="fa-solid fa-magnifying-glass"></i>
      <input placeholder="Tìm kiếm theo tên" />
    </InputDiv>
  );
});

export default SearchInput;
