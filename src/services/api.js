import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const BASE_URL = "http://localhost:9000";

export const apiService = createApi({
  reducerPath: "apiService",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api/v1`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("accessToken");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
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
      query: () => "/dashboard/alluser",
      providesTags: ["Users"],
    }),

    deleateuser: builder.mutation({
  query: (id) => ({
    url: `/dashboard/delete/${id}`,
    method: "DELETE",
  }),
  invalidatesTags: ["Users"],
}),
    updateUser: builder.mutation({
  query: ({ id, ...data }) => ({
    url: `/dashboard/update/${id}`,
    method: "PATCH",
    body: data,
  }),
  invalidatesTags: ["Users"],
}),



    registerUser: builder.mutation({
      query: (userdata) => ({
        url: "/auth/registration",
        method: "POST",
        body: userdata,
      }),
    }),

    loginUser: builder.mutation({
      query: (creds) => ({
        url: "/auth/login",
        method: "POST",
        body: creds,
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
  useLoginUserMutation,
  useDeleateuserMutation,
  useUpdateUserMutation,
} = apiService;