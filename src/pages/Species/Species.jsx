import { useParams } from "react-router-dom";
import "./Species.scss";
import { memo, useEffect, useState } from "react";
import getData from "../../utils/GetData";
import API from "../../Constant/Api";

const SpeciesRender = memo((props) => {
  // const navigate = useNavigate();
  const [species, setSpecies] = useState([]);
  const dataApi = API.loai + props.id;
  useEffect(() => {
    async function getDataSpecies() {
      try {
        const data = await getData(dataApi);
        setSpecies(data);
      } catch (error) {
        // history.push('/404')
      }
    }
    getDataSpecies();
  }, [dataApi]);
  // console.log(species);
  let image =
    species.length !== 0
      ? species.attachments.length > 0
        ? species.attachments[0].path
        : API.emptyImg
      : null;
  return (
    <div className="species-detail">
      <p>Thông tin chi tiết loài nguy cấp quý hiếm</p>
      <div className="first-content">
        <div className="row content">
          <div className="col-sm-8 col-md-4 col-lg-3 col-xl-3 col-12">
            <img src={API.domain + image} alt="" />
          </div>
          <div className="right-side col-sm-12 col-md-8 col-lg-9 col-xl-9 col-12 pl-6">
            <h2 className="species-name">{species.ten}</h2>
            <p className="local-name">{species.ten_dia_phuong}</p>
            <p className="science-name">
              <i>{species.ten_khoa_hoc}</i>
            </p>
            <h3>ĐẶC ĐIỂM NHẬN DẠNG</h3>
            <p className="dacdiem">{species.dac_diem_nhan_dang}</p>
          </div>
        </div>
      </div>
    </div>
  );
});

const Species = () => {
  const { id } = useParams();

  return <SpeciesRender id={id} />;
};

export default Species;
