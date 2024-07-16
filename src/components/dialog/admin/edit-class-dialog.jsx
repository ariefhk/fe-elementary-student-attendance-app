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
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
// import { cn } from "@/lib/tailwind-utils"
import { cn } from "@/lib/utils"
import { useUpdateClassMutation } from "@/store/api/class-api"
import { useFindAllTeacherQuery } from "@/store/api/teacher-api"
// import { useGetAllTeacherQuery } from "@/store/api/teacher.api";
import { Check, ChevronsUpDown } from "lucide-react"
import PropTypes from "prop-types"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { BsArrowRepeat } from "react-icons/bs"
import Swal from "sweetalert2"

export default function AdminEditClassDialog({
  open = false,
  onOpenChange,
  classes,
  onClose,
}) {
  const [updateClass, { isLoading: isLoadingUpdateClass }] =
    useUpdateClassMutation()
  const [openTeacherList, setOpenTeacherList] = useState(false)

  const {
    data: teachers,
    isLoading: isLoadingGetTeachers,
    isSuccess: isSuccessGetTeachers,
  } = useFindAllTeacherQuery({
    name: "",
  })

  const form = useForm({
    reValidateMode: "onChange",
    mode: "onBlur",
    defaultValues: {
      name: "",
      teacherId: "",
    },
  })

  const isFormValueChanged = form.formState.isDirty

  useEffect(() => {
    form.reset({
      name: classes?.name ?? "",
      teacherId: classes?.teacher?.id ?? "",
    })
  }, [form, classes])

  async function onSubmit(values) {
    const updatedClassData = {
      classId: classes.id,
      name: values?.name ?? "",
      teacherId: values?.teacherId ?? "",
    }
    // console.log(updatedClassData)
    try {
      await updateClass(updatedClassData).unwrap()
      // console.log("RESULT UPDATE CLASS: ", result)
      form.reset()
      onOpenChange(false)
      Swal.fire({
        icon: "success",
        title: "Berhasil Edit Kelas!",
        text: "Selamat Anda berhasil mengedit kelas!",
        showConfirmButton: false,
        timer: 1500,
      })
    } catch (error) {
      console.log("ERROR UPDATE CLASS: ", error)
      Swal.fire({
        icon: "error",
        title: "Gagal Edit Kelas!",
        text: "Maaf, Anda gagal edit kelas!",
        showConfirmButton: false,
        timer: 1500,
      })
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="px-0 max-w-[600px] font-poppins">
        <AlertDialogDescription className="sr-only">
          This action is for edit classes.
        </AlertDialogDescription>
        <AlertDialogHeader className=" max-h-[400px] px-8 flex-col gap-y-0 items-center gap-x-16    ">
          <AlertDialogTitle className="space-y-5  flex flex-col items-center w-full">
            <span className="text-txt24_36 font-medium  text-color-6">
              Edit Data Kelas
            </span>
            <Separator />
          </AlertDialogTitle>
          <Form {...form}>
            <form
              id="edit-classes-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="overflow-auto  w-full px-2 py-2 space-y-6 text-start">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama</FormLabel>
                    <FormControl>
                      <Input placeholder="Masukan nama kelas" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="teacherId"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className=" font-light">Guru</FormLabel>
                    <Popover
                      open={openTeacherList}
                      onOpenChange={setOpenTeacherList}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={open}
                          className="w-full justify-between">
                          {isLoadingGetTeachers && "Sedang Memuat Guru..."}
                          {!isLoadingGetTeachers &&
                            (isSuccessGetTeachers && field?.value
                              ? teachers.find((sm) => sm.id === field?.value)
                                  ?.name
                              : "Pilih Guru...")}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height] p-0">
                        <Command>
                          <CommandInput placeholder="Cari Guru..." />
                          <CommandEmpty>Guru tidak ditemukan.</CommandEmpty>
                          <CommandList>
                            <CommandGroup>
                              {isLoadingGetTeachers && "Sedang Memuat Guru..."}
                              {isSuccessGetTeachers &&
                                !isLoadingGetTeachers &&
                                teachers.map((t, index) => {
                                  return (
                                    <CommandItem
                                      key={index + 1}
                                      value={t.name}
                                      onSelect={() => {
                                        form.setValue("teacherId", t.id, {
                                          shouldDirty: true,
                                        })
                                        setOpenTeacherList(false)
                                      }}>
                                      <Check
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          field?.value === t.id
                                            ? "opacity-100"
                                            : "opacity-0",
                                        )}
                                      />
                                      {t.name}
                                    </CommandItem>
                                  )
                                })}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
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
            disabled={isLoadingUpdateClass || !isFormValueChanged}
            form="edit-classes-form"
            type="submit"
            className="bg-color-5 hover:bg-color-5/60 text-white gap-x-2 flex items-center">
            {isLoadingUpdateClass && (
              <BsArrowRepeat className="animate-spin  w-5 h-5 flex-shrink-0" />
            )}
            Ubah
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

AdminEditClassDialog.propTypes = {
  open: PropTypes.bool,
  onOpenChange: PropTypes.func,
  classes: PropTypes.object,
  onClose: PropTypes.func,
}
