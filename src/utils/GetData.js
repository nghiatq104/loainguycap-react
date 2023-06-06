// import { useNavigate } from "react-router-dom";

function getData(api) {
  try {
    const data = fetch(api).then((data) => data.json());
    return data;
  } catch (error) {
    console.log("Error: " + error);
  }
}
export default getData;
