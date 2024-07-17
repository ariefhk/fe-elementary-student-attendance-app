import TeacherListClassTable from "@/components/table/teacher/list-class"
import { useFindClassByTeacherIdQuery } from "@/store/api/class-api"
import { getUser } from "@/store/slice/user-slice"
import { useSelector } from "react-redux"

export default function TeacherListClassPage() {
  const user = useSelector(getUser)

  const {
    data: teacherClassses,
    isLoading: isLoadingGetTeacherClasses,
    isSuccess: isSuccessGetTeacherClasses,
  } = useFindClassByTeacherIdQuery(
    { teacherId: user?.teacherId },
    {
      skip: !user?.teacherId,
    },
  )

  return (
    <>
      <div className=" flex justify-between">
        <h1 className="text-fs24_36 font-semibold text-color-1">
          Daftar Kelas Mengajar Anda
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
        <TeacherListClassTable
          isSuccessGetClasses={isSuccessGetTeacherClasses}
          isLoadingGetClasses={isLoadingGetTeacherClasses}
          classes={teacherClassses?.classes}
        />
      </div>
    </>
  )
}
