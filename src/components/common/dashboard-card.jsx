import { cn } from "@/lib/utils"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"

export default function DashboardCard({ className, icon, name, to }) {
  const Icon = icon

  return (
    <Link
      to={to}
      className={cn(
        "border p-5 flex-shrink-0  flex items-center gap-x-5 shadow-lg rounded-[10px] w-full cursor-pointer max-w-[200px]",
        className,
      )}>
      {
        <>
          <Icon className="w-10 h-10  text-white" />
          <span className="text-txt18_20">{name}</span>
        </>
      }
    </Link>
  )
}

DashboardCard.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.elementType.isRequired,
  name: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
}
