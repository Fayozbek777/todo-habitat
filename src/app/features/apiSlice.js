import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/",
  }),
  tagTypes: ["Habit"],

  endpoints: (builder) => ({
    getHabits: builder.query({
      query: () => "habits",
      providesTags: ["Habit"],
    }),

    addHabit: builder.mutation({
      query: (habit) => ({
        url: "habits",
        method: "POST",
        body: habit,
      }),
      invalidatesTags: ["Habit"],
    }),
    deleteHabit: builder.mutation({
      query: (id) => ({
        url: `habits/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Habit"],
    }),
    updateHabit: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `habits/${id}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: ["Habit"],
    }),
  }),
});

export const {
  useAddHabitMutation,
  useDeleteHabitMutation,
  useUpdateHabitMutation,
  useGetHabitsQuery,
} = apiSlice;
