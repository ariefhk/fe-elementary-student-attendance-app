import { hideLoading, showLoading } from "react-redux-loading-bar"
import { protectedApiEndpoint } from "./instance"

export const studentApi = protectedApiEndpoint.injectEndpoints({
  endpoints: (builder) => ({
    findAllStudent: builder.query({
      query: (args) => {
        return {
          url: `students?name=${args.name}`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      },
      transformResponse: (response) => {
        const students = response?.data
        return students
      },
      providesTags: (result) => {
        return result
          ? [
              ...result.map(({ id }) => ({ type: "STUDENT", id })),
              { type: "STUDENT", id: "LIST_OF_STUDENT" },
            ]
          : [{ type: "STUDENT", id: "LIST_OF_STUDENT" }]
      },
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        dispatch(showLoading())
        try {
          await queryFulfilled
        } catch (error) {
          console.log("LOGG ERROR ON QUERYSTARTED GET ALL STUDENT: ", error)
        }
        dispatch(hideLoading())
      },
    }),

    findStudentByClassId: builder.query({
      query: (args) => {
        return {
          url: `students/${args?.studentId}/class/${args.classId}?name=${args.name}`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      },
      transformResponse: (response) => {
        const studentClass = response?.data
        return studentClass
      },
      providesTags: (result) => {
        return result?.students
          ? [
              ...result.students.map(({ id }) => ({
                type: "STUDENT",
                id: `${id}_BY_CLASS`,
              })),
              { type: "STUDENT", id: "LIST_OF_STUDENT_BY_CLASS" },
            ]
          : [{ type: "STUDENT", id: "LIST_OF_STUDENT_BY_CLASS" }]
      },
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        dispatch(showLoading())
        try {
          await queryFulfilled
        } catch (error) {
          console.log(
            "LOGG ERROR ON QUERYSTARTED GET ALL STUDENT BY CLASS: ",
            error,
          )
        }
        dispatch(hideLoading())
      },
    }),

    setStudentToClass: builder.mutation({
      query: (args) => ({
        url: `students/${args?.studentId}/class/${args.classId}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      transformResponse: (response) => {
        const studentClass = response?.data
        return studentClass
      },
      invalidatesTags: () => [
        { type: "STUDENT", id: "LIST_OF_STUDENT_BY_CLASS" },
        { type: "STUDENT", id: "LIST_OF_STUDENT" },
        { type: "CLASS", id: "LIST_OF_CLASS" },
      ],
    }),

    removeStudentFromClass: builder.mutation({
      query: (args) => ({
        url: `students/${args?.studentId}/class/${args.classId}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      transformResponse: () => {
        return true
      },
      invalidatesTags: () => [
        { type: "STUDENT", id: "LIST_OF_STUDENT_BY_CLASS" },
        { type: "STUDENT", id: "LIST_OF_STUDENT" },
        { type: "CLASS", id: "LIST_OF_CLASS" },
      ],
    }),

    createStudent: builder.mutation({
      query: (args) => ({
        url: `students`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          name: args?.name,
          nisn: args?.nisn,
          no_telp: args?.no_telp,
          gender: args?.gender,
          email: args?.email,
          parentId: args?.parentId,
        },
      }),
      transformResponse: (response) => {
        const students = response.data
        return students
      },
      invalidatesTags: () => [{ type: "STUDENT", id: "LIST_OF_STUDENT" }],
    }),

    updateStudent: builder.mutation({
      query: (args) => ({
        url: `students/${args?.studentId}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          name: args?.name,
          nisn: args?.nisn,
          no_telp: args?.no_telp,
          gender: args?.gender,
          email: args?.email,
          parentId: args?.parentId,
          studentId: args?.studentId,
        },
      }),
      transformResponse: (response) => {
        const students = response.data
        return students
      },
      invalidatesTags: () => [{ type: "STUDENT", id: "LIST_OF_STUDENT" }],
    }),

    deleteStudent: builder.mutation({
      query: (args) => ({
        url: `students/${args?.studentId}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      transformResponse: () => {
        return true
      },
      invalidatesTags: () => [{ type: "STUDENT", id: "LIST_OF_STUDENT" }],
    }),
  }),
})

export const {
  useRemoveStudentFromClassMutation,
  useFindStudentByClassIdQuery,
  useSetStudentToClassMutation,
  useCreateStudentMutation,
  useDeleteStudentMutation,
  useFindAllStudentQuery,
  useUpdateStudentMutation,
} = studentApi
