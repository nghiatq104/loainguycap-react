import { memo } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;
  button {
    width: 100%;
    height: 100%;
    padding: 0 16px;
    font-size: 1.6rem;
  }
`;

const BtnClassic = memo((props) => {
  const { handleclick, title } = props;
  return (
    <Container>
      <button className="btn btn-danger" onClick={handleclick}>
        {title}
      </button>
    </Container>
  );
});

export default BtnClassic;
