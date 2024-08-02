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
import { useRemoveStudentFromClassMutation } from "@/store/api/student-api"
import PropTypes from "prop-types"
import { BsArrowRepeat } from "react-icons/bs"
import Swal from "sweetalert2"

export default function AdminDeleteStudentFromClassDialog({
  open = false,
  onOpenChange,
  classes,
  student,
  onClose,
}) {
  const [removeStudentFromClass, { isLoading: isLoadingRemoveStudentFromClass }] =
    useRemoveStudentFromClassMutation()

  async function onRemoveStudentFromClass() {
    try {
      const removeStudentFromClassData = {
        classId: classes?.id,
        studentId: student?.id,
      }
      await removeStudentFromClass(removeStudentFromClassData).unwrap()
      onOpenChange(false)
      Swal.fire({
        icon: "success",
        title: "Berhasil Hapus Siswa dari Kelas!",
        text: "Selamat Anda berhasil menghapus siswa dari kelas!",
        showConfirmButton: false,
        timer: 1500,
      })
    } catch (error) {
      console.log("ERROR DELETE CLASS: ", error)
      Swal.fire({
        icon: "error",
        title: "Gagal Hapus Siswa dari Kelas!",
        text: error.message ?? "Maaf, Anda gagal menghapus siswa dari kelas!",
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
            Hapus Siswa dari Kelas {classes?.name}
          </AlertDialogTitle>
          <Separator />
          <div>
            <span className="font-bold text-sm">
              Apakah Anda yakin ingin menghapus Siswa dari Kelas {classes?.name} ?
            </span>
            <div className="mt-4 grid gap-2">
              <div className="flex items-center text-sm justify-between">
                <span className="font-medium">NISN:</span>
                <span>{student?.nisn || "-"}</span>
              </div>
              <div className="flex items-center text-sm justify-between">
                <span className="font-medium">Nama:</span>
                <span>{student?.name || "-"}</span>
              </div>
              <div className="flex items-center text-sm justify-between">
                <span className="font-medium">Jenis Kelamin:</span>
                <span>{!student?.gender ? "-" : student.gender === "P" ? "Perempuan" : "Laki-Laki"}</span>
              </div>
              <div className="flex items-center text-sm justify-between">
                <span className="font-medium">Orang Tua:</span>
                <span>{student?.parent?.name || "-"}</span>
              </div>
            </div>
          </div>
        </AlertDialogHeader>
        <Separator />
        <AlertDialogFooter>
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
            disabled={isLoadingRemoveStudentFromClass}
            onClick={async () => {
              await onRemoveStudentFromClass()
            }}
            className="bg-color-4 text-white hover:text-white hover:bg-color-4/60 gap-x-2 flex items-center">
            {isLoadingRemoveStudentFromClass && (
              <BsArrowRepeat className="animate-spin  w-5 h-5 flex-shrink-0" />
            )}{" "}
            Hapus
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

AdminDeleteStudentFromClassDialog.propTypes = {
  open: PropTypes.bool,
  onOpenChange: PropTypes.func,
  classes: PropTypes.object,
  student: PropTypes.object,
  onClose: PropTypes.func,
}
