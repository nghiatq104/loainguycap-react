import { memo } from "react";
import AuthSideItem from "../../components/AuthSideItem";
import SideItem from "../../Constant/SideItem";
import styled, { css } from "styled-components";
import { useContext } from "react";
import { AdminContext } from "../../Context/AdminPageContext";

const SideContainer = styled.div`
  transition: all 0.5s ease;
  height: calc(100vh - 93px);
  box-shadow: 2px 0 4px 0 rgba(0, 0, 0, 0.1);
  flex: 1;
  overflow: hidden;
  overflow-y: scroll;
  background-color: #fff;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background: #5f5f5f;
  }
  position: fixed;
  @media (min-width: 651px) {
    ${(props) =>
      props.isSidebar &&
      css`
        width: 50px;
      `};
    ${(props) =>
      !props.isSidebar &&
      css`
        width: 300px;
      `};
  }
  @media (max-width: 650px) {
    display: none;
  }
`;

const GrapAuthSide = styled.div`
  width: 300px;
  padding: 8px;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background: #5f5f5f;
  }
`;

const AuthSideBar = memo(() => {
  const { isSidebar } = useContext(AdminContext);
  return (
    <SideContainer isSidebar={isSidebar}>
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
    </SideContainer>
  );
});

export default AuthSideBar;
