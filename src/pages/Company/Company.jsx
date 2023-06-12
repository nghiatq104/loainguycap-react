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
        margin-left: 60px;
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

const Pagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Company = memo(() => {
  // context modal
  const { isSidebar } = useContext(AdminContext);
  // data table
  const [dataTable, setDataTable] = useState([]);
  // page
  const [page, setPage] = useState(1);
  // active btn
  const [currentBtn, setCurrentBtn] = useState(1);
  const [decreaseBtn, setDecreaseBtn] = useState(1);
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

  let Btn = [];
  let totalPage =
    dataTable.length !== 0
      ? Math.ceil(
          dataTable.pagination.total / dataTable.pagination.itemsPerPage
        )
      : 1;
  for (let i = 0; i < totalPage; i++) {
    Btn.push(
      <BtnPagination
        key={i + 1}
        function={() => console.log(1315)}
        value={i + 1}
        title={i + 1}
        activeClass={currentBtn === i + 1 ? "in-active" : ""}
        unActive={currentBtn === i + 1 ? "un-active" : ""}
      />
    );
  }

  return (
    <CompanyContainer isSidebar={isSidebar}>
      <NavSearch title="Tổ chức" />
      <TbContainer>
        <Table data={dataTable.list} />
        <Pagination>
          <div className="perpage-total">
            {dataTable.length !== 0 && (
              <>
                {dataTable.pagination.itemsPerPage * (page - 1) + 1}-
                {dataTable.pagination.itemsPerPage * page >=
                dataTable.pagination.total
                  ? dataTable.pagination.total
                  : dataTable.pagination.itemsPerPage * page}
                /{dataTable.pagination.total}
              </>
            )}
          </div>

          <div className="pagin-btn d-flex">
            <BtnPagination
              key={-1}
              value={-1}
              title="&#60;"
              activeClass={decreaseBtn === 1 ? "opacity" : ""}
              unActive={decreaseBtn === 1 ? "un-active" : ""}
            />
            {Btn}
            <BtnPagination
              key={0}
              value={1}
              title="&#62;"
              activeClass={decreaseBtn === totalPage ? "opacity" : ""}
              unActive={decreaseBtn === totalPage ? "un-active" : ""}
            />
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
        </Pagination>
      </TbContainer>
    </CompanyContainer>
  );
});

export default Company;
