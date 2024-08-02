import { IconButton } from "@/components/common/icon-button"
import AdminAddClassDialog from "@/components/dialog/admin/add-class-dialog"
import AdminDeleteClassDialog from "@/components/dialog/admin/delete-class-dialog"
import AdminDetailClassDialog from "@/components/dialog/admin/detail-class-dialog"
import AdminEditClassDialog from "@/components/dialog/admin/edit-class-dialog"
import AdminListClassTable from "@/components/table/admin/list-class"
import { Input } from "@/components/ui/input"
import useDialog from "@/hook/useDialog"
import useInput from "@/hook/useInput"
import { useFindAllClassQuery } from "@/store/api/class-api"
import { useState } from "react"
import { IoMdAdd } from "react-icons/io"

const initialClassSearchInput = {
  name: "",
}

export default function AdminListClassPage() {
  const [choosedClass, setChoosedClass] = useState(null)
  const { values: searchClassValue, onChange: onChangeClass } = useInput(initialClassSearchInput)

  const { isOpenDialog: isOpenAddClassDialog, onOpenDialog: onOpenAddClassDialog } = useDialog()

  const { isOpenDialog: isOpenDetailClassDialog, onOpenDialog: onOpenDetailClassDialog } = useDialog()

  const { isOpenDialog: isOpenEditClassDialog, onOpenDialog: onOpenEditClassDialog } = useDialog()

  const { isOpenDialog: isOpenDeleteClassDialog, onOpenDialog: onOpenDeleteClassDialog } = useDialog()

  const {
    data: classes,
    isLoading: isLoadingGetClasses,
    isSuccess: isSuccessGetClasses,
  } = useFindAllClassQuery({
    name: searchClassValue.name,
  })

  const onHandleEditClass = (classes) => {
    setChoosedClass(classes)
    onOpenEditClassDialog(true)
  }
  const onHandleDeleteClass = (classes) => {
    setChoosedClass(classes)
    onOpenDeleteClassDialog(true)
  }
  const onHandleDetailClass = (classes) => {
    setChoosedClass(classes)
    onOpenDetailClassDialog(true)
  }

  return (
    <>
      <div className=" flex justify-between">
        <h1 className="text-fs30_40 font-semibold text-color-1">Data Kelas</h1>
      </div>
      <div className="flex flex-col gap-y-8 ">
        <div className="flex justify-between items-center">
          <IconButton
            name="Tambah Kelas"
            className="bg-color-1 font-medium w-[170px] h-[45px] text-white hover:bg-white hover:text-color-1"
            iconClassName="text-white group-hover:text-color-1"
            onClick={() => onOpenAddClassDialog(true)}
            Icon={IoMdAdd}
          />
          <div className="max-w-[224px] ">
            <Input
              className="h-[45px]"
              placeholder="Cari Kelas..."
              name="name"
              onChange={onChangeClass}
              value={searchClassValue.name}
            />
          </div>
        </div>
        <AdminListClassTable
          classes={classes}
          isLoadingGetClasses={isLoadingGetClasses}
          isSuccessGetClasses={isSuccessGetClasses}
          onEditClass={onHandleEditClass}
          onDeleteClass={onHandleDeleteClass}
          onDetailClass={onHandleDetailClass}
        />
      </div>
      <AdminAddClassDialog
        onClose={() => setChoosedClass(null)}
        onOpenChange={onOpenAddClassDialog}
        open={isOpenAddClassDialog}
      />
      <AdminEditClassDialog
        onClose={() => setChoosedClass(null)}
        onOpenChange={onOpenEditClassDialog}
        open={isOpenEditClassDialog}
        classes={choosedClass}
      />
      <AdminDeleteClassDialog
        onClose={() => setChoosedClass(null)}
        onOpenChange={onOpenDeleteClassDialog}
        open={isOpenDeleteClassDialog}
        classes={choosedClass}
      />
      <AdminDetailClassDialog
        onClose={() => setChoosedClass(null)}
        onOpenChange={onOpenDetailClassDialog}
        open={isOpenDetailClassDialog}
        classes={choosedClass}
      />
    </>
  )
}
