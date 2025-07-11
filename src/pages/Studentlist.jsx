import React, { useEffect, useState } from "react";
import CustomTable from "../components/CustomTable";
import axios from "axios";
import { Tooltip, IconButton, Box } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from "react-router-dom";


const Studentlist = () => {
  const [studentsdata, setStudentsdata] = useState([]);
  let navigator = useNavigate()

  useEffect(() => {
    let fetchStudentData = async () => {
      try {
        let result = await axios.get("http://localhost:5000/api/fetchallstudents")
        setStudentsdata(result.data)
      } catch (error) {
        console.log(error);
      }
    }
    fetchStudentData()
  }, [])

  const columns = [
    { accessorKey: "firstName", header: "First Name" },
    { accessorKey: "middleName", header: "Middle Name" },
    { accessorKey: "lastName", header: "Last Name" },
    // { accessorKey: "dateofbirth", header: "Date of Birth" },
    { accessorKey: "college", header: "College" },
    // { accessorKey: "university", header: "University" },
    { accessorKey: "degreeCourse", header: "Degree/Course" },
    // { accessorKey: "academicYear", header: "Academic Year" },
    { accessorKey: "admissionCourse", header: "Admission Course" },
    { accessorKey: "phoneNo", header: "Phone Number" },
    // { accessorKey: "parentPhoneNo", header: "Parent Phone Number" },
    {
      header: "Actions",
      Cell: ({ row }) => {

        return (
          <Box display="flex" gap={1}>
            <Tooltip title="Delete">
              <IconButton
                color="error"
                onClick={() => {
                  console.log("Delete student", row._id);

                }}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="View Details">
              <IconButton
                color="primary"
                onClick={() => {
                  console.log("Navigate to student", row._id);
                  navigator("/studentdetails", {
                    state: row.original // pass the entire student object
                  });
                }}
              >
                <ArrowForwardIcon />
              </IconButton>
            </Tooltip>
          </Box>
        );
      }
    }
  ];

  return (
    <CustomTable
      data={studentsdata}
      columns={columns}
    />
  );
};

export default Studentlist;