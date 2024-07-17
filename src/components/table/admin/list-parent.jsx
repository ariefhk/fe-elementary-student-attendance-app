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

function AdminParentRows({
  parents,
  isSuccessGetParents,
  isLoadingGetParents,
  onEditParent,
  onDeleteParent,
}) {
  let tableContent

  if (!isLoadingGetParents && isSuccessGetParents && parents.length > 0) {
    tableContent = parents.map((t, index) => {
      return (
        <TableRow className="border " key={index + 1}>
          <TableCell className="font-medium">{index + 1}</TableCell>
          <TableCell>{t?.name || "-"}</TableCell>
          <TableCell>{t?.email || "-"}</TableCell>
          <TableCell>{t?.phone || "-"}</TableCell>
          <TableCell className="flex gap-x-2">
            <Button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onEditParent(t)
              }}>
              <BsPencil className="flex-shrink-0 w-5 h-5" />
            </Button>
            <Button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onDeleteParent(t)
              }}
              variant="destructive">
              <FaRegTrashAlt className="flex-shrink-0 w-5 h-5" />
            </Button>
          </TableCell>
        </TableRow>
      )
    })
  } else if (isLoadingGetParents) {
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
          </TableCell>
        </TableRow>
      )
    })
  } else {
    tableContent = (
      <TableRow className="border ">
        <TableCell colSpan={7} className="text-center">
          Orang tua tidak ditemukan!
        </TableCell>
      </TableRow>
    )
  }

  return tableContent
}

export default function AdminListParentTable({
  parents,
  isSuccessGetParents,
  isLoadingGetParents,
  onEditParent,
  onDeleteParent,
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-color-1   hover:bg-color-1/80">
          <TableHead className="w-[20px] text-white">No</TableHead>
          <TableHead className="w-[200px] text-white">Nama</TableHead>
          <TableHead className="w-[200px] text-white">Email</TableHead>
          <TableHead className="w-[200px] text-white">No Telp</TableHead>
          <TableHead className="w-[200px] text-white">Aksi</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="[&_tr:last-child]:border ">
        <AdminParentRows
          parents={parents}
          isLoadingGetParents={isLoadingGetParents}
          isSuccessGetParents={isSuccessGetParents}
          onDeleteParent={onDeleteParent}
          onEditParent={onEditParent}
        />
      </TableBody>
    </Table>
  )
}

AdminListParentTable.propTypes = {
  parents: PropTypes.array,
  isSuccessGetParents: PropTypes.bool,
  isLoadingGetParents: PropTypes.bool,
  onEditParent: PropTypes.func,
  onDeleteParent: PropTypes.func,
}