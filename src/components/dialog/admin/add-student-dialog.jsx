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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { GENDER } from "@/constant/gender"
import { cn } from "@/lib/utils"
import { useFindAllParentQuery } from "@/store/api/parent-api"
import { useCreateStudentMutation } from "@/store/api/student-api"
// import { useGetAllParentQuery } from "@/store/api/parent.api"

// import { useCreateStudentMutation } from "@/store/api/student.api"
import { Check, ChevronsUpDown } from "lucide-react"
import PropTypes from "prop-types"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { BsArrowRepeat } from "react-icons/bs"
import Swal from "sweetalert2"

export default function AdminAddStudentDialog({
  open = false,
  onOpenChange,
  onClose,
}) {
  const [createStudent, { isLoading: isLoadingCreateStudent }] =
    useCreateStudentMutation()
  const [openParentList, setOpenParentList] = useState(false)

  const {
    data: parents,
    isLoading: isLoadingGetParents,
    isSuccess: isSuccessGetParents,
  } = useFindAllParentQuery({
    name: "",
  })

  const form = useForm({
    defaultValues: {
      name: "",
      nisn: "",
      gender: "",
      parentId: "",
    },
  })
  const isFormValueChanged = form.formState.isDirty

  async function onSubmit(values) {
    const createStudentData = {
      nisn: values.nisn,
      name: values.name,
      gender: values.gender,
      parentId: values.parentId,
    }
    // console.log(createStudentData)
    try {
      await createStudent(createStudentData).unwrap()
      form.reset()
      onOpenChange(false)
      Swal.fire({
        icon: "success",
        title: "Berhasil Tambah Siswa!",
        text: "Selamat Anda berhasil menambah siswa!",
        showConfirmButton: false,
        timer: 1500,
      })
      // console.log("Result create siswa: ", result)
    } catch (error) {
      console.log("Error create siswa: ", error)
      Swal.fire({
        icon: "error",
        title: "Gagal Tambah Siswa!",
        text: "Maaf, Anda gagal tambah siswa!",
        showConfirmButton: false,
        timer: 1500,
      })
    }
  }
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="px-0 max-w-[600px] font-poppins">
        <AlertDialogDescription className="sr-only">
          This action is for adding student.
        </AlertDialogDescription>
        <AlertDialogHeader className=" max-h-[400px] px-8 flex-col gap-y-0 items-center gap-x-16    ">
          <AlertDialogTitle className="space-y-5  flex flex-col items-center w-full">
            <span className="text-txt24_36 font-medium  text-color-6">
              Input Data Siswa
            </span>
            <Separator />
          </AlertDialogTitle>
          <Form {...form}>
            <form
              id="add-parent-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="overflow-auto  w-full px-2 py-2 space-y-6 text-start">
              <FormField
                control={form.control}
                name="nisn"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>NISN</FormLabel>
                    <FormControl>
                      <Input placeholder="Masukan nisn siswa" {...field} />
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
                      <Input placeholder="Masukan nama siswa" {...field} />
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
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih Jenis Kelamin!" />
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
                name="parentId"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className=" font-light">Orang Tua</FormLabel>
                    <Popover
                      open={openParentList}
                      onOpenChange={setOpenParentList}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={open}
                          className="w-full justify-between">
                          {isLoadingGetParents && "Sedang Memuat Orang Tua..."}
                          {!isLoadingGetParents &&
                            (isSuccessGetParents && field?.value
                              ? parents.find((sm) => sm.id === field?.value)
                                  ?.name
                              : "Pilih Orang Tua...")}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height] p-0">
                        <Command>
                          <CommandInput placeholder="Cari Orang Tua..." />
                          <CommandEmpty>
                            Orang Tua tidak ditemukan.
                          </CommandEmpty>
                          <CommandList>
                            <CommandGroup>
                              {isLoadingGetParents &&
                                "Sedang Memuat Orang Tua..."}
                              {isSuccessGetParents &&
                                !isLoadingGetParents &&
                                parents.map((t, index) => {
                                  return (
                                    <CommandItem
                                      key={index + 1}
                                      value={t.name}
                                      onSelect={() => {
                                        form.setValue("parentId", t.id, {
                                          shouldDirty: true,
                                        })
                                        setOpenParentList(false)
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
              onClick={() => {
                form.reset()
                typeof onClose === "function" && onClose()
              }}
              className="bg-color-4 text-white hover:text-white hover:bg-color-4/60">
              Tutup
            </Button>
          </AlertDialogCancel>
          <Button
            disabled={isLoadingCreateStudent || !isFormValueChanged}
            form="add-parent-form"
            type="submit"
            className="bg-color-5 hover:bg-color-5/60 text-white gap-x-2 flex items-center">
            {isLoadingCreateStudent && (
              <BsArrowRepeat className="animate-spin  w-5 h-5 flex-shrink-0" />
            )}{" "}
            Simpan
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

AdminAddStudentDialog.propTypes = {
  open: PropTypes.bool,
  onOpenChange: PropTypes.func,
  onClose: PropTypes.func,
}
