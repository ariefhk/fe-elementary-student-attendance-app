import { hideLoading, showLoading } from "react-redux-loading-bar"
import { protectedApiEndpoint } from "./instance"

export const teacherApi = protectedApiEndpoint.injectEndpoints({
  endpoints: (builder) => ({
    findAllTeacher: builder.query({
      query: (args) => ({
        url: `teacher?name=${args.name}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      transformResponse: (response) => {
        const teachers = response?.data
        return teachers
      },
      providesTags: () => [{ type: "TEACHER", id: "LIST_OF_TEACHER" }],
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
      query: (args) => {
        const createTeacherFormData = new FormData()
        args?.email && createTeacherFormData.append("email", args.email)
        args?.password && createTeacherFormData.append("password", args.password)
        args?.profilePicture && createTeacherFormData.append("profilePicture", args.profilePicture)
        args?.gender && createTeacherFormData.append("gender", args.gender)
        args?.name && createTeacherFormData.append("name", args.name)
        args?.nip && createTeacherFormData.append("nip", args.nip)
        args?.address && createTeacherFormData.append("address", args.address)

        return {
          url: `teacher`,
          method: "POST",
          formData: true,
          body: createTeacherFormData,
        }
      },
      transformResponse: (response) => {
        const teacher = response.data
        return teacher
      },
      invalidatesTags: () => [{ type: "TEACHER", id: "LIST_OF_TEACHER" }],
    }),
    updateTeacher: builder.mutation({
      query: (args) => {
        const updateTeacherFormData = new FormData()
        args?.email && updateTeacherFormData.append("email", args.email)
        args?.password && updateTeacherFormData.append("password", args.password)
        args?.profilePicture && updateTeacherFormData.append("profilePicture", args.profilePicture)
        args?.gender && updateTeacherFormData.append("gender", args.gender)
        args?.name && updateTeacherFormData.append("name", args.name)
        args?.nip && updateTeacherFormData.append("nip", args.nip)
        args?.address && updateTeacherFormData.append("address", args.address)

        return {
          url: `teacher/${args?.teacherId}`,
          method: "PUT",
          formData: true,
          body: updateTeacherFormData,
        }
      },
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
