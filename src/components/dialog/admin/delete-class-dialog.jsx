import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useDeleteClassMutation } from "@/store/api/class-api"
import PropTypes from "prop-types"
import { BsArrowRepeat } from "react-icons/bs"
import Swal from "sweetalert2"

export default function AdminDeleteClassDialog({ open = false, onOpenChange, classes, onClose }) {
  const [deleteClass, { isLoading: isLoadingDeleteClass }] = useDeleteClassMutation()

  async function onDeleteParent() {
    try {
      const deleteClassData = {
        classId: classes.id,
      }
      await deleteClass(deleteClassData).unwrap()
      onOpenChange(false)
      Swal.fire({
        icon: "success",
        title: "Berhasil Hapus Kelas!",
        text: "Selamat Anda berhasil menghapus kelas!",
        showConfirmButton: false,
        timer: 1500,
      })
    } catch (error) {
      console.log("ERROR DELETE CLASS: ", error)
      Swal.fire({
        icon: "error",
        title: "Gagal Hapus Kelas!",
        text: error.message ?? "Maaf, Anda gagal menghapus kelas!",
        showConfirmButton: false,
        timer: 1500,
      })
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="font-roboto px-0 max-w-[460px]">
        <AlertDialogDescription className="sr-only">
          This action cannot be undone. This will permanently delete your account and remove your data from
          our servers.
        </AlertDialogDescription>
        <AlertDialogHeader className="px-8">
          <AlertDialogTitle className="text-color-1 text-[24px] font-semibold text-center">
            Hapus Kelas
          </AlertDialogTitle>
          <Separator />
          <div>
            <span className="font-bold">Apakah Anda yakin ingin menghapus Kelas ?</span>
            <div className="mt-4 grid gap-2">
              <div className="flex items-center text-sm justify-between">
                <span className="font-medium">Nama Kelas:</span>
                <span>{classes?.name || "-"}</span>
              </div>
              <div className="flex items-center text-sm justify-between">
                <span className="font-medium">Guru:</span>
                <span>{classes?.teacher?.name || "-"}</span>
              </div>
              <div className="flex flex-wrap text-sm items-start justify-between">
                <span className="font-medium">Jumlah Murid:</span>
                <span className="text-wrap">{classes?.studentCount || "-"}</span>
              </div>
            </div>
          </div>
        </AlertDialogHeader>
        <Separator />
        <AlertDialogFooter className="px-8">
          <AlertDialogCancel asChild>
            <Button
              type="button"
              onClick={() => {
                typeof onClose === "function" && onClose()
              }}
              className="bg-color-1 text-white hover:text-white hover:bg-color-1/60">
              Tutup
            </Button>
          </AlertDialogCancel>
          <Button
            disabled={isLoadingDeleteClass}
            onClick={async () => {
              await onDeleteParent()
            }}
            className="bg-color-4 text-white hover:text-white hover:bg-color-4/60 gap-x-2 flex items-center">
            {isLoadingDeleteClass && <BsArrowRepeat className="animate-spin  w-5 h-5 flex-shrink-0" />} Hapus
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

AdminDeleteClassDialog.propTypes = {
  open: PropTypes.bool,
  onOpenChange: PropTypes.func,
  classes: PropTypes.object,
  onClose: PropTypes.func,
}
