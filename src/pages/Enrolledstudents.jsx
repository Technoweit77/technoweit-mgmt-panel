import React, { useEffect, useState } from "react";
import CustomTable from "../components/CustomTable";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import axios from "axios";
import { Avatar, Box, IconButton, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Enrolledstudent = () => {
  const [students, setStudents] = useState([]);
const navigator = useNavigate();
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
    },
    {
          header: "Actions",
          Cell: ({ row }) => (
            <Box display="flex" gap={1}>
              
              <Tooltip title="View Details">
                <IconButton
                  color="primary"
                  onClick={() => {
                    navigator("/studentdetails", {
                      state: { ...row.original.student, ...row.original }
                    });
                  }}
                >
                  <ArrowForwardIcon />
                </IconButton>
              </Tooltip>
            </Box>
          )
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
