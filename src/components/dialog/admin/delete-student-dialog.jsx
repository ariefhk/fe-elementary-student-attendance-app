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
import { useDeleteStudentMutation } from "@/store/api/student-api"
import PropTypes from "prop-types"
import { BsArrowRepeat } from "react-icons/bs"
import Swal from "sweetalert2"

export default function AdminDeleteStudentDialog({ open = false, onOpenChange, student, onClose }) {
  const [deleteStudent, { isLoading: isLoadingDeleteStudent }] = useDeleteStudentMutation()

  async function onDeleteStudent() {
    try {
      const deleteStudenttData = {
        studentId: student.id,
      }
      await deleteStudent(deleteStudenttData).unwrap()
      onOpenChange(false)
      Swal.fire({
        icon: "success",
        title: "Berhasil Hapus Siswa!",
        text: "Selamat Anda berhasil menghapus siswa!",
        showConfirmButton: false,
        timer: 1500,
      })
    } catch (error) {
      // console.log("ERROR DELETE PARENT: ", error)
      Swal.fire({
        icon: "error",
        title: "Gagal Hapus Siswa!",
        text: error.message ?? "Maaf, Anda gagal menghapus siswa!",
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
            Hapus Siswa
          </AlertDialogTitle>
          <Separator />
          <div>
            <span className="font-bold">Apakah Anda yakin ingin menghapus Siswa ?</span>
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
            disabled={isLoadingDeleteStudent}
            onClick={async () => {
              await onDeleteStudent()
            }}
            className="bg-color-4 text-white hover:text-white hover:bg-color-4/60 gap-x-2 flex items-center">
            {isLoadingDeleteStudent && <BsArrowRepeat className="animate-spin  w-5 h-5 flex-shrink-0" />}{" "}
            Hapus
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

AdminDeleteStudentDialog.propTypes = {
  open: PropTypes.bool,
  onOpenChange: PropTypes.func,
  student: PropTypes.object,
  onClose: PropTypes.func,
}
