import { IconButton } from "@/components/common/icon-button"
import AdminAddStudentToClassDialog from "@/components/dialog/admin/add-student-to-class-dialog"
import AdminDeleteStudentFromClassDialog from "@/components/dialog/admin/delete-student-from-clas-dialog"
import AdminStudentListByClassTable from "@/components/table/admin/list-student-class"
import { Input } from "@/components/ui/input"
import useDialog from "@/hook/useDialog"
import useInput from "@/hook/useInput"
import { useFindStudentInsideClassQuery } from "@/store/api/student-api"
import { useMemo, useState } from "react"
import { FaPrint } from "react-icons/fa6"
import { IoMdAdd } from "react-icons/io"
import { useParams } from "react-router-dom"

const initialStudentSearchInput = {
  name: "",
}

export default function AdminDetailClassPage() {
  const { classId } = useParams()
  const [choosedStudent, setChoosedStudent] = useState(null)

  const { isOpenDialog: isOpenAddStudentToClassDialog, onOpenDialog: onOpenAddStudentToClassDialog } =
    useDialog()
  const {
    isOpenDialog: isOpenDeleteStudentFromClassDialog,
    onOpenDialog: onOpenDeleteStudentFromClassDialog,
  } = useDialog()

  const { values: searchStudentByClassValue, onChange: onChangeStudentByClass } =
    useInput(initialStudentSearchInput)

  const {
    data: studentInsideClass,
    isLoading: isLoadingGetStudentInsideClass,
    isSuccess: isSuccessGetStudentInsideClass,
  } = useFindStudentInsideClassQuery({
    classId: classId,
  })

  const filteredStudentInsideClass = useMemo(() => {
    if (isSuccessGetStudentInsideClass) {
      return studentInsideClass?.students.filter((student) => {
        return student?.name?.toLowerCase().includes(searchStudentByClassValue?.name?.toLowerCase())
      })
    }

    return []
  }, [isSuccessGetStudentInsideClass, searchStudentByClassValue.name, studentInsideClass])

  const onHandleDeleteStudentFormClass = async (student) => {
    setChoosedStudent(student)
    onOpenDeleteStudentFromClassDialog(true)
  }

  return (
    <>
      <div className=" flex justify-between">
        <h1 className="text-fs24_36 font-semibold text-color-1">
          Detail Kelas {isSuccessGetStudentInsideClass ? studentInsideClass?.class?.name : "-"}
        </h1>
      </div>
      <div className="flex flex-col gap-y-3">
        <h1 className="pb-5  font-medium text-fs24_36">
          Guru : {isSuccessGetStudentInsideClass ? studentInsideClass?.class?.teacher?.name : "-"}
        </h1>
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-x-2">
              <IconButton
                isDisabled={isLoadingGetStudentInsideClass}
                onClick={() => {}}
                name="Cetak Data"
                className="bg-color-1 font-medium w-[170px] gap-x-3 h-[45px] text-white hover:bg-white hover:text-color-1"
                iconClassName="text-white group-hover:text-color-1"
                Icon={FaPrint}
              />
              <IconButton
                isDisabled={isLoadingGetStudentInsideClass}
                name="Tambah Siswa"
                className="bg-color-1 font-medium w-[170px] h-[45px] text-white hover:bg-white hover:text-color-1"
                iconClassName="text-white group-hover:text-color-1"
                onClick={() => onOpenAddStudentToClassDialog(true)}
                Icon={IoMdAdd}
              />
            </div>
            <div className="max-w-[224px] ">
              <Input
                className="h-[45px]"
                placeholder="Cari Siswa..."
                name="name"
                onChange={onChangeStudentByClass}
                value={searchStudentByClassValue.name}
              />
            </div>
          </div>
          <AdminStudentListByClassTable
            isLoadingGetStudents={isLoadingGetStudentInsideClass}
            isSuccessGetStudents={isSuccessGetStudentInsideClass}
            students={filteredStudentInsideClass}
            onDeleteStudent={onHandleDeleteStudentFormClass}
          />
        </div>
        <AdminAddStudentToClassDialog
          onOpenChange={onOpenAddStudentToClassDialog}
          open={isOpenAddStudentToClassDialog}
          classes={studentInsideClass?.class}
        />

        <AdminDeleteStudentFromClassDialog
          onClose={() => setChoosedStudent(null)}
          onOpenChange={onOpenDeleteStudentFromClassDialog}
          open={isOpenDeleteStudentFromClassDialog}
          student={choosedStudent}
          classes={studentInsideClass?.class}
        />
      </div>
    </>
  )
}
