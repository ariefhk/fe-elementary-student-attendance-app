import { IMG_PLACEHOLDER } from "@/constant/img-placeholder"
import { getImageURL } from "@/lib/getImageUrl"
import PropTypes from "prop-types"
import { Separator } from "../ui/separator"

export default function ProfileCard({ name, nip, profilePicture, email, phoneNumber, gender }) {
  return (
    <div className=" border px-[60px] flex flex-col items-center  py-8 shadow-lg  rounded-[10px] max-w-[1000px] gap-y-3">
      <h1 className="text-fs24_36 text-color-6 font-semibold">Data Diri</h1>
      <div className="flex items-center gap-x-10  w-11/12">
        <img
          src={profilePicture ? getImageURL(profilePicture) : IMG_PLACEHOLDER}
          alt="logo"
          className="flex-shrink-0 w-[200px] h-[200px] rounded-full object-cover"
        />
        <div className="w-full space-y-5">
          <div>
            {name && (
              <h1 className="text-fs18_20 text-color-6 font-semibold">
                Nama : <span>{name || "-"}</span>
              </h1>
            )}
            <Separator className="my-1" />
          </div>
          {nip && (
            <h1 className="text-fs18_20 text-color-6 font-semibold">
              NIP : <span>{nip || "-"}</span>
            </h1>
          )}
          {email && (
            <h1 className="text-fs18_20 text-color-6 font-semibold">
              Email : <span>{email || "-"}</span>
            </h1>
          )}
          {phoneNumber && (
            <h1 className="text-fs18_20 text-color-6 font-semibold">
              No Telp : <span>{phoneNumber || "-"}</span>
            </h1>
          )}
          {gender && (
            <h1 className="text-fs18_20 text-color-6 font-semibold">
              Jenis Kelamin : <span>{!gender ? "-" : gender === "P" ? "Perempuan" : "Laki-Laki"}</span>
            </h1>
          )}
        </div>
      </div>
    </div>
  )
}

ProfileCard.propTypes = {
  name: PropTypes.string,
  nip: PropTypes.string,
  profilePicture: PropTypes.string,
  email: PropTypes.string,
  phoneNumber: PropTypes,
  gender: PropTypes.string,
}
