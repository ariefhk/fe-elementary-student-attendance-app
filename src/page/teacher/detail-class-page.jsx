import TeacherStudentListByClassTable from "@/components/table/teacher/list-student-class"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import useInput from "@/hook/useInput"
import { useFindClassByIdQuery } from "@/store/api/class-api"
import { getUser } from "@/store/slice/user-slice"
import { useMemo } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"

const initialStudentSearchInput = {
  name: "",
}

export default function TeacherDetailClassPage() {
  const user = useSelector(getUser)
  const { classId } = useParams()
  const {
    values: searchStudentByClassValue,
    onChange: onChangeStudentByClass,
  } = useInput(initialStudentSearchInput)

  const {
    data: detailClasses,
    isLoading: isLoadingGetDetailClasses,
    isSuccess: isSuccessGetDetailClasses,
  } = useFindClassByIdQuery(
    { classId: classId },
    {
      skip: !classId,
    },
  )

  const filteredStudent = useMemo(() => {
    if (isSuccessGetDetailClasses) {
      return detailClasses?.students?.filter((student) => {
        return student?.name
          .toLowerCase()
          .includes(searchStudentByClassValue?.name?.toLowerCase())
      })
    }
    return []
  }, [searchStudentByClassValue, detailClasses, isSuccessGetDetailClasses])

  return (
    <>
      <div className=" flex justify-between">
        <h1 className="text-fs24_36 font-semibold text-color-1">
          Detail Kelas{" "}
          {isSuccessGetDetailClasses ? detailClasses?.name : "Loading..."}
        </h1>
      </div>
      <div className="flex flex-col gap-y-10">
        <div>
          <h1 className="pb-5  font-medium text-fs24_36">
            Guru : {user?.name}
          </h1>
          <h1 className="pb-5  font-medium text-fs20_30">
            NIP : {user?.nip ? user?.nip : "Belum dimasukan!"}
          </h1>
        </div>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-2 ">
              <Button disabled={isLoadingGetDetailClasses} onClick={() => {}}>
                Cetak Data
              </Button>
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
            isSuccessGetStudents={isSuccessGetDetailClasses}
            isLoadingGetStudents={isLoadingGetDetailClasses}
            students={filteredStudent}
          />
        </div>
      </div>
    </>
  )
}
