import React, { useState } from "react";
import styled from "styled-components";

const StSelectOption = styled.div`
  width: 100%;
  /* height: 40px; */
  padding: 20px;
  position: relative;
  input {
    width: 100%;
    height: 40px;
    font-size: 1.6rem;
    padding: 0 10px;
  }
  p {
    position: absolute;
    top: 50%;
    left: 30px;
    transform: translateY(-50%);
  }
`;

const StOption = styled.div`
  display: ${(props) => (props.isShow ? "flex" : "none")};
  flex-direction: column;
  position: absolute;
  bottom: -25px;
  width: calc(100% - 40px);
  height: 40px;
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
    gap: 10px;
  }
  input {
    width: 10px;
    height: 10px;
  }
`;
const StSpan = styled.span`
  background-color: aqua;
  border-radius: 4px;
  height: 40px;
  margin: 5px;
  button {
    outline: none;
    border: none;
    background: none;
    width: 15px;
    height: 15px;
    &:hover {
      background-color: #ccc;
      border-radius: 50%;
    }
  }
`;
const MultiSelectOptions = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isShow, setIsShow] = useState(false);

  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
    // Thêm các options khác nếu cần
  ];
  const Delete = (event) => {
    const { value } = event.target;
    setSelectedOptions(selectedOptions.filter((option) => option !== value));
  };
  const handleOptionChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedOptions([...selectedOptions, value]);
    } else {
      setSelectedOptions(selectedOptions.filter((option) => option !== value));
    }
  };

  return (
    <StSelectOption>
      <input onClick={() => setIsShow(!isShow)} />
      <StOption isShow={isShow}>
        {options.map((option) => (
          <label key={option.value}>
            <input
              type="checkbox"
              value={option.value}
              checked={selectedOptions.includes(option.value)}
              onChange={handleOptionChange}
            />
            {option.label}
          </label>
        ))}
      </StOption>
      <p>
        {selectedOptions.map((data, i) => {
          return (
            <StSpan key={i}>
              {data}
              <button value={data} onClick={(e) => Delete(e)}>
                x
              </button>
            </StSpan>
          );
        })}
      </p>
    </StSelectOption>
  );
};

export default MultiSelectOptions;
