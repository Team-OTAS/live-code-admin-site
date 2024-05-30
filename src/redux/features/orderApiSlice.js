import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "./../../api/axios";

const initialState = {
  loading: false,
  orderData: null,
  error: "",
};

export const getOrderData = createAsyncThunk("order/getAllOrder", (id) => {
  // console.log(deleteData);
  return axios.get("/api/order/" + id).then((response) => response.data);
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
      state.shopData = action.payload;
      state.error = "";
    });
    builder.addCase(getOrderData.rejected, (state, action) => {
      state.loading = false;
      state.shopData = null;
      state.error = action.error.message;
    });
  },
});

export default orderDataSlice.reducer;
