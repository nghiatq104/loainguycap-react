import { useContext } from "react";
import { memo } from "react";
import styled, { css } from "styled-components";
import { AdminContext } from "../../Context/AdminPageContext";

const CompanyContainer = styled.div`
  padding: 20px 32px;
  flex: 1;
  transition: all 0.5s ease;
  @media (min-width: 651px) {
    ${(props) =>
      props.isSidebar &&
      css`
        margin-left: 50px;
      `};
    ${(props) =>
      !props.isSidebar &&
      css`
        margin-left: 300px;
      `};
  }
  @media (max-width: 650px) {
    width: 100%;
    margin-left: 0;
  }
`;

const Company = memo(() => {
  // context modal
  const { isSidebar } = useContext(AdminContext);
  return (
    <CompanyContainer isSidebar={isSidebar}>
      <div>1231346</div>
    </CompanyContainer>
  );
});

export default Company;
