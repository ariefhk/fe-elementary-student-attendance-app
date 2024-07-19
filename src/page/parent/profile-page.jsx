import ButtonLink from "@/components/common/button-link"
import ProfileCard from "@/components/common/profile-card"
import { getUser } from "@/store/slice/user-slice"
import { useSelector } from "react-redux"

export default function ParentProfilePage() {
  const user = useSelector(getUser)

  return (
    <>
      <div className=" flex justify-between">
        <h1 className="text-txt24_36 font-semibold text-color-1">Profile</h1>
        <ButtonLink to="/admin/profile/edit" name="Edit Profile" />
      </div>
      <ProfileCard user={user} />
    </>
  )
}
