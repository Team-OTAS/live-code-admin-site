import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "./../../api/axios";

const initialState = {
  loading: false,
  shopData: null,
  error: "",
};

export const getShopData = createAsyncThunk("shop/getShopData", (id) => {
  // console.log(deleteData);
  return axios.get("/api/shops/" + id).then((response) => response.data);
});

const shopDataSlice = createSlice({
  name: "shopData",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getShopData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getShopData.fulfilled, (state, action) => {
      state.loading = false;
      state.shopData = action.payload;
      state.error = "";
    });
    builder.addCase(getShopData.rejected, (state, action) => {
      state.loading = false;
      state.shopData = null;
      state.error = action.error.message;
    });
  },
});

export default shopDataSlice.reducer;
