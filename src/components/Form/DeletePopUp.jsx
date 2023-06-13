import styled from "styled-components";
import Btn from "../Button/Btn";
import { AdminContext } from "../../Context/AdminPageContext";
import { useContext } from "react";
import axios from "axios";
import { useState } from "react";

const StDeleteComponent = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const StBody = styled.div`
  flex: 1;
  width: 100%;
  padding: 28px;
  font-size: 2rem;
  i {
    color: red;
  }
`;

const Footer = styled.div`
  width: 100%;
  height: 66px;
  padding: 8px 28px 22px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: end;
`;

const BtnWrap = styled.div`
  height: 100%;
  justify-content: end;
  display: flex;
  align-items: center;
`;

const DeletePopsUp = () => {
  // loadbutton
  const [isLoad, setIsLoad] = useState(false);
  // userId
  const { setIsAdd, userId } = useContext(AdminContext);

  // hàm xóa
  const onSubmit = async () => {
    setIsLoad(true);
    console.log(userId.id);
    try {
      await axios.delete(`http://wlp.howizbiz.com/api/users/${userId.id}`);
      console.log("Xóa thành công");
      setIsAdd(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoad(false);
    }
  };
  return (
    <StDeleteComponent>
      <StBody>
        Bạn có chắc chắn muốn xóa{" "}
        {userId.username ? <i>{userId.username}</i> : ""}
      </StBody>
      <Footer>
        <BtnWrap>
          <Btn
            title="Hủy"
            handleClick={() => {
              setIsAdd(false);
            }}
          />
          <Btn
            handleClick={() => onSubmit()}
            type="submit"
            title="Áp dụng"
            icon="fa-solid fa-trash-can"
            iscolor={true}
            isloading={isLoad}
          />
        </BtnWrap>
      </Footer>
    </StDeleteComponent>
  );
};
export default DeletePopsUp;
