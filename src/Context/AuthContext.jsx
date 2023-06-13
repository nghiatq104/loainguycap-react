import axios from "axios";
import { createContext, useState } from "react";

export const authContext = createContext({ auth: null });
let _token = localStorage.getItem("token");
const AuthProvider = ({ children }) => {
  const [errorLog, setErrorLog] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [token, setToken] = useState(_token);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const checkAuth = async (token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    setIsChecking(true);
    try {
      const response = await axios.get(
        "http://wlp.howizbiz.com/api/me",
        config
      );
      // let user = JSON.stringify(response.user);
      setIsAuthenticated(true);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      // console.log(response);
      return response;
    } catch (error) {
      Logout();
    } finally {
      setIsChecking(false);
    }
  };
  if (!isChecking && !isAuthenticated && token) {
    // console.log("has token");
    checkAuth(token);
  }

  // Hàm đăng nhập
  const Login = async (data) => {
    try {
      const response = await axios.post(
        "http://wlp.howizbiz.com/api/web-authenticate",
        data
      );
      console.log(response.data);
      const token = response.data.access_token;
      setToken(token);
      // Lưu token vào localStorage hoặc trạng thái ứng dụng
      localStorage.setItem("token", token);
      await checkAuth(token);
      // Đặt trạng thái đăng nhập thành true
      setIsAuthenticated(true);
      setErrorLog("");
    } catch (error) {
      console.error(error);
      setErrorLog("LOGIN_FAIL");
    }
  };

  // Hàm đăng xuất
  const Logout = async () => {
    // Xóa token từ localStorage hoặc trạng thái ứng dụng
    try {
      await axios.post("http://wlp.howizbiz.com/api/logout", {
        token: _token,
      });
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setToken(null);

      // Đặt trạng thái đăng nhập thành false
      setIsAuthenticated(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <authContext.Provider
      value={{
        isAuthenticated,
        isChecking,
        Login,
        Logout,
        token,
        config,
        errorLog,
        setErrorLog,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
