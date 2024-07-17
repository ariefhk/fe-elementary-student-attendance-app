import { LOCALSTORAGE } from "@/constant/localstorage-key"
import {
  deleteLocalStorageData,
  getLocalStorageData,
  saveLocalStorageData,
} from "@/lib/localstorage"
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  user: getLocalStorageData(LOCALSTORAGE.USER) || {
    name: null,
    role: null,
    token: null,
    teacherId: null,
    parentId: null,
  },
}

export const userSlice = createSlice({
  initialState,
  name: "user-slice",
  reducers: {
    clearUser: (state) => {
      state.user = null
      deleteLocalStorageData(LOCALSTORAGE.USER)
    },
    setUser: (state, action) => {
      state.user = action.payload
      saveLocalStorageData(LOCALSTORAGE.USER, action.payload)
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUser, clearUser } = userSlice.actions

// getter func
export const getUser = (state) => state.user.user

export default userSlice.reducer
