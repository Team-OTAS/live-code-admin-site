import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "./../../api/axios";

const initialState = {
  loading: false,
  orderData: [],
  error: "",
};

export const getOrderData = createAsyncThunk("order/getAllOrder", () => {
  return axios.get("/api/orders").then((response) => response.data.data.data);
});

const orderDataSlice = createSlice({
  name: "orderData",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getOrderData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getOrderData.fulfilled, (state, action) => {
      state.loading = false;
      console.log("Order Data from Redux Store", action.payload);
      state.orderData = action.payload;
      state.error = "";
    });
    builder.addCase(getOrderData.rejected, (state, action) => {
      state.loading = false;
      state.orderData = null;
      state.error = action.error.message;
    });
  },
});

export default orderDataSlice.reducer;
