import { configureStore } from "@reduxjs/toolkit";
import productReducers from "./features/productReducer";
import productdeleteReducer from "./features/productdeleteSlice";
import updateShops from "./features/shopUpdateSlice";
import shopData from "./features/shopDataSlice";
import { userApi } from "./features/userApiSlice";
// import { setupListeners } from "@reduxjs/toolkit/query";
// import { userService } from "./features/userApiSlice";
//
const store = configureStore({
  reducer: {
    stocks: productReducers,
    deleteproduct: productdeleteReducer,
    Shop: updateShops,
    ShopData: shopData,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
});

export default store;
