import AuthLayout from "@/layout/auth/auth-layout"
import LoginPage from "@/page/auth/login-page"
import GuestNotFoundPage from "@/page/not-found/not-found-page"
import { Route, Routes } from "react-router-dom"

export default function AppRouter() {
  return (
    <Routes>
      <Route path="*" element={<GuestNotFoundPage />} />
      {/* Login */}
      <Route path="/login" element={<AuthLayout />}>
        <Route index element={<LoginPage />} />
      </Route>
      {/* Admin */}
      {/* <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboardPage />} />
        <Route path="profile" element={<AdminProfilePage />} />
        <Route path="profile/edit" element={<AdminEditProfilePage />} />
        <Route path="user/teacher" element={<AdminTeacherPage />} />
        <Route path="user/parent" element={<AdminParentPage />} />
        <Route path="student" element={<AdminStudentPage />} />
        <Route path="class" element={<AdminClassPage />} />
        <Route
          path="class/:classId/detail"
          element={<AdminClassDetailPage />}
        />
      </Route> */}
      {/* Admin */}
      {/* Teacher */}
      {/* <Route path="/teacher" element={<TeacherLayout />}>
        <Route index element={<TeacherDashboardPage />} />
        <Route path="profile" element={<TeacherProfilePage />} />
        <Route path="class/presence" element={<TeacherPresencePage />} />
        <Route
          path="class/presence/:classId/detail"
          element={<TeacherPresenceDetailPage />}
        />
        <Route path="class/student" element={<TeacherStudentPage />} />
        <Route
          path="class/student/:classId/detail"
          element={<TeacherStudentDetailPage />}
        />
      </Route> */}
      {/* Teacher */}
      {/* Parent */}
      {/* <Route path="/parent" element={<ParentLayout />}>
        <Route index element={<ParentDashboardPage />} />
        <Route path="profile" element={<ParentProfilePage />} />
        <Route path="presence" element={<ParentPresencePage />} />
      </Route> */}
      {/* Parent */}
    </Routes>
  )
}