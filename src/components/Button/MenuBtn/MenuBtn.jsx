import { memo } from "react";
import styled from "styled-components";

const BtnCotainer = styled.div`
  width: 4.8rem;
  height: 4.8rem;
  min-width: 4.8rem;
  border-radius: 50%;
  font-size: 2.4rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
  color: ${(props) => (props.color ? props.color : "#000")};
`;

const MenuBtn = memo((props) => {
  return (
    <BtnCotainer color={props.color} onClick={() => props.eventClick()}>
      <i className="fa-solid fa-bars"></i>
    </BtnCotainer>
  );
});

export default MenuBtn;
