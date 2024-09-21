import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://gb4prqkcua.execute-api.us-west-1.amazonaws.com/dev",
  // prepareHeaders: (headers, { getState }) => {
  //   const { token } = getState().auth;
  //   const getToken = getAccessToken();
  //   // If we have a token set in state, let's assume that we should be passing it.
  //   if (token || getToken) {
  //     headers.set("authorization", `Bearer ${token || getToken}`);
  //   }
  //   return headers;
  // },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  //   if (
  //     result.error &&
  //     (result.error.status === 401 || result.error.originalStatus === 401)
  //   ) {
  //     const tokenId = getAccessToken();

  //     if (tokenId) {
  //       // store the new token
  //       await api.dispatch(setBearerToken(tokenId));
  //       // retry the initial query
  //       result = await baseQuery(args, api, extraOptions);
  //     } else {
  //       // clear token - todo (move to signOut function)
  //       api.dispatch(setBearerToken(""));
  //     }
  //   }
  return result;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  tagTypes: [
    "categories",
    "subCategories",
    "brands",
    "products",
    "update products",
    "Product Specification",
    "openBox",
    "openboxProducts",
    "conditions",
    "store",
    "orderList",
    "ProductSKU",
    "bundles",
    "deliveryRoutes"
  ],
});
