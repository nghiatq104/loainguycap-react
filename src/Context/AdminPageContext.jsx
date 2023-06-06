import React, { createContext, useState } from "react";

const AdminContext = createContext();

const AdminProvider = ({ children }) => {
  const [isAdd, setIsAdd] = useState(false);
  // id
  const [userId, setUserId] = useState("");
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
  };
  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};

export default AdminProvider;

export { AdminContext };
