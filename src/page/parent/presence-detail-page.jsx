import { IconButton } from "@/components/common/icon-button"
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
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
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
import { FaFilter, FaPrint } from "react-icons/fa6"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"

export default function ParentPresentDetailPage() {
  const { studentId, classId } = useParams()
  const user = useSelector(getUser)

  const [displayMode, setDisplayMode] = useState("month") // week, month

  const [choosedWeek, setChoosedWeek] = useState(() => getWeekOfMonth(new Date()))

  const [choosedMonth, setChoosedMonth] = useState(() => new Date().getMonth() + 1)

  // get all week of the month
  const allWeekOfTheMonth = useMemo(() => {
    return getAllWeeksInMonth(new Date().getFullYear(), choosedMonth)
  }, [choosedMonth])

  const [choosedRangeOfWeek, setChoosedRangeOfWeek] = useState(
    () => allWeekOfTheMonth.find((week) => week.numOfTheWeek === choosedWeek)?.range,
  )

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

  const { data: studentWeeklyAttendance, isSuccess: isSuccessGetStudentWeeklyAttendances } =
    useGetStudentWeeklyAttendanceQuery(
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

  const { data: studentMonthlyAttendance, isSuccess: isSuccessGetStudentMonthlyAttendance } =
    useGetStudentMonthlyAttendanceQuery(
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

  return (
    <>
      <div className=" flex justify-between">
        <h1 className="text-fs30_40 font-semibold text-color-1">Absensi Kelas</h1>
      </div>
      <div className="space-y-8">
        <div className="flex flex-col gap-y-10 ">
          <div>
            <div className="space-y-3">
              <h1 className="  font-medium text-fs24_36">Orang Tua : {user?.name}</h1>
              <h1 className=" font-medium text-fs18_20">
                Anak : {isSuccessGetStudent ? student?.name : "Belum dimasukan!"}
              </h1>
              <h1 className="  font-medium text-fs18_20">
                Kelas : {isSuccessGetClasses ? classes?.name : "Belum dimasukan!"}
              </h1>
              <h1 className="  font-medium text-fs18_20">
                Guru : {isSuccessGetClasses ? classes?.teacher?.name : "Belum dimasukan!"}
              </h1>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-x-2">
              <IconButton
                onClick={() => {}}
                name="Cetak Data"
                className="bg-color-1 font-medium w-[160px] gap-x-3 h-[45px] text-white hover:bg-white hover:text-color-1"
                iconClassName="text-white group-hover:text-color-1"
                Icon={FaPrint}
              />
              {displayMode === "month" && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <IconButton
                      onClick={() => {}}
                      name={"Ubah Filter - " + MONTH_WITH_ID.find((date) => date.id === choosedMonth).name}
                      className="bg-color-6 font-medium w-[260px] gap-x-3 h-[45px] text-white hover:bg-white hover:text-color-6"
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
                      <AlertDialogDescription className=" sr-only">test</AlertDialogDescription>
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
              )}
              {displayMode === "week" && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <IconButton
                      // isDisabled={isLoadingGetWeeklyAttendance}
                      onClick={() => {}}
                      name={
                        "Ubah Filter - " +
                        "Minggu ke -" +
                        choosedWeek +
                        " - " +
                        MONTH_WITH_ID.find((date) => date.id === choosedMonth).name
                      }
                      className="bg-color-6 font-medium w-[400px] gap-x-3 h-[45px] text-white hover:bg-white hover:text-color-6"
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
                        This action cannot be undone. This will permanently delete your account and remove
                        your data from our servers.
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
              )}
            </div>
            <div className="space-y-1">
              <p className="text-[12px] font-semibold text-color-1">Filter Berdasarkan</p>
              <Select
                value={displayMode}
                onValueChange={(e) => {
                  setDisplayMode(e)
                }}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Pilih Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem
                    value="month"
                    className={cn("", {
                      "focus:bg-color-1 focus:text-white": displayMode === "month",
                    })}>
                    Dalam Bulan
                  </SelectItem>
                  <SelectItem
                    value="week"
                    className={cn("", {
                      "focus:bg-color-1 focus:text-white": displayMode === "week",
                    })}>
                    Dalam Minggu
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        {displayMode === "month" &&
          isSuccessGetStudentMonthlyAttendance &&
          studentMonthlyAttendance.map((attendance, index) => {
            return (
              <div key={index + 1} className="">
                <div className="  bg-color-1 ml-[1px] border-b py-1  text-center">
                  <h1 className="text-white text-[14px]">
                    Minggu ke - {attendance.numOfTheWeek} - {formattedDate(attendance?.attendance[0]?.date)}{" "}
                    s/d {formattedDate(attendance?.attendance[attendance.attendance.length - 1]?.date)}{" "}
                    {index + 1 > 4 && "(Minggu peralihan)"}
                  </h1>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow className="bg-color-1 text-fs12_20  hover:bg-color-1/80">
                      {attendance?.attendance.map((attd, index) => {
                        return (
                          <TableHead key={index + 1} className="w-[200px]  text-white">
                            {formattedDate(attd?.date)}
                          </TableHead>
                        )
                      })}
                      <TableHead className="w-[100px]  text-white">Persentase</TableHead>
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

        {displayMode === "week" &&
          isSuccessGetStudentWeeklyAttendances &&
          studentWeeklyAttendance.attendance.length > 0 && (
            <Table>
              <TableHeader>
                <TableRow className="bg-color-1 text-fs12_20  hover:bg-color-1/80">
                  <TableHead className="w-[300px] text-white text-center text-[16px] font-medium">
                    Tanggal
                  </TableHead>
                  <TableHead className="w-[300px] text-white text-center text-[16px] font-medium">
                    Status Kehadiran
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="[&_tr:last-child]:border  ">
                {isSuccessGetStudentWeeklyAttendances &&
                  studentWeeklyAttendance?.attendance?.map((attd, index) => {
                    return (
                      <TableRow className="border" key={index + 1}>
                        <TableCell className="text-center text-txt16_24 font-medium">
                          {formattedDate(attd?.date, true)}
                        </TableCell>
                        <TableCell
                          className={cn(
                            "font-semibold text-[16px] text-center",
                            {
                              "text-green-500 ": attd?.status === "PRESENT",
                            },
                            {
                              "text-red-500 ": attd?.status === "ABSENT",
                            },
                            {
                              "text-yellow-500 ": attd?.status === "HOLIDAY",
                            },
                          )}>
                          {/* {handleStatusPresence(attd?.status)} */}
                          {attd?.status}
                        </TableCell>
                      </TableRow>
                    )
                  })}
              </TableBody>
              <TableFooter className="border">
                <TableRow className="text-[16px]">
                  <TableCell className="text-center font-semibold">Rata-rata</TableCell>
                  <TableCell className="text-center font-semibold">
                    {isSuccessGetStudentWeeklyAttendances
                      ? `${studentWeeklyAttendance?.percentagePresent} %`
                      : "-"}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          )}
      </div>
    </>
  )
}
