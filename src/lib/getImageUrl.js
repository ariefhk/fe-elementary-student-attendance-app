export const getImageURL = (image) => {
  return import.meta.env?.VITE_BASE_URL + `/${image}`
}
