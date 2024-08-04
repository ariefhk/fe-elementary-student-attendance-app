import { useLogoutUserMutation } from "@/store/api/user.api"
import { clearUser } from "@/store/slice/user-slice"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { IconButton } from "./icon-button"

export default function LogoutButton() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [logoutUser] = useLogoutUserMutation()

  async function onHandleLogoutUser() {
    try {
      await logoutUser().unwrap()
      dispatch(clearUser())
      navigate("/login", { replace: true })
    } catch (error) {
      console.log("LOGG ERROR ON LOGOUT USER: ", error)
      dispatch(clearUser())
      navigate("/login", { replace: true })
    }
  }

  return (
    <IconButton
      name="Logout"
      className="w-[100px] h-[40px] uppercase font-semibold "
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        onHandleLogoutUser()
      }}
    />
  )
}
