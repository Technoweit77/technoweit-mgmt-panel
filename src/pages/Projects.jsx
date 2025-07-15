import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Tooltip, IconButton, Dialog, DialogTitle, DialogContent, FormControl, FormLabel, TextField, DialogActions } from '@mui/material';
import axios from 'axios';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import CustomTable from '../components/CustomTable'; // Reuse your existing table
import Autocomplete from '@mui/material/Autocomplete';


const Projects = () => {
  const [projectData, setProjectData] = useState([]);
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [studentData, setstudentData] = useState([])
  const [selectedStuds, setselectedStuds] = useState([])

  const [selectedProjStud, setselectedProjStud] = useState("")

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const result = await axios.get("http://localhost:5000/api/fetchallstudents");
        setstudentData(result.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };
    fetchStudents();
  }, []);
  // Fetch existing projects 
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const result = await axios.get("http://localhost:5000/api/fetchallprojects");
        setProjectData(result.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchProjects();
  }, []);

  // Create new project
  const addProject = async (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    const reqFormData = Object.fromEntries(formdata.entries());
    console.log("project data", reqFormData);

    try {
      await axios.post("http://localhost:5000/api/createproject", { ...reqFormData, assignToStudents: selectedStuds });
      setselectedStuds([])
      alert("Project added successfully");

    } catch (error) {
      console.log("Error adding project", error);
    }
  };


  let updateAssignProj = async () => {

    let reqData = {
      projectId: selectedProject._id,
      studentId: selectedStuds
    }
    try{
let result=await axios.put("http://localhost:5000/api/updateassignproject",reqData)
setAssignDialogOpen(false)
alert("updated sucessfully")
    }catch(error){
      console.log("error in update",error)
    }

  }
  const columns = [
    { accessorKey: "projectTitle", header: "Project Title" },
    { accessorKey: "description", header: "Description" },
    { accessorKey: "technology", header: "Technology" },
    { accessorKey: "duration", header: "Duration" },
    // { accessorKey: "assignToStudents", header: "Students" },

    {
      header: "Actions",
      Cell: ({ row }) => {
        return (
          <Box display="flex" gap={1}>

            <Tooltip title="Assign to student">
              <IconButton
                color="primary"
                onClick={() => {
                  setSelectedProject(row.original);
                  setAssignDialogOpen(true);
                }}
              >
                <PersonAddAlt1Icon />
              </IconButton>
            </Tooltip>
          </Box>
        );
      }
    }
  ];

  return (
    <>
      <CustomTable
        data={projectData}
        columns={columns}
        addButtonLabel='Add Project'
        onAddClick={() => setIsOpen(true)}
      />

      <Dialog open={isOpen} onClose={() => setIsOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add Project</DialogTitle>
        <form onSubmit={addProject}>
          <DialogContent>
            <FormControl fullWidth>
              <FormLabel>Project Title</FormLabel>
              <TextField name="projectTitle" type="text" variant="outlined" fullWidth />
            </FormControl>

            <FormControl fullWidth sx={{ mt: 2 }}>
              <FormLabel>Description</FormLabel>
              <TextField name="description" type="text" variant="outlined" fullWidth />
            </FormControl>

            <FormControl fullWidth sx={{ mt: 2 }}>
              <FormLabel>Technology</FormLabel>
              <TextField name="technology" type="text" variant="outlined" fullWidth />
            </FormControl>

            <FormControl fullWidth sx={{ mt: 2 }}>
              <FormLabel>Duration</FormLabel>
              <TextField name="duration" type="text" variant="outlined" fullWidth />
            </FormControl>

            <FormControl fullWidth sx={{ mt: 2 }}>
              <FormLabel>Students</FormLabel>
              <Autocomplete
                multiple
                options={studentData}
                getOptionLabel={(option) =>
                  option?.firstName ? `${option.firstName} ${option.lastName}` : ""
                }
                onChange={(event, value) => {
                  setselectedStuds(value.map((v) => v._id));
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Select Students" variant="outlined" />
                )}
              />
            </FormControl>
          </DialogContent>



          <DialogActions>
            <Button type="submit" variant="contained" color="primary">
              Add Project
            </Button>
            <Button onClick={() => setIsOpen(false)} color="secondary">
              Cancel
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <Dialog
        open={assignDialogOpen}
        onClose={() => setAssignDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Assign Students</DialogTitle>
        <DialogContent>
          <Typography>Students</Typography>
          <Autocomplete
            multiple
            options={studentData}
            getOptionLabel={(option) =>
              option?.firstName ? `${option.firstName} ${option.lastName}` : ""
            }
            onChange={(event, studeList) => {
              setselectedStuds(studeList.map((v) => v._id));
            }}
            renderInput={(params) => (
              <TextField {...params} label="Select Students" variant="outlined" />
            )}
          />
        </DialogContent>
        <DialogActions sx={{ display: "flex" }}>
          <Button onClick={() => updateAssignProj()} color="primary" variant='contained' >
            Assign to project
          </Button>
          <Button onClick={() => setAssignDialogOpen(false)} color="primary" variant='contained'>
            Close
          </Button>
        </DialogActions>

      </Dialog>
    </>
  );
};

export default Projects;