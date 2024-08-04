import { hideLoading, showLoading } from "react-redux-loading-bar"
import { protectedApiEndpoint } from "./instance"

export const parentApi = protectedApiEndpoint.injectEndpoints({
  endpoints: (builder) => ({
    findAllParent: builder.query({
      query: (args) => {
        return {
          url: `parent?name=${args?.name}`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      },
      transformResponse: (response) => {
        const parents = response?.data
        return parents
      },
      providesTags: () => [{ type: "PARENT", id: "LIST_OF_PARENT" }],
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        dispatch(showLoading())
        try {
          await queryFulfilled
        } catch (error) {
          console.log("LOGG ERROR ON QUERYSTARTED GET ALL PARENT: ", error)
        }
        dispatch(hideLoading())
      },
    }),
    createParent: builder.mutation({
      query: (args) => {
        const createParentFormData = new FormData()
        args?.email && createParentFormData.append("email", args.email)
        args?.password && createParentFormData.append("password", args.password)
        args?.profilePicture && createParentFormData.append("profilePicture", args.profilePicture)
        args?.gender && createParentFormData.append("gender", args.gender)
        args?.name && createParentFormData.append("name", args.name)
        args?.address && createParentFormData.append("address", args.address)
        return {
          url: `parent`,
          method: "POST",
          formData: true,
          body: createParentFormData,
        }
      },
      transformResponse: (response) => {
        const parent = response.data
        return parent
      },
      invalidatesTags: () => [{ type: "PARENT", id: "LIST_OF_PARENT" }],
    }),
    updateParent: builder.mutation({
      query: (args) => {
        const updateParentFormData = new FormData()
        args?.email && updateParentFormData.append("email", args.email)
        args?.password && updateParentFormData.append("password", args.password)
        args?.profilePicture && updateParentFormData.append("profilePicture", args.profilePicture)
        args?.gender && updateParentFormData.append("gender", args.gender)
        args?.name && updateParentFormData.append("name", args.name)
        args?.address && updateParentFormData.append("address", args.address)
        return {
          url: `parent/${args?.parentId}`,
          method: "PUT",
          formData: true,
          body: updateParentFormData,
        }
      },
      transformResponse: (response) => {
        const parent = response.data
        return parent
      },
      invalidatesTags: () => [{ type: "PARENT", id: "LIST_OF_PARENT" }],
    }),

    deleteParent: builder.mutation({
      query: (args) => ({
        url: `parent/${args?.parentId}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      transformResponse: () => {
        return true
      },
      invalidatesTags: () => [{ type: "PARENT", id: "LIST_OF_PARENT" }],
    }),
  }),
})

export const {
  useCreateParentMutation,
  useDeleteParentMutation,
  useFindAllParentQuery,
  useUpdateParentMutation,
} = parentApi
