import { hideLoading, showLoading } from "react-redux-loading-bar"
import { protectedApiEndpoint } from "./instance"

export const userApi = protectedApiEndpoint.injectEndpoints({
  endpoints: (builder) => ({
    logoutUser: builder.mutation({
      query: () => ({
        url: `auth/logout`,
        method: "DELETE",
      }),
      transformResponse: (response) => {
        const logoutUser = response.data
        return logoutUser
      },
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        dispatch(showLoading())
        try {
          await queryFulfilled
        } catch (error) {
          console.log("LOGG ERROR ON LOGOUT USER: ", error)
        }
        dispatch(hideLoading())
      },
    }),
  }),
})

export const { useLogoutUserMutation } = userApi
