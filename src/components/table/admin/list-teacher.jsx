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

function AdminTeacherRows({
  teachers,
  isSuccessGetTeachers,
  isLoadingGetTeachers,
  onEditTeacher,
  onDeleteTeacher,
}) {
  let tableContent

  if (!isLoadingGetTeachers && isSuccessGetTeachers && teachers.length > 0) {
    tableContent = teachers.map((t, index) => {
      return (
        <TableRow className="border " key={index + 1}>
          <TableCell className="font-medium">{index + 1}</TableCell>
          <TableCell>{t?.nip || "-"}</TableCell>
          <TableCell>{t?.name || "-"}</TableCell>
          <TableCell>{t?.email || "-"}</TableCell>
          <TableCell>{t?.phone || "-"}</TableCell>
          <TableCell className="flex gap-x-2">
            <IconButton
              className="h-11 px-5 w-11 bg-color-1 hover:bg-white"
              iconClassName="text-white group-hover:text-color-1 w-5 h-5"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onEditTeacher(t)
              }}
              Icon={FaEye}
            />
            <IconButton
              className="h-11 px-5 w-11 bg-color-5 hover:bg-white"
              iconClassName="text-white group-hover:text-color-5 w-5 h-5"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onEditTeacher(t)
              }}
              Icon={BsPencil}
            />
            <IconButton
              className="h-11 px-5 w-11 bg-color-4 hover:bg-white"
              iconClassName="text-white group-hover:text-color-4 w-5 h-5"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onDeleteTeacher(t)
              }}
              Icon={FaRegTrashAlt}
            />
          </TableCell>
        </TableRow>
      )
    })
  } else if (isLoadingGetTeachers) {
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
            <div className="w-max flex gap-x-2 h-[40px] px-5 bg-gray-300 animate-pulse" />
          </TableCell>
        </TableRow>
      )
    })
  } else {
    tableContent = (
      <TableRow className="border ">
        <TableCell colSpan={7} className="text-center">
          Guru tidak ditemukan!
        </TableCell>
      </TableRow>
    )
  }

  return tableContent
}

export default function AdminListTeacherTable({
  teachers,
  isSuccessGetTeachers,
  isLoadingGetTeachers,
  onEditTeacher,
  onDeleteTeacher,
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-color-1   hover:bg-color-1/80">
          <TableHead className="w-[20px] text-white">No</TableHead>
          <TableHead className="w-[200px] text-white">NIP</TableHead>
          <TableHead className="w-[200px] text-white">Nama</TableHead>
          <TableHead className="w-[200px] text-white">Email</TableHead>
          <TableHead className="w-[200px] text-white">No Telp</TableHead>
          <TableHead className="w-[200px] text-white">Aksi</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="[&_tr:last-child]:border ">
        <AdminTeacherRows
          teachers={teachers}
          isLoadingGetTeachers={isLoadingGetTeachers}
          isSuccessGetTeachers={isSuccessGetTeachers}
          onDeleteTeacher={onDeleteTeacher}
          onEditTeacher={onEditTeacher}
        />
      </TableBody>
    </Table>
  )
}

AdminListTeacherTable.propTypes = {
  teachers: PropTypes.array,
  isSuccessGetTeachers: PropTypes.bool,
  isLoadingGetTeachers: PropTypes.bool,
  onEditTeacher: PropTypes.func,
  onDeleteTeacher: PropTypes.func,
}
