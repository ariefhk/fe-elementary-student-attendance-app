import ParentStudentListByClassTable from "@/components/table/parent/list-student-class"
import { Input } from "@/components/ui/input"
import useInput from "@/hook/useInput"
import { useFindClassByIdQuery } from "@/store/api/class-api"
import { useFindStudentInsideClassQuery } from "@/store/api/student-api"
import { getUser } from "@/store/slice/user-slice"
import { useMemo } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"

const initialStudentSearchInput = {
  name: "",
}

export default function ParentDetailClassPage() {
  const { classId, studentId } = useParams()
  const { values: searchStudentByClassValue, onChange: onChangeStudentByClass } =
    useInput(initialStudentSearchInput)

  const {
    data: studentInsideClass,
    isLoading: isLoadingGetStudentInsideClass,
    isSuccess: isSuccessGetStudentInsideClass,
  } = useFindStudentInsideClassQuery(
    {
      classId: classId,
    },
    {
      skip: !classId,
    },
  )

  const { data: classes, isSuccess: isSuccessGetClasses } = useFindClassByIdQuery(
    {
      classId: classId,
    },
    {
      skip: !classId,
    },
  )

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
          Detail Kelas {isSuccessGetClasses ? classes?.name : "Loading..."}
        </h1>
      </div>
      <div className="flex flex-col gap-y-10">
        <div className="space-y-3">
          <h1 className="  font-medium text-fs24_36">
            Guru : {isSuccessGetClasses ? classes?.teacher?.name : "Loading..."}
          </h1>
          <h1 className=" font-medium text-fs18_20">
            NIP : {isSuccessGetClasses ? classes?.teacher?.nip : "Belum dimasukan..."}
          </h1>
          <h1 className=" font-medium text-fs18_20">
            Jumlah Murid : {isSuccessGetClasses ? classes?.studentCount : "Belum ada murid..."}
          </h1>
        </div>
        <div className="space-y-8">
          <div className="flex items-center justify-end">
            <div className="max-w-[224px] ">
              <Input
                placeholder="Cari Siswa..."
                name="name"
                onChange={onChangeStudentByClass}
                value={searchStudentByClassValue.name}
              />
            </div>
          </div>
          <ParentStudentListByClassTable
            isSuccessGetStudents={isSuccessGetStudentInsideClass}
            isLoadingGetStudents={isLoadingGetStudentInsideClass}
            students={filteredStudent}
            currentStudentId={studentId}
          />
        </div>
      </div>
    </>
  )
}
