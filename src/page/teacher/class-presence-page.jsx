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
import useInput from "@/hook/useInput"
import { formattedDate, getAllWeeksInMonth, getWeekOfMonth } from "@/lib/date"
import { cn } from "@/lib/utils"
import { useGetWeeklyAttendanceQuery } from "@/store/api/attendance-api"
import { getUser } from "@/store/slice/user-slice"
import { useMemo, useState } from "react"
import { useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"

const initialStudentSearchInput = {
  name: "",
}

export default function TeacherClassPresencePage() {
  const user = useSelector(getUser)
  const { classId } = useParams()

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

  // get all date of the week
  const allDateOfTheWeek = useMemo(() => {
    return allWeekOfTheMonth.find((week) => week.numOfTheWeek === choosedWeek)
      ?.week
  }, [choosedWeek, allWeekOfTheMonth])

  const [choosedRangeOfWeek, setChoosedRangeOfWeek] = useState(
    () =>
      allWeekOfTheMonth.find((week) => week.numOfTheWeek === choosedWeek)
        ?.range,
  )

  const {
    values: searchStudentByClassValue,
    onChange: onChangeStudentByClass,
  } = useInput(initialStudentSearchInput)

  const {
    data: weeklyAttendance,
    isLoading: isLoadingGetWeeklyAttendance,
    isSuccess: isSuccessGetWeeklyAttendance,
  } = useGetWeeklyAttendanceQuery({
    classId: classId,
    year: new Date().getFullYear(),
    month: choosedMonth,
    week: choosedWeek,
  })

  return (
    <>
      <div className=" flex justify-between">
        <h1 className="text-fs24_36 font-semibold text-color-1">
          Absensi Kelas{" "}
          {isSuccessGetWeeklyAttendance
            ? weeklyAttendance?.class?.name
            : "Loading..."}
        </h1>
      </div>
      <div className="flex flex-col gap-y-10">
        <div>
          <h1 className="pb-5  font-medium text-fs24_36">
            Guru : {user?.name}
          </h1>
          <h1 className="pb-5  font-medium text-fs20_30">
            NIP : {user?.nip ? user?.nip : "Belum dimasukan!"}
          </h1>
        </div>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-2 ">
              <Button
                disabled={isLoadingGetWeeklyAttendance}
                onClick={() => {}}>
                Cetak Data
              </Button>
              <Button asChild>
                <Link to={`/teacher/class/${classId}/presence/create`}>
                  Input Absensi
                </Link>
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button>Ubah Filter</Button>
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
                            setChoosedWeek(1)
                            const selected = getAllWeeksInMonth(
                              new Date().getFullYear(),
                              e,
                            ).find((week) => week.numOfTheWeek === 1)
                            setChoosedRangeOfWeek(selected.range)
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
                      <div className="space-y-2">
                        <h1>Pilih Minggu</h1>
                        <Select
                          className="w-full"
                          defaultValue={choosedRangeOfWeek}
                          onValueChange={(e) => {
                            const selected = allWeekOfTheMonth.find(
                              (week) => week.range === e,
                            )
                            setChoosedWeek(selected.numOfTheWeek)
                            setChoosedRangeOfWeek(e)
                          }}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Pilih Minggu" />
                          </SelectTrigger>
                          <SelectContent className="max-h-[200px] ">
                            {allWeekOfTheMonth?.map((month, index) => {
                              return (
                                <SelectItem
                                  className={cn(
                                    "border my-2 cursor-pointer",
                                    {
                                      "focus:bg-color-1 focus:text-white": true,
                                    },
                                    {
                                      "bg-color-1 focus:text-white text-white":
                                        month?.range === choosedRangeOfWeek,
                                    },
                                  )}
                                  key={index + 1}
                                  value={String(month.range)}>
                                  <span className="font-semibold pr-1">
                                    Minggu ke-{month?.numOfTheWeek},
                                  </span>{" "}
                                  {month.range}
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
            <div className="max-w-[224px] ">
              <Input
                placeholder="Cari Siswa..."
                name="name"
                onChange={onChangeStudentByClass}
                value={searchStudentByClassValue.name}
              />
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow className="bg-color-1 text-fs12_20  hover:bg-color-1/80">
                <TableHead className="w-[16px] text-white">No</TableHead>
                <TableHead className="w-[300px] text-white">Nama</TableHead>
                {allDateOfTheWeek.map((date, index) => {
                  return (
                    <TableHead
                      key={index + 1}
                      className="w-[200px]  text-white">
                      {formattedDate(date)}
                    </TableHead>
                  )
                })}
                <TableHead className="w-[100px] text-white">
                  Persentase
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="[&_tr:last-child]:border text-txt12_20 ">
              {isSuccessGetWeeklyAttendance &&
                weeklyAttendance?.students?.length > 0 &&
                weeklyAttendance?.students?.map((student, index) => {
                  return (
                    <TableRow key={index + 1} className="border">
                      <TableCell className="font-medium">{index + 1}</TableCell>
                      <TableCell className="font-medium">
                        {student.name}
                      </TableCell>
                      {student?.attendance?.map((attd, index) => {
                        return (
                          <TableCell key={index + 1}>{attd?.status}</TableCell>
                        )
                      })}
                      <TableCell className="flex gap-x-2">
                        {`${student?.percentagePresent}%`}
                      </TableCell>
                    </TableRow>
                  )
                })}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  )
}
