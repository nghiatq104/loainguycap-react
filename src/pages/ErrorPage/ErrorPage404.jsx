import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Page = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  h1 {
    font-size: 15rem;
  }
  p {
    font-size: 1.4rem;
  }
  button {
    padding: 10px 40px;
    font-size: 1.5rem;
    font-weight: 700;
    color: #fff;
    outline: none;
    background-color: #5c91fe;
    border: none;
  }
`;
const ErrorPage404 = () => {
  const navigate = useNavigate();
  return (
    <Page>
      <h1>404</h1>
      <p>ERROR.404</p>
      <button className="btn btn-info" onClick={() => navigate("/")}>
        ERROR.HELP
      </button>
    </Page>
  );
};

export default ErrorPage404;
