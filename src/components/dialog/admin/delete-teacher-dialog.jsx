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
import { useDeleteTeacherMutation } from "@/store/api/teacher-api"
import PropTypes from "prop-types"
import { BsArrowRepeat } from "react-icons/bs"
import Swal from "sweetalert2"

export default function AdminDeleteTeacherDialog({ open = false, onOpenChange, teacher, onClose }) {
  const [deleteTeacher, { isLoading: isLoadingDeleteTeacher }] = useDeleteTeacherMutation()

  async function onDeleteTeacher() {
    try {
      const deleteTeacherData = {
        teacherId: teacher.id,
      }
      await deleteTeacher(deleteTeacherData).unwrap()
      onOpenChange(false)
      Swal.fire({
        icon: "success",
        title: "Berhasil Hapus Guru!",
        text: "Selamat Anda berhasil menghapus guru!",
        showConfirmButton: false,
        timer: 1500,
      })
    } catch (error) {
      console.log("ERROR DELETE TEACHER: ", error)
      Swal.fire({
        icon: "error",
        title: "Gagal Hapus Guru!",
        text: error.message ?? "Maaf, Anda gagal menghapus guru!",
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
            Hapus Guru
          </AlertDialogTitle>
          <Separator />
          <div>
            <span className="font-bold">Apakah Anda yakin ingin menghapus Guru ?</span>
            <div className="mt-4 grid gap-2">
              <div className="flex justify-center py-2 items-center">
                <img
                  src={
                    teacher?.profilePicture
                      ? getImageURL(teacher?.profilePicture)
                      : IMAGE_PLACEHOLDER(120, 120)
                  }
                  alt="Profile"
                  className="w-[120px] h-[120px] flex-shrink-0 rounded-full object-cover"
                />
              </div>
              <div className="flex items-center text-sm justify-between">
                <span className="font-medium">NIP:</span>
                <span> {teacher?.nip || "-"}</span>
              </div>
              <div className="flex items-center text-sm justify-between">
                <span className="font-medium">Nama:</span>
                <span>{teacher?.name || "-"}</span>
              </div>
              <div className="flex items-center text-sm justify-between">
                <span className="font-medium">Email:</span>
                <span>{teacher?.email || "-"}</span>
              </div>
              <div className="flex flex-wrap text-sm items-start justify-between">
                <span className="font-medium">Alamat:</span>
                <span className="text-wrap">{teacher?.address || "-"}</span>
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
            disabled={isLoadingDeleteTeacher}
            onClick={async () => {
              await onDeleteTeacher()
            }}
            className="bg-color-4 text-white hover:text-white hover:bg-color-4/60 gap-x-2 flex items-center">
            {isLoadingDeleteTeacher && <BsArrowRepeat className="animate-spin  w-5 h-5 flex-shrink-0" />}{" "}
            Hapus
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

AdminDeleteTeacherDialog.propTypes = {
  open: PropTypes.bool,
  onOpenChange: PropTypes.func,
  teacher: PropTypes.object,
  onClose: PropTypes.func,
}
