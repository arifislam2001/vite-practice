import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiService = createApi({
  reducerPath: "apiService",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dummyjson.com",
  }),
  endpoints: (builder) => ({
    getproducts: builder.query({
      query: ({category, limit , skip, search}) => 
        search ? `/products/search?q=${encodeURIComponent(search)}&limit=${limit}&skip=${skip}` :
        `/products${category ? `/category/${category}` : ""}?limit=${limit}&skip=${skip}`,
    }),
    getCatagoryList :builder.query({
      query : ()=> "/products/category-list"
    }),
    getProductDetails:builder.query({
      query : (id)=> `/products/${id}`
    }),
    getSearchSuggestions:builder.query({
      query : (search)=> `/products/search?q=${encodeURIComponent(search)}&limit=5`
    })
  }),
});

export const { useGetproductsQuery , useGetCatagoryListQuery , useGetProductDetailsQuery , useGetSearchSuggestionsQuery} = apiService;