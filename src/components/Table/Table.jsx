import { memo } from "react";
import styled from "styled-components";
import FTButton from "../Button/FeatureBtn";

const StTable = styled.table`
  width: 100%;
  /* height: 100%; */
  overflow: scroll;
  &::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background: #5f5f5f;
  }
  thead {
    width: 100%;
    font-size: 1.2rem;
    height: 48px;
    border-bottom: 1px solid #ccc;
    tr {
      th {
        padding: 0 16px;
        position: sticky;

        &:last-child {
          width: 150px;
          text-align: center;
        }
      }
    }
  }
  tbody {
    width: 100%;
    font-size: 1.2rem;
    font-weight: 500;
    tr {
      /* height: 48px; */
      td {
        padding: 0 16px;
        height: 48px;
        &:last-child {
          width: 150px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
  }
`;

const Table = memo(({ data }) => {
  return (
    <StTable>
      <thead>
        <tr>
          <th>Tên</th>
          <th>Mô tả</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        {data &&
          data.map((data, i) => {
            return (
              <tr key={i}>
                <td>{data.ten}</td>
                <td>{data.mo_ta}</td>
                <td>
                  <FTButton
                    key={1}
                    click={() => {
                      console.log("Sua");
                    }}
                  >
                    <i
                      style={{
                        color: "#da2a1c",
                      }}
                      className="fa-solid fa-pen"
                    ></i>
                  </FTButton>
                  <FTButton
                    key={2}
                    click={() => {
                      console.log("Xoa");
                    }}
                  >
                    <i
                      style={{
                        color: "#da2a1c",
                      }}
                      className="fa-solid fa-trash-can"
                    ></i>
                  </FTButton>
                </td>
              </tr>
            );
          })}
      </tbody>
    </StTable>
  );
});

export default Table;
