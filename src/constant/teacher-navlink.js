import { FaChalkboardTeacher, FaUserGraduate } from "react-icons/fa"
import { HiOutlineHome, HiOutlineUserCircle } from "react-icons/hi"
import { RiArchive2Line } from "react-icons/ri"

export const teacherDashboardIcons = [
  {
    id: 1,
    name: "Profile",
    className: "bg-color-2 hover:bg-color-2/60 text-white",
    icon: HiOutlineUserCircle,
    href: "/teacher/profile",
  },
  {
    id: 2,
    name: "User",
    className: "bg-color-3 hover:bg-color-3/60 text-white",
    icon: FaChalkboardTeacher,
    href: "/teacher/class/student",
  },
]

export const teacherNavLink = [
  {
    id: 1,
    name: "Dashboard",
    icon: HiOutlineHome,
    href: "/teacher",
    subLinks: [],
  },
  {
    id: 2,
    name: "Profile",
    icon: HiOutlineUserCircle,
    href: "/teacher/profile",
    subLinks: [],
  },
  {
    id: 6,
    name: "Kelas",
    icon: FaChalkboardTeacher,
    href: "/teacher/class",
    subLinks: [
      {
        id: 5,
        name: "Siswa",
        icon: FaUserGraduate,
        href: "/teacher/class/student",
      },
      {
        id: 5,
        name: "Absensi",
        icon: RiArchive2Line,
        href: "/teacher/class/presence",
      },
    ],
  },
]

export const sideTeacherNavLink = teacherNavLink.map((dashLink) => {
  if (dashLink.subLinks.length > 0) {
    return {
      ...dashLink,
      id: dashLink.id + 10,
      subLinks: dashLink.subLinks.map((subLink) => {
        return {
          ...subLink,
          id: subLink.id + 10,
        }
      }),
    }
  }

  return {
    ...dashLink,
    id: dashLink.id + 10,
  }
})
