import axios from "axios";
const BASE_URL = process.env.REACT_APP_API_BASE_URL;
const token = localStorage.getItem("authToken");
// let usertoken = localStorage.getItem("token");
axios.defaults.baseURL = BASE_URL;
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
axios.defaults.headers.common["Access-Control-Allow-Credentials"] = true;

const setAuthToken = (token) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
axios.defaults.headers.post["Content-Type"] = "application/json";

export { setAuthToken };
export default axios;
