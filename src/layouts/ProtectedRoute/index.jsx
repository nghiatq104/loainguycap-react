import { useContext } from "react";
import { authContext } from "../../Context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
// import axios from "axios";
import "./ProtectedRoute.scss";
import AuthHeader from "../AuthHeader";
import AuthSideBar from "../AuthSideBar";
import Modal from "../../components/Modal/Modal";
import AdminProvider from "../../Context/AdminPageContext";

export const ProtectedRoute = () => {
  // const navigate = useNavigate();

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
    <div className="auth-container">
      <div className="header-auth">
        <AuthHeader />
      </div>
      <AdminProvider>
        <div className="d-flex contain">
          <Modal />
          <AuthSideBar />
          <Outlet />
        </div>
      </AdminProvider>

      <div className="auth-footer d-flex">
        <div>
          <i className="fa-regular fa-copyright"></i> 2021
        </div>
        <p>Phiên bản 1.0.0</p>
      </div>
    </div>
  );
};
