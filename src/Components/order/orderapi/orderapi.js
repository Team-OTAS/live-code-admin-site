import axios from "./../../../api/axios";

const getOrderData = () => {
  const getData = async () => {
    const res = await axios.get("/api/orders");
  };

  return { getData };
};

export default getOrderData;
