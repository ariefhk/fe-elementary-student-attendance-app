import TopLoadingBar from "@/components/common/top-loading-bar"
import { cn } from "@/lib/tailwind-utils"
import PropTypes from "prop-types"
import { Outlet } from "react-router-dom"

export default function ParentLayout({ className }) {
  return (
    <>
      <TopLoadingBar />
      <main className={cn(className)}>
        <Outlet />
      </main>
    </>
  )
}

ParentLayout.propTypes = {
  className: PropTypes.string,
}
