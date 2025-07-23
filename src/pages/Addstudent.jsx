import React, { useState } from 'react'
import { Box, Typography, TextField, Button, Grid, FormLabel, FormControl, Autocomplete } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAlert } from '../components/CustomAlert';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const Addstudent = () => {
  const navigate = useNavigate();
  const [dob, setdob] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null);
  const [salutations, setsalutations] = useState("")
  const { showAlert } = useAlert();

  const salutationsData = ["Mr.", "Miss.", "Mrs."]

  const submitAddStudentData = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const studentData = Object.fromEntries(formData.entries());

    console.log("Student DATA", studentData);


    try {

      const result = await axios.post("http://localhost:5000/api/createstudent", { ...studentData, salutations, studentimage: selectedImage },
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      console.log("Result", result)
      showAlert("Student added successfully", "success");
    } catch (error) {
      console.log("Error adding student:", error);
    }
  };
  return (
    <>
      <Box sx={{
        display: "flex",
        height: 600,
          mt: 5,
        //   ml: 40,
        // width: 600,
        justifyContent: "center",
        alignItems: "center",
        boxShadow: 3,
        borderRadius: 5,
        position: 'absolute',
        top: "53%",
        left: "50%",
        width: "45%",
        transform: "translate(-50%,-50%)"
      }}>
        <Box
          component="form"
          onSubmit={submitAddStudentData}
          sx={{
           
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
              <FormControl fullWidth >
                <FormLabel>Salutaions</FormLabel>
              
                <Autocomplete
                
                  name="salutations"
                  options={salutationsData}
                  value={salutations}
                  onChange={(e, newValue) => {
                    setsalutations(newValue)
                  }}
                  renderInput={(params) => (
                    <TextField {...params} required />
                  )}
                />
              </FormControl>

            </Grid>


            <Grid item size={{ md: 4 }}>
              <TextField sx={{mt:2.7}}
                fullWidth
                label="First Name"
                name="firstName"
                required
                disabled={false}
              />
            </Grid>

            <Grid item size={{ md: 4 }}>
              <TextField sx={{mt:2.7}}
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
{/* <TextField  name="college" label="College" required  /> */}
           <Grid item size={{ md: 6 }}>
              <TextField
                fullWidth
                label="College"
                name="college"
                required
                disabled={false}
              />
            </Grid>
          </Grid>
          
          
          <TextField name="university" label="University" required fullWidth />
          

          <Grid item >
            <TextField sx={{ width: 500 }}
              type="file"
              onChange={(e) => setSelectedImage(e.target.files[0])}
              name="studentimage"
              label="Student Image*"
              variant="outlined"
              InputLabelProps={{ sx: { pl: 40 },}} // Adds padding to the label 
              />
            </Grid>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button type="submit" variant="contained" color="primary" sx={{ width: 200 }}> Add Student</Button>
            <Button variant="outlined" color="error" sx={{ width: 200 }} onClick={() => navigate("/")}>  Cancel</Button>
          </Box>
        </Box>
      </Box >
    </>
  )
}

export default Addstudent