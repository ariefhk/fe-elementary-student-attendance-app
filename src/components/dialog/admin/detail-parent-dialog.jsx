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
import PropTypes from "prop-types"

export default function AdminDetailParentDialog({ open = false, onOpenChange, parent, onClose }) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="font-roboto px-0 max-w-[460px]">
        <AlertDialogDescription className="sr-only">
          This action cannot be undone. This will permanently delete your account and remove your data from
          our servers.
        </AlertDialogDescription>
        <AlertDialogHeader className="px-8">
          <AlertDialogTitle className="text-color-1 text-[24px] font-semibold text-center">
            Detail Orang Tua
          </AlertDialogTitle>
          <Separator />
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

AdminDetailParentDialog.propTypes = {
  open: PropTypes.bool,
  onOpenChange: PropTypes.func,
  parent: PropTypes.object,
  onClose: PropTypes.func,
}
