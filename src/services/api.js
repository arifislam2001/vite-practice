import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiService = createApi({
  reducerPath: "apiService",
  baseQuery: fetchBaseQuery({
    baseUrl: " http://localhost:9000",
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
    }),

    getnewuserdata: builder.query({
      query: ()=> "/alluser"
    }),
    //  registerUser: builder.mutation({
    //   query: (userData) => ({
    //     url: "/registation",
    //     method: "POST",
    //     body: userData,
    //   }),
    // }),

    registerUser : builder.mutation({
      query : (userdata) => ({
        url : "/registation",
        method : "POST",
        body : userdata
      })
    })
  }),
});

export const { useGetproductsQuery , useGetCatagoryListQuery , useGetProductDetailsQuery , useGetSearchSuggestionsQuery , useGetnewuserdataQuery ,  useRegisterUserMutation} = apiService;