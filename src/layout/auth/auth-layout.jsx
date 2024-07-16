import TopLoadingBar from "@/components/common/top-loading-bar"
import { Outlet } from "react-router-dom"

export default function AuthLayout() {
  return (
    <>
      <TopLoadingBar />
      <Outlet />
    </>
  )
}
