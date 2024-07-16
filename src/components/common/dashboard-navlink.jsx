import useIsSublinkActive from "@/hook/useIsSublinkActive"
import { cn } from "@/lib/utils"
import { getUser } from "@/store/slice/user-slice"
import PropTypes from "prop-types"
import { useState } from "react"
import { IoIosArrowDown } from "react-icons/io"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import DashboardNavlinkUser from "./dashboard-navlinkuser"

export default function DashboardNavlink({ dashLinks }) {
  const user = useSelector(getUser)
  const { checkIsLinkActive, pathname } = useIsSublinkActive()

  const [expandedDashLink, setExpandedDashLink] = useState({
    id: "",
  })

  const onExpandDashLink = (dashLink) => {
    setExpandedDashLink((prev) =>
      prev.id === dashLink.id
        ? { id: "" }
        : {
            id: dashLink.id,
          },
    )
  }
  return (
    <div className="hidden  font-poppins  h-full bg-white md:block">
      <div className="flex h-full max-h-screen flex-col ">
        <div>
          <div className="text-txt16_24 bg-color-1 text-white h-[60px] flex items-center pl-5 font-roboto">
            <h1 className="uppercase text-txt18_20">Presensi Siswa</h1>
          </div>
          <DashboardNavlinkUser
            className="border-r-[1px] border-black/20"
            name={user?.name}
          />
        </div>
        <div className="flex-1  overflow-y-auto py-5 border-r-[1px] border-black/20">
          <nav className="grid  gap-y-8 items-start  text-sm font-medium px-3">
            {dashLinks?.map((dashLink, index) => {
              const DashIcon = dashLink.icon
              if (dashLink.id === 1) {
                return (
                  <div key={index + 1} className="space-y-5 ">
                    <Link
                      onClick={() =>
                        dashLink.subLinks.length > 0
                          ? onExpandDashLink(dashLink)
                          : setExpandedDashLink({ id: "" })
                      }
                      to={dashLink.subLinks.length > 0 ? "#" : dashLink.href}
                      className={cn(
                        "flex items-center rounded-[6px] px-2 justify-between group/item hover:bg-color-1  py-2 transition-all hover:text-primary ",
                        {
                          " bg-color-1": checkIsLinkActive(dashLink.href),
                        },
                      )}>
                      <div className="flex items-center gap-3 ">
                        <DashIcon
                          className={cn(
                            "w-8 h-8 flex-shrink-0 text-black group-hover/item:text-white",
                            {
                              " text-white": checkIsLinkActive(dashLink.href),
                            },
                            {
                              " text-white":
                                dashLink.subLinks.length > 0 &&
                                dashLink.subLinks.find(
                                  (sub) => sub.href === pathname,
                                ),
                            },
                          )}
                        />
                        <span
                          className={cn(
                            "block text-[16px] leading-[24px] group-hover/item:text-white text-black",
                            {
                              "text-white": checkIsLinkActive(dashLink.href),
                            },
                            {
                              "text-white":
                                dashLink.subLinks.length > 0 &&
                                dashLink.subLinks.find(
                                  (sub) => sub.href === pathname,
                                ),
                            },
                          )}>
                          {dashLink.name}
                        </span>
                      </div>
                    </Link>
                    <h1 className="text-color-6 text-txt14_20 ">Main Utama</h1>
                  </div>
                )
              } else {
                return (
                  <div key={index + 1}>
                    <Link
                      onClick={() =>
                        dashLink.subLinks.length > 0
                          ? onExpandDashLink(dashLink)
                          : setExpandedDashLink({ id: "" })
                      }
                      to={dashLink.subLinks.length > 0 ? "#" : dashLink.href}
                      className={cn(
                        "flex items-center rounded-[6px] px-2  justify-between  group/item hover:bg-color-1  py-2 transition-all hover:text-primary ",
                        {
                          " bg-color-1": checkIsLinkActive(dashLink.href),
                        },
                        {
                          "bg-color-1":
                            dashLink.subLinks.length > 0 &&
                            dashLink.subLinks.find(
                              (sub) => sub.href === pathname,
                            ),
                        },
                      )}>
                      <div className="flex items-center gap-3">
                        <DashIcon
                          className={cn(
                            "w-8 h-8 flex-shrink-0  text-black group-hover/item:text-white ",
                            {
                              "text-white": checkIsLinkActive(dashLink.href),
                            },
                            {
                              "   text-white":
                                dashLink.subLinks.length > 0 &&
                                dashLink.subLinks.find(
                                  (sub) => sub.href === pathname,
                                ),
                            },
                          )}
                        />
                        <span
                          className={cn(
                            "block text-[16px] leading-[24px] group-hover/item:text-white text-black",
                            {
                              "text-white": checkIsLinkActive(dashLink.href),
                            },
                            {
                              "text-white":
                                dashLink.subLinks.length > 0 &&
                                dashLink.subLinks.find(
                                  (sub) => sub.href === pathname,
                                ),
                            },
                          )}>
                          {dashLink.name}
                        </span>
                      </div>
                      {dashLink.subLinks.length > 0 && (
                        <IoIosArrowDown
                          className={cn(
                            "w-8 h-8 group-hover/item:text-white text-black transition duration-300",
                            {
                              "transform rotate-180 ":
                                dashLink.id === expandedDashLink.id,
                            },

                            {
                              "text-white": checkIsLinkActive(dashLink.href),
                            },
                            {
                              "text-white":
                                dashLink.subLinks.length > 0 &&
                                dashLink.subLinks.find(
                                  (sub) => sub.href === pathname,
                                ),
                            },
                          )}
                        />
                      )}
                    </Link>
                    <div className="space-y-5">
                      {dashLink.id === expandedDashLink.id &&
                        dashLink.subLinks.length > 0 &&
                        dashLink.subLinks.map((dashSubLink, index) => {
                          const DashSubIcon = dashSubLink.icon
                          return (
                            <Link
                              key={index + 1}
                              to={dashSubLink.href}
                              className={cn(
                                "flex items-center justify-between px-2 group/item hover:bg-color-1 rounded-[6px] ml-12  mt-3  py-2 transition-all hover:text-primary ",
                                {
                                  " bg-color-1": checkIsLinkActive(
                                    dashSubLink.href,
                                  ),
                                },
                              )}>
                              <div className="flex items-center gap-3">
                                <DashSubIcon
                                  className={cn(
                                    "w-6 h-6 flex-shrink-0   group-hover/item:text-white text-black",
                                    {
                                      "text-white": checkIsLinkActive(
                                        dashSubLink.href,
                                      ),
                                    },
                                  )}
                                />
                                <span
                                  className={cn(
                                    "block text-[16px] leading-[24px] group-hover/item:text-white text-black",
                                    {
                                      "text-white": checkIsLinkActive(
                                        dashSubLink.href,
                                      ),
                                    },
                                  )}>
                                  {dashSubLink.name}
                                </span>
                              </div>
                            </Link>
                          )
                        })}
                    </div>
                  </div>
                )
              }
            })}
          </nav>
        </div>
      </div>
    </div>
  )
}

DashboardNavlink.propTypes = {
  dashLinks: PropTypes.array.isRequired,
}
