import "./FilePage.scss";
import { useContext } from "react";
import { apiContext } from "../../Context/ApiContext";

function DocItem(props) {
  return (
    <div className="doc-item col-12 col-sm-6 col-lg-4">
      <div className="item-content d-flex">
        <div className="img-content">
          <img src="" alt="" />
        </div>
        <div className="content">
          <h4>Hiệu lưc:{props.hieu_luc}</h4>
          <h3>{props.title}</h3>
          <p>{props.mo_ta}</p>
        </div>
      </div>
    </div>
  );
}

function DocumentPage() {
  const value = useContext(apiContext);
  return (
    <div className="document-page">
      <h6>TÀI LIỆU VĂN BẢN PHÁP LUẬT</h6>
      <div className="item-container row">
        {value.dataNghiDinh.map((data, i) => {
          return (
            <DocItem
              key={i}
              hieu_luc={data.update_at}
              title={data.ten}
              mo_ta={data.mo_ta}
            />
          );
        })}
      </div>
    </div>
  );
}

export default DocumentPage;
