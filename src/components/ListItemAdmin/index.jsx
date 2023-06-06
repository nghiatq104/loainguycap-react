import { Link } from "react-router-dom";
import "./ListItem.scss";
import { memo } from "react";

const ListItemAdmin = memo(() => {
  return (
    <Link className="list-item-admin">
      <i className="fa-solid fa-user"></i>
      <p>Quản Lý </p>
    </Link>
  );
});

export default ListItemAdmin;
