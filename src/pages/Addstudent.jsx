import React, { useState } from 'react'
import { Box,Typography,TextField,Button, Grid } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAlert } from '../components/CustomAlert';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const Addstudent = () => {
const navigate = useNavigate();
const [dob, setdob] = useState(null)
const{ showAlert}=useAlert();

const submitAddStudentData = async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const studentData = Object.fromEntries(formData.entries());

  console.log("Student DATA", studentData);

  try {
    const result = await axios.post("http://localhost:5000/api/createstudent",studentData);
    console.log("Result",result)
    showAlert("Student added successfully","success");
    } catch (error) {
    console.log("Error adding student:", error);
  }
};
  return (
    <>
<Box sx={{
      display: "flex",
      height: 600,
    //   mt: 10,
    //   ml: 40,
      width: 600,
      justifyContent: "center",
      alignItems: "center",
      boxShadow: 3,
      borderRadius: 5
    }}>
      <Box
        component="form"
        onSubmit={submitAddStudentData}
        sx={{
          mt: 1,
          gap: 1,
          width: "500px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column"
        }}
      >
        <Typography variant="h5">Add Student</Typography>
<Grid container spacing={2}>
                <Grid item size={{ md: 4 }}>
                  <TextField
                    fullWidth
                    label="First Name"
                    name="firstName"
                    required
                    disabled={false}
                  />
                </Grid>
                

                
                <Grid item size={{ md: 4 }}>
                  <TextField
                    fullWidth
                    label="Middle Name"
                    name="middleName"
                    required
                    disabled={false}
                  />
                </Grid>
                

                
                <Grid item size={{ md: 4 }}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    name="lastName"
                    required
                    disabled={false}
                  />
                </Grid>
                <Grid item size={{ md: 6 }}>
<LocalizationProvider dateAdapter={AdapterDayjs}>
  <DatePicker
    label="Date Of Birth"
    name='dateofbirth'
    format="DD/MM/YYYY"
    value={dob}
    onChange={(newValue) => setdob(newValue)}
    renderInput={(params) => (
      <TextField
        {...params}
        fullWidth
        required
      />
    )}
  />
</LocalizationProvider>
                </Grid>

                  <Grid item size={{ md: 6 }}>
                  <TextField
                    fullWidth
                    label="Phone No."
                    name="phoneNo"
                    required
                    disabled={false}
                  />
                </Grid>
                <Grid item size={{ md: 6 }}>
                  <TextField
                    fullWidth
                    label="Parent's Phone Number"
                    name="parentPhoneNo"
                    required
                    disabled={false}
                  />
                </Grid>
               
                <Grid item size={{ md: 6 }}>
                  <TextField
                    fullWidth
                    label="Academic Year"
                    name="academicYear"
                    required
                    disabled={false}
                  />
                </Grid>

                <Grid item size={{ md: 6 }}>
                  <TextField
                    fullWidth
                    label="Degree Course"
                    name="degreeCourse"
                    required
                    disabled={false}
                  />
                </Grid>
                <Grid item size={{ md: 6 }}>
                  <TextField
                    fullWidth
                    label="Branch"
                    name="Branch"
                    required
                    disabled={false}
                  />
                </Grid>

                
                </Grid>
        {/* <TextField name="firstName" label="First Name" variant="outlined" fullWidth required /> */}
        {/* <TextField name="middleName" label="Middle Name" variant="outlined" fullWidth /> */}
        {/* <TextField name="lastName" label="Last Name" variant="outlined" fullWidth required /> */}
        {/* <TextField name="dateofbirth" label="Date of Birth" type="date" required fullWidth /> */}
        <TextField name="college" label="College" required fullWidth />
        <TextField name="university" label="University" required fullWidth />
        {/* <TextField name="degreeCourse" label="Degree Course" required fullWidth /> */}
        {/* <TextField name="academicYear" label="Academic Year" required fullWidth /> */}
        {/* <TextField name="admissionCourse" label="Admission Course" required fullWidth /> */}
        {/* <TextField name="phoneNo" label="Phone Number" type="text" required fullWidth />
        <TextField name="parentPhoneNo" label="Parent's Phone Number" type="text" required fullWidth /> */}

        <Box sx={{ display: "flex", gap: 2 }}>
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 3, width: 200 }}> Add Student</Button>
          <Button variant="outlined" color="error" sx={{ mt: 3, width: 200 }} onClick={() => navigate("/")}>  Cancel</Button>
        </Box>
      </Box>
    </Box>
  </>
  )
}

export default Addstudent