import { api } from "./api";

export const utilsApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    uploadMedia: builder.mutation({
      query: (body) => ({
        url: "http://dev-ahanode-env.eba-3mim2dn7.us-west-1.elasticbeanstalk.com/upload/multiple-images",
        method: "POST", // Tumhari API POST request use kar rahi hai
        body, // FormData body mein jayega jisme multiple files hongi
      }),
    }),

    getSpecification: builder.query({
      query: () => `/product/getSpecificationMasterList`,
      providesTags: ["Product Specification"],
    }),
  }),
});

export const { useUploadMediaMutation, useGetSpecificationQuery } =
  utilsApiSlice;
