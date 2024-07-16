import { hideLoading, showLoading } from "react-redux-loading-bar"
import { protectedApiEndpoint } from "./instance"

export const classApi = protectedApiEndpoint.injectEndpoints({
  endpoints: (builder) => ({
    findAllClass: builder.query({
      query: (args) => {
        return {
          url: `classes?name=${args.name}`,
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
      providesTags: (result) => {
        return result
          ? [
              ...result.map(({ id }) => ({ type: "CLASS", id })),
              { type: "CLASS", id: "LIST_OF_CLASS" },
            ]
          : [{ type: "CLASS", id: "LIST_OF_CLASS" }]
      },
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

    createClass: builder.mutation({
      query: (args) => ({
        url: `classes`,
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
      invalidatesTags: () => [{ type: "CLASS", id: "LIST_OF_CLASS" }],
    }),

    updateClass: builder.mutation({
      query: (args) => ({
        url: `classes/${args?.classId}`,
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
        { type: "STUDENT", id: "LIST_OF_STUDENT" },
      ],
    }),
    deleteClass: builder.mutation({
      query: (args) => ({
        url: `classes/${args?.classId}`,
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
        { type: "STUDENT", id: "LIST_OF_STUDENT" },
      ],
    }),
  }),
})

export const {
  useFindAllClassQuery,
  useCreateClassMutation,
  useUpdateClassMutation,
  useDeleteClassMutation,
} = classApi
