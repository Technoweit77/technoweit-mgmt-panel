import React, { useEffect, useState } from 'react';
import CustomTable from '../components/CustomTable'; 
import axios from 'axios';
import { Box, Typography,Button,Tooltip, IconButton,Dialog,DialogTitle,DialogContent,FormControl,FormLabel,TextField,DialogActions} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'; 

const Courses = () => {
  const [coursedata, setcoursedata] = useState([]);
  let [isOpen,setIsOpen]=useState(false)

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const result = await axios.get("http://localhost:5000/api/fetchallcourse");
        setcoursedata(result.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCourses();
  }, []);

 let addcourses = async (e) => {
  e.preventDefault();
  let formData = new FormData(e.target);
  let reqFormData = Object.fromEntries(formData.entries());
  console.log("formdata", reqFormData);
  try {
    const result = await axios.post("http://localhost:5000/api/createcourse",reqFormData);
    alert("Course added successfully");
  } catch (error) {
    console.log("Error adding course:", error);
  }
};
  const columns = [
    { accessorKey: "name", header: "Name" },
    { accessorKey: "duration", header: "Duration" },
    { accessorKey: "fees", header: "Fees" },
    { accessorKey: "technology", header: "Technology" },
  
    {
      header: "Actions",
      Cell: ({ row }) => {
        return (
          <Box display="flex" gap={1}>
            <Tooltip title="Delete">
              <IconButton
                color="error"
                onClick={() => {
                  console.log("Delete course", row.original._id); 
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Box>
        );
      }
    }
  ];

  return (
    <>
      <Box>
        <Typography sx={{ mt: 10,textAlign:'center'}}>COURSES</Typography>
      </Box>
      <CustomTable data={coursedata} columns={columns}addButtonLabel='add course' onAddClick={()=>setIsOpen(true)}/>
    {/* //dialog box */}
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} maxWidth="sm" fullWidth>
  <DialogTitle>Add New Course</DialogTitle>

  <form onSubmit={addcourses}>
    <DialogContent>
      <FormControl fullWidth>
        <FormLabel>Name</FormLabel>
        <TextField
          name="name"
          type="text"
          variant="outlined"
          fullWidth
         
        /> </FormControl>

      <FormControl fullWidth>
        <FormLabel>Duration</FormLabel>
        <TextField
          name="duration"
          type="text"
          variant="outlined"
          fullWidth
        />
      </FormControl>

      <FormControl fullWidth>
        <FormLabel>Fee</FormLabel>
        <TextField
          name="fees"
          type="number"
          variant="outlined"
          fullWidth />
      </FormControl>

      <FormControl fullWidth>
        <FormLabel>Technology</FormLabel>
        <TextField
          name="technology"
          type="text"
          variant="outlined"
          fullWidth/>
      </FormControl>
    </DialogContent>

    <DialogActions>
      <Button type="submit" variant="contained" color="primary">
        Add Course
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

export default Courses;