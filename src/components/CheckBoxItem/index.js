import "./CheckBoxItem.scss";

function CheckBoxItem(props) {
  let arr = props.data;
  let api = props.api;
  let apiChart = props.apiChart;
  let filter = props.filter;
  const handleCheckBox = (e) => {
    let newApi = "";
    let newApiChart = "";
    if (e.target.checked === true) {
      newApi = api + filter + arr.id;
      newApiChart = apiChart + filter + arr.id;
    } else {
      newApi = api.replace(filter + arr.id, "");
      newApiChart = apiChart.replace(filter + arr.id, "");
    }
    const a = (newApi) => props.setApi(newApi);
    a(newApi);
    const b = (newApiChart) => props.setApiChart(newApiChart);
    b(newApiChart);
  };
  return (
    <div className="list-checkbox d-flex align-items-center">
      <div className="check-box-input d-flex align-items-center">
        <input
          type="checkbox"
          value={arr.id}
          onClick={(e) => handleCheckBox(e)}
        />
      </div>
      <div className="checkbox-name">{arr.name}</div>
    </div>
  );
}
export default CheckBoxItem;
