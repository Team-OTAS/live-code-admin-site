import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";

const initialState = {
  loading: false,
  deletes: [],
  error: "",
};

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  (deleteData) => {
    // console.log(deleteData);
    return axios
      .delete("/api/products", {
        data: deleteData,
      })
      .then((response) => response.data);
  }
);

const productdeleteSlice = createSlice({
  name: "delete",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(deleteProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.deletes = action.payload;
      state.error = "";
    });
    builder.addCase(deleteProduct.rejected, (state, action) => {
      state.loading = false;
      state.deletes = [];
      state.error = action.error.message;
    });
  },
});

export default productdeleteSlice.reducer;
