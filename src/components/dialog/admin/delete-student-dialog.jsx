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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useDeleteStudentMutation } from "@/store/api/student-api"
import PropTypes from "prop-types"
import { BsArrowRepeat } from "react-icons/bs"
import Swal from "sweetalert2"

export default function AdminDeleteStudentDialog({
  open = false,
  onOpenChange,
  student,
  onClose,
}) {
  const [deleteStudent, { isLoading: isLoadingDeleteStudent }] =
    useDeleteStudentMutation()

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
      <AlertDialogContent>
        <AlertDialogDescription className="sr-only">
          This action cannot be undone. This will permanently delete your
          account and remove your data from our servers.
        </AlertDialogDescription>
        <AlertDialogHeader className="space-y-5">
          <AlertDialogTitle className="text-txt20_30 text-wrap">
            Apakah Anda yakin hapus Siswa{" "}
            <span className="underline underline-offset-4">
              {student?.name}?
            </span>
          </AlertDialogTitle>
          <div className="w-full   max-h-[400px] overflow-y-auto">
            <Table className="">
              <TableHeader>
                <TableRow className="bg-color-1   hover:bg-color-1/80">
                  <TableHead className="w-[120px] text-white"></TableHead>
                  <TableHead className=" text-white text-[16px] leading-[24px]">
                    Keterangan
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="[&_tr:last-child]:border ">
                <TableRow className="border">
                  <TableCell className="font-medium text-txt16_24">
                    NISN
                  </TableCell>
                  <TableCell className="text-txt16_24">
                    {student?.nisn || "-"}
                  </TableCell>
                </TableRow>
                <TableRow className="border">
                  <TableCell className="font-medium text-txt16_24">
                    Nama
                  </TableCell>
                  <TableCell className="text-txt16_24">
                    {student?.name || "-"}
                  </TableCell>
                </TableRow>
                <TableRow className="border">
                  <TableCell className="font-medium text-txt16_24">
                    Jenis Kelamin
                  </TableCell>
                  <TableCell className="text-txt16_24">
                    {!student?.gender
                      ? "-"
                      : student.gender === "P"
                        ? "Perempuan"
                        : "Laki-Laki"}
                  </TableCell>
                </TableRow>
                <TableRow className="border">
                  <TableCell className="font-medium text-txt16_24">
                    Orang Tua
                  </TableCell>
                  <TableCell className="text-txt16_24">
                    {student?.parent?.name || "-"}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </AlertDialogHeader>
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
            disabled={isLoadingDeleteStudent}
            onClick={async () => {
              await onDeleteStudent()
            }}
            className="bg-color-4 text-white hover:text-white hover:bg-color-4/60 gap-x-2 flex items-center">
            {isLoadingDeleteStudent && (
              <BsArrowRepeat className="animate-spin  w-5 h-5 flex-shrink-0" />
            )}{" "}
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
