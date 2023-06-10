import React from "react";
import styled from "styled-components";
import SmScSideBar from "./layouts/AuthSideBar/SmScSideBar";

const Body = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: aqua;
`;
const Test = () => {
  return (
    <Body>
      <SmScSideBar />
    </Body>
  );
};
export default Test;
