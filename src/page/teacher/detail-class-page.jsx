import { IconButton } from "@/components/common/icon-button"
import TeacherStudentListByClassTable from "@/components/table/teacher/list-student-class"
import { Input } from "@/components/ui/input"
import useInput from "@/hook/useInput"
import { useFindStudentInsideClassQuery } from "@/store/api/student-api"
import { getUser } from "@/store/slice/user-slice"
import { useMemo } from "react"
import { FaPrint } from "react-icons/fa6"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"

const initialStudentSearchInput = {
  name: "",
}

export default function TeacherDetailClassPage() {
  const user = useSelector(getUser)
  const { classId } = useParams()
  const { values: searchStudentByClassValue, onChange: onChangeStudentByClass } =
    useInput(initialStudentSearchInput)

  const {
    data: studentInsideClass,
    isLoading: isLoadingGetStudentInsideClass,
    isSuccess: isSuccessGetStudentInsideClass,
  } = useFindStudentInsideClassQuery({
    classId: classId,
  })

  const filteredStudent = useMemo(() => {
    if (isSuccessGetStudentInsideClass) {
      return studentInsideClass?.students?.filter((student) => {
        return student?.name.toLowerCase().includes(searchStudentByClassValue?.name?.toLowerCase())
      })
    }
    return []
  }, [searchStudentByClassValue, studentInsideClass, isSuccessGetStudentInsideClass])

  return (
    <>
      <div className=" flex justify-between">
        <h1 className="text-fs30_40 font-semibold text-color-1">
          Detail Kelas {isSuccessGetStudentInsideClass ? studentInsideClass?.name : "Loading..."}
        </h1>
      </div>
      <div className="flex flex-col gap-y-10">
        <div>
          <h1 className="pb-5  font-medium text-fs24_36">Guru : {user?.name}</h1>
          <h1 className="pb-5  font-medium text-fs20_30">
            NIP : {user?.nip ? user?.nip : "Belum dimasukan!"}
          </h1>
        </div>
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-2 ">
              <IconButton
                isDisabled={isLoadingGetStudentInsideClass}
                onClick={() => {}}
                name="Cetak Data"
                className="bg-color-1 font-medium w-[170px] gap-x-3 h-[45px] text-white hover:bg-white hover:text-color-1"
                iconClassName="text-white group-hover:text-color-1"
                Icon={FaPrint}
              />
            </div>
            <div className="max-w-[224px] ">
              <Input
                placeholder="Cari Siswa..."
                name="name"
                onChange={onChangeStudentByClass}
                value={searchStudentByClassValue.name}
              />
            </div>
          </div>
          <TeacherStudentListByClassTable
            isSuccessGetStudents={isSuccessGetStudentInsideClass}
            isLoadingGetStudents={isLoadingGetStudentInsideClass}
            students={filteredStudent}
          />
        </div>
      </div>
    </>
  )
}
