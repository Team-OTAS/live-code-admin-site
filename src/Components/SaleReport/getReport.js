import axios from "./../../api/axios";

const getReport = async (value) => {
  const res = await axios.get(`/api/report/sales/?top_limit=5`);
  return res.data.data;
};

export default getReport;
