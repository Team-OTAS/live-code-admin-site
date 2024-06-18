import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem("authToken"); // Assuming you have stored the token in your Redux state
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllUser: builder.query({
      query: () => "api/users",
    }),
    createUser: builder.mutation({
      query: (data) => ({
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        url: "api/users",
        method: "POST",
        body: data,
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `api/users/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllUserQuery,
  useCreateUserMutation,
  useDeleteUserMutation,
} = userApi;
