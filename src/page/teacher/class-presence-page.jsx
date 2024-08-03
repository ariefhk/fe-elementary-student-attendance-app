import { IconButton } from "@/components/common/icon-button"
import { IconButtonLink } from "@/components/common/icon-button-link"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MONTH_WITH_ID } from "@/constant/date"
import useInput from "@/hook/useInput"
import { formattedDate, getAllWeeksInMonth, getWeekOfMonth } from "@/lib/date"
import { cn } from "@/lib/utils"
import { useGetWeeklyAttendanceQuery } from "@/store/api/attendance-api"
import { getUser } from "@/store/slice/user-slice"
import { useMemo, useState } from "react"
import { FaFilter, FaPrint, FaUsersLine } from "react-icons/fa6"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"

const initialStudentSearchInput = {
  name: "",
}

export default function TeacherClassPresencePage() {
  const user = useSelector(getUser)
  const { classId } = useParams()

  const [choosedWeek, setChoosedWeek] = useState(() => getWeekOfMonth(new Date()))

  const [choosedMonth, setChoosedMonth] = useState(() => new Date().getMonth() + 1)

  // get all week of the month
  const allWeekOfTheMonth = useMemo(() => {
    return getAllWeeksInMonth(new Date().getFullYear(), choosedMonth)
  }, [choosedMonth])

  // get all date of the week
  const allDateOfTheWeek = useMemo(() => {
    return allWeekOfTheMonth.find((week) => week.numOfTheWeek === choosedWeek)?.week
  }, [choosedWeek, allWeekOfTheMonth])

  const [choosedRangeOfWeek, setChoosedRangeOfWeek] = useState(
    () => allWeekOfTheMonth.find((week) => week.numOfTheWeek === choosedWeek)?.range,
  )

  const { values: searchStudentByClassValue, onChange: onChangeStudentByClass } =
    useInput(initialStudentSearchInput)

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

  const filteredStudent = useMemo(() => {
    if (isSuccessGetWeeklyAttendance && weeklyAttendance?.students?.length > 0) {
      return weeklyAttendance?.students?.filter((student) =>
        student?.name.toLowerCase().includes(searchStudentByClassValue.name.toLowerCase()),
      )
    }

    return []
  }, [searchStudentByClassValue, weeklyAttendance, isSuccessGetWeeklyAttendance])

  return (
    <>
      <div className=" flex justify-between">
        <h1 className="text-fs24_36 font-semibold text-color-1">
          Absensi Kelas {isSuccessGetWeeklyAttendance ? weeklyAttendance?.class?.name : "Loading..."}
        </h1>
      </div>
      <div className="flex flex-col gap-y-10">
        <div>
          <h1 className="pb-5  font-medium text-fs24_36">Guru : {user?.name}</h1>
          <h1 className="pb-5  font-medium text-fs20_30">
            NIP : {user?.nip ? user?.nip : "Belum dimasukan!"}
          </h1>
        </div>
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-2 ">
              <IconButton
                isDisabled={isLoadingGetWeeklyAttendance}
                onClick={() => {}}
                name="Cetak Data"
                className="bg-color-1 font-medium w-[160px] gap-x-3 h-[45px] text-white hover:bg-white hover:text-color-1"
                iconClassName="text-white group-hover:text-color-1"
                Icon={FaPrint}
              />
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <IconButton
                    isDisabled={isLoadingGetWeeklyAttendance}
                    onClick={() => {}}
                    name="Ubah Filter"
                    className="bg-color-6 font-medium w-[150px] gap-x-3 h-[45px] text-white hover:bg-white hover:text-color-6"
                    iconClassName="text-white group-hover:text-color-6"
                    Icon={FaFilter}
                  />
                </AlertDialogTrigger>
                <AlertDialogContent className="font-roboto px-0 max-w-[460px]">
                  <AlertDialogHeader className="space-y-5 px-8">
                    <AlertDialogTitle className="text-color-1 text-[24px] font-semibold text-center">
                      Ubah Filter
                    </AlertDialogTitle>
                    <Separator />
                    <div className="space-y-5 py-3">
                      <div className="space-y-2">
                        <h1 className="text-sm font-medium">Pilih Bulan</h1>
                        <Select
                          value={choosedMonth}
                          className="w-full"
                          onValueChange={(e) => {
                            setChoosedMonth(e)
                            setChoosedWeek(1)
                            const selected = getAllWeeksInMonth(new Date().getFullYear(), e).find(
                              (week) => week.numOfTheWeek === 1,
                            )
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
                        <h1 className="text-sm font-medium">Pilih Minggu</h1>
                        <Select
                          className="w-full"
                          value={choosedRangeOfWeek}
                          onValueChange={(e) => {
                            const selected = allWeekOfTheMonth.find((week) => week.range === e)
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
                                  <span className="font-semibold pr-1">Minggu ke-{month?.numOfTheWeek},</span>{" "}
                                  {month.range}
                                </SelectItem>
                              )
                            })}{" "}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <AlertDialogDescription className=" sr-only">
                      This action cannot be undone. This will permanently delete your account and remove your
                      data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <Separator />
                  <AlertDialogFooter className="px-8">
                    <AlertDialogCancel asChild>
                      <Button
                        type="button"
                        className="bg-color-4 h-[40px] text-white hover:text-white hover:bg-color-4/60">
                        Tutup
                      </Button>
                    </AlertDialogCancel>
                    <AlertDialogAction asChild>
                      <IconButton
                        name="Ubah"
                        className="bg-color-1 font-medium w-[80px] gap-x-3 h-[40px] text-white hover:bg-white hover:text-color-1"
                        iconClassName="text-white group-hover:text-color-1"
                      />
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <IconButtonLink
                isDisabled={isLoadingGetWeeklyAttendance}
                to={`/teacher/class/${classId}/presence/create`}
                name="Input Absensi"
                className="bg-color-5 font-medium w-[180px] gap-x-3 h-[45px] text-white hover:bg-white hover:text-color-5"
                iconClassName="text-white group-hover:text-color-5"
                Icon={FaUsersLine}
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
          <Table>
            <TableHeader>
              <TableRow className="bg-color-1 text-fs12_20  hover:bg-color-1/80">
                <TableHead className="w-[16px] text-white">No</TableHead>
                <TableHead className="w-[300px] text-white">Nama</TableHead>
                {allDateOfTheWeek.map((date, index) => {
                  return (
                    <TableHead key={index + 1} className="w-[300px]  text-white">
                      {formattedDate(date)}
                    </TableHead>
                  )
                })}
                <TableHead className="w-[80px] text-white">Persentase</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="[&_tr:last-child]:border text-fs12_20 ">
              {isSuccessGetWeeklyAttendance &&
                filteredStudent?.length > 0 &&
                filteredStudent.map((student, index) => {
                  return (
                    <TableRow key={index + 1} className="border]">
                      <TableCell className="font-medium">{index + 1}</TableCell>
                      <TableCell className="font-medium ">{student.name}</TableCell>
                      {student?.attendance?.map((attd, index) => {
                        return <TableCell key={index + 1}>{attd?.status}</TableCell>
                      })}
                      <TableCell className=" text-center ">{`${student?.percentagePresent}%`}</TableCell>
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
