import { useCallback, useState } from "react"

export const IMAGE_PLACEHOLDER = (width = 200, height = 200) =>
  `https://placehold.co/${width}x${height}`

export default function usePreviewImage(IMAGE_PLACEHOLDER = null) {
  const [previewImage, setPreviewImage] = useState(IMAGE_PLACEHOLDER)

  const onSetPreviewImage = useCallback((image) => {
    setPreviewImage(image)
  }, [])

  const removePreviewImage = useCallback(() => {
    setPreviewImage(IMAGE_PLACEHOLDER)
  }, [IMAGE_PLACEHOLDER])

  return {
    previewImage,
    onSetPreviewImage,
    removePreviewImage,
  }
}
