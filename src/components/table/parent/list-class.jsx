import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"

function ParentClassRows({
  studentId,
  classes,
  isSuccessGetClasses,
  isLoadingGetClasses,
}) {
  let tableContent

  if (!isLoadingGetClasses && isSuccessGetClasses && classes.length > 0) {
    tableContent = classes.map((c, index) => {
      return (
        <TableRow className="border" key={index + 1}>
          <TableCell className="font-medium">{index + 1}</TableCell>
          <TableCell>{c?.name || "-"}</TableCell>
          <TableCell>{c?.teacher?.name || "-"}</TableCell>
          <TableCell className="flex gap-x-2">
            <Button asChild>
              <Link
                to={`/parent/presence/student/${studentId}/classes/${c.id}/detail-class`}>
                Detail Kelas
              </Link>
            </Button>
            <Button asChild>
              <Link
                to={`/parent/presence/student/${studentId}/classes/${c.id}/detail-presence`}>
                Absensi
              </Link>
            </Button>
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
        <TableCell colSpan={7} className="text-center">
          Kelas tidak ditemukan!
        </TableCell>
      </TableRow>
    )
  }

  return tableContent
}

export default function ParentListClassTable({
  studentId,
  classes,
  isSuccessGetClasses,
  isLoadingGetClasses,
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-color-1   hover:bg-color-1/80">
          <TableHead className="w-[20px] text-white">No</TableHead>
          <TableHead className="w-[160px] text-white">Nama Kelas</TableHead>
          <TableHead className="w-[300px] text-white">Guru</TableHead>
          {/* <TableHead className="w-[120px] text-white">Jumlah Murid</TableHead> */}
          <TableHead className="w-[200px] text-white">Aksi</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="[&_tr:last-child]:border ">
        <ParentClassRows
          studentId={studentId}
          classes={classes}
          isLoadingGetClasses={isLoadingGetClasses}
          isSuccessGetClasses={isSuccessGetClasses}
        />
      </TableBody>
    </Table>
  )
}

ParentListClassTable.propTypes = {
  studentId: PropTypes.string,
  classes: PropTypes.array,
  isSuccessGetClasses: PropTypes.bool,
  isLoadingGetClasses: PropTypes.bool,
}
