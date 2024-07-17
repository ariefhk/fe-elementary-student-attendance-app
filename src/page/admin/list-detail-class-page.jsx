import AdminAddStudentToClassDialog from "@/components/dialog/admin/add-student-to-class-dialog"
import AdminDeleteStudentFromClassDialog from "@/components/dialog/admin/delete-student-from-clas-dialog"
import AdminStudentListByClassTable from "@/components/table/admin/list-student-class"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import useDialog from "@/hook/useDialog"
import useInput from "@/hook/useInput"
import {
  useFindStudentByClassIdQuery,
  useRemoveStudentFromClassMutation,
} from "@/store/api/student-api"
import { useState } from "react"
import { useParams } from "react-router-dom"

const initialStudentSearchInput = {
  name: "",
}

export default function AdminDetailClassPage() {
  const { classId } = useParams()
  const [choosedStudent, setChoosedStudent] = useState(null)

  const {
    isOpenDialog: isOpenAddStudentToClassDialog,
    onOpenDialog: onOpenAddStudentToClassDialog,
  } = useDialog()
  const {
    isOpenDialog: isOpenDeleteStudentFromClassDialog,
    onOpenDialog: onOpenDeleteStudentFromClassDialog,
  } = useDialog()

  const {
    values: searchStudentByClassValue,
    onChange: onChangeStudentByClass,
  } = useInput(initialStudentSearchInput)

  const {
    data: studentByClass,
    isLoading: isLoadingGetStudentByClass,
    isSuccess: isSuccessGetStudentByClass,
  } = useFindStudentByClassIdQuery({
    classId: classId,
    name: searchStudentByClassValue.name,
  })

  const onHandleDeleteStudentFormClass = async (student) => {
    setChoosedStudent(student)
    onOpenDeleteStudentFromClassDialog(true)
  }

  return (
    <>
      <div className=" flex justify-between">
        <h1 className="text-fs24_36 font-semibold text-color-1">
          Data Detail Kelas {studentByClass?.class?.name}
        </h1>
      </div>
      <div className="flex flex-col gap-y-3">
        <h1 className="pb-5  font-medium text-fs24_36">
          Guru : {studentByClass?.teacher?.name}
        </h1>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-x-2">
            <Button disabled={isLoadingGetStudentByClass} onClick={() => {}}>
              Cetak Data
            </Button>
            <Button
              disabled={isLoadingGetStudentByClass}
              onClick={() => onOpenAddStudentToClassDialog(true)}>
              Tambah Siswa
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
        <AdminStudentListByClassTable
          isLoadingGetStudents={isLoadingGetStudentByClass}
          isSuccessGetStudents={isSuccessGetStudentByClass}
          students={studentByClass?.students}
          onDeleteStudent={onHandleDeleteStudentFormClass}
        />
        <AdminAddStudentToClassDialog
          onOpenChange={onOpenAddStudentToClassDialog}
          open={isOpenAddStudentToClassDialog}
          classes={studentByClass?.class}
        />

        <AdminDeleteStudentFromClassDialog
          onClose={() => setChoosedStudent(null)}
          onOpenChange={onOpenDeleteStudentFromClassDialog}
          open={isOpenDeleteStudentFromClassDialog}
          student={choosedStudent}
          classId={classId}
        />
        {/* <AdminStudentListByClassTable
          students={students?.students}
          isLoadingGetStudents={isLoadingGetStudents}
          isSuccessGetStudents={isSuccessGetStudents}
          onDeleteStudent={onDeleteClass}
        />
        <AdminAddStudentToClassDialog
          onClose={() => setChoosedClass(null)}
          classes={students?.class}
          open={isOpenAddStudentToClassDialog}
          onOpenChange={setIsOpenAddStudentToClassDialog}
        />

        <AdminDeleteStudentToClassDialog
          onClose={() => setChoosedClass(null)}
          classes={choosedClass}
          open={isOpenDeleteClassDialog}
          onOpenChange={setIsOpenDeleteClassDialog}
        /> */}
        {/* <AdminEditClassDialog
          onOpenChange={setIsOpenEditClassDialog}
          onClose={() => setChoosedClass(null)}
          classes={choosedClass}
          open={isOpenEditClassDialog}
        />
        <AdminDeleteClassDialog
          classes={choosedClass}
          onClose={() => setChoosedClass(null)}
          open={isOpenDeleteClassDialog}
          onOpenChange={setIsOpenDeleteClassDialog}
        />
        <AdminAddClassDialog
          open={isOpenAddClassDialog}
          onOpenChange={setIsOpenAddClassDialog}
        /> */}
      </div>
    </>
  )
}
