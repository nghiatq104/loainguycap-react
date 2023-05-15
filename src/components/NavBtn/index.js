import "./NavBtn.scss";

function NavBtn(props) {
  let id = props.id;
  let active = props.active;
  return (
    <button className={"tab-btn " + active} onClick={() => props.onClick(id)}>
      <span className="nav-icon">{props.icon}</span>
      <span>{props.name}</span>
    </button>
  );
}
export default NavBtn;
