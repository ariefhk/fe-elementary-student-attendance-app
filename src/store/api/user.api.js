import { hideLoading, showLoading } from "react-redux-loading-bar"
import { setUser } from "../slice/user-slice"
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

    updateCurrentUser: builder.mutation({
      query: (args) => {
        const updateCurrentUserFormData = new FormData()
        args?.email && updateCurrentUserFormData.append("email", args.email)
        args?.password && updateCurrentUserFormData.append("password", args.password)
        args?.profilePicture && updateCurrentUserFormData.append("profilePicture", args.profilePicture)
        args?.gender && updateCurrentUserFormData.append("gender", args.gender)
        args?.name && updateCurrentUserFormData.append("name", args.name)
        args?.address && updateCurrentUserFormData.append("address", args.address)
        return {
          url: `auth/me/update`,
          method: "PUT",
          formData: true,
          body: updateCurrentUserFormData,
        }
      },
      transformResponse: (response) => {
        const updatedUser = response.data
        return updatedUser
      },
      async onQueryStarted(_args, { dispatch, getState, queryFulfilled }) {
        dispatch(showLoading())

        try {
          const { data: user } = await queryFulfilled
          const token = getState()?.user?.user?.token

          const updatedUser = {
            token: token,
            ...user,
          }

          dispatch(setUser(updatedUser))
        } catch (error) {
          console.log("LOGG ERROR ON QUERYSTARTED UPDATE USER: ", error)
        }
        dispatch(hideLoading())
      },
    }),
  }),
})

export const { useLogoutUserMutation, useUpdateCurrentUserMutation } = userApi
