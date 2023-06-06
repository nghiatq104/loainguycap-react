import { memo } from "react";
import "./BtnPagination.scss";

const BtnPagination = memo((props) => {
  let handleClick = props.function;
  return (
    <div className="btn-wrap">
      <button
        className={"btn-page " + props.activeClass}
        onClick={() => handleClick(props.value)}
      >
        {props.title}
      </button>
      <div className={props.unActive}></div>
    </div>
  );
});

export default BtnPagination;
