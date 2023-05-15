import "./FooterItem.scss";

function FooterItem(props) {
  return (
    <div className="web-relate col-12 col-sm-6 col-md-6 col-lg-3">
      <img alt="" src={props.src} />
    </div>
  );
}
export default FooterItem;
