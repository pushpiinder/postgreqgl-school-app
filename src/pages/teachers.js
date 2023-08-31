import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Teacher() {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/teachers", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => (Array.isArray(data) ? setTeachers(data) : () => null));
  }, []);

  return (
    <Table>
      <TableCaption>A list of all teachers.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">First name</TableHead>
          <TableHead>Last name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Age</TableHead>
          <TableHead className="text-right">Gender</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {teachers.map((each) => {
          return (
            <TableRow>
              <TableCell className="font-medium">{each.firstName}</TableCell>
              <TableCell>{each.lastName}</TableCell>
              <TableCell>{each.email}</TableCell>
              <TableCell>{each.age}</TableCell>
              <TableCell className="text-right">{each.gender}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}