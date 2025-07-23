import React, { useEffect, useState } from "react";
import CustomTable from "../components/CustomTable";
import axios from "axios";
import { Avatar } from "@mui/material";

const Enrolledstudent = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchEnrolledStudents = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/fetchenrolledstudents"); // Your backend route
        setStudents(res.data);
      } catch (error) {
        console.error("Error fetching enrolled students:", error);
      }
    };

    fetchEnrolledStudents();
  }, []);

  const columns = [
    {
      header: "Photo",
      accessorKey: "student.imageUrl",
      Cell: ({ row }) => (
        <Avatar
          alt={`${row.original.student.firstName} ${row.original.student.lastName}`}
          src={`http://localhost:5000/${row.original.student.imageUrl}`}
          sx={{ width: 40, height: 40 }}
        />
      )
    },
    { accessorKey: "student.firstName", header: "First Name" },
    { accessorKey: "student.lastName", header: "Last Name" },
    { accessorKey: "courseName", header: "Course" },
    { accessorKey: "totalFees", header: "Total Fees" },
    { accessorKey: "paidFees", header: "Paid" },
    { accessorKey: "remainingFees", header: "Remaining" },
    
    {
      accessorKey: "joinDate",
      header: "Join Date",
      Cell: ({ cell }) =>
        cell.getValue() ? new Date(cell.getValue()).toLocaleDateString() : "-"
    }
  ];

  return (
    <CustomTable
      data={students}
      columns={columns}
      addButtonLabel={null} // Hides the add button
      onAddClick={null}
    />
  );
};

export default Enrolledstudent;
