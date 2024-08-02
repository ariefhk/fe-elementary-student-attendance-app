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

export default function AdminDetailClassDialog({ open = false, onOpenChange, classes, onClose }) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="font-roboto px-0 max-w-[460px]">
        <AlertDialogDescription className="sr-only">
          This action cannot be undone. This will permanently delete your account and remove your data from
          our servers.
        </AlertDialogDescription>
        <AlertDialogHeader className="px-8">
          <AlertDialogTitle className="text-color-1 text-[24px] font-semibold text-center">
            Detail Kelas
          </AlertDialogTitle>
          <Separator />
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

AdminDetailClassDialog.propTypes = {
  open: PropTypes.bool,
  onOpenChange: PropTypes.func,
  classes: PropTypes.object,
  onClose: PropTypes.func,
}
