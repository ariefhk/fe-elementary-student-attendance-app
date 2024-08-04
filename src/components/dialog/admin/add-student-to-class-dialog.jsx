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
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { useAddStudentToClassMutation } from "@/store/api/class-api"
import { useFindAllStudentQuery } from "@/store/api/student-api"
import { Check, ChevronsUpDown } from "lucide-react"
import PropTypes from "prop-types"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { BsArrowRepeat } from "react-icons/bs"
import Swal from "sweetalert2"

export default function AdminAddStudentToClassDialog({ open = false, onOpenChange, onClose, classes }) {
  const [addStudentToClass, { isLoading: isLoadingAddStudentToClass }] = useAddStudentToClassMutation()

  const [openStudentList, setOpenStudentList] = useState(false)

  const {
    data: students,
    isLoading: isLoadingGetStudents,
    isSuccess: isSuccessGetStudents,
  } = useFindAllStudentQuery({
    name: "",
  })

  const form = useForm({
    defaultValues: {
      studentId: "",
    },
  })
  const isFormValueChanged = form.formState.isDirty

  async function onSubmit(values) {
    const createStudentData = {
      classId: classes?.id,
      studentId: values.studentId,
    }
    // console.log(createStudentData)
    try {
      const result = await addStudentToClass(createStudentData).unwrap()
      form.reset()
      onOpenChange(false)
      Swal.fire({
        icon: "success",
        title: `Berhasil Tambah Siswa Ke Dalam ${classes?.name ? `Kelas ${classes?.name}` : "Kelas"} !`,
        text: "Selamat Anda berhasil menambah siswa!",
        showConfirmButton: false,
        timer: 1500,
      })
      console.log("Result create siswa: ", result)
    } catch (error) {
      console.log("Error create siswa: ", error)
      Swal.fire({
        icon: "error",
        title: "Gagal Tambah Siswa!",
        text: error?.data?.message ?? "Anda gagal tambah siswa!",
        showConfirmButton: false,
        timer: 1500,
      })
    }
  }
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="px-0 max-w-[500px] font-poppins">
        <AlertDialogDescription className="sr-only">
          This action is for adding student.
        </AlertDialogDescription>
        <AlertDialogHeader className=" max-h-[400px] px-8 flex-col gap-y-0 items-center gap-x-16    ">
          <AlertDialogTitle className="space-y-5  flex flex-col items-center w-full">
            <span className="text-fs24_36 font-semibold  text-color-1"> Input Data Siswa Ke Kelas</span>
            <Separator />
          </AlertDialogTitle>
          <Form {...form}>
            <form
              id="add-student-to-class-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="overflow-auto  w-full px-2 py-2 space-y-6 text-start">
              <FormField
                control={form.control}
                name="studentId"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>Siswa</FormLabel>
                    <Popover open={openStudentList} onOpenChange={setOpenStudentList}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={open}
                          className="w-full justify-between">
                          {isLoadingGetStudents && "Sedang Memuat Siswa..."}
                          {!isLoadingGetStudents &&
                            (isSuccessGetStudents && field?.value
                              ? students.find((sm) => sm.id === field?.value)?.name
                              : "Pilih Siswa...")}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height] p-0">
                        <Command>
                          <CommandInput placeholder="Cari Siswa..." />
                          <CommandEmpty>Siswa tidak ditemukan.</CommandEmpty>
                          <CommandList>
                            <CommandGroup>
                              {isLoadingGetStudents && "Sedang Memuat Siswa..."}
                              {isSuccessGetStudents &&
                                !isLoadingGetStudents &&
                                students.map((t, index) => {
                                  return (
                                    <CommandItem
                                      key={index + 1}
                                      value={t.name}
                                      onSelect={() => {
                                        form.setValue("studentId", t.id, {
                                          shouldDirty: true,
                                        })
                                        setOpenStudentList(false)
                                      }}>
                                      <Check
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          field?.value === t.id ? "opacity-100" : "opacity-0",
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
              onClick={() => {
                form.reset()
                typeof onClose === "function" && onClose()
              }}
              className="bg-color-4 text-white hover:text-white hover:bg-color-4/60">
              Tutup
            </Button>
          </AlertDialogCancel>
          <Button
            disabled={isLoadingAddStudentToClass || !isFormValueChanged}
            form="add-student-to-class-form"
            type="submit"
            className="bg-color-5 hover:bg-color-5/60 text-white gap-x-2 flex items-center">
            {isLoadingAddStudentToClass && <BsArrowRepeat className="animate-spin  w-5 h-5 flex-shrink-0" />}{" "}
            Simpan
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

AdminAddStudentToClassDialog.propTypes = {
  open: PropTypes.bool,
  onOpenChange: PropTypes.func,
  onClose: PropTypes.func,
  classes: PropTypes.object,
}
