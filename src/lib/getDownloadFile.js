export class GetDownloadFile {
  static getDownloadStudentInsideClass({ classId }) {
    return import.meta.env?.VITE_BASE_API_URL + `/download/class/${classId}`
  }
  static getDownloadStudentWeeklyAttendance({ classId, studentId, year, month, week }) {
    return (
      import.meta.env?.VITE_BASE_API_URL +
      `/download/attendance/class/${classId}/weekly/student/${studentId}?year=${year}&month=${month}&week=${week}`
    )
  }
  static getDownloadWeeklyAttendance({ classId, year, month, week }) {
    return (
      import.meta.env?.VITE_BASE_API_URL +
      `/download/attendance/class/${classId}/weekly?year=${year}&month=${month}&week=${week}`
    )
  }
}
