import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { MONTH_WITH_ID } from "@/constant/date"
import { formattedDate, getAllWeeksInMonth, getWeekOfMonth } from "@/lib/date"
import { cn } from "@/lib/utils"
import {
  useGetStudentMonthlyAttendanceQuery,
  useGetStudentWeeklyAttendanceQuery,
} from "@/store/api/attendance-api"
import { useFindClassByIdQuery } from "@/store/api/class-api"
import { useFindStudentByIdQuery } from "@/store/api/student-api"
import { getUser } from "@/store/slice/user-slice"
import { useMemo, useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"

export default function ParentPresentDetailPage() {
  const { studentId, classId } = useParams()
  const user = useSelector(getUser)

  const [displayMode, setDisplayMode] = useState("month") // week, month

  const [choosedWeek, setChoosedWeek] = useState(() =>
    getWeekOfMonth(new Date()),
  )

  const [choosedMonth, setChoosedMonth] = useState(
    () => new Date().getMonth() + 1,
  )

  // get all week of the month
  const allWeekOfTheMonth = useMemo(() => {
    return getAllWeeksInMonth(new Date().getFullYear(), choosedMonth)
  }, [choosedMonth])

  const {
    data: classes,
    isLoading: isLoadingGetClasses,
    isSuccess: isSuccessGetClasses,
  } = useFindClassByIdQuery({
    classId,
  })

  const {
    data: student,
    isLoading: isLoadingGetStudent,
    isSuccess: isSuccessGetStudent,
  } = useFindStudentByIdQuery({
    studentId,
  })

  const { data: studentWeeklyAttendance } = useGetStudentWeeklyAttendanceQuery(
    {
      studentId,
      classId,
      year: new Date().getFullYear(),
      month: choosedMonth,
      week: choosedWeek,
    },
    {
      skip: displayMode !== "week",
      refetchOnMountOrArgChange: true,
    },
  )

  const {
    data: studentMonthlyAttendance,
    isSuccess: isSuccessGetStudentMonthlyAttendance,
  } = useGetStudentMonthlyAttendanceQuery(
    {
      studentId,
      classId,
      year: new Date().getFullYear(),
      month: choosedMonth,
    },
    {
      skip: displayMode !== "month",
      refetchOnMountOrArgChange: true,
    },
  )

  console.log({
    classes,
    studentWeeklyAttendance,
    studentMonthlyAttendance,
  })

  return (
    <>
      <div className=" flex justify-between">
        <h1 className="text-fs24_36 font-semibold text-color-1">
          Absensi Kelas
        </h1>
      </div>
      <div className="flex flex-col gap-y-5 ">
        <div>
          <h1 className="pb-5  font-medium text-fs24_36">
            Orang Tua : {user?.name}
          </h1>
          <div>
            <h1 className="pb-5  font-medium text-fs20_30">
              Anak : {isSuccessGetStudent ? student?.name : "Belum dimasukan!"}
            </h1>
            <h1 className="pb-5  font-medium text-fs20_30">
              Kelas : {isSuccessGetClasses ? classes?.name : "Belum dimasukan!"}
            </h1>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-x-2">
            <Button>Cetak</Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button>
                  Ubah Filter -{" "}
                  {MONTH_WITH_ID.find((date) => date.id === choosedMonth).name}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader className="space-y-5">
                  <AlertDialogTitle>Ubah Filter</AlertDialogTitle>
                  <div className="space-y-5">
                    <div className="space-y-2">
                      <h1>Pilih Bulan</h1>
                      <Select
                        defaultValue={choosedMonth}
                        className="w-full"
                        onValueChange={(e) => {
                          setChoosedMonth(e)
                        }}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Pilih Bulan" />
                        </SelectTrigger>
                        <SelectContent className="max-h-[200px] ">
                          {MONTH_WITH_ID.map((month, index) => {
                            return (
                              <SelectItem
                                className={cn("border my-2 cursor-pointer", {
                                  "focus:bg-color-1 focus:text-white": true,
                                })}
                                key={index + 1}
                                value={month.id}>
                                {month.name}
                              </SelectItem>
                            )
                          })}{" "}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <AlertDialogDescription className=" sr-only">
                    test
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
        {isSuccessGetStudentMonthlyAttendance &&
          studentMonthlyAttendance.map((attendance, index) => {
            return (
              <div key={index + 1} className="">
                <div className="  bg-color-1 ml-[1px] border-b py-1  text-center">
                  <h1 className="text-white text-[14px]">
                    Minggu ke - {attendance.numOfTheWeek} -{" "}
                    {formattedDate(attendance?.attendance[0]?.date)} s/d{" "}
                    {formattedDate(
                      attendance?.attendance[attendance.attendance.length - 1]
                        ?.date,
                    )}{" "}
                    {index + 1 > 4 && "(Minggu peralihan)"}
                  </h1>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow className="bg-color-1 text-fs12_20  hover:bg-color-1/80">
                      {attendance?.attendance.map((attd, index) => {
                        return (
                          <TableHead
                            key={index + 1}
                            className="w-[200px]  text-white">
                            {formattedDate(attd?.date)}
                          </TableHead>
                        )
                      })}
                      <TableHead className="w-[100px]  text-white">
                        Persentase
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="[&_tr:last-child]:border text-txt12_20 ">
                    <TableRow className="border">
                      {attendance?.attendance.map((attd, index) => {
                        return (
                          <TableCell key={index + 1} className="font-medium">
                            {attd?.status}
                          </TableCell>
                        )
                      })}
                      <TableCell key={index + 1} className="font-medium">
                        {`${attendance?.percentagePresent}%`}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            )
          })}
      </div>
    </>
  )
}
