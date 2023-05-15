import MainContent from "../MainContent";
import { useState } from "react";
import SideBar from "../SideBar";
import Nav from "../Nav";

function Body(props) {
  const [tabIndex, setTabIndex] = useState(0);
  const handleClick = (i) => {
    setTabIndex(i);
  };
  return (
    <>
      <Nav handleClick={handleClick} active={tabIndex} api={props.api} />
      <div className="d-flex">
        <SideBar
          api={props.api}
          setApi={props.setApi}
          apiChart={props.apiChart}
          setApiChart={props.setApiChart}
        />
        <MainContent
          className="row"
          active={tabIndex}
          api={props.api}
          apiChart={props.apiChart}
          setApiChart={props.setApiChart}
        />
      </div>
    </>
  );
}
export default Body;
