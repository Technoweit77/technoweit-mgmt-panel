import React, { useEffect, useState } from "react";
import CustomTable from "../components/CustomTable";
import axios from "axios";
import {
  Box, Button, Tooltip, IconButton, Dialog, DialogTitle, DialogContent,
  FormControl, FormLabel, TextField, DialogActions, Autocomplete,
  Avatar
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from "react-router-dom";

const Studentlist = () => {
  const [studentsdata, setStudentsdata] = useState([]);
  const [coursedata, setcoursedata] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const [formData, setFormData] = useState({
    student: "",
    course: "",
    joinDate: "",
    totalFee: "",
    paidFees: ""
  });

  const navigator = useNavigate();

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const result = await axios.get("http://localhost:5000/api/fetchallstudents");
        setStudentsdata(result.data);
      } catch (error) {
        console.log("Error fetching students:", error);
      }
    };

    const fetchCourses = async () => {
      try {
        const result = await axios.get("http://localhost:5000/api/fetchallcourse");
        setcoursedata(result.data);
        console.log("Courses fetched:", result.data);
      } catch (error) {
        console.log("Error fetching courses:", error);
      }
    };

    fetchStudentData();
    fetchCourses();
  }, []);

  const submitformdata = async (e) => {
    e.preventDefault();
    console.log("Enroll form submitted:", formData);
    try {
      const result = await axios.post("http://localhost:5000/api/createEnrollment", formData);
      alert("Enrolled student successfully");
      setIsOpen(false);
      setFormData({
        student: "",
        course: "",
        joinDate: "",
        totalFee: "",
        paidFees: ""
      });
    } catch (error) {
      console.log("Error enrolling student:", error);
    }
  };

  const columns = [
    {
      header: "Photo",
      accessorKey: "imageUrl",
      Cell: ({ row }) => (
        <Avatar
          alt={`${row.original.firstName} ${row.original.lastName}`}
          src={`http://localhost:5000/${row.original.student.imageUrl}`}
          sx={{ width: 40, height: 40 }}
        />
      )
    },
    { accessorKey: "student.firstName", header: "First Name" },
    { accessorKey: "student.middleName", header: "Middle Name" },
    { accessorKey: "student.lastName", header: "Last Name" },
    { accessorKey: "student.college", header: "College" },
    { accessorKey: "student.degreeCourse", header: "Degree/Course" },
    { accessorKey: "student.Branch", header: "Branch" },
    { accessorKey: "student.phoneNo", header: "Phone Number" },
    {
      header: "Actions",
      Cell: ({ row }) => (
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
    <>
      <CustomTable
        data={studentsdata}
        columns={columns}
        addButtonLabel="Enroll"
        onAddClick={() => setIsOpen(true)}
      />

      {/* Enroll Dialog */}
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} maxWidth="sm">
        <DialogTitle>Enroll Student</DialogTitle>
        <form onSubmit={submitformdata}>
          <DialogContent>

            {/* Student Autocomplete */}
            <FormControl fullWidth >
              <FormLabel>Select Student</FormLabel>
              <Autocomplete
                options={studentsdata}
                getOptionLabel={(option) =>
                  option?.firstName ? `${option.firstName} ${option.lastName}` : ""
                }
                value={studentsdata.find((s) => s._id === formData.student) || null}
                onChange={(e, value) =>
                  setFormData({ ...formData, student: value?._id || "" })
                }
                renderInput={(params) => (
                  <TextField {...params} required />
                )}
              />
            </FormControl>

            <FormControl fullWidth >
              <FormLabel>Select Course</FormLabel>
              <Autocomplete
                options={coursedata}
                getOptionLabel={(option) =>
                  option?.name ? option.name : ""
                }
                value={coursedata.find((c) => c._id === formData.course) || null}
                onChange={(e, value) => {
                  setFormData({ ...formData, course: value?._id || "", totalFee: value?.fees || "" })
                }}
                renderInput={(params) => (
                  <TextField {...params} required />
                )}
              />
            </FormControl>

            <FormControl fullWidth >
              <FormLabel>Join Date</FormLabel>
              <TextField
                type="text"
                fullWidth
                value={formData.joinDate}
                onChange={(e) => setFormData({ ...formData, joinDate: e.target.value })}
              />
            </FormControl>

            <FormControl fullWidth >
              <FormLabel>Total Fee</FormLabel>
              <TextField
                type="number"
                fullWidth
                value={formData.totalFee}
                onChange={(e) => setFormData({ ...formData, totalFee: e.target.value })}
              />
            </FormControl>

            <FormControl fullWidth >
              <FormLabel>Paid Fee</FormLabel>
              <TextField
                type="number"
                fullWidth
                value={formData.paidFees}
                onChange={(e) => setFormData({ ...formData, paidFees: e.target.value })}
              />
            </FormControl>

          </DialogContent>
          <DialogActions>
            <Button type="submit" variant="contained" color="primary">
              Enroll
            </Button>
            <Button onClick={() => setIsOpen(false)} color="secondary">
              Cancel
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default Studentlist;