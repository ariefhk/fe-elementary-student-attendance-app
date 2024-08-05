import ProfileCard from "@/components/common/profile-card"
import { getUser } from "@/store/slice/user-slice"
import { useSelector } from "react-redux"

export default function AdminProfilePage() {
  const user = useSelector(getUser)

  return (
    <>
      <div className=" flex justify-between">
        <h1 className="text-fs30_40 font-semibold text-color-1">Profile</h1>
      </div>
      <ProfileCard
        email={user?.email}
        gender={user?.gender}
        name={user?.name}
        phoneNumber={user?.no_telp}
        profilePicture={user?.profilePicture}
      />
    </>
  )
}
