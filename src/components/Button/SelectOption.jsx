import React, { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";

const StSelectOption = styled.div`
  width: 100%;
  padding: 0 12px;
  position: relative;
  min-height: 47px;
  display: flex;
  align-items: end;
`;
const StSpanIcon = styled.span`
  width: 46px;
  display: flex;
  justify-content: center;
  background-color: #f0f0f0;
  border-bottom: 1px solid #00000099;
  height: 35px;
  cursor: pointer;
  i {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    color: #00000099;
  }
`;
const StInputClick = styled.div`
  border-bottom: 1px solid #00000099;
  background-color: #f0f0f0;
  width: 100%;
  /* min-height: 46px; */
  height: 35px;
  overflow-y: scroll;
  font-size: 1.6rem;
  padding-top: 27px 10px 0 10px;
  display: flex;
  align-items: end;
  flex-wrap: wrap;
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background: #ccc;
  }
`;

const StSpan = styled.span`
  border-radius: 4px;
  white-space: nowrap;
  height: 20px;
  margin: 5px;
  color: #000;
  font-size: 1.2rem;
  font-weight: 600;
  background-color: rgba(0, 0, 0, 0.3);
`;

const StLabel = styled.label`
  font-size: 1.2rem;
  position: absolute;
  color: #00000099;
  font-weight: 600;
  top: -4px;
  left: 22px;
`;
const StOption = styled.div`
  display: ${(props) => (props.isShow ? "flex" : "none")};
  flex-direction: column;
  position: absolute;
  padding: 8px 0;
  top: 50px;
  width: calc(100% - 24px);
  height: 212px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background: #ccc;
  }
  label {
    display: flex;
    align-items: center;
    height: 49px;
    width: 100%;
    padding: 0 16px;
    cursor: pointer;
    &:hover {
      background-color: rgba(0, 0, 0, 0.3);
    }
  }
`;
const StDivText = styled.div`
  font-size: 1.3rem;
  font-weight: 600;
  width: 100%;
  flex: 1;
`;
const StDivInput = styled.div`
  height: 49px;
  min-width: 49px;
  display: flex;
  align-items: center;
  input {
    width: 2rem;
    cursor: pointer;
  }
`;

const MultiSelectOptions = (props) => {
  const setArrRole = props.get_role;
  const selectedOptionsProp = props.role
    ? props.role.map((data) => {
        return { id: data.id, name: data.name };
      })
    : [];
  // lay data
  const RoleOptions = props.data;

  const [selectedOptions, setSelectedOptions] = useState(selectedOptionsProp);
  const [isShow, setIsShow] = useState(false);

  const handleOptionChange = (event) => {
    const { value, checked, id } = event.target;
    if (checked) {
      setSelectedOptions([...selectedOptions, { name: value, id: id }]);
    } else {
      setSelectedOptions(
        selectedOptions.filter((option) => option.name !== value)
      );
    }
  };

  useEffect(() => {
    setArrRole(selectedOptions);
  }, [selectedOptions, setArrRole]);

  return (
    <StSelectOption>
      <StInputClick onClick={() => setIsShow(true)}>
        {selectedOptions.map((data, i) => {
          return <StSpan key={i}>{data.name}</StSpan>;
        })}
        <StLabel>Quyền</StLabel>
      </StInputClick>
      <StSpanIcon onClick={() => setIsShow(!isShow)}>
        <i className="fa-solid fa-caret-down"></i>
      </StSpanIcon>
      <StOption isShow={isShow}>
        {RoleOptions.map((option) => (
          <label htmlFor={option.id} key={option.id}>
            <StDivInput>
              <input
                type="checkbox"
                key={option.id}
                value={option.name}
                id={option.id}
                checked={selectedOptions.some(
                  (role) => role && role.name === option.name
                )}
                onChange={handleOptionChange}
              />
            </StDivInput>
            <StDivText>{option.name}</StDivText>
          </label>
        ))}
      </StOption>
    </StSelectOption>
  );
};

export default MultiSelectOptions;
