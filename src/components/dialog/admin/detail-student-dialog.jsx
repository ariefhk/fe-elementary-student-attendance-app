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
import PropTypes from "prop-types"

export default function AdminDetailStudentDialog({ open = false, onOpenChange, student, onClose }) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="font-roboto px-0 max-w-[460px]">
        <AlertDialogDescription className="sr-only">
          This action cannot be undone. This will permanently delete your account and remove your data from
          our servers.
        </AlertDialogDescription>
        <AlertDialogHeader className="px-8">
          <AlertDialogTitle className="text-color-1 text-[24px] font-semibold text-center">
            Detail Siswa
          </AlertDialogTitle>
          <Separator />
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
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

AdminDetailStudentDialog.propTypes = {
  open: PropTypes.bool,
  onOpenChange: PropTypes.func,
  student: PropTypes.object,
  onClose: PropTypes.func,
}
