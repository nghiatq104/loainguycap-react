import React, { memo } from "react";
import styled from "styled-components";

const StyleFTButton = styled.button`
  width: 20px;
  height: 20px;
  font-size: 1.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  outline: none;
`;
const StyleDivBtn = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: #ccc;
  }
`;
const FTButton = memo((props) => {
  return (
    <StyleDivBtn>
      <StyleFTButton onClick={props.click}>{props.children}</StyleFTButton>
    </StyleDivBtn>
  );
});

export default FTButton;
