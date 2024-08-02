import { IconButton } from "@/components/common/icon-button"
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
import { BsPencil } from "react-icons/bs"
import { FaRegTrashAlt } from "react-icons/fa"
import { FaEye } from "react-icons/fa6"
import { MdOutlineVisibility } from "react-icons/md"
import { Link } from "react-router-dom"

function AdminStudentRows({
  students,
  isSuccessGetStudents,
  isLoadingGetStudents,
  onEditStudent,
  onDeleteStudent,
}) {
  let tableContent

  if (!isLoadingGetStudents && isSuccessGetStudents && students.length > 0) {
    tableContent = students.map((c, index) => {
      return (
        <TableRow className="border" key={index + 1}>
          <TableCell className="font-medium">{index + 1}</TableCell>
          <TableCell>{c.nisn || "-"}</TableCell>
          <TableCell>{c.name || "-"}</TableCell>
          {/* <TableCell>{c.email || "-"}</TableCell> */}
          {/* <TableCell>{c.no_telp || "-"}</TableCell> */}
          <TableCell>
            {!c?.gender ? "-" : c.gender === "P" ? "Perempuan" : "Laki-Laki"}
          </TableCell>
          <TableCell>{c.classCount || "-"}</TableCell>
          {/* <TableCell>{c?.parent?.name || "-"}</TableCell> */}
          <TableCell className="flex gap-x-2">
            <IconButton
              className="h-11 px-5 w-11 bg-color-1 hover:bg-white"
              iconClassName="text-white group-hover:text-color-1 w-5 h-5"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onEditStudent(c)
              }}
              Icon={FaEye}
            />
            <IconButton
              className="h-11 px-5 w-11 bg-color-5 hover:bg-white"
              iconClassName="text-white group-hover:text-color-5 w-5 h-5"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onEditStudent(c)
              }}
              Icon={BsPencil}
            />
            <IconButton
              className="h-11 px-5 w-11 bg-color-4 hover:bg-white"
              iconClassName="text-white group-hover:text-color-4 w-5 h-5"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onDeleteStudent(c)
              }}
              Icon={FaRegTrashAlt}
            />
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
          {/* <TableCell className="font-medium">-</TableCell>
          <TableCell className="font-medium">-</TableCell> */}
          {/* <TableCell className="font-medium">-</TableCell> */}
          <TableCell className="font-medium">-</TableCell>
          <TableCell className="flex gap-x-2">
            <div className="w-max flex gap-x-2 h-[40px] px-5 bg-gray-300 animate-pulse" />
            <div className="w-max flex gap-x-2 h-[40px] px-5 bg-gray-300 animate-pulse" />
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

export default function AdminListStudentTable({
  students,
  isSuccessGetStudents,
  isLoadingGetStudents,
  onEditStudent,
  onDeleteStudent,
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-color-1   hover:bg-color-1/80">
          <TableHead className="w-[20px] text-white">No</TableHead>
          <TableHead className="w-[160px] text-white">NISN</TableHead>
          <TableHead className="w-[400px] text-white">Nama</TableHead>
          <TableHead className="w-[200px] text-white">Jenis Kelamin</TableHead>
          <TableHead className="w-[200px] text-white">Jumlah Kelas</TableHead>
          <TableHead className="w-[200px] text-white">Aksi</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="[&_tr:last-child]:border ">
        <AdminStudentRows
          students={students}
          isLoadingGetStudents={isLoadingGetStudents}
          isSuccessGetStudents={isSuccessGetStudents}
          onDeleteStudent={onDeleteStudent}
          onEditStudent={onEditStudent}
        />
      </TableBody>
    </Table>
  )
}

AdminListStudentTable.propTypes = {
  students: PropTypes.array,
  isSuccessGetStudents: PropTypes.bool,
  isLoadingGetStudents: PropTypes.bool,
  onEditStudent: PropTypes.func,
  onDeleteStudent: PropTypes.func,
}
