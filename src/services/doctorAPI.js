import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { navigate } from "../utils/navigate";
import { selectTokens } from "../slices/auth.slice";
import { BE_API_LOCAL } from "../config";

export const doctorAPI = createApi({
  reducerPath: "doctorManagement",
  tagTypes: ["DoctorList","ApoinmentList"],
  baseQuery: fetchBaseQuery({
    baseUrl: BE_API_LOCAL,
    prepareHeaders: (headers, { getState }) => {
      const token = selectTokens(getState());
      if (token) {
        headers.append("Authorization", `Bearer ${token}`);
      }
      headers.append("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllDoctor: builder.query({
      query: () => `getlist`,
      providesTags: (result) =>
        result
          ? result?.data.map(({ id }) => ({ type: "DoctorList", id }))
          : [{ type: "DoctorList", id: "LIST" }],
    }),

    getUserProfile: builder.query({
      query: (userId) => ({
        url: `user/${userId}`,
        method: "GET",
      }),
    }),

    getDoctorDetail: builder.query({
      query: (userId) => ({
        url: `/${userId}`,
        method: "GET",
      }),
    }),

    BookingApointment: builder.mutation({
      query: (body) => {
        return {
          method: "POST",
          url: `appointment/create`,
          body: body,
        }
      },
      invalidatesTags: [{ type: "ApoinmentList", id: "LIST" }],
    }),

    // editUser: builder.mutation({
    //   query: (payload) => {
    //     const newBody = {
    //       address: payload.body.address,
    //       userName: payload.body.fullname,
    //       phoneNumber: payload.body.phoneNumber,
    //       dob: payload.body.dob,
    //       gender: payload.body.gender,
    //       imgUrl: payload.body.imgUrl,
    //     }
    //     return {
    //       method: "PUT",
    //       url: `users/` + payload.id,
    //       body: newBody,
    //     };
    //   },
    //   invalidatesTags: (res, err, arg) => [{ type: "UserList", id: arg.id }],
    // }),
    // editProfile: builder.mutation({
    //   query: (payload) => {
    //     return {
    //       method: "PUT",
    //       url: `users/` + payload.id,
    //       body: payload.body,
    //     };
    //   },
    //   invalidatesTags: (res, err, arg) => [{ type: "UserList", id: arg.id }],
    // }),
    // updatePassword: builder.mutation({
    //   query: ({ userId, newPassword, oldPassword }) => {
    //     return {
    //       url: `users/updatepassword`,
    //       method: "PUT",
    //       body: { userId, newPassword, oldPassword },
    //     };
    //   },
    // }),

    // deleteUser: builder.mutation({
    //   query: (payload) => {
    //     return {
    //       method: "DELETE",
    //       url: `users/` + payload,
    //     };
    //   },
    //   invalidatesTags: (_res, _err, _arg) => [
    //     { type: "UserList", id: "LIST" },
    //   ],
    // }),
    // getAllTransaction: builder.query({
    //   query: () => `order/getallorder`,
    //   providesTags: (result) =>
    //     result
    //       ? result.map(({ id }) => ({ type: "TransactionList", id }))
    //       : [{ type: "TransactionList", id: "LIST" }],
    // }),
    // getAllNotification: builder.query({
    //   query: (payload) => `notification/getnotificationbyuserid/` + payload,
    //   providesTags: (result) =>
    //     result
    //       ? result.map(({ id }) => ({ type: "NotificationList", id }))
    //       : [{ type: "NotificationList", id: "LIST" }],
    // }),
    // BanUser: builder.mutation({
    //   query: (payload) => {
    //     const reason = payload.reason;
    //     return {
    //       method: "PUT",
    //       url: `bannedaccount/banuser/${payload.id}?reason=${reason}`,
    //     };
    //   },
    //   invalidatesTags: (res, err, arg) => [{ type: "UserList", id: arg.id }],
    // }),
    // UnBanUser: builder.mutation({
    //   query: (payload) => {
    //     return {
    //       method: "PUT",
    //       url: `bannedaccount/unbanuser/${payload}`,
    //     };
    //   },
    //   invalidatesTags: (res, err, arg) => [{ type: "UserList", id: arg.id }],
    // }),
  }),
});

export const {
  useGetAllDoctorQuery,
  useGetDoctorDetailQuery,
  useBookingApointmentMutation
  //   useGetUserProfileQuery,
  //   useEditProfileMutation,
  //   useAddUserMutation,
  //   useEditUserMutation,
  //   useDeleteUserMutation,
  //   useBanUserMutation,
  //   useUnBanUserMutation,
  //   useGetUserProfileForOtherQuery,
  //   useGetAllTransactionQuery,
  //   useUpdatePasswordMutation,
  //   useGetAllNotificationQuery
} = doctorAPI;
