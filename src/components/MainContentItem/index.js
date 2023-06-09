import { useNavigate } from "react-router-dom";
import API from "../../Constant/Api";
import "./MainContentItem.scss";

const MainContentItem = (props) => {
  const navigate = useNavigate();
  const arr = props.data;
  const active = props.active;
  const col = props.col || "col-lg-4"
  let gridItem = (
    <div
      className={"col-12 col-sm-12 col-md-6 " + col  +" item-container"}
      onClick={() => navigate(`/loai/${arr.id}`)}
    >
      <div className="item-content">
        {props.imgState && (
          <div className="img-container">
            <img alt="" src={arr.images} />
          </div>
        )}
        <div className="item-info d-flex">
          <div className="info">
            <p>
              {arr.kingdom} - {arr.phylumn}
            </p>
            <h3>{arr.name}</h3>
            <p>
              <i>{arr.ten_khoa_hoc}</i>
            </p>
          </div>
          <div className="qr">
            <img
              alt=""
              src={
                "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" +
                API.domain +
                "species/" +
                arr.id
              }
            />
          </div>
        </div>
        <div className="item-status d-flex">
          {arr.loai_hien_trang ? (
            <div className="status d-flex align-items-center">
              <i className="color-danger fa-solid fa-arrow-down"></i>
              <p>{arr.loai_hien_trang}</p>
            </div>
          ) : (
            <div className="status d-flex align-items-center">
              <i className="fa-regular fa-circle-question"></i>
              <p>Chưa xác định</p>
            </div>
          )}

          <div className="redbook d-flex">
            {arr.sach_dos && <span className="red-book">{arr.sach_dos}</span>}
            {arr.iucns && <span className="iucns">{arr.iucns}</span>}
          </div>
        </div>
      </div>
    </div>
  );
  let tableItem = (
    <div className="Table" onClick={() => navigate(`/loai/${arr.id}`)}>
      <p>{arr.name}</p>
      <p>{arr.ten_khoa_hoc}</p>
      {arr.loai_hien_trang ? (
        <p>{arr.loai_hien_trang}</p>
      ) : (
        <p>Chưa xác định</p>
      )}
      <p></p>
    </div>
  );
  return <>{active === 0 ? gridItem : tableItem}</>;
};
export default MainContentItem;
