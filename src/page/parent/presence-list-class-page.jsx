import ParentListClassTable from "@/components/table/parent/list-class"
import { Input } from "@/components/ui/input"
import useInput from "@/hook/useInput"
import { useFindClassByStudentIdQuery } from "@/store/api/class-api"
import { getUser } from "@/store/slice/user-slice"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"

const initialStudentSearch = {
  name: "",
}

export default function ParentPresenceListClassPage() {
  const { studentId } = useParams()
  const user = useSelector(getUser)

  const { values: searchStudentValue, onChange: onChangeSearchStudent } =
    useInput(initialStudentSearch)

  const {
    data: classesByStudent,
    isLoading: isLoadingGetClassesByStudent,
    isSuccess: isSuccessGetClassesByStudent,
  } = useFindClassByStudentIdQuery({
    studentId,
  })

  return (
    <>
      <div className=" flex justify-between">
        <h1 className="text-fs24_36 font-semibold text-color-1">
          {" "}
          Pilih Kelas Anak Anda
        </h1>
      </div>
      <div className="flex flex-col gap-y-3 ">
        <div>
          <h1 className="pb-5  font-medium text-fs24_36">
            Orang Tua : {user?.name}
          </h1>
          <h1 className="pb-5  font-medium text-fs20_30">
            Anak :{" "}
            {classesByStudent?.student?.name
              ? classesByStudent?.student?.name
              : "Belum dimasukan!"}
          </h1>
        </div>
        <div className="flex justify-end items-center">
          <div className="max-w-[224px] ">
            <Input
              placeholder="Cari Kelas..."
              name="name"
              onChange={onChangeSearchStudent}
              value={searchStudentValue.name}
            />
          </div>
        </div>
        <ParentListClassTable
          isLoadingGetClasses={isLoadingGetClassesByStudent}
          isSuccessGetClasses={isSuccessGetClassesByStudent}
          classes={classesByStudent?.classes}
          studentId={studentId}
        />
      </div>
    </>
  )
}
