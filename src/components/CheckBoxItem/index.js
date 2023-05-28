import { useContext } from "react";
import { apiContext } from "../../Context/ApiContext";
import "./CheckBoxItem.scss";
import useDebounce from "../../hook/Debounce";

function CheckBoxItem(props) {
  // console.log("checkbox item load");
  const value = useContext(apiContext);
  let arr = props.data;
  let filter = props.filter;

  const handleCheckBox = useDebounce((e) => {
    let newApi = "";
    let newApiChart = "";
    if (e.target.checked === true) {
      newApi = value.api + filter + arr.id;
      newApiChart = value.apiChart + filter + arr.id;
    } else {
      newApi = value.api.replace(filter + arr.id, "");
      newApiChart = value.apiChart.replace(filter + arr.id, "");
    }
    value.setApi(newApi);
    value.setApiChart(newApiChart);
  }, 500);

  return (
    <label
      className="list-checkbox d-flex align-items-center"
      htmlFor={filter + arr.id}
    >
      <div className="check-box-input d-flex align-items-center">
        <input
          id={filter + arr.id}
          type="checkbox"
          value={arr.id}
          onClick={(e) => handleCheckBox(e)}
        />
      </div>
      <div className="checkbox-name">{arr.name}</div>
    </label>
  );
}
export default CheckBoxItem;
