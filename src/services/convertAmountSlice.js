import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";

// create api method
export const convertAmoutApi = createApi({
  reducerPath: "convertAmoutApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://open.er-api.com/v6/",
  }),

  endpoints: (builder) => ({
    getConverted: builder.query({ query: () => "latest/USD" }),
  }),
});

export const { useGetConvertedQuery } = convertAmoutApi;
