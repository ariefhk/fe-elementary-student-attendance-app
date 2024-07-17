import DashboardNavlink from "@/components/common/dashboard-navlink"
import LogoutButton from "@/components/common/logout-button"
import TopLoadingBar from "@/components/common/top-loading-bar"
import { teacherNavLink } from "@/constant/teacher-navlink"
import { Outlet } from "react-router-dom"

export default function TeacherLayout() {
  return (
    <>
      <TopLoadingBar />
      <div className="flex h-screen font-poppins flex-col md:flex-row md:overflow-hidden">
        <div className="w-full flex-none md:w-64 h-full hidden md:block ">
          <DashboardNavlink dashLinks={teacherNavLink} />
        </div>
        <div className="flex-grow md:overflow-y-auto ">
          <div className="flex flex-col">
            <header className="flex h-14 sticky top-0 bg-color-1 z-20 items-center justify-end  gap-4 border-b-[1px] border-black/20  px-4 lg:h-[60px] lg:px-10">
              <LogoutButton />
            </header>
            <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-10  space-y-10">
              <Outlet />
            </main>
          </div>
        </div>
      </div>
    </>
  )
}
