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
import React from "react";
import LoginForm from "./pages/LogInForm";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/dangnhap" element={<LoginForm />} />
        <Route
          path="/"
          element={
            <>
              <Header />
              <Outlet />
              <Footer />
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
      </Routes>
    </div>
  );
}
export default App;
