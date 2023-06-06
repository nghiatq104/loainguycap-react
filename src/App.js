import "./App.css";
import { Routes, Route, Outlet } from "react-router-dom";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import Body from "./pages/Body";
import InfoPage from "./pages/InfoPage";
import FilePage from "./pages/FilePage";
import ContactPage from "./pages/FilePage/ContactPage";
import IntroducePage from "./pages/FilePage/IntroducePage";
import DocumentPage from "./pages/FilePage/DocumentPage";
import Species from "./pages/Species/Species";
import LoginForm from "./pages/LogInForm";
import ApiProvider from "./Context/ApiContext";
import { ProtectedRoute } from "./layouts/ProtectedRoute";
import Test from "./Test";
import SystemPage from "./pages/SystemPage/Index";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/*" element={<ErrorPage />} />
        <Route path="/test" element={<Test />} />

        <Route path="/dangnhap" element={<LoginForm />} />
        <Route
          path="/"
          element={
            <>
              <ApiProvider>
                <Header />
                <Outlet />
                <Footer />
              </ApiProvider>
            </>
          }
        >
          <Route>
            <Route path="search" element={<Body />} />
            <Route path="loai/:id" element={<Species />} />
          </Route>
          <Route path="tintuc" element={<InfoPage />} />
          <Route path="hoso" element={<FilePage />}>
            <Route path="gioithieu" element={<IntroducePage />} />
            <Route path="tailieu" element={<DocumentPage />} />
            <Route path="lienhe" element={<ContactPage />} />
          </Route>
        </Route>
        <Route path="" element={<ProtectedRoute />}>
          <Route path="/hethong" element={<SystemPage />} />
          <Route path="/nguoi-dung" element={<>123</>} />
        </Route>
      </Routes>
    </div>
  );
}
export default App;

const ErrorPage = () => {
  return (
    <div>
      <h1>404</h1>
      <h2>Not Found</h2>
    </div>
  );
};
