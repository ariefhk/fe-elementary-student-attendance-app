import { hideLoading, showLoading } from "react-redux-loading-bar"
import { setAttendance } from "../slice/attendance-slice"
import { protectedApiEndpoint } from "./instance"

export const attendanceApi = protectedApiEndpoint.injectEndpoints({
  endpoints: (builder) => ({
    getWeeklyAttendance: builder.query({
      query: (args) => {
        return {
          url: `attendances/class/${args?.classId}/year/${args?.year}/month/${args?.month}/week/${args?.week}`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      },
      transformResponse: (response) => {
        const attendance = response?.data
        return attendance
      },
      providesTags: () => [
        { type: "ATTENDANCE", id: "LIST_OF_WEEKLY_ATTENDANCE" },
      ],
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        dispatch(showLoading())
        try {
          await queryFulfilled
        } catch (error) {
          console.log(
            "LOGG ERROR ON QUERYSTARTED GET ALL WEEKLY_ATTENDANCE: ",
            error,
          )
        }
        dispatch(hideLoading())
      },
    }),
    getDailyAttendance: builder.query({
      query: (args) => {
        return {
          url: `attendances/class/${args?.classId}/date/${args?.date}`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      },
      transformResponse: (response) => {
        const attendance = response?.data
        return attendance
      },
      providesTags: () => [
        { type: "ATTENDANCE", id: "LIST_OF_DAILY_ATTENDANCE" },
      ],
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        dispatch(showLoading())
        try {
          const { data } = await queryFulfilled

          console.log(
            "LOGG DATA ON QUERYSTARTED GET ALL DAILY_ATTENDANCE: ",
            data?.attendance,
          )

          dispatch(setAttendance(data?.attendance))
        } catch (error) {
          console.log(
            "LOGG ERROR ON QUERYSTARTED GET ALL DAILY_ATTENDANCE: ",
            error,
          )
        }
        dispatch(hideLoading())
      },
    }),

    createManyAttendance: builder.mutation({
      query: (args) => {
        return {
          url: `attendances/class/${args?.classId}/date/${args?.date}`,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: {
            studentAttendances: args?.studentAttendances,
          },
        }
      },
      invalidatesTags: [
        { type: "ATTENDANCE", id: "LIST_OF_WEEKLY_ATTENDANCE" },
        { type: "ATTENDANCE", id: "LIST_OF_DAILY_ATTENDANCE" },
      ],
    }),
  }),
})

export const {
  useGetWeeklyAttendanceQuery,
  useGetDailyAttendanceQuery,
  useCreateManyAttendanceMutation,
} = attendanceApi
