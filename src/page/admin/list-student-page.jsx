import { IconButton } from "@/components/common/icon-button"
import AdminAddStudentDialog from "@/components/dialog/admin/add-student-dialog"
import AdminDeleteStudentDialog from "@/components/dialog/admin/delete-student-dialog"
import AdminEditStudentDialog from "@/components/dialog/admin/edit-student-dialog"
import AdminListStudentTable from "@/components/table/admin/list-student"
import { Input } from "@/components/ui/input"
import useDialog from "@/hook/useDialog"
import useInput from "@/hook/useInput"
import { useFindAllStudentQuery } from "@/store/api/student-api"
import { useState } from "react"
import { IoMdAdd } from "react-icons/io"

const initialStudentSearch = {
  name: "",
}

export default function AdminListStudentPage() {
  const [choosedStudent, setChoosedStudent] = useState(null)
  const { values: searchStudentValue, onChange: onChangeSearchStudent } = useInput(initialStudentSearch)

  const { isOpenDialog: isOpenAddStudentDialog, onOpenDialog: onOpenAddStudentDialog } = useDialog()

  const { isOpenDialog: isOpenEditStudentDialog, onOpenDialog: onOpenEditStudentDialog } = useDialog()

  const { isOpenDialog: isOpenDeleteStudentDialog, onOpenDialog: onOpenDeleteStudentDialog } = useDialog()

  const {
    data: students,
    isLoading: isLoadingGetStudents,
    isSuccess: isSuccessGetStudents,
  } = useFindAllStudentQuery({
    name: searchStudentValue.name,
  })

  const onHandleEditStudent = (teacher) => {
    setChoosedStudent(teacher)
    onOpenEditStudentDialog(true)
  }

  const onHandleDeleteStudent = (teacher) => {
    setChoosedStudent(teacher)
    onOpenDeleteStudentDialog(true)
  }

  return (
    <>
      <div className=" flex justify-between">
        <h1 className="text-fs30_40 font-semibold text-color-1"> Data Murid</h1>
      </div>
      <div className="flex flex-col gap-y-8 ">
        <div className="flex justify-between items-center">
          <IconButton
            name="Tambah Murid"
            className="bg-color-1 font-medium w-[170px] h-[45px] text-white hover:bg-white hover:text-color-1"
            iconClassName="text-white group-hover:text-color-1"
            onClick={() => onOpenAddStudentDialog(true)}
            Icon={IoMdAdd}
          />
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
        <AdminListStudentTable
          onDeleteStudent={onHandleDeleteStudent}
          onEditStudent={onHandleEditStudent}
          isLoadingGetStudents={isLoadingGetStudents}
          isSuccessGetStudents={isSuccessGetStudents}
          students={students}
        />
      </div>
      <AdminAddStudentDialog
        onClose={() => setChoosedStudent(null)}
        onOpenChange={onOpenAddStudentDialog}
        open={isOpenAddStudentDialog}
      />
      <AdminEditStudentDialog
        onClose={() => setChoosedStudent(null)}
        onOpenChange={onOpenEditStudentDialog}
        open={isOpenEditStudentDialog}
        students={choosedStudent}
      />
      <AdminDeleteStudentDialog
        onClose={() => setChoosedStudent(null)}
        onOpenChange={onOpenDeleteStudentDialog}
        open={isOpenDeleteStudentDialog}
        student={choosedStudent}
      />
    </>
  )
}
