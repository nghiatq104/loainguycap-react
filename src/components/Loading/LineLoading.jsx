import styled, { css, keyframes } from "styled-components";

const StLnLoading = styled.div`
  ${(props) =>
    props.isload &&
    css`
      width: 100%;
      padding: 1px;
      background-color: #da2a1c;
      animation: ${stLine} 1s ease-in-out infinite;
    `};
`;

const stLine = keyframes`
  0% {
    transform: scaleX(0);
  }
  100% {
    transform: scaleX(1);
  }

`;

const LineLoading = (props) => {
  return <StLnLoading isload={props.isload}></StLnLoading>;
};
export default LineLoading;
