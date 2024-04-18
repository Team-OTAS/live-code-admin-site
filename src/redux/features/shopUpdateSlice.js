import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";

const initialState = {
  formData: {},
};

const stepperFormSlice = createSlice({
  name: "stepperForm",
  initialState,
  reducers: {
    // setStep: (state, action) => {
    //   state.step = action.payload;
    // },
    updateFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
      console.log("Form Data from Redux Store", state.formData);
    },
    resetForm: (state) => {
      // state.step = 0;
      state.formData = {};
    },
  },
});

export const updateShops = createAsyncThunk(
  "shopupdate/updateShops",
  (shopData) => {
    console.log("Shop Data from Redux Store", shopData);
    //   return axios
    //     .post(`/products/${productData.id}?_method=PUT`, productData.formData, {
    //       headers: {
    //         "Content-Type": "multipart/form-data",
    //          },
    //     })
    //     .then((response) => response.data);
  }
);

export const updateReplyMessage = createAsyncThunk(
  "shopupdate/updateReplyMessage",
  (message, { getState }) => {
    console.log("Shop Data from Redux Store", message);
  }
);

const shopUpdateSlice = createSlice({
  name: "shopupdate",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(updateShops.fulfilled, (state, action) => {
      state.loading = false;
      state.update = action.payload;
      state.error = "";
    });
    builder.addCase(updateShops.rejected, (state, action) => {
      state.loading = false;
      state.update = [];
      state.error = action.error.message;
    });
  },
});

export const { updateFormData, resetForm } = stepperFormSlice.actions;
export default stepperFormSlice.reducer;
// export default shopUpdateSlice.reducer;
