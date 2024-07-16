import PropTypes from "prop-types"
import { Separator } from "../ui/separator"

export default function ProfileCard({
  user = {
    name: "Budiman",
    nip: "",
    email: "budi@gmail.com",
    phoneNumber: "092121",
  },
}) {
  return (
    <div className=" border px-[60px] flex flex-col items-center  py-8 shadow-lg  rounded-[10px] max-w-[1000px] gap-y-3">
      <h1 className="text-txt24_36 text-color-6 font-semibold">Data Diri</h1>
      <div className="flex items-center gap-x-10  w-11/12">
        <img
          src="/images/user_placeholder.svg"
          alt="logo"
          className="flex-shrink-0 w-[200px] h-[200px] object-cover"
        />
        <div className="w-full space-y-5">
          <div>
            {user?.name && (
              <h1 className="text-txt24_36 text-color-6 font-semibold">
                Nama : <span>{user?.name || ""}</span>
              </h1>
            )}
            <Separator />
          </div>
          {user?.nip && (
            <h1 className="text-txt24_36 text-color-6 font-semibold">
              NIP : <span>{user?.nip || ""}</span>
            </h1>
          )}
          {user?.email && (
            <h1 className="text-txt24_36 text-color-6 font-semibold">
              Email : <span>{user?.email || ""}</span>
            </h1>
          )}
          {user?.phoneNumber && (
            <h1 className="text-txt24_36 text-color-6 font-semibold">
              No Telp : <span>{user?.phoneNumber || ""}</span>
            </h1>
          )}
          {user?.gender && (
            <h1 className="text-txt24_36 text-color-6 font-semibold">
              Jenis Kelamin : <span>{user?.gender || ""}</span>
            </h1>
          )}
        </div>
      </div>
    </div>
  )
}

ProfileCard.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    nip: PropTypes.string,
    email: PropTypes.string,
    phoneNumber: PropTypes.string,
  }),
}
