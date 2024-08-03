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
import { MdOutlineVisibility } from "react-icons/md"
import { Link } from "react-router-dom"

function AdminStudentRows({
  students,
  isSuccessGetStudents,
  isLoadingGetStudents,
}) {
  let tableContent

  if (!isLoadingGetStudents && isSuccessGetStudents && students.length > 0) {
    tableContent = students.map((c, index) => {
      return (
        <TableRow className="border" key={index + 1}>
          <TableCell className="font-medium">{index + 1}</TableCell>
          <TableCell>{c.nisn || "-"}</TableCell>
          <TableCell>{c.name || "-"}</TableCell>
          <TableCell>
            {!c?.gender ? "-" : c.gender === "P" ? "Perempuan" : "Laki-Laki"}
          </TableCell>
          <TableCell>{c.classCount || "-"}</TableCell>
          <TableCell className="flex gap-x-2">
            <Button asChild>
              <Link to={`/parent/presence/student/${c.id}/classes`}>
                Detail Kelas
              </Link>
            </Button>
          </TableCell>
        </TableRow>
      )
    })
  } else if (isLoadingGetStudents) {
    tableContent = Array.from({ length: 3 }).map((_, index) => {
      return (
        <TableRow key={index + 1}>
          <TableCell className="font-medium">-</TableCell>
          <TableCell className="font-medium">-</TableCell>
          <TableCell className="font-medium">-</TableCell>
          <TableCell className="font-medium">-</TableCell>
          <TableCell className="font-medium">-</TableCell>
          <TableCell className="flex gap-x-2">
            <div className="w-max flex gap-x-2 h-[40px] px-5 bg-gray-300 animate-pulse" />
          </TableCell>
        </TableRow>
      )
    })
  } else {
    tableContent = (
      <TableRow className="border ">
        <TableCell colSpan={10} className="text-center">
          Siswa tidak ditemukan!
        </TableCell>
      </TableRow>
    )
  }

  return tableContent
}

export default function ParentListStudentTable({
  students,
  isSuccessGetStudents,
  isLoadingGetStudents,
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-color-1   hover:bg-color-1/80">
          <TableHead className="w-[20px] text-white">No</TableHead>
          <TableHead className="w-[160px] text-white">NISN</TableHead>
          <TableHead className="w-[300px] text-white">Nama</TableHead>
          <TableHead className="w-[300px] text-white">Jenis Kelamin</TableHead>
          <TableHead className="w-[300px] text-white">Jumlah Kelas</TableHead>
          <TableHead className="w-[300px] text-white">Aksi</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="[&_tr:last-child]:border ">
        <AdminStudentRows
          students={students}
          isLoadingGetStudents={isLoadingGetStudents}
          isSuccessGetStudents={isSuccessGetStudents}
        />
      </TableBody>
    </Table>
  )
}

ParentListStudentTable.propTypes = {
  students: PropTypes.array,
  isSuccessGetStudents: PropTypes.bool,
  isLoadingGetStudents: PropTypes.bool,
}