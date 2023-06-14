import { useState } from "react";
import styled, { css } from "styled-components";

const Icondiv = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(0, 0, 0, 0.5);
  transition: all 0.5s ease;
  ${(props) =>
    props.btnSort === 0 &&
    css`
      opacity: 0;
      &:hover {
        opacity: 1;
      }
    `}
  ${(props) =>
    props.btnSort === 2 &&
    css`
      transform: rotate(-180deg);
    `};
`;

const SortBtn = ({ value, sortBy, setSortBy }) => {
  const [btnSort, setBtnSort] = useState(0);
  const onSortBy = () => {
    if (btnSort === 0) {
      if (sortBy === "") {
        setSortBy("&sort=" + value);
      } else {
        setSortBy(sortBy + "," + value);
      }
      setBtnSort(1);
    } else if (btnSort === 1) {
      setSortBy(sortBy.replace(value, "-" + value));
      setBtnSort(2);
    } else {
      if (sortBy.indexOf(",-" + value) !== -1) {
        setSortBy(sortBy.replace(",-" + value, ""));
      } else if (sortBy.indexOf("&sort=-" + value + ",") !== -1) {
        setSortBy(sortBy.replace("-" + value + ","));
      } else {
        setSortBy("");
      }
      setBtnSort(0);
    }
  };
  return (
    <Icondiv btnSort={btnSort} onClick={onSortBy}>
      <i className="fa-solid fa-arrow-up"></i>
    </Icondiv>
  );
};
export default SortBtn;
