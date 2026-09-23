import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const BASE_URL = "http://localhost:9000";

export const apiService = createApi({
  reducerPath: "apiService",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api/v1/auth`,
  }),
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    getproducts: builder.query({
      query: ({ category, limit, skip, search }) =>
        search
          ? `/products/search?q=${encodeURIComponent(search)}&limit=${limit}&skip=${skip}`
          : `/products${category ? `/category/${category}` : ""}?limit=${limit}&skip=${skip}`,
    }),

    getCatagoryList: builder.query({
      query: () => "/products/category-list",
    }),

    getProductDetails: builder.query({
      query: (id) => `/products/${id}`,
    }),

    getSearchSuggestions: builder.query({
      query: (search) => `/products/search?q=${encodeURIComponent(search)}&limit=5`,
    }),

    getnewuserdata: builder.query({
      query: () => "/alluser",
      providesTags: ["Users"],
    }),

    deleateuser: builder.mutation({
      query: (id) => ({
        url: `/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),

    updateUser: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/update/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    registerUser: builder.mutation({
      query: (userdata) => ({
        url: "/registation",
        method: "POST",
        body: userdata,
      }),
    }),
  }),
});

export const {
  useGetproductsQuery,
  useGetCatagoryListQuery,
  useGetProductDetailsQuery,
  useGetSearchSuggestionsQuery,
  useGetnewuserdataQuery,
  useRegisterUserMutation,
  useDeleateuserMutation,
  useUpdateUserMutation,
} = apiService;