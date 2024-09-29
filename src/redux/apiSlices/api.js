import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from 'axios';

const baseQuery = fetchBaseQuery({
  baseUrl: "http://13.60.27.176/api/",
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


export default async function handler(req, res) {
  const { gstin } = req.query;

  try {
    const response = await axios.get(
      `https://apisetu.gov.in/gstn/v1/gstin/details/${gstin}`,
      {
        headers: {
          'x-api-key': process.env.API_SETU_KEY, // Use an environment variable for your API key
          'Accept': 'application/json',
        },
      }
    );
    
    res.status(200).json(response.data);  // Return the data to the frontend
  } catch (error) {
    console.error('Error fetching GSTIN details:', error.message);
    res.status(500).json({ message: 'Error fetching GSTIN details' });
  }
}