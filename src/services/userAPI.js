import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { selectTokens } from "../slices/auth.slice";
import { BE_API_LOCAL } from "../config";

export const userAPI = createApi({
    reducerPath: "Usermanagement",
    tagTypes: ["UserList"],

    baseQuery: fetchBaseQuery({
        baseUrl: BE_API_LOCAL,

        prepareHeaders: (headers, { getState }) => {
            const token = selectTokens(getState());
            if (token) {
                headers.append("Authorization", `Bearer ${token.token}`);
            }
            return headers;
        },
    }),

    endpoints: (builder) => ({
        // Get all users
        getAllUsers: builder.query({
            query: () => ({
                url: `user/getall`,
                method: "GET",
            }),
            providesTags: (result) =>
                result
                    ? result.data.map(({ id }) => ({ type: "UserList", id }))
                    : [{ type: "UserList", id: "LIST" }],
        }),

        // Get dashboard data
        getDashboard: builder.query({
            query: () => ({
                url: `user/getdashboard`,
                method: "GET",
            }),
        }),

        // Get a specific user's profile
        getUserProfile: builder.query({
            query: (userId) => ({
                url: `user/getby/${userId}`,
                method: "GET",
            }),
        }),

        // Create a new user
        createUser: builder.mutation({
            query: (newUser) => ({
                url: `user/create`,
                method: "POST",
                body: newUser,
            }),
            invalidatesTags: [{ type: "UserList", id: "LIST" }],
        }),

        // Edit a user's profile
        editProfile: builder.mutation({
            query: ({ userId, ...body }) => ({
                url: `user/update/${userId}`,
                method: "PUT",
                body,
            }),
            invalidatesTags: (result, error, { userId }) => [{ type: "UserList", id: userId }],
        }),

        // Delete a user
        deleteUser: builder.mutation({
            query: (userId) => ({
                url: `user/delete/${userId}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, userId) => [{ type: "UserList", id: userId }],
        }),
    }),
});

export const {
    useGetAllUsersQuery,
    useGetDashboardQuery,
    useGetUserProfileQuery,
    useCreateUserMutation,
    useEditProfileMutation,
    useDeleteUserMutation
} = userAPI;
