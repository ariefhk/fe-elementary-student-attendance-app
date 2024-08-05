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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input, PasswordInput } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { GENDER } from "@/constant/gender"
import usePreviewImage, { IMAGE_PLACEHOLDER } from "@/hook/usePreviewImage"
import { getImageURL } from "@/lib/getImageUrl"
import { useUpdateCurrentUserMutation } from "@/store/api/user.api"
import { clearUser } from "@/store/slice/user-slice"
import PropTypes from "prop-types"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { BsArrowRepeat } from "react-icons/bs"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"

export default function EditProfileDialog({ open = false, onOpenChange, user, onClose }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [updateCurrentUser, { isLoading: isLoadingUpdateCurrentUser }] = useUpdateCurrentUserMutation()

  const {
    previewImage: previewProfilePicture,
    onSetPreviewImage: onSetPreviewProfilePicture,
    removePreviewImage: removePreviewProfilePicture,
  } = usePreviewImage(IMAGE_PLACEHOLDER(200, 200))

  const form = useForm({
    reValidateMode: "onChange",
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
      profilePicture: "",
      gender: "",
      name: "",
      address: "",
    },
  })

  const isFormValueChanged = form.formState.isDirty

  useEffect(() => {
    form.reset({
      email: user?.email ?? "",
      password: "",
      gender: user?.gender ?? "",
      name: user?.name ?? "",
      address: user?.address ?? "",
    })
    if (user?.profilePicture) {
      onSetPreviewProfilePicture(getImageURL(user.profilePicture))
    }
  }, [form, user, onSetPreviewProfilePicture])

  async function onSubmit(values) {
    const updatedUserData = {
      email: values.email,
      password: values.password,
      profilePicture: values.profilePicture,
      gender: values.gender,
      name: values.name,
      address: values.address,
    }
    // console.log(updatedUserData)
    try {
      await updateCurrentUser(updatedUserData).unwrap()
      // console.log("RESULT UPDATE PARENT: ", result)
      form.reset()
      onOpenChange(false)

      if (updatedUserData.email && updatedUserData.email !== user.email) {
        Swal.fire({
          icon: "info",
          title: "Email Berubah!",
          text: "Silahkan login kembali dengan email baru Anda!",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          dispatch(clearUser())
          navigate("/login", { replace: true })
        })
      }

      if (updatedUserData.password && updatedUserData.password !== user.password) {
        Swal.fire({
          icon: "info",
          title: "Password Berubah!",
          text: "Silahkan login kembali dengan password baru Anda!",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          dispatch(clearUser())
          navigate("/login", { replace: true })
        })
      }

      Swal.fire({
        icon: "success",
        title: "Berhasil Edit Profile!",
        text: "Selamat Anda berhasil mengedit profile!",
        showConfirmButton: false,
        timer: 1500,
      })
    } catch (error) {
      console.log("ERROR UPDATE PARENT: ", error)
      Swal.fire({
        icon: "error",
        title: "Gagal Edit Profile!",
        text: "Maaf, Anda gagal edit profile!",
        showConfirmButton: false,
        timer: 1500,
      })
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="px-0 max-w-[600px] font-poppins">
        <AlertDialogDescription className="hidden">This action is for edit profile.</AlertDialogDescription>
        <AlertDialogHeader className=" max-h-[400px] px-8 flex-col gap-y-0 items-center gap-x-16    ">
          <AlertDialogTitle className="space-y-5  flex flex-col items-center w-full">
            <span className="text-fs24_36 font-semibold  text-color-1">Edit Profile</span>
            <Separator />
          </AlertDialogTitle>
          <Form {...form}>
            <form
              id="edit-profile-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="overflow-auto  w-full px-2 py-2 space-y-6 text-start">
              {previewProfilePicture && (
                <div className="flex justify-center items-center">
                  <img
                    src={previewProfilePicture}
                    className="w-[200px] h-[200px] flex-shrink-0 rounded-full"
                  />
                </div>
              )}
              <FormField
                control={form.control}
                name="profilePicture"
                render={({ field: { value, onChange, ...field } }) => (
                  <FormItem>
                    <FormLabel>Foto Profile</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={value?.fileName}
                        onChange={(event) => {
                          const file = event?.target?.files[0]
                          if (!file) {
                            return
                          }
                          onSetPreviewProfilePicture(URL.createObjectURL(file))
                          onChange(file)
                        }}
                        type="file"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Masukan email orang tua" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <PasswordInput placeholder="Masukan password terbaru jika ingin merubah" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama</FormLabel>
                    <FormControl>
                      <Input placeholder="Masukan nama orang tua" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jenis Kelamin</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih Jenis Kelamin" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {GENDER.map((g, index) => {
                          return (
                            <SelectItem key={index + 1} value={g.value}>
                              {g.label}
                            </SelectItem>
                          )
                        })}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alamat</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Masukan Alamat Guru" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </AlertDialogHeader>
        <Separator />
        <AlertDialogFooter className=" px-8">
          <AlertDialogCancel asChild>
            <Button
              type="button"
              onClick={() => {
                form.reset()
                removePreviewProfilePicture()
                typeof onClose === "function" && onClose()
              }}
              className="bg-color-4 text-white hover:text-white hover:bg-color-4/60">
              Tutup
            </Button>
          </AlertDialogCancel>
          <Button
            disabled={isLoadingUpdateCurrentUser || !isFormValueChanged}
            form="edit-profile-form"
            type="submit"
            className="bg-color-5 hover:bg-color-5/60 text-white gap-x-2 flex items-center">
            {isLoadingUpdateCurrentUser && <BsArrowRepeat className="animate-spin  w-5 h-5 flex-shrink-0" />}
            Ubah
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

EditProfileDialog.propTypes = {
  open: PropTypes.bool,
  onOpenChange: PropTypes.func,
  parent: PropTypes.object,
  user: PropTypes.object,
  onClose: PropTypes.func,
}
