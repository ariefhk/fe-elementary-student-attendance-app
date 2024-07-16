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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input, PasswordInput } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { useUpdateTeacherMutation } from "@/store/api/teacher-api"
// import { useUpdateTeacherMutation } from "@/store/api/teacher.api"
import PropTypes from "prop-types"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { BsArrowRepeat } from "react-icons/bs"
import Swal from "sweetalert2"

export default function AdminEditTeacherDialog({
  open = false,
  onOpenChange,
  teacher,
  onClose,
}) {
  const [updateTeacher, { isLoading: isLoadingUpdateTeacher }] =
    useUpdateTeacherMutation()

  const form = useForm({
    reValidateMode: "onChange",
    mode: "onBlur",
    defaultValues: {
      nip: "",
      name: "",
      address: "",
      email: "",
      password: "",
    },
  })

  const isFormValueChanged = form.formState.isDirty

  useEffect(() => {
    form.reset({
      nip: teacher?.nip ?? "",
      name: teacher?.name ?? "",
      email: teacher?.email ?? "",
      address: teacher?.address ?? "",
      password: "",
    })
  }, [form, teacher])

  async function onSubmit(values) {
    const updatedData = {
      teacherId: teacher.id,
      nip: values.nip,
      name: values.name,
      email: values.email,
      address: values.address,
      password: values.password,
    }
    // console.log(updatedData)
    try {
      await updateTeacher(updatedData).unwrap()

      // console.log("RESULT UPDATE TEACHER: ", result)
      form.reset()
      onOpenChange(false)
      Swal.fire({
        icon: "success",
        title: "Berhasil Edit Guru!",
        text: "Selamat Anda berhasil mengedit guru!",
        showConfirmButton: false,
        timer: 1500,
      })
    } catch (error) {
      // console.log("ERROR UPDATE TEACHER: ", error)
      Swal.fire({
        icon: "error",
        title: "Gagal Edit Guru!",
        text: "Maaf, Anda gagal edit guru!",
        showConfirmButton: false,
        timer: 1500,
      })
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="px-0 max-w-[600px] font-poppins">
        <AlertDialogDescription className="sr-only">
          This action is for edit teacher.
        </AlertDialogDescription>
        <AlertDialogHeader className=" max-h-[400px] px-8 flex-col gap-y-0 items-center gap-x-16    ">
          <AlertDialogTitle className="space-y-5  flex flex-col items-center w-full">
            <span className="text-txt24_36 font-medium  text-color-6">
              Edit Data Guru
            </span>
            <Separator />
          </AlertDialogTitle>
          <Form {...form}>
            <form
              id="edit-teacher-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="overflow-auto  w-full px-2 py-2 space-y-6 text-start">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Masukan email guru"
                        {...field}
                      />
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
                      <PasswordInput
                        placeholder="Masukan password terbaru jika ingin merubah"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="nip"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>NIP</FormLabel>
                    <FormControl>
                      <Input placeholder="Masukan NIP Guru" {...field} />
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
                      <Input placeholder="Masukan Nama Guru" {...field} />
                    </FormControl>
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
                typeof onClose === "function" && onClose()
              }}
              className="bg-color-4 text-white hover:text-white hover:bg-color-4/60">
              Tutup
            </Button>
          </AlertDialogCancel>
          <Button
            disabled={isLoadingUpdateTeacher || !isFormValueChanged}
            form="edit-teacher-form"
            type="submit"
            className="bg-color-5 hover:bg-color-5/60 text-white gap-x-2 flex items-center">
            {isLoadingUpdateTeacher && (
              <BsArrowRepeat className="animate-spin  w-5 h-5 flex-shrink-0" />
            )}
            Ubah
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

AdminEditTeacherDialog.propTypes = {
  open: PropTypes.bool,
  onOpenChange: PropTypes.func,
  teacher: PropTypes.object,
  onClose: PropTypes.func,
}
