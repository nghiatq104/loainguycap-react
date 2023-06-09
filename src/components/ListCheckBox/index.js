import React, { useState } from "react";
import CheckBoxItem from "../CheckBoxItem";
import "./ListCheckBox.scss";

const ListCheckBox = React.memo((props) => {
  console.log("list checkbox load");
  let [hidden, setHidden] = useState("hidden");
  let [roltate, setRoltate] = useState("");
  let [boolean, setBoolean] = useState(false);
  const handleClick = () => {
    boolean ? setHidden("hidden") && console.log(2) : setHidden("");
    boolean ? setRoltate("") : setRoltate("roltate");
    setBoolean(!boolean);
  };

  const arr = props.data;

  return (
    <form className="filter-checkBox">
      <div
        className="filter-title d-flex align-items-center"
        onClick={handleClick}
      >
        <div className="filter-icon d-flex align-items-center justify-content-center">
          <i className={"fa-solid fa-caret-right " + roltate}></i>
        </div>
        <div className="filter-name">{props.name}</div>
      </div>
      <div className={hidden}>
        {arr.map((data, i) => {
          return <CheckBoxItem key={i} data={data} filter={props.filter} />;
        })}
      </div>
    </form>
  );
});
export default ListCheckBox;
