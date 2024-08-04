import { IconButton } from "@/components/common/icon-button"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import useInput from "@/hook/useInput"
import { formattedDate } from "@/lib/date"
import { cn } from "@/lib/utils"
import { useCreateManyAttendanceMutation, useGetDailyAttendanceQuery } from "@/store/api/attendance-api"
import {
  clearUpdateAttendance,
  getAttendance,
  getUpdateAttendance,
  setChangeAllStudentAttendanceStatus,
  setChangeStudentAttendanceStatus,
} from "@/store/slice/attendance-slice"
import { getUser } from "@/store/slice/user-slice"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import Swal from "sweetalert2"

const initialStudentSearchInput = {
  name: "",
}

const isDisabled = (date) => {
  const isBefore1900 = date < new Date("1900-01-01")
  const isAfterToday = date > new Date()
  const isSunday = date.getDay() === 0
  return isBefore1900 || isAfterToday || isSunday
}

export default function TeacherCreatePresencePage() {
  const { values: searchStudentByClassValue, onChange: onChangeStudentByClass } =
    useInput(initialStudentSearchInput)

  const [date, setDate] = useState(() => {
    const today = new Date()
    return today.getDay() === 0 ? new Date(today.setDate(today.getDate() + 1)) : today
  })
  const { classId } = useParams()

  const dispatch = useDispatch()
  const user = useSelector(getUser)
  const attendance = useSelector(getAttendance)
  const updatedAttendance = useSelector(getUpdateAttendance)

  const {
    data: attendanceData,
    isLoading: isLoadingGetDailyAttendance,
    isSuccess: isSuccessGetDailyAttendance,
  } = useGetDailyAttendanceQuery(
    {
      classId,
      date: format(date, "yyyy-MM-dd"),
    },
    { refetchOnMountOrArgChange: true },
  )

  const filteredAttendance = useMemo(() => {
    if (isSuccessGetDailyAttendance) {
      return attendance.filter((attd) => {
        return attd?.student?.name.toLowerCase().includes(searchStudentByClassValue?.name?.toLowerCase())
      })
    }
    return []
  }, [attendance, isSuccessGetDailyAttendance, searchStudentByClassValue])

  const onStudentAttendance = (studentId, status) => {
    dispatch(setChangeStudentAttendanceStatus({ studentId, status }))
  }

  const onAllStudentAttendance = (status) => {
    dispatch(setChangeAllStudentAttendanceStatus({ status }))
  }

  const [createManyAttendance, { isLoading: isLoadingCreateManyAttendance }] =
    useCreateManyAttendanceMutation()

  const onSaveUpdateAttendance = async () => {
    try {
      const saveUpdateAttendanceObj = {
        classId,
        date: format(date, "yyyy-MM-dd"),
        studentAttendances: updatedAttendance,
      }
      // console.log("Save Update Attendance", saveUpdateAttendanceObj)
      await createManyAttendance(saveUpdateAttendanceObj).unwrap()
      Swal.fire({
        icon: "success",
        title: "Sukses Simpan Absensi!",
        text: "Selamat, Anda berhasil menyimpan Absensi!",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        // console.log("Result Save Update Attendance", result)
        dispatch(clearUpdateAttendance())
      })
    } catch (error) {
      console.log(error)
      Swal.fire({
        icon: "error",
        title: "Gagal Simpan Absensi!!",
        text: error?.data?.message ?? "Maaf Anda gagal menyimpan Absensi!",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        // console.log("Error on Save Update Attendance", error)
      })
    }
  }

  return (
    <>
      <div className=" flex justify-between">
        <h1 className="text-fs24_36 font-semibold text-color-1">
          Absensi Kelas {isSuccessGetDailyAttendance ? attendanceData?.class?.name : "Loading..."}
        </h1>
      </div>
      <div className="flex flex-col gap-y-10">
        <div>
          <h1 className="pb-5  font-medium text-fs24_36">Guru : {user?.name}</h1>
          <h1 className="pb-5  font-medium text-fs20_30">
            NIP : {user?.nip ? user?.nip : "Belum dimasukan!"}
          </h1>
        </div>
        <div className="space-y-6">
          <div className="flex justify-between">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[240px] font-roboto h-[45px] font-medium pl-3 text-left ",
                    !date && "text-muted-foreground",
                  )}>
                  {date ? formattedDate(date, true) : <span>Pilih Tanggal</span>}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(choosedDate) => {
                    if (!choosedDate) {
                      return
                    }
                    setDate(choosedDate)
                  }}
                  disabled={isDisabled}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <div className="flex items-center gap-x-5">
              <div className="flex items-center gap-x-3">
                <IconButton
                  onClick={() => onAllStudentAttendance("ABSENT")}
                  name="Absen Semua"
                  className="bg-color-4 font-medium w-[140px] gap-x-3 h-[45px] text-white hover:bg-white hover:text-color-4"
                  iconClassName="text-white group-hover:text-color-4"
                />
                <IconButton
                  onClick={() => onAllStudentAttendance("PRESENT")}
                  name="Hadir Semua"
                  className="bg-color-5 font-medium w-[140px] gap-x-3 h-[45px] text-white hover:bg-white hover:text-color-5"
                  iconClassName="text-white group-hover:text-color-5"
                />
                <IconButton
                  onClick={() => onAllStudentAttendance("HOLIDAY")}
                  name="Libur Semua"
                  className="bg-color-2 font-medium w-[140px] gap-x-3 h-[45px] text-white hover:bg-white hover:text-color-2"
                  iconClassName="text-white group-hover:text-color-2"
                />
              </div>
              <div className="max-w-[224px] ">
                <Input
                  className="h-[45px]"
                  placeholder="Cari Siswa..."
                  name="name"
                  onChange={onChangeStudentByClass}
                  value={searchStudentByClassValue.name}
                />
              </div>
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow className="bg-color-1 text-fs12_20  hover:bg-color-1/80">
                <TableHead className="w-[16px] text-white">No</TableHead>
                <TableHead className="w-[300px] text-white">Nama</TableHead>
                <TableHead className="w-[300px] text-white">Tanggal</TableHead>
                <TableHead className="w-[300px] text-white">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="[&_tr:last-child]:border text-txt12_20 ">
              {isSuccessGetDailyAttendance &&
                filteredAttendance.length > 0 &&
                filteredAttendance.map((attd, index) => {
                  return (
                    <TableRow key={index + 1} className="border">
                      <TableCell className="font-medium">{index + 1}</TableCell>
                      <TableCell className="font-medium">{attd.student.name}</TableCell>
                      <TableCell className="font-medium">{formattedDate(attd.date, true)}</TableCell>
                      <TableCell className="font-medium flex items-center gap-x-2">
                        <IconButton
                          onClick={() => onStudentAttendance(attd.student.id, "ABSENT")}
                          name="Absen"
                          className={cn(
                            "bg-white w-[100px] h-[45px] text-black hover:text-white border-2 hover:bg-color-4",
                            {
                              "bg-color-4 text-white ": attd.status === "ABSENT",
                            },
                          )}
                        />
                        <IconButton
                          onClick={() => onStudentAttendance(attd.student.id, "PRESENT")}
                          name="Hadir"
                          className={cn(
                            "bg-white w-[100px] h-[45px] hover:text-white text-black border-2 hover:bg-color-5",
                            {
                              "bg-color-5 text-white ": attd.status === "PRESENT",
                            },
                          )}
                        />
                        <IconButton
                          onClick={() => onStudentAttendance(attd.student.id, "HOLIDAY")}
                          name="Libur"
                          className={cn(
                            "bg-white w-[100px] hover:text-white h-[45px] text-black border-2 hover:bg-color-2",
                            {
                              "bg-color-2 text-white ": attd.status === "HOLIDAY",
                            },
                          )}
                        />
                      </TableCell>
                    </TableRow>
                  )
                })}
            </TableBody>
            <TableFooter className="border">
              <TableRow>
                <TableCell colSpan={4}>
                  <div className="flex justify-end">
                    <IconButton
                      isDisabled={updatedAttendance?.length === 0}
                      onClick={async () => {
                        await onSaveUpdateAttendance()
                      }}
                      name="Simpan Perubahan"
                      className="bg-color-1 font-medium w-[200px] gap-x-3 h-[45px] text-white hover:bg-white hover:text-color-1"
                      iconClassName="text-white group-hover:text-color-4"
                    />
                  </div>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </div>
    </>
  )
}
