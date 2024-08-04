import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"
import PropTypes from "prop-types"

function ParentStudentByClassRows({
  currentStudentId,
  students,
  isSuccessGetStudents,
  isLoadingGetStudents,
}) {
  let tableContent

  if (!isLoadingGetStudents && isSuccessGetStudents && students.length > 0) {
    tableContent = students.map((c, index) => {
      return (
        <TableRow
          className={cn("border text-black", {
            "bg-slate-700 text-white": Number(currentStudentId) === c?.id,
          })}
          key={index + 1}>
          <TableCell className="font-medium">{index + 1}</TableCell>
          <TableCell>{c?.nisn || "-"}</TableCell>
          <TableCell>{c?.name || "-"}</TableCell>
          <TableCell>{!c?.gender ? "-" : c?.gender === "P" ? "Perempuan" : "Laki-Laki"}</TableCell>
          <TableCell>{c?.parent?.name || "-"}</TableCell>
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
          {/* <TableCell className="font-medium">-</TableCell> */}
        </TableRow>
      )
    })
  } else {
    tableContent = (
      <TableRow className="border ">
        <TableCell colSpan={5} className="text-center">
          Siswa tidak ditemukan!
        </TableCell>
      </TableRow>
    )
  }

  return tableContent
}

export default function ParentStudentListByClassTable({
  students,
  isSuccessGetStudents,
  isLoadingGetStudents,
  currentStudentId,
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-color-1   hover:bg-color-1/80">
          <TableHead className="w-[20px] text-white">No</TableHead>
          <TableHead className="w-[160px] text-white">NISN</TableHead>
          <TableHead className="w-[300px] text-white">Nama</TableHead>
          <TableHead className="w-[300px] text-white">Jenis Kelamin</TableHead>
          <TableHead className="w-[300px] text-white">Orang Tua</TableHead>
          {/* <TableHead className="w-[300px] text-white">Aksi</TableHead> */}
        </TableRow>
      </TableHeader>
      <TableBody className="[&_tr:last-child]:border ">
        <ParentStudentByClassRows
          students={students}
          currentStudentId={currentStudentId}
          isLoadingGetStudents={isLoadingGetStudents}
          isSuccessGetStudents={isSuccessGetStudents}
        />
      </TableBody>
    </Table>
  )
}

ParentStudentListByClassTable.propTypes = {
  currentStudentId: PropTypes.string,
  students: PropTypes.array,
  isSuccessGetStudents: PropTypes.bool,
  isLoadingGetStudents: PropTypes.bool,
}
