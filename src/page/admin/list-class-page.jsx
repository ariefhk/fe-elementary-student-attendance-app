import AdminAddClassDialog from "@/components/dialog/admin/add-class-dialog"
import AdminDeleteClassDialog from "@/components/dialog/admin/delete-class-dialog"
import AdminEditClassDialog from "@/components/dialog/admin/edit-class-dialog"
import AdminListClassTable from "@/components/table/admin/list-class"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import useDialog from "@/hook/useDialog"
import useInput from "@/hook/useInput"
import { useFindAllClassQuery } from "@/store/api/class-api"
import { useState } from "react"

const initialClassSearchInput = {
  name: "",
}

export default function AdminListClassPage() {
  const [choosedClass, setChoosedClass] = useState(null)
  const { values: searchClassValue, onChange: onChangeClass } = useInput(
    initialClassSearchInput,
  )

  const {
    isOpenDialog: isOpenAddClassDialog,
    onOpenDialog: onOpenAddClassDialog,
  } = useDialog()

  const {
    isOpenDialog: isOpenEditClassDialog,
    onOpenDialog: onOpenEditClassDialog,
  } = useDialog()

  const {
    isOpenDialog: isOpenDeleteClassDialog,
    onOpenDialog: onOpenDeleteClassDialog,
  } = useDialog()

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

  return (
    <>
      <div className=" flex justify-between">
        <h1 className="text-fs24_36 font-semibold text-color-1">Data Kelas</h1>
      </div>
      <div className="flex flex-col gap-y-3 ">
        <div className="flex justify-between items-center">
          <Button onClick={() => onOpenAddClassDialog(true)}>
            Tambah Kelas
          </Button>
          <div className="max-w-[224px] ">
            <Input
              placeholder="Cari Orang Tua..."
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
    </>
  )
}
