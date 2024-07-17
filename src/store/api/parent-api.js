import { hideLoading, showLoading } from "react-redux-loading-bar"
import { protectedApiEndpoint } from "./instance"

export const parentApi = protectedApiEndpoint.injectEndpoints({
  endpoints: (builder) => ({
    findAllParent: builder.query({
      query: (args) => {
        return {
          url: `parents?name=${args?.name}`,
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
      providesTags: (result) => {
        return result
          ? [
              ...result.map(({ id }) => ({ type: "PARENT", id })),
              { type: "PARENT", id: "LIST_OF_PARENT" },
            ]
          : [{ type: "PARENT", id: "LIST_OF_PARENT" }]
      },
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
      query: (args) => ({
        url: `parents`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          name: args?.name,
          email: args?.email,
          password: args?.password,
          photo: args?.photo,
          address: args?.address,
        },
      }),
      transformResponse: (response) => {
        const parent = response.data
        return parent
      },
      invalidatesTags: () => [{ type: "PARENT", id: "LIST_OF_PARENT" }],
    }),
    updateParent: builder.mutation({
      query: (args) => ({
        url: `parents/${args?.parentId}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          name: args?.name,
          email: args?.email,
          password: args?.password,
          photo: args?.photo,
          address: args?.address,
        },
      }),
      transformResponse: (response) => {
        const parent = response.data
        return parent
      },
      invalidatesTags: () => [{ type: "PARENT", id: "LIST_OF_PARENT" }],
    }),

    deleteParent: builder.mutation({
      query: (args) => ({
        url: `parents/${args?.parentId}`,
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
