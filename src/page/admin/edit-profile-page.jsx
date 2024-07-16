import ButtonLink from "@/components/common/button-link"

export default function AdminEditProfilePage() {
  return (
    <>
      <div className=" flex justify-between">
        <h1 className="text-txt24_36 font-semibold text-color-1">
          Edit Profile
        </h1>
        <ButtonLink to="/admin/profile" name="Kembali" />
      </div>
      <span></span>
    </>
  )
}
