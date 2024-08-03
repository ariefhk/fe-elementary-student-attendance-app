import TeacherListClassTable from "@/components/table/teacher/list-class"
import { useFindClassByTeacherIdQuery } from "@/store/api/class-api"
import { getUser } from "@/store/slice/user-slice"
import { useSelector } from "react-redux"

export default function TeacherListClassPage() {
  const user = useSelector(getUser)

  const {
    data: teacherClasses,
    isLoading: isLoadingGetTeacherClasses,
    isSuccess: isSuccessGetTeacherClasses,
  } = useFindClassByTeacherIdQuery(
    { teacherId: user?.id },
    {
      skip: !user?.id,
    },
  )

  return (
    <>
      <div className=" flex justify-between">
        <h1 className="text-fs30_40 font-semibold text-color-1">Daftar Kelas Anda</h1>
      </div>
      <div className="flex flex-col gap-y-10">
        <div>
          <h1 className="pb-5  font-medium text-fs24_36">Guru : {user?.name}</h1>
          <h1 className="pb-5  font-medium text-fs20_30">
            NIP : {user?.nip ? user?.nip : "Belum dimasukan!"}
          </h1>
        </div>
        <TeacherListClassTable
          isSuccessGetClasses={isSuccessGetTeacherClasses}
          isLoadingGetClasses={isLoadingGetTeacherClasses}
          classes={teacherClasses}
        />
      </div>
    </>
  )
}
