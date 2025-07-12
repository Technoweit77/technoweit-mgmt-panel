import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';

const StudentDetails = () => {
  const studentData = useLocation().state;
  console.log("Student Data from location state:", studentData);

  return (
    <>
      {/* Header and Buttons */}
      <Box sx={{ display: "flex", gap: 3, width: 1500, alignItems: "center"}}>
        {/* <Typography variant="h5">Student Details</Typography> */}
        <Box sx={{ ml: 50, gap: 3, display: "flex" }}>
          <Button variant="contained">Course completion</Button>
          <Button variant="contained">Offer Letter</Button>
          <Button variant="contained">Project Letter</Button>
          <Button variant="contained">Experience Letter</Button>
        </Box>
      </Box>

      {/* Profile Image + Name + Phone */}
      <Box sx={{ display: "flex" }}>
        
        <Box sx={{display:"flex"}}>
          <Box
            component="img"
            src={`http://localhost:5000/${studentData.imageUrl}`}
            alt="Student"
            sx={{
            height: "180px",
            width: "165px",
            borderRadius: '50%', overflow: 'hidden',
            display: 'flex',
            boxShadow: 3,
            
            }}
          />
        </Box>

        {/* Name and Phone */}
        <Box sx={{ ml: 10, p: 2, width: 1000 ,mb:5}}>
          <Typography variant="body1" fontSize={40}> {`${studentData.firstName} ${studentData.middleName} ${studentData.lastName}`} </Typography>
          <Typography variant="body1" fontSize={30}>  {studentData.phoneNo}</Typography>
        </Box>
      </Box>

      {/* Details Section */}
      <Box sx={{ display: "flex", gap: 5, mt: 2 }}>
        {/* Left Info Box */}
        <Box
          sx={{
            ml:8,
      borderRadius: 3,
      boxShadow: 4,
      padding: 3,
      width: 500,
      backgroundColor: '#f9f9f9',
      transition: '0.3s',
      '&:hover': {
        boxShadow: 6,
        backgroundColor: '#f1f1f1'
        
      },
    }}
        >
          <Typography variant="body1" fontSize={18}>First Name: {studentData.firstName}</Typography>
          <Typography variant="body1" fontSize={18}>Middle Name: {studentData.middleName}</Typography>
          <Typography variant="body1" fontSize={18}>Last Name: {studentData.lastName}</Typography>
          <Typography variant="body1" fontSize={18}>Date of Birth: {studentData.dateofbirth}</Typography>
          <Typography variant="body1" fontSize={18}>College: {studentData.college}</Typography>
          <Typography variant="body1" fontSize={18}>University: {studentData.university}</Typography>
          <Typography variant="body1" fontSize={18}>Degree/Course: {studentData.degreeCourse}</Typography>
          <Typography variant="body1" fontSize={18}>Academic Year: {studentData.academicYear}</Typography>
          <Typography variant="body1" fontSize={18}>Branch: {studentData.Branch}</Typography>
          <Typography variant="body1" fontSize={18}>Phone No: {studentData.phoneNo}</Typography>
          <Typography variant="body1" fontSize={18}>Parent Phone No: {studentData.parentPhoneNo}</Typography>
        </Box>

        {/* Right Info Box */}
        <Box
          sx={{
      borderRadius: 3,
      boxShadow: 4,
      padding: 3,
      width: 500,
      backgroundColor: '#f9f9f9',
      transition: '0.3s',
      '&:hover': {
        boxShadow: 6,
        backgroundColor: '#f1f1f1',
      },
    }}
        >
          <Typography variant="body1" fontSize={18}>Course: {}</Typography>
          <Typography variant="body1" fontSize={18}>Total Fees: {}</Typography>
          <Typography variant="body1" fontSize={18}>Paid Fees: {}</Typography>
          <Typography variant="body1" fontSize={18}>Remaining Fees: {}</Typography>
        </Box>
      </Box>
    </>
  );
}
export default StudentDetails;