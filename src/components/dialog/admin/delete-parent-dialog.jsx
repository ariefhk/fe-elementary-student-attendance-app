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
import { IMAGE_PLACEHOLDER } from "@/hook/usePreviewImage"
import { getImageURL } from "@/lib/getImageUrl"
import { useDeleteParentMutation } from "@/store/api/parent-api"
import PropTypes from "prop-types"
import { BsArrowRepeat } from "react-icons/bs"
import Swal from "sweetalert2"

export default function AdminDeleteParentDialog({ open = false, onOpenChange, parent, onClose }) {
  const [deleteParent, { isLoading: isLoadingDeleteParent }] = useDeleteParentMutation()

  async function onDeleteParent() {
    try {
      const deleteParentData = {
        parentId: parent.id,
      }
      await deleteParent(deleteParentData).unwrap()
      onOpenChange(false)
      Swal.fire({
        icon: "success",
        title: "Berhasil Hapus Orang Tua!",
        text: "Selamat Anda berhasil menghapus orang tua!",
        showConfirmButton: false,
        timer: 1500,
      })
    } catch (error) {
      // console.log("ERROR DELETE PARENT: ", error)
      Swal.fire({
        icon: "error",
        title: "Gagal Hapus Orang Tua!",
        text: error.message ?? "Maaf, Anda gagal menghapus orang tua!",
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
            Hapus Orang Tua
          </AlertDialogTitle>
          <Separator />
          <div>
            <span className="font-bold">Apakah Anda yakin ingin menghapus Orang Tua ?</span>
            <div className="mt-4 grid gap-2">
              <div className="flex justify-center py-2 items-center">
                <img
                  src={
                    parent?.profilePicture ? getImageURL(parent.profilePicture) : IMAGE_PLACEHOLDER(120, 120)
                  }
                  alt="Profile"
                  className="w-[120px] h-[120px] flex-shrink-0 rounded-full object-cover"
                />
              </div>
              <div className="flex items-center text-sm justify-between">
                <span className="font-medium">Nama:</span>
                <span>{parent?.name || "-"}</span>
              </div>
              <div className="flex items-center text-sm justify-between">
                <span className="font-medium">Email:</span>
                <span>{parent?.email || "-"}</span>
              </div>
              <div className="flex flex-wrap text-sm items-start justify-between">
                <span className="font-medium">Alamat:</span>
                <span className="text-wrap">{parent?.address || "-"}</span>
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
            disabled={isLoadingDeleteParent}
            onClick={async () => {
              await onDeleteParent()
            }}
            className="bg-color-4 text-white hover:text-white hover:bg-color-4/60 gap-x-2 flex items-center">
            {isLoadingDeleteParent && <BsArrowRepeat className="animate-spin  w-5 h-5 flex-shrink-0" />} Hapus
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

AdminDeleteParentDialog.propTypes = {
  open: PropTypes.bool,
  onOpenChange: PropTypes.func,
  parent: PropTypes.object,
  onClose: PropTypes.func,
}
