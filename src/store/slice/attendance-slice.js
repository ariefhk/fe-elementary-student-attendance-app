import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  attedance: [],
  updateAttendance: [],
}

export const attendanceSlice = createSlice({
  initialState,
  name: "attendance-slice",
  reducers: {
    clearAttendance: (state) => {
      state.attedance = []
    },

    clearUpdateAttendance: (state) => {
      state.updateAttendance = []
    },
    setAttendance: (state, action) => {
      state.attedance = action.payload
    },

    setChangeAllStudentAttendanceStatus: (state, action) => {
      if (state.attedance.length > 0) {
        state.attedance = state.attedance.map((attd) => {
          return {
            ...attd,
            status: action.payload?.status,
          }
        })

        state.updateAttendance = state.attedance.map((attd) => {
          return {
            studentId: attd.student.id,
            status: action.payload?.status,
          }
        })
      }
    },

    setChangeStudentAttendanceStatus: (state, action) => {
      const attendanceObj = {
        studentId: action.payload.studentId,
        status: action.payload.status,
      }
      // Update the existing attendance
      const findStudent = state.attedance.find(
        (attd) => attd.student.id === attendanceObj.studentId,
      )

      if (findStudent) {
        const updatedStudent = {
          ...findStudent,
          status: attendanceObj.status,
        }
        state.attedance = state.attedance.map((attd) =>
          attd.student.id === attendanceObj.studentId ? updatedStudent : attd,
        )
      }

      // Update the attendance in updateAttendance
      const findStudentInUpdateAttendance = state.updateAttendance.find(
        (student) => student.studentId === attendanceObj.studentId,
      )
      if (findStudentInUpdateAttendance) {
        state.updateAttendance = state.updateAttendance.map((student) =>
          student.studentId === attendanceObj.studentId
            ? attendanceObj
            : student,
        )
      } else {
        state.updateAttendance = [...state.updateAttendance, attendanceObj]
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  setAttendance,
  setChangeStudentAttendanceStatus,
  setChangeAllStudentAttendanceStatus,
  clearAttendance,
  clearUpdateAttendance,
} = attendanceSlice.actions

// getter func
export const getAttendance = (state) => state.attendance.attedance
export const getUpdateAttendance = (state) => state.attendance.updateAttendance

export default attendanceSlice.reducer
