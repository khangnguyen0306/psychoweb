import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { navigate } from "../utils/navigate";
import { selectTokens } from "../slices/auth.slice";
import { BE_API_LOCAL } from "../config";

export const doctorAPI = createApi({
  reducerPath: "doctorManagement",
  tagTypes: ["DoctorList", "ApoinmentList"],
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
        };
      },
      invalidatesTags: [{ type: "ApoinmentList", id: "LIST" }],
    }),

    // Endpoint mới cho thanh toán cuộc hẹn
    BookingAppointmentPay: builder.mutation({
      query: (paymentData) => ({
        method: "POST",
        url: `appointment/pay`,
        body: paymentData,
      }),
    }),
  }),
});

export const {
  useGetAllDoctorQuery,
  useGetDoctorDetailQuery,
  useBookingApointmentMutation,
  useBookingAppointmentPayMutation, // Hook mới cho thanh toán
} = doctorAPI;
