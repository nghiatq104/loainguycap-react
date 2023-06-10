import { memo } from "react";
import styled from "styled-components";
import { useContext } from "react";
import { AdminContext } from "../../Context/AdminPageContext";
import Form from "../Form/AddForm";
import EditForm from "../Form/EditForm";
import DeletePopsUp from "../Form/DeletePopUp";

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
const StyleModal = styled.div`
  width: 50%;
  max-width: 500px;
  min-width: 350px;
  height: 90%;
  background-color: #fff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
  h2 {
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
const Modal = memo(() => {
  const { isAdd, setIsAdd, modal } = useContext(AdminContext);

  return (
    <ModalContainer show={isAdd}>
      <StyleModal>
        <Header>
          <h2>
            {
              {
                create: "Thêm mới người dùng",
                update: "Cập nhật người dùng",
                delete: "Bạn có chắc không?",
              }[modal]
            }
          </h2>
          <button onClick={() => setIsAdd(false)}>X</button>
        </Header>
        {
          {
            create: <Form />,
            update: <EditForm />,
            delete: <DeletePopsUp />,
          }[modal]
        }
      </StyleModal>
    </ModalContainer>
  );
});
export default Modal;
