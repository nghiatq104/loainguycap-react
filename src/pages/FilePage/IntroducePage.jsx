import "./FilePage.scss";

function IntroducePage() {
  return (
    <div className="introduce-page">
      <h6>
        HỆ THỐNG BÁO CÁO VỀ HIỆN TRẠNG LOÀI NGUY CẤP QUÝ HIẾM ĐƯỢC ƯU TIÊN BẢO
        VỆ
      </h6>
      <p>
        Hệ thống báo cáo hiện trạng loài nguy cấp quý hiếm được ưu tiên bảo vệ
        được tài trợ bởi Quỹ môi trường dự án toàn cầu (GEF), thông qua Ngân
        hàng Thế giới (WB) được quản trị bởi Ban quản lý dự án WLP.
      </p>
      <div className="d-flex">
        <a href="https://monre.gov.vn/">
          <img
            src="https://loainguycap.ceid.gov.vn/static/img/worldBank.07de07b6.jpg"
            alt=""
          />
        </a>
        <a href="http://vea.gov.vn/">
          <img
            src="https://loainguycap.ceid.gov.vn/static/img/logotc1.16cd79de.png"
            alt=""
          />
        </a>
      </div>
      <p>
        Hệ thống được xây dựng dưới sự hỗ trợ của đơn vị nhà thầu là Công ty
        TNHH công nghệ cao Skymap.
      </p>
      <a href="http://skymapglobal.vn/">
        <img
          alt=""
          src="https://loainguycap.ceid.gov.vn/static/img/skymap.0b133cb3.png"
        />
      </a>
    </div>
  );
}

export default IntroducePage;
