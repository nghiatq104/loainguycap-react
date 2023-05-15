import "./footer.scss";
import FooterItem from "../FooterItem";
import { Images } from "../../Data/Api";

function Footer() {
  let html = Images.map((item, index) => <FooterItem key={index} src={item} />);
  return (
    <div className="footer">
      <div className="footer-title">
        <p>TRANG LIÊN QUAN</p>
      </div>

      <div className="top-footer row">{html}</div>

      <div className="mid-footer row">
        <div className="col-12 col-sm-6 col-md-6 col-lg-3">
          <div className="info-item">
            GIỚI THIỆU
            <ul>
              <li>
                <a href="/">Hệ thống</a>
              </li>
              <li>
                <a href="/">Tài trợ</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-md-6 col-lg-3">
          <div className="info-item">
            THÔNG TIN - HƯỚNG DẪN
            <ul>
              <li>
                <a href="/">Tin tức</a>
              </li>
              <li>
                <a href="/">Tài liệu hướng dẫn tra cứu thông tin</a>
              </li>
              <li>
                <a href="/">Video hướng dẫn tra cứu thông tin</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-md-6 col-lg-3">
          <div className="info-item">
            VĂN BẢN - TÀI LIỆU
            <ul>
              <li>
                <a href="/">Văn bản pháp luật</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-md-6 col-lg-3">
          <div className="info-item">
            HỖ TRỢ
            <ul>
              <li>
                <a href="/">Liên hệ</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bot-footer">
        <p>
          HỆ THỐNG BÁO CÁO VỀ HIỆN TRẠNG LOÀI NGUY CẤP QUÝ HIẾM ĐƯỢC ƯU TIÊN BẢO
          VỆ
        </p>
        <p>
          <a href="/">Điều khoản & Bảo mật</a>
          <span>Bản quyền bởi Ban quản lý dự án WLP</span>
        </p>
        <p>
          Được tài trợ bởi: Quỹ môi trường dự án toàn cầu (GEF) THÔNG QUA NGÂN
          HÀNG THẾ GIỚI (WB)
        </p>
      </div>
    </div>
  );
}
export default Footer;
