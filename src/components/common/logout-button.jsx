// import { clearUser } from "@/store/slices/user.slice"
import { clearUser } from "@/store/slice/user-slice"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Button } from "../ui/button"

export default function LogoutButton() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  return (
    <Button
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        dispatch(clearUser())
        navigate("/login", { replace: true })
      }}>
      Logout
    </Button>
  )
}
