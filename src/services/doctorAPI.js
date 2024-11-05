import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
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
      query: () => `/getlist`,
      providesTags: (result) =>
        result
          ? result.data.map(({ id }) => ({ type: "DoctorList", id }))
          : [{ type: "DoctorList", id: "LIST" }],
    }),

    getDoctorDetail: builder.query({
      query: (userId) => ({
        url: `/${userId}`,
        method: "GET",
      }),
      providesTags: (result, error, userId) => [{ type: "DoctorList", id: userId }],
    }),

    createDoctor: builder.mutation({
      query: (newDoctorData) => ({
        url: `/create`,
        method: "POST",
        body: newDoctorData,
      }),
      invalidatesTags: [{ type: "DoctorList", id: "LIST" }],
    }),

    editDoctor: builder.mutation({
      query: ({ userId, ...updatedDoctorData }) => ({
        url: `/update/${userId}`, // Sử dụng userId để phù hợp với tài liệu API
        method: "PUT",
        body: updatedDoctorData,
      }),
      invalidatesTags: (result, error, { userId }) => [{ type: "DoctorList", id: userId }],
    }),
    
    
    deleteDoctor: builder.mutation({
      query: (userId) => ({
        url: `/delete/${userId}`, // Use userId instead of doctorId
        method: "DELETE",
      }),
      invalidatesTags: (result, error, userId) => [{ type: "DoctorList", id: userId }],
    }),

    BookingApointment: builder.mutation({
      query: (body) => ({
        method: "POST",
        url: `appointment/create`,
        body: body,
      }),
      invalidatesTags: [{ type: "ApoinmentList", id: "LIST" }],
    }),

    BookingAppointmentPay: builder.mutation({
      query: (paymentData) => ({
        method: "POST",
        url: `appointment/pay`,
        body: paymentData,
      }),
    }),

    // New endpoint to fetch appointments by user ID
    getAppointmentsByUserId: builder.query({
      query: (userId) => ({
        url: `appointment/getallbyuserid/${userId}`,
        method: "GET",
      }),
      providesTags: [{ type: "ApoinmentList", id: "LIST" }],
    }),
  }),
});

export const {
  useGetAllDoctorQuery,
  useGetDoctorDetailQuery,
  useBookingApointmentMutation,
  useBookingAppointmentPayMutation,
  useGetAppointmentsByUserIdQuery, // New hook for fetching appointment history
  useCreateDoctorMutation,
  useEditDoctorMutation,
  useDeleteDoctorMutation,
} = doctorAPI;
