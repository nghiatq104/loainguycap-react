import { createContext, useState } from "react";

export const NavTab = createContext();

const TabProvider = ({ children }) => {
  const [tabIndex, setTabIndex] = useState(0);
  const handleClick = (i) => {
    setTabIndex(i);
  };

  const value = {
    tabIndex,
    handleClick,
  };
  return <NavTab.Provider value={value}>{children}</NavTab.Provider>;
};

export default TabProvider;
