import { IconButton } from "@/components/common/icon-button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import PropTypes from "prop-types"
import { BsPencil } from "react-icons/bs"
import { FaRegTrashAlt } from "react-icons/fa"
import { FaEye } from "react-icons/fa6"

function AdminClassRows({
  classes,
  isSuccessGetClasses,
  isLoadingGetClasses,
  onDetailClass,
  onEditClass,
  onDeleteClass,
}) {
  let tableContent

  if (!isLoadingGetClasses && isSuccessGetClasses && classes.length > 0) {
    tableContent = classes.map((c, index) => {
      return (
        <TableRow className="border" key={index + 1}>
          <TableCell className="font-medium">{index + 1}</TableCell>
          <TableCell>{c?.name || "-"}</TableCell>
          <TableCell>{c?.teacher?.name || "-"}</TableCell>
          <TableCell>{c?.studentCount || "-"}</TableCell>
          <TableCell className="flex gap-x-2">
            <IconButton
              className="h-11 px-5 w-11 bg-color-1 hover:bg-white"
              iconClassName="text-white group-hover:text-color-1 w-5 h-5"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onDetailClass(c)
              }}
              Icon={FaEye}
            />
            <IconButton
              className="h-11 px-5 w-11 bg-color-5 hover:bg-white"
              iconClassName="text-white group-hover:text-color-5 w-5 h-5"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onEditClass(c)
              }}
              Icon={BsPencil}
            />
            <IconButton
              className="h-11 px-5 w-11 bg-color-4 hover:bg-white"
              iconClassName="text-white group-hover:text-color-4 w-5 h-5"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onDeleteClass(c)
              }}
              Icon={FaRegTrashAlt}
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
        <TableCell colSpan={7} className="text-center">
          Kelas tidak ditemukan!
        </TableCell>
      </TableRow>
    )
  }

  return tableContent
}

export default function AdminListClassTable({
  classes,
  isSuccessGetClasses,
  isLoadingGetClasses,
  onDetailClass,
  onEditClass,
  onDeleteClass,
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-color-1   hover:bg-color-1/80">
          <TableHead className="w-[20px] text-white">No</TableHead>
          <TableHead className="w-[160px] text-white">Nama Kelas</TableHead>
          <TableHead className="w-[300px] text-white">Guru</TableHead>
          <TableHead className="w-[120px] text-white">Jumlah Murid</TableHead>
          <TableHead className="w-[200px] text-white">Aksi</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="[&_tr:last-child]:border ">
        <AdminClassRows
          classes={classes}
          isLoadingGetClasses={isLoadingGetClasses}
          isSuccessGetClasses={isSuccessGetClasses}
          onDetailClass={onDetailClass}
          onEditClass={onEditClass}
          onDeleteClass={onDeleteClass}
        />
      </TableBody>
    </Table>
  )
}

AdminListClassTable.propTypes = {
  classes: PropTypes.array,
  isSuccessGetClasses: PropTypes.bool,
  isLoadingGetClasses: PropTypes.bool,
  onDetailClass: PropTypes.func,
  onEditClass: PropTypes.func,
  onDeleteClass: PropTypes.func,
}
