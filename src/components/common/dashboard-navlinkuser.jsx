import { cn } from "@/lib/utils"
import PropTypes from "prop-types"

export default function DashboardNavlinkUser({
  className,
  userImageUrl = "/images/user_placeholder.svg",
  name = "Vivi Nalia",
  email = "test@gmai.com",
}) {
  return (
    <div className={cn("px-5 flex  py-5 gap-x-3 items-center", className)}>
      <img src={userImageUrl} alt="" className="flex-shrink-0" />
      <div>
        <p className="font-medium text-fs16_20">{name}</p>
        <p className="text-fs12_20">{email}</p>
      </div>
    </div>
  )
}

DashboardNavlinkUser.propTypes = {
  className: PropTypes.string,
  userImageUrl: PropTypes.string,
  name: PropTypes.string,
  email: PropTypes.string,
}
