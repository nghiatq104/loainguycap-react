import React from "react";
import styled from "styled-components";
import ChangePassForm from "./components/Form/ChangePassword";
import EditForm from "./components/Form/EditForm";
import MultiSelectOptions from "./components/Button/SelectOption";

const ModalContainer = styled.div`
  width: 100vw;
  height: 100vh;
  max-width: 1600px;
  z-index: 3;
  top: 0;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.6);
  display: ${(props) => (props.show ? "flex" : "none")};
  align-items: center;
  justify-content: center;
`;
const Modal = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  min-width: 350px;
  max-width: 500px;
  height: 90%;
  background-color: #fff;
  border-radius: 10px;
`;

const Header = styled.div`
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  padding: 0 20px;
  height: 60px;
  background-color: #da2a1c;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  h1 {
    color: #fff;
    margin: 0;
  }
  button {
    width: 30px;
    height: 30px;
    color: #fff;
    background: none;
    border: none;
    outline: none;
    font-size: 20px;
    font-weight: 500px;
    border-radius: 50%;
    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }
  }
`;

const Test = () => {
  return (
    <ModalContainer show>
      <Modal>
        <Header>
          <h1>Thêm mới người dùng</h1>
          <button>X</button>
        </Header>
        {/* <ChangePassForm /> */}
        {/* <EditForm /> */}
        <MultiSelectOptions />
      </Modal>
    </ModalContainer>
  );
};
export default Test;
