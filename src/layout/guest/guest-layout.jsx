import TopLoadingBar from "@/components/common/top-loading-bar"
import { cn } from "@/lib/utils"
import PropTypes from "prop-types"

export default function GuestLayout({ children, className }) {
  return (
    <>
      <TopLoadingBar />
      <main className={cn(className)}>{children}</main>
    </>
  )
}

GuestLayout.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
}
