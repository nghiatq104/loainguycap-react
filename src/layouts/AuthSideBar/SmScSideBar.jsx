import styled, { css } from "styled-components";
import AuthSideItem from "../../components/AuthSideItem";
import SideItem from "../../Constant/SideItem";
import { useContext } from "react";
import { AdminContext } from "../../Context/AdminPageContext";

const Container = styled.div`
  position: fixed;
  z-index: 10;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  align-items: end;
  @media (min-width: 651px) {
    display: none;
  }
  @media (max-width: 650px) {
    ${(props) =>
      props.isSidebar &&
      css`
        display: flex;
      `};
    ${(props) =>
      !props.isSidebar &&
      css`
        display: none;
      `};
  }
`;

const SideMenu = styled.div`
  width: 100%;
  height: 50%;
  position: fixed;
  z-index: 11;
  overflow-y: scroll;
  background-color: #fff;
  &::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background: #5f5f5f;
  }
`;
const GrapAuthSide = styled.div`
  width: 100%;
  padding: 8px;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background: #5f5f5f;
  }
`;

const SmScSideBar = () => {
  const { isSidebar, setIsSidebar } = useContext(AdminContext);

  // console.log(sidebarRef);
  return (
    <Container isSidebar={isSidebar} onClick={() => setIsSidebar(false)}>
      <SideMenu>
        <GrapAuthSide className="auth-sidebar">
          {SideItem.map((item, i) => {
            return (
              <AuthSideItem
                key={i}
                id={i}
                icon={item.icon}
                title={item.title}
                dropBtn={item.dropBtn}
                link={item.link}
              />
            );
          })}
        </GrapAuthSide>
      </SideMenu>
    </Container>
  );
};
export default SmScSideBar;
