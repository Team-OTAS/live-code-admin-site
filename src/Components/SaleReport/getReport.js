import axios from "./../../api/axios";

const getReport = async (value) => {
  console.log(value);
  const res = await axios.get(
    `/api/report/sales/?${value}_limit=5&type=monthly`
  );
  return res.data.data;
};

export default getReport;
