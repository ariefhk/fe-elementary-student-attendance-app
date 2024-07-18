import AdminLayout from "@/layout/admin/admin-layout"
import AuthLayout from "@/layout/auth/auth-layout"
import TeacherLayout from "@/layout/teacher/teacher-layout"
import AdminDashboardPage from "@/page/admin/dashboard-page"
import AdminDetailClassPage from "@/page/admin/detail-class-page"
import AdminEditProfilePage from "@/page/admin/edit-profile-page"
import AdminListClassPage from "@/page/admin/list-class-page"
import AdminListParentPage from "@/page/admin/list-parent-page"
import AdminListStudentPage from "@/page/admin/list-student-page"
import AdminListTeacherPage from "@/page/admin/list-teacher-page"
import AdminProfilePage from "@/page/admin/profile-page"
import LoginPage from "@/page/auth/login-page"
import GuestNotFoundPage from "@/page/not-found/not-found-page"
import TeacherClassPresencePage from "@/page/teacher/class-presence-page"
import TeacherCreatePresencePage from "@/page/teacher/create-presence-page"
import TeacherDashboardPage from "@/page/teacher/dashboard-page"
import TeacherDetailClassPage from "@/page/teacher/detail-class-page"
import TeacherListClassPage from "@/page/teacher/list-class-page"
import TeacherProfilePage from "@/page/teacher/profile-page"
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
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboardPage />} />
        <Route path="profile" element={<AdminProfilePage />} />
        <Route path="profile/edit" element={<AdminEditProfilePage />} />
        <Route path="user/teacher" element={<AdminListTeacherPage />} />
        <Route path="user/parent" element={<AdminListParentPage />} />
        <Route path="class" element={<AdminListClassPage />} />
        <Route
          path="class/:classId/detail"
          element={<AdminDetailClassPage />}
        />
        <Route path="student" element={<AdminListStudentPage />} />
      </Route>
      {/* Admin */}
      {/* Teacher */}
      <Route path="/teacher" element={<TeacherLayout />}>
        <Route index element={<TeacherDashboardPage />} />
        <Route path="profile" element={<TeacherProfilePage />} />
        <Route path="class" element={<TeacherListClassPage />} />
        <Route
          path="class/:classId/detail"
          element={<TeacherDetailClassPage />}
        />
        <Route
          path="class/:classId/detail"
          element={<TeacherDetailClassPage />}
        />
        <Route
          path="class/:classId/presence"
          element={<TeacherClassPresencePage />}
        />
        <Route
          path="class/:classId/presence/create"
          element={<TeacherCreatePresencePage />}
        />

        {/*
        <Route path="class/presence" element={<TeacherPresencePage />} />
        <Route
          path="class/presence/:classId/detail"
          element={<TeacherPresenceDetailPage />}
        />
        <Route path="class/student" element={<TeacherStudentPage />} />
        <Route
          path="class/student/:classId/detail"
          element={<TeacherStudentDetailPage />}
        /> */}
      </Route>
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
