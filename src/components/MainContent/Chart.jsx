import { Doughnut } from "react-chartjs-2";
import "./MainContent.scss";
import { Chart, ArcElement } from "chart.js";
Chart.register(ArcElement);

function Charts(props) {
  console.log("chart loaded");
  const data = props.data;
  return (
    <div className="chart-content">
      <h4>Hệ sinh thái</h4>
      <div className="chart">
        <Doughnut
          id="dought-nut"
          type="doughnut"
          data={data}
          options={{
            plugins: {
              legend: {
                display: false,
              },
            },
          }}
        />
        <div className="chart-item">
          <p>
            <span style={{ backgroundColor: "#000" }}></span>Trên cạn
          </p>
          <p>
            <span style={{ backgroundColor: "#333" }}></span>Nước ngọt (Vùng
            nước nội)
          </p>
          <p>
            <span style={{ backgroundColor: "#9b4f96" }}></span>Biển
          </p>
          <p>
            <span style={{ backgroundColor: "#d81e05" }}></span>Ven biển
          </p>
          <p>
            <span style={{ backgroundColor: "#fc7f3f" }}></span>Hải đảo
          </p>
        </div>
      </div>
    </div>
  );
}
export default Charts;
