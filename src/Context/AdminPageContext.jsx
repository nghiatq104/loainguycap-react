import React, { createContext, useState } from "react";
import { useRef } from "react";

const AdminContext = createContext();

const AdminProvider = ({ children }) => {
  const [isSidebar, setIsSidebar] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const sidebarRef = useRef(null);
  // id
  const [userId, setUserId] = useState([]);
  // modal
  const [modal, setModal] = useState("");
  const deleteUser = (id) => {
    console.log(id);
  };
  const value = {
    isAdd,
    setIsAdd,
    deleteUser,
    userId,
    setUserId,
    modal,
    setModal,
    isSidebar,
    setIsSidebar,
    sidebarRef,
  };
  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};

export default AdminProvider;

export { AdminContext };
