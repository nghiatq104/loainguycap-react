import { useContext } from "react";
import { authContext } from "../../Context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import AuthHeader from "../AuthHeader";
import AuthSideBar from "../AuthSideBar";
import Modal from "../../components/Modal/Modal";
import AdminProvider from "../../Context/AdminPageContext";
import styled from "styled-components";
import SmScSideBar from "../AuthSideBar/SmScSideBar";

const AuContainer = styled.div`
  width: 100vw;
  margin-top: 60px;
  display: flex;
`;

// HEADER
const Header = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  background-color: #fff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
`;

// CONTENT
const MainContainer = styled.div`
  width: 100%;
  margin-top: 60px;
`;

// FOOTER
const Footer = styled.div`
  width: 100%;
  justify-content: space-between;
  align-items: center;
  height: 33px;
  font-size: 1.4rem;
  padding: 6px 16px;
  background-color: #c7c7c5;
  font-weight: 800;
  color: #757575;
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  p {
    margin: 0;
  }
`;

export const ProtectedRoute = () => {
  const { isAuthenticated, isChecking } = useContext(authContext);
  if (isChecking) {
    // user is not authenticated
    return <div />;
  }
  if (!isAuthenticated) {
    // user is not authenticated
    return <Navigate to="/dangnhap" />;
  }

  return (
    <AdminProvider>
      <SmScSideBar />
      <AuContainer>
        {/* header */}
        <Header>
          <AuthHeader />
        </Header>

        {/* Main content */}
        <MainContainer>
          <Modal />
          <AuthSideBar />
          <Outlet />
        </MainContainer>

        {/* Footer */}
        <Footer>
          <div>
            <i className="fa-regular fa-copyright"></i> 2021
          </div>
          <p>Phiên bản 1.0.0</p>
        </Footer>
      </AuContainer>
    </AdminProvider>
  );
};
