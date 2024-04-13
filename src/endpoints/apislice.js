import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const baseQuery = fetchBaseQuery({
	baseUrl: 'http://localhost:5000/',
	prepareHeaders: (headers) => {
		return headers;
	},
});

const baseQueryWithCrypt = async (args, api, extraOptions) => {
	const result = await baseQuery(args, api, extraOptions);
	const { data } = result;
	return { data };
};


export const apiSlice = createApi({
	reducerPath: "api",
	baseQuery: baseQueryWithCrypt,
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (body) => {
				return {
					url: "auth/login",
					method: "post",
					body,
				};
			},
		}),
	}),
	tagTypes: ["user"]
});

export const { useLoginMutation } = apiSlice;