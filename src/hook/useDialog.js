import { useState } from "react"

export default function useDialog() {
  const [isOpenDialog, setIsOpenDialog] = useState(false)

  const onOpenDialog = (state) => {
    setIsOpenDialog(state)
  }

  return {
    isOpenDialog,
    onOpenDialog,
  }
}
