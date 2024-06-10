import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "./../../api/axios";
import Swal from "sweetalert2";

const initialState = {
  loading: false,
  orderData: [],
  orderDetail: null,
  error: "",
};

// Get All Order
export const getOrderData = createAsyncThunk("order/getAllOrder", () => {
  return axios
    .get("/api/orders?limit=1000")
    .then((response) => response.data.data.data);
});

// Get a Order Detail
export const getOrderDetail = createAsyncThunk("order/getAOrder", (id) => {
  return axios.get("/api/orders/" + id).then((response) => response.data);
});

// Change Status Order
export const updateStatusOrder = createAsyncThunk(
  "order/updateStatusOrder",
  (orderData) => {
    return axios
      .patch("/api/orders", orderData)
      .then((response) => response.data);
  }
);

// Add Data Order
export const addDataOrder = createAsyncThunk(
  "order/addDataOrder",
  ({ id, data }) => {
    return axios
      .patch("/api/orders/" + id, data)
      .then((response) => response.data);
  }
);

const orderDataSlice = createSlice({
  name: "orderData",
  initialState,
  extraReducers: (builder) => {
    // All Order
    builder.addCase(getOrderData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getOrderData.fulfilled, (state, action) => {
      state.loading = false;
      state.orderData = action.payload;
      state.error = "";
    });
    builder.addCase(getOrderData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    // Get a Order Detail
    builder.addCase(getOrderDetail.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getOrderDetail.fulfilled, (state, action) => {
      state.loading = false;
      // console.log("Order Detail from Redux Store", action.payload);
      state.orderDetail = action.payload;
      state.error = "";
    });
    builder.addCase(getOrderDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    // Change Status Order
    builder.addCase(updateStatusOrder.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateStatusOrder.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      Swal.fire({
        icon: "success",
        title: "Status Change Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    });
    builder.addCase(updateStatusOrder.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      console.log(action);
      Swal.fire({
        icon: "error",
        title: "Status Change Failed, Please Try Again",
        showConfirmButton: false,
        timer: 1500,
      });
    });
    // Add Data Order
    builder.addCase(addDataOrder.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addDataOrder.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      Swal.fire({
        icon: "success",
        title: "Status Change Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    });
    builder.addCase(addDataOrder.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      console.log(action);
      Swal.fire({
        icon: "error",
        title: "Status Change Failed, Please Try Again",
        showConfirmButton: false,
        timer: 1500,
      });
    });
  },
});

export default orderDataSlice.reducer;
