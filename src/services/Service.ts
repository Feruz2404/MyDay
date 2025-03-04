import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ApiClient = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://test.api.mydays.uz",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    GetUser: builder.query({
      query: () => ({
        url: "/api/v1/user/me/",
      }),
    }),
    UpdateUser: builder.mutation({
      query: (data) => ({
        url: "/api/v1/user/me/",
        method: "PUT",
        body: data,
      }),
    }),
    LeadList: builder.query({
      query: () => ({
        url: "/api/v1/lead/list/",
      }),
    }),
    LeadCreate: builder.mutation({
      query: (data) => ({
        url: "/api/v1/lead/create/",
        method: "POST",
        body: data,
      }),
    }),

    SubjectList: builder.query({
      query: () => ({
        url: "/api/v1/course/subject-select",
      }),
    }),
    TeachertList: builder.query({
      query: () => ({
        url: "/api/v1/employee/select-list",
      }),
    }),
  }),
});

export const {
  useGetUserQuery,
  useUpdateUserMutation,
  useLeadListQuery,
  useSubjectListQuery,
  useLeadCreateMutation,
  useTeachertListQuery,
} = ApiClient;
