import { HiOutlineHome, HiOutlineUserCircle } from "react-icons/hi"
import { RiArchive2Line } from "react-icons/ri"

export const parentNavLink = [
  {
    id: 1,
    name: "Dashboard",
    icon: HiOutlineHome,
    href: "/parent",
    subLinks: [],
  },
  {
    id: 2,
    name: "Profile",
    icon: HiOutlineUserCircle,
    href: "/parent/profile",
    subLinks: [],
  },
  {
    id: 3,
    name: "Absensi",
    icon: RiArchive2Line,
    href: "/parent/presence",
    subLinks: [],
  },
]

export const sideParentNavLink = parentNavLink.map((dashLink) => {
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
