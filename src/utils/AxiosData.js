import axios from "axios";

const getAxiosData = async (url, params = {}) => {
  console.log((`${url}`, params));
  try {
    console.log("loading: true");
    const response = await axios.get(url, { params });
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.log("error: ", err);
  } finally {
    console.log("done");
  }
  console.log((`${url}`, params));
};
export default getAxiosData;
