import { hideLoading, showLoading } from "react-redux-loading-bar"
import { protectedApiEndpoint } from "./instance"

export const classApi = protectedApiEndpoint.injectEndpoints({
  endpoints: (builder) => ({
    findAllClass: builder.query({
      query: (args) => {
        return {
          url: `class?name=${args.name}`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      },
      transformResponse: (response) => {
        const classes = response?.data
        return classes
      },
      providesTags: () => [{ type: "CLASS", id: "LIST_OF_CLASS" }],
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        dispatch(showLoading())
        try {
          await queryFulfilled
        } catch (error) {
          console.log("LOGG ERROR ON QUERYSTARTED GET ALL CLASS: ", error)
        }
        dispatch(hideLoading())
      },
    }),

    findClassById: builder.query({
      query: (args) => {
        return {
          url: `class/${args.classId}`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      },
      transformResponse: (response) => {
        const classesDetailWithStudent = response?.data
        return classesDetailWithStudent
      },

      providesTags: () => [{ type: "CLASS", id: "CLASS_BY_ID" }],
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        dispatch(showLoading())
        try {
          await queryFulfilled
        } catch (error) {
          console.log("LOGG ERROR ON QUERYSTARTED GET ALL CLASS: ", error)
        }
        dispatch(hideLoading())
      },
    }),
    findClassByTeacherId: builder.query({
      query: (args) => {
        return {
          url: `class/teacher/${args.teacherId}`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      },
      transformResponse: (response) => {
        const teacherClasses = response?.data
        return teacherClasses
      },
      providesTags: () => [{ type: "CLASS", id: "LIST_OF_CLASS_BY_TEACHER" }],
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        dispatch(showLoading())
        try {
          await queryFulfilled
        } catch (error) {
          console.log("LOGG ERROR ON QUERYSTARTED GET ALL CLASS BY TEACHER: ", error)
        }
        dispatch(hideLoading())
      },
    }),
    findClassByStudentId: builder.query({
      query: (args) => {
        return {
          url: `class/student/${args.studentId}`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      },
      transformResponse: (response) => {
        const studentClasses = response?.data
        return studentClasses
      },
      providesTags: () => [{ type: "CLASS", id: "LIST_OF_CLASS_BY_STUDENT" }],
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        dispatch(showLoading())
        try {
          await queryFulfilled
        } catch (error) {
          console.log("LOGG ERROR ON QUERYSTARTED GET ALL CLASS BY STUDENT: ", error)
        }
        dispatch(hideLoading())
      },
    }),

    createClass: builder.mutation({
      query: (args) => ({
        url: `class`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          name: args?.name,
          teacherId: args?.teacherId,
        },
      }),
      transformResponse: (response) => {
        const classes = response.data
        return classes
      },
      invalidatesTags: () => [
        { type: "CLASS", id: "LIST_OF_CLASS" },
        { type: "CLASS", id: "CLASS_BY_ID" },
        { type: "CLASS", id: "LIST_OF_CLASS_BY_TEACHER" },
        { type: "CLASS", id: "LIST_OF_CLASS_BY_STUDENT" },
      ],
    }),

    updateClass: builder.mutation({
      query: (args) => ({
        url: `class/${args?.classId}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          name: args?.name,
          teacherId: args?.teacherId,
        },
      }),
      transformResponse: (response) => {
        const classes = response.data
        return classes
      },
      invalidatesTags: () => [
        { type: "CLASS", id: "LIST_OF_CLASS" },
        { type: "CLASS", id: "CLASS_BY_ID" },
        { type: "CLASS", id: "LIST_OF_CLASS_BY_TEACHER" },
        { type: "CLASS", id: "LIST_OF_CLASS_BY_STUDENT" },
        { type: "STUDENT", id: "LIST_OF_STUDENT" },
      ],
    }),

    deleteClass: builder.mutation({
      query: (args) => ({
        url: `class/${args?.classId}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      transformResponse: () => {
        return true
      },
      invalidatesTags: () => [
        { type: "CLASS", id: "LIST_OF_CLASS" },
        { type: "CLASS", id: "CLASS_BY_ID" },
        { type: "CLASS", id: "LIST_OF_CLASS_BY_TEACHER" },
        { type: "CLASS", id: "LIST_OF_CLASS_BY_STUDENT" },
        { type: "STUDENT", id: "LIST_OF_STUDENT" },
      ],
    }),

    addStudentToClass: builder.mutation({
      query: (args) => ({
        url: `class/${args?.classId}/student/${args.studentId}/add`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      transformResponse: (response) => {
        const addStudentToClass = response.data
        return addStudentToClass
      },
      invalidatesTags: () => [
        { type: "CLASS", id: "LIST_OF_CLASS" },
        { type: "CLASS", id: "CLASS_BY_ID" },
        { type: "CLASS", id: "LIST_OF_CLASS_BY_TEACHER" },
        { type: "CLASS", id: "LIST_OF_CLASS_BY_STUDENT" },
        { type: "STUDENT", id: "LIST_OF_STUDENT" },
        { type: "STUDENT", id: "LIST_OF_STUDENT_INSIDE_CLASS" },
      ],
    }),

    removeStudentFromClass: builder.mutation({
      query: (args) => ({
        url: `class/${args?.classId}/student/${args.studentId}/remove`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      transformResponse: (response) => {
        const removeStudentFromClass = response.data
        return removeStudentFromClass
      },
      invalidatesTags: () => [
        { type: "CLASS", id: "LIST_OF_CLASS" },
        { type: "CLASS", id: "CLASS_BY_ID" },
        { type: "CLASS", id: "LIST_OF_CLASS_BY_TEACHER" },
        { type: "CLASS", id: "LIST_OF_CLASS_BY_STUDENT" },
        { type: "STUDENT", id: "LIST_OF_STUDENT" },
        { type: "STUDENT", id: "LIST_OF_STUDENT_INSIDE_CLASS" },
      ],
    }),
  }),
})

export const {
  useAddStudentToClassMutation,
  useRemoveStudentFromClassMutation,
  useFindClassByStudentIdQuery,
  useFindClassByIdQuery,
  useFindClassByTeacherIdQuery,
  useFindAllClassQuery,
  useCreateClassMutation,
  useUpdateClassMutation,
  useDeleteClassMutation,
} = classApi
