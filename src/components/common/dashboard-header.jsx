import { FaLocationDot } from "react-icons/fa6"

export default function DashboardHeader() {
  return (
    <div className=" border px-[60px] py-3 shadow-lg gap-x-3 flex items-center rounded-[10px] max-w-[1000px]">
      <img
        src="/images/anak_sekolah.svg"
        alt="logo"
        className="flex-shrink-0 object-cover"
      />
      <div className="space-y-3">
        <h1 className="text-txt18_20 text-wrap font-bold uppercase text-color-1">
          APLIKASI PRESENSI SISWA SDN 012 BENGKONG BATAM
        </h1>
        <h3 className="flex items-center text-wrap gap-x-2 text-txt14_20">
          <FaLocationDot className="flex-shrink-0  text-color-1 w-5 h-5" />
          Gg. Camar, Tj. Buntung, Kec. Bengkong, Kota Batam, Kepulauan Riau
          29444
        </h3>
      </div>
    </div>
  )
}
