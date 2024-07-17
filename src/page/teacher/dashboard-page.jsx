import DashboardCard from "@/components/common/dashboard-card"
import DashboardHeader from "@/components/common/dashboard-header"
import { teacherDashboardIcons } from "@/constant/teacher-navlink"
import { getUser } from "@/store/slice/user-slice"
import { useSelector } from "react-redux"

export default function TeacherDashboardPage() {
  const user = useSelector(getUser)
  return (
    <>
      <div className="space-y-5">
        <h1 className="text-txt24_36 font-semibold text-color-1">
          Selamat Datang{" "}
          <span className="underline underline-offset-4">{user?.name}</span>!
          Anda Telah Login Sebagai Guru
        </h1>
        <DashboardHeader />
      </div>
      <div className="flex items-center gap-10 flex-wrap">
        {teacherDashboardIcons.map((icon) => (
          <DashboardCard
            key={icon.id}
            to={icon.href}
            icon={icon.icon}
            name={icon.name}
            className={icon.className}
          />
        ))}
      </div>
    </>
  )
}
