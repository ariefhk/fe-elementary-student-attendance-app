import { IconButton } from "@/components/common/icon-button"
import AdminAddParentDialog from "@/components/dialog/admin/add-parent-dialog"
import AdminDeleteParentDialog from "@/components/dialog/admin/delete-parent-dialog"
import AdminEditParentDialog from "@/components/dialog/admin/edit-parent-dialog"
import AdminListParentTable from "@/components/table/admin/list-parent"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import useDialog from "@/hook/useDialog"
import useInput from "@/hook/useInput"
import { useFindAllParentQuery } from "@/store/api/parent-api"
import { useState } from "react"
import { IoMdAdd } from "react-icons/io"

const initialParentSearch = {
  name: "",
}

export default function AdminListParentPage() {
  const [choosedParent, setChoosedParent] = useState(null)
  const { values: searchParentValue, onChange: onChangeSearchParent } =
    useInput(initialParentSearch)

  const {
    isOpenDialog: isOpenAddParentDialog,
    onOpenDialog: onOpenAddParentDialog,
  } = useDialog()

  const {
    isOpenDialog: isOpenEditParentDialog,
    onOpenDialog: onOpenEditParentDialog,
  } = useDialog()

  const {
    isOpenDialog: isOpenDeleteParentDialog,
    onOpenDialog: onOpenDeleteParentDialog,
  } = useDialog()

  const {
    data: parents,
    isLoading: isLoadingGetParents,
    isSuccess: isSuccessGetParents,
  } = useFindAllParentQuery({
    name: searchParentValue.name,
  })

  const onHandleEditParent = (parent) => {
    setChoosedParent(parent)
    onOpenEditParentDialog(true)
  }

  const onHandleDeleteParent = (parent) => {
    setChoosedParent(parent)
    onOpenDeleteParentDialog(true)
  }

  return (
    <>
      <div className=" flex justify-between">
        <h1 className="text-fs30_40 font-semibold text-color-1">
          Data Orang Tua
        </h1>
      </div>
      <div className="flex flex-col gap-y-8 ">
        <div className="flex justify-between items-center">
          <IconButton
            name="Tambah Orang Tua"
            className="bg-color-1 font-medium w-[200px] h-[45px] text-white hover:bg-white hover:text-color-1"
            iconClassName="text-white group-hover:text-color-1"
            onClick={() => onOpenAddParentDialog(true)}
            Icon={IoMdAdd}
          />
          <div className="max-w-[224px] ">
            <Input
              className="h-[45px]"
              placeholder="Cari Orang Tua..."
              name="name"
              onChange={onChangeSearchParent}
              value={searchParentValue.name}
            />
          </div>
        </div>
        <AdminListParentTable
          parents={parents}
          isLoadingGetParents={isLoadingGetParents}
          isSuccessGetParents={isSuccessGetParents}
          onEditParent={onHandleEditParent}
          onDeleteParent={onHandleDeleteParent}
        />
      </div>
      <AdminAddParentDialog
        onClose={() => setChoosedParent(null)}
        onOpenChange={onOpenAddParentDialog}
        open={isOpenAddParentDialog}
      />
      <AdminEditParentDialog
        onClose={() => setChoosedParent(null)}
        onOpenChange={onOpenEditParentDialog}
        open={isOpenEditParentDialog}
        parent={choosedParent}
      />
      <AdminDeleteParentDialog
        onClose={() => setChoosedParent(null)}
        onOpenChange={onOpenDeleteParentDialog}
        open={isOpenDeleteParentDialog}
        parent={choosedParent}
      />
    </>
  )
}
