import React, { memo } from "react";
import styled, { css } from "styled-components";

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
  /* unclick */
  ${(props) =>
    props.unclick &&
    css`
      cursor: default !important;
    `}
`;
const StyleDivBtn = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  /* click */
  ${(props) =>
    !props.unclick &&
    css`
      &:hover {
        background-color: #ccc;
      }
    `}
  /* unclick */
  ${(props) =>
    props.unclick &&
    css`
      cursor: default;
    `}
`;
const FTButton = memo((props) => {
  return (
    <StyleDivBtn unclick={props.unclick}>
      <StyleFTButton unclick={props.unclick} onClick={props.click}>
        {props.children}
      </StyleFTButton>
    </StyleDivBtn>
  );
});

export default FTButton;
