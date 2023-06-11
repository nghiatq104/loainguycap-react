import { useContext } from "react";
import { memo } from "react";
import styled, { css } from "styled-components";
import { AdminContext } from "../../Context/AdminPageContext";
import NavSearch from "../../components/NavSearch/NavSearch";
import Table from "../../components/Table/Table";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import BtnPagination from "../../components/BtnPagination";

let token = localStorage.getItem("token");

const CompanyContainer = styled.div`
  padding: 20px 32px;
  height: calc(100vh - 93px);
  /* flex: 1; */
  transition: all 0.5s ease;
  display: flex;
  flex-direction: column;

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
const TbContainer = styled.div`
  flex: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const Company = memo(() => {
  // context modal
  const { isSidebar } = useContext(AdminContext);
  // data table
  const [dataTable, setDataTable] = useState([]);

  const url =
    "http://wlp.howizbiz.com/api/tochucs?paginate=true&page=1&perpage=10&with=roles,createdBy&search=&inactive=-1";
  useEffect(() => {
    const GetData = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const response = await axios.get(url, config);
        console.log(response);
        setDataTable(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    GetData();
  }, [url]);
  return (
    <CompanyContainer isSidebar={isSidebar}>
      <NavSearch title="Tổ chức" />
      <TbContainer>
        <Table data={dataTable.list} />
        <div className="pagin d-flex">
          <div className="perpage-total">
            {/* {dataUser.length !== 0 && (
              <>
                {dataUser.pagination.itemsPerPage * (page - 1) + 1}-
                {dataUser.pagination.itemsPerPage * page >=
                dataUser.pagination.total
                  ? dataUser.pagination.total
                  : dataUser.pagination.itemsPerPage * page}
                /{dataUser.pagination.total}
              </>
            )} */}
          </div>

          <div className="pagin-btn d-flex">
            <BtnPagination key={-1} />
            <BtnPagination key={0} />
          </div>
          <div className="option">
            <select
              className="select"
              onChange={(e) => console.log(e.target.value)}
            >
              <option value={5}>5/Trang</option>
              <option value={10}>10/Trang</option>
              <option value={25}>25/Trang</option>
              <option value={50}>50/Trang</option>
            </select>
          </div>
        </div>
      </TbContainer>
    </CompanyContainer>
  );
});

export default Company;
