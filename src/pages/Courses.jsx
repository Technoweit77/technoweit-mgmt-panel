import React, { useEffect, useState } from 'react';
import CustomTable from '../components/CustomTable';
import axios from 'axios';
import {
  Box, Typography, Button, Tooltip, IconButton, Dialog, DialogTitle,
  DialogContent, FormControl, FormLabel, TextField, DialogActions
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const Courses = () => {
  const [coursedata, setcoursedata] = useState([]);
  const [isOpen, setIsOpen] = useState(false); // for Add dialog
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false); //for Update dialog
  const [selectedcourse, setselectedcourse] = useState(null);
  const [newfees, setnewfees] = useState('');

  const fetchCourses = async () => {
    try {
      const result = await axios.get("http://localhost:5000/api/fetchallcourse");
      setcoursedata(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const addcourses = async (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    let reqFormData = Object.fromEntries(formData.entries());
    try {
      await axios.post("http://localhost:5000/api/createcourse", reqFormData);
      alert("Course added successfully");
      setIsOpen(false);
      fetchCourses();
    } catch (error) {
      console.log("Error adding course:", error);
    }
  };

  const openUpdateDialog = (course) => {
    setselectedcourse(course._id);
    setnewfees(course.fees);
    setUpdateDialogOpen(true);
  };

  const updatedata = async () => {
    try {
      await axios.put("http://localhost:5000/api/updatecourse", {
        courseId: selectedcourse,
        fees: newfees
      });
      alert("Course updated successfully");
      setUpdateDialogOpen(false);
      setselectedcourse(null);
      setnewfees(0);
      fetchCourses();
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  const deleteCourse = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/deletecourse/${id}`);
      alert("Course deleted successfully");
      fetchCourses();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const columns = [
    { accessorKey: "name", header: "Name" },
    { accessorKey: "duration", header: "Duration" },
    { accessorKey: "fees", header: "Fees" },
    { accessorKey: "technology", header: "Technology" },
    {
      header: "Actions",
      Cell: ({ row }) => (
        <Box display="flex" gap={1}>
          <Tooltip title="Delete">
            <IconButton
              color="error"
              onClick={() => deleteCourse(row.original._id)}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Update Fee">
            <IconButton
              color="primary"
              onClick={() => openUpdateDialog(row.original)}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
        </Box>
      )
    }
  ];

  return (
    <>
      <Box>
        <Typography sx={{ mt: 10, textAlign: 'center' }}>COURSES</Typography>
      </Box>

      <CustomTable
        data={coursedata}
        columns={columns}
        addButtonLabel='Add Course'
        onAddClick={() => setIsOpen(true)}
      />

      {/* Add Course Dialog */}
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Course</DialogTitle>
        <form onSubmit={addcourses}>
          <DialogContent>
            <FormControl fullWidth>
              <FormLabel>Name</FormLabel>
              <TextField name="name" type="text" variant="outlined" fullWidth />
            </FormControl>

            <FormControl fullWidth>
              <FormLabel>Duration</FormLabel>
              <TextField name="duration" type="text" variant="outlined" fullWidth />
            </FormControl>

            <FormControl fullWidth>
              <FormLabel>Fees</FormLabel>
              <TextField name="fees" type="number" variant="outlined" fullWidth />
            </FormControl>

            <FormControl fullWidth>
              <FormLabel>Technology</FormLabel>
              <TextField name="technology" type="text" variant="outlined" fullWidth />
            </FormControl>
          </DialogContent>

          <DialogActions>
            <Button type="submit" variant="contained" color="primary">Add Course</Button>
            <Button onClick={() => setIsOpen(false)} color="secondary">Cancel</Button>
          </DialogActions>
        </form>
      </Dialog>

      
      <Dialog open={updateDialogOpen} onClose={() => setUpdateDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Update Course Fee</DialogTitle>
        <DialogContent>
          <FormControl fullWidth>
            <FormLabel>New Fee</FormLabel>
            <TextField
              type="number"
              variant="outlined"
              value={newfees}
              onChange={(e) => setnewfees(e.target.value)}
              fullWidth
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={updatedata} variant="contained" color="primary">Update</Button>
          <Button onClick={() => setUpdateDialogOpen(false)} color="secondary">Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Courses;
