// import axios from "./../../api/axios";
import axios from "./../../api/axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

// const API_URL = `${BACKEND_URL}/products/`;

// Create New Product
const createProduct = async (formData) => {
  const response = await axios.post("/api/products", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// Get all products
const getProducts = async () => {
  const response = await axios.get("/api/products");
  // console.log(response.data.data.data);
  return response.data.data.data;
};

// Delete a Product
const deleteProduct = async (deleteData) => {
  const response = await axios.delete("/api/products", {
    data: deleteData,
  });
  return response.data;
};
// Get a Product
const getProduct = async (id) => {
  const response = await axios.get(`/api/products/${id}`);
  return response.data;
};
// Update Product
const updateProduct = async (productData) => {
  const response = await axios.post(
    `/api/products/${productData.id}?_method=PUT`,
    productData.formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

const productService = {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
};

export default productService;
