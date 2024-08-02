import { clearUser } from "@/store/slice/user-slice"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { IconButton } from "./icon-button"

export default function LogoutButton() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  return (
    <IconButton
      name="Logout"
      className="w-[100px] h-[40px] uppercase font-semibold "
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        dispatch(clearUser())
        navigate("/login", { replace: true })
      }}
    />
  )
}
