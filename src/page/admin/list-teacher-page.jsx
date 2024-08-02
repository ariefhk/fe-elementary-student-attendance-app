import { IconButton } from "@/components/common/icon-button"
import AdminAddTeacherDialog from "@/components/dialog/admin/add-teacher-dialog"
import AdminDeleteTeacherDialog from "@/components/dialog/admin/delete-teacher-dialog"
import AdminDetailTeacherDialog from "@/components/dialog/admin/detail-teacher-dialog"
import AdminEditTeacherDialog from "@/components/dialog/admin/edit-teacher-dialog"
import AdminListTeacherTable from "@/components/table/admin/list-teacher"
import { Input } from "@/components/ui/input"
import useDialog from "@/hook/useDialog"
import useInput from "@/hook/useInput"
import { useFindAllTeacherQuery } from "@/store/api/teacher-api"
import { useState } from "react"
import { IoMdAdd } from "react-icons/io"

const initialTeacherSearch = {
  name: "",
}

export default function AdminListTeacherPage() {
  const [choosedTeacher, setChoosedTeacher] = useState(null)
  const { values: searchTeacherValue, onChange: onChangeSearchTeacher } =
    useInput(initialTeacherSearch)

  const {
    isOpenDialog: isOpenAddTeacherDialog,
    onOpenDialog: onOpenAddTeacherDialog,
  } = useDialog()

  const {
    isOpenDialog: isOpenEditTeacherDialog,
    onOpenDialog: onOpenEditTeacherDialog,
  } = useDialog()
  const {
    isOpenDialog: isOpenDetailTeacherDialog,
    onOpenDialog: onOpenDetailTeacherDialog,
  } = useDialog()

  const {
    isOpenDialog: isOpenDeleteTeacherDialog,
    onOpenDialog: onOpenDeleteTeacherDialog,
  } = useDialog()

  const {
    data: teachers,
    isLoading: isLoadingGetTeachers,
    isSuccess: isSuccessGetTeachers,
  } = useFindAllTeacherQuery({
    name: searchTeacherValue.name,
  })

  const onHandleEditTeacher = (teacher) => {
    setChoosedTeacher(teacher)
    onOpenEditTeacherDialog(true)
  }

  const onHandleDeleteTeacher = (teacher) => {
    setChoosedTeacher(teacher)
    onOpenDeleteTeacherDialog(true)
  }
  const onHandleDetailTeacher = (teacher) => {
    setChoosedTeacher(teacher)
    onOpenDetailTeacherDialog(true)
  }

  return (
    <>
      <div className=" flex justify-between">
        <h1 className="text-fs30_40 font-semibold text-color-1"> Data Guru</h1>
      </div>
      <div className="flex flex-col gap-y-8">
        <div className="flex justify-between  items-center">
          <IconButton
            name="Tambah Guru"
            className="bg-color-1 font-medium w-[160px] h-[45px] text-white hover:bg-white hover:text-color-1"
            iconClassName="text-white group-hover:text-color-1"
            onClick={() => onOpenAddTeacherDialog(true)}
            Icon={IoMdAdd}
          />
          <div className="max-w-[224px] ">
            <Input
              className="h-[45px]"
              placeholder="Cari Guru..."
              name="name"
              onChange={onChangeSearchTeacher}
              value={searchTeacherValue.name}
            />
          </div>
        </div>
        <AdminListTeacherTable
          onDeleteTeacher={onHandleDeleteTeacher}
          onEditTeacher={onHandleEditTeacher}
          onDetailTeacher={onHandleDetailTeacher}
          isLoadingGetTeachers={isLoadingGetTeachers}
          isSuccessGetTeachers={isSuccessGetTeachers}
          teachers={teachers}
        />
      </div>
      <AdminAddTeacherDialog
        open={isOpenAddTeacherDialog}
        onOpenChange={onOpenAddTeacherDialog}
        onClose={() => setChoosedTeacher(null)}
      />
      <AdminDeleteTeacherDialog
        onClose={() => setChoosedTeacher(null)}
        onOpenChange={onOpenDeleteTeacherDialog}
        open={isOpenDeleteTeacherDialog}
        teacher={choosedTeacher}
      />
      <AdminEditTeacherDialog
        onClose={() => setChoosedTeacher(null)}
        onOpenChange={onOpenEditTeacherDialog}
        open={isOpenEditTeacherDialog}
        teacher={choosedTeacher}
      />
      <AdminDetailTeacherDialog
        onClose={() => setChoosedTeacher(null)}
        onOpenChange={onOpenDetailTeacherDialog}
        open={isOpenDetailTeacherDialog}
        teacher={choosedTeacher}
      />
    </>
  )
}
