import MainContent from "../../components/MainContent";
import React from "react";
import SideBar from "../../components/SideBar";
import Nav from "../../components/Nav";
import TabProvider from "../../Context/NavTab";

const Body = React.memo(() => {
  console.log("Body loaded");

  return (
    <TabProvider>
      <Nav />
      <div className="d-flex">
        <SideBar />
        <MainContent className="row" />
      </div>
    </TabProvider>
  );
});
export default Body;
