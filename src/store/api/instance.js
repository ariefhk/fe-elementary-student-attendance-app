import { LOCALSTORAGE } from "@/constant/localstorage-key"
import { getLocalStorageData } from "@/lib/localstorage"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

// Utility function to prepare headers
const prepareAuthHeaders = (headers) => {
  const token = getLocalStorageData(LOCALSTORAGE.USER)?.token
  if (token) {
    headers.set("Authorization", `Bearer ${token}`)
  }
  return headers
}

// public endpoint
export const apiEndpoint = createApi({
  reducerPath: "PUBLIC_ENDPOINT",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env?.VITE_BASE_API_URL,
  }),
  endpoints: () => ({}),
})

// protected endpoint with JWT
export const protectedApiEndpoint = createApi({
  reducerPath: "PROTECTED_ENDPOINT",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env?.VITE_BASE_API_URL,
    prepareHeaders: prepareAuthHeaders,
    tagTypes: ["AUTH", "USER", "TEACHER", "PARENT", "CLASS", "STUDENT", "ATTENDANCE"],
  }),
  endpoints: () => ({}),
})
