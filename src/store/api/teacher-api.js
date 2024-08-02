import { hideLoading, showLoading } from "react-redux-loading-bar"
import { protectedApiEndpoint } from "./instance"

export const teacherApi = protectedApiEndpoint.injectEndpoints({
  endpoints: (builder) => ({
    findAllTeacher: builder.query({
      query: (args) => {
        if (args?.name) {
          return {
            url: `teacher?name=${args.name}`,
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        }
        return {
          url: `teacher`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      },
      transformResponse: (response) => {
        const teachers = response?.data
        return teachers
      },
      providesTags: (result) => {
        return result
          ? [
              ...result.map(({ id }) => ({ type: "TEACHER", id })),
              { type: "TEACHER", id: "LIST_OF_TEACHER" },
            ]
          : [{ type: "TEACHER", id: "LIST_OF_TEACHER" }]
      },
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        dispatch(showLoading())
        try {
          await queryFulfilled
        } catch (error) {
          console.log("LOGG ERROR ON QUERYSTARTED GET ALL TEACHER: ", error)
        }
        dispatch(hideLoading())
      },
    }),

    createTeacher: builder.mutation({
      query: (args) => ({
        url: `teacher`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          nip: args?.nip,
          name: args?.name,
          email: args?.email,
          password: args?.password,
          photo: args?.photo,
          address: args?.address,
        },
      }),
      transformResponse: (response) => {
        const teacher = response.data
        return teacher
      },
      invalidatesTags: () => [{ type: "TEACHER", id: "LIST_OF_TEACHER" }],
    }),
    updateTeacher: builder.mutation({
      query: (args) => ({
        url: `teacher/${args?.teacherId}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          nip: args?.nip,
          name: args?.name,
          email: args?.email,
          password: args?.password,
          photo: args?.photo,
          address: args?.address,
        },
      }),
      transformResponse: (response) => {
        const teacher = response.data
        return teacher
      },
      invalidatesTags: () => [{ type: "TEACHER", id: "LIST_OF_TEACHER" }],
    }),

    deleteTeacher: builder.mutation({
      query: (args) => ({
        url: `teacher/${args?.teacherId}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      transformResponse: () => {
        return true
      },
      invalidatesTags: () => [{ type: "TEACHER", id: "LIST_OF_TEACHER" }],
    }),
  }),
})

export const {
  useFindAllTeacherQuery,
  useCreateTeacherMutation,
  useUpdateTeacherMutation,
  useDeleteTeacherMutation,
} = teacherApi
