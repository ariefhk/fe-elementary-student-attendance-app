import ParentListStudentTable from "@/components/table/parent/list-student"
import { Input } from "@/components/ui/input"
import useInput from "@/hook/useInput"
import { useFindStudentByParentIdQuery } from "@/store/api/student-api"
import { getUser } from "@/store/slice/user-slice"
import { useSelector } from "react-redux"

const initialStudentSearch = {
  name: "",
}

export default function ParentPresencePage() {
  const user = useSelector(getUser)

  const { values: searchStudentValue, onChange: onChangeSearchStudent } = useInput(initialStudentSearch)

  const {
    data: studentByParent,
    isLoading: isLoadingGetStudentByParent,
    isSuccess: isSuccessGetStudentByParent,
  } = useFindStudentByParentIdQuery({
    parentId: user.id,
    name: searchStudentValue.name,
  })

  return (
    <>
      <div className=" flex justify-between">
        <h1 className="text-fs24_36 font-semibold text-color-1"> Data Absensi Anak Anda</h1>
      </div>
      <div className="space-y-8">
        <div className="flex flex-col gap-y-3 ">
          <div>
            <h1 className="pb-5  font-medium text-fs24_36">Orang Tua : {user?.name}</h1>
            <h1 className="pb-5  font-medium text-fs20_30">
              Jumlah Anak : {isSuccessGetStudentByParent ? studentByParent.length : "Belum dimasukan!"}
            </h1>
          </div>
          <div className="flex justify-end items-center">
            <div className="max-w-[224px] ">
              <Input
                className="h-[45px]"
                placeholder="Cari Murid..."
                name="name"
                onChange={onChangeSearchStudent}
                value={searchStudentValue.name}
              />
            </div>
          </div>
        </div>
        <ParentListStudentTable
          isLoadingGetStudents={isLoadingGetStudentByParent}
          isSuccessGetStudents={isSuccessGetStudentByParent}
          students={studentByParent}
        />
      </div>
    </>
  )
}
