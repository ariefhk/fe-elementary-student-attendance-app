import { IconButtonLink } from "@/components/common/icon-button-link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import PropTypes from "prop-types"
import { FaEye, FaUsersLine } from "react-icons/fa6"

function TeacherClassRows({ classes, isSuccessGetClasses, isLoadingGetClasses }) {
  let tableContent

  if (!isLoadingGetClasses && isSuccessGetClasses && classes?.length > 0) {
    tableContent = classes.map((c, index) => {
      return (
        <TableRow className="border" key={index + 1}>
          <TableCell className="font-medium">{index + 1}</TableCell>
          <TableCell>{c?.name || "-"}</TableCell>
          <TableCell>{c?.studentCount || "-"}</TableCell>
          <TableCell className="flex gap-x-2">
            <IconButtonLink
              to={`/teacher/class/${c.id}/presence`}
              name="Absensi"
              className="h-11 px-5 w-[150px] gap-x-4 hover:text-color-1 text-white  bg-color-1 hover:bg-white"
              iconClassName="text-white group-hover:text-color-1 w-5 h-5"
              Icon={FaUsersLine}
            />
            <IconButtonLink
              to={`/teacher/class/${c.id}/detail`}
              name="Detail Kelas"
              className="h-11 px-5 w-[150px] gap-x-4 hover:text-color-1 text-white  bg-color-1 hover:bg-white"
              iconClassName="text-white group-hover:text-color-1 w-5 h-5"
              Icon={FaEye}
            />
          </TableCell>
        </TableRow>
      )
    })
  } else if (isLoadingGetClasses) {
    tableContent = Array.from({ length: 3 }).map((_, index) => {
      return (
        <TableRow key={index + 1}>
          <TableCell className="font-medium">-</TableCell>
          <TableCell className="font-medium">-</TableCell>
          <TableCell className="font-medium">-</TableCell>
          <TableCell className="flex gap-x-2">
            <div className="w-max flex gap-x-2 h-[40px] px-5 bg-gray-300 animate-pulse" />
            <div className="w-max flex gap-x-2 h-[40px] px-5 bg-gray-300 animate-pulse" />
          </TableCell>
        </TableRow>
      )
    })
  } else {
    tableContent = (
      <TableRow className="border ">
        <TableCell colSpan={4} className="text-center">
          Kelas tidak ditemukan!
        </TableCell>
      </TableRow>
    )
  }

  return tableContent
}

export default function TeacherListClassTable({ classes, isSuccessGetClasses, isLoadingGetClasses }) {
  console.log(classes)
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-color-1   hover:bg-color-1/80">
          <TableHead className="w-[20px] text-white">No</TableHead>
          <TableHead className="w-[300px] text-white">Nama Kelas</TableHead>
          <TableHead className="w-[200px] text-white">Jumlah Murid</TableHead>
          <TableHead className="w-[200px] text-white">Aksi</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="[&_tr:last-child]:border ">
        <TeacherClassRows
          classes={classes}
          isLoadingGetClasses={isLoadingGetClasses}
          isSuccessGetClasses={isSuccessGetClasses}
        />
      </TableBody>
    </Table>
  )
}

TeacherListClassTable.propTypes = {
  classes: PropTypes.array,
  isSuccessGetClasses: PropTypes.bool,
  isLoadingGetClasses: PropTypes.bool,
}
