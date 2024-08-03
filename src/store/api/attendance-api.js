import { hideLoading, showLoading } from "react-redux-loading-bar"
import { setAttendance } from "../slice/attendance-slice"
import { protectedApiEndpoint } from "./instance"

export const attendanceApi = protectedApiEndpoint.injectEndpoints({
  endpoints: (builder) => ({
    getWeeklyAttendance: builder.query({
      query: (args) => {
        return {
          url: `attendance/class/${args?.classId}/weekly?year=${args?.year}&month=${args?.month}&week=${args?.week}`,
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
      providesTags: () => [{ type: "ATTENDANCE", id: "LIST_OF_WEEKLY_ATTENDANCE" }],
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        dispatch(showLoading())
        try {
          await queryFulfilled
        } catch (error) {
          console.log("LOGG ERROR ON QUERYSTARTED GET ALL WEEKLY_ATTENDANCE: ", error)
        }
        dispatch(hideLoading())
      },
    }),

    getDailyAttendance: builder.query({
      query: (args) => {
        return {
          url: `attendance/class/${args?.classId}/daily?date=${args?.date}`,
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
      providesTags: () => [{ type: "ATTENDANCE", id: "LIST_OF_DAILY_ATTENDANCE" }],
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        dispatch(showLoading())
        try {
          const { data } = await queryFulfilled

          console.log("LOGG DATA ON QUERYSTARTED GET ALL DAILY_ATTENDANCE: ", data?.attendance)

          dispatch(setAttendance(data?.attendance))
        } catch (error) {
          console.log("LOGG ERROR ON QUERYSTARTED GET ALL DAILY_ATTENDANCE: ", error)
        }
        dispatch(hideLoading())
      },
    }),

    getStudentMonthlyAttendance: builder.query({
      query: (args) => {
        return {
          url: `attendance/class/${args?.classId}/monthly/student/${args?.studentId}?year=${args?.year}&month=${args?.month}`,
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
      providesTags: () => [{ type: "ATTENDANCE", id: "LIST_OF_STUDENT_MONTHLY_ATTENDANCE" }],
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        dispatch(showLoading())
        try {
          await queryFulfilled
        } catch (error) {
          console.log("LOGG ERROR ON QUERYSTARTED GET ALL WEEKLY_ATTENDANCE: ", error)
        }
        dispatch(hideLoading())
      },
    }),
    getStudentWeeklyAttendance: builder.query({
      query: (args) => {
        return {
          url: `attendance/class/${args?.classId}/weekly/student/${args?.studentId}?year=${args?.year}&month=${args?.month}&week=${args?.week}`,
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
      providesTags: () => [{ type: "ATTENDANCE", id: "LIST_OF_STUDENT_WEEKLY_ATTENDANCE" }],
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        dispatch(showLoading())
        try {
          await queryFulfilled
        } catch (error) {
          console.log("LOGG ERROR ON QUERYSTARTED GET ALL WEEKLY_ATTENDANCE: ", error)
        }
        dispatch(hideLoading())
      },
    }),

    createManyAttendance: builder.mutation({
      query: (args) => {
        return {
          url: `attendance/class/${args?.classId}/update-attendance`,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: {
            date: args?.date,
            studentAttendances: args?.studentAttendances,
          },
        }
      },
      invalidatesTags: [
        { type: "ATTENDANCE", id: "LIST_OF_WEEKLY_ATTENDANCE" },
        { type: "ATTENDANCE", id: "LIST_OF_DAILY_ATTENDANCE" },
        { type: "ATTENDANCE", id: "LIST_OF_STUDENT_MONTHLY_ATTENDANCE" },
        { type: "ATTENDANCE", id: "LIST_OF_STUDENT_WEEKLY_ATTENDANCE" },
      ],
    }),
  }),
})

export const {
  useGetStudentMonthlyAttendanceQuery,
  useGetStudentWeeklyAttendanceQuery,
  useGetWeeklyAttendanceQuery,
  useGetDailyAttendanceQuery,
  useCreateManyAttendanceMutation,
} = attendanceApi
