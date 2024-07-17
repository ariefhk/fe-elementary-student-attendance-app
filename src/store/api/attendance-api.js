import { hideLoading, showLoading } from "react-redux-loading-bar"
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
  }),
})

export const { useGetWeeklyAttendanceQuery } = attendanceApi
