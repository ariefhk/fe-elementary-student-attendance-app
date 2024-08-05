import { FaChalkboardTeacher, FaUser, FaUserGraduate, FaUsers } from "react-icons/fa"
import { HiOutlineHome, HiOutlineUserCircle } from "react-icons/hi"

export const adminDashboardIcons = [
  {
    id: 1,
    name: "Profile",
    className: "bg-color-2 hover:bg-color-2/60 text-white",
    icon: HiOutlineUserCircle,
    href: "/parent/profile",
  },
  {
    id: 2,
    name: "User",
    className: "bg-color-3 hover:bg-color-3/60 text-white",
    icon: FaChalkboardTeacher,
    href: "/parent/presence",
  },
]

export const adminNavLink = [
  {
    id: 1,
    name: "Dashboard",
    icon: HiOutlineHome,
    href: "/admin",
    subLinks: [],
  },
  {
    id: 2,
    name: "Profile",
    icon: HiOutlineUserCircle,
    href: "/admin/profile",
    subLinks: [],
  },
  {
    id: 3,
    name: "User",
    icon: FaUsers,
    href: "/admin/user",
    subLinks: [
      {
        id: 4,
        name: "Guru",
        icon: FaChalkboardTeacher,
        href: "/admin/user/teacher",
      },
      {
        id: 5,
        name: "Orang Tua",
        icon: FaUser,
        href: "/admin/user/parent",
      },
    ],
  },
  {
    id: 6,
    name: "Kelas",
    icon: FaChalkboardTeacher,
    href: "/admin/class",
    subLinks: [],
  },
  {
    id: 7,
    name: "Siswa",
    icon: FaUserGraduate,
    href: "/admin/student",
    subLinks: [],
  },
]

export const sideAdminNavLink = adminNavLink.map((dashLink) => {
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
