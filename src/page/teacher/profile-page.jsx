import { IconButton } from "@/components/common/icon-button"
import ProfileCard from "@/components/common/profile-card"
import { getUser } from "@/store/slice/user-slice"
import { FaEdit } from "react-icons/fa"
import { useSelector } from "react-redux"

export default function TeacherProfilePage() {
  const user = useSelector(getUser)

  return (
    <>
      <div className=" flex justify-between">
        <h1 className="text-fs30_40 font-semibold text-color-1">Profile</h1>
        <IconButton
          className="h-11 px-5 w-[140px] gap-x-2  bg-color-1 text-white hover:bg-white"
          iconClassName="text-white group-hover:text-color-1 w-5 h-5"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
          }}
          name="Edit Profile"
          Icon={FaEdit}
        />
      </div>
      <ProfileCard
        email={user?.email}
        gender={user?.gender}
        name={user?.name}
        phoneNumber={user?.no_telp}
        profilePicture={user?.profilePicture}
        nip={user?.nip}
      />
    </>
  )
}
