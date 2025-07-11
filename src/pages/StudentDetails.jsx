import React from 'react';
import { Box, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';

const StudentDetails = () => {
  const studentData = useLocation().state;
  console.log("Student Data from location state:", studentData);

  if (!studentData) {
    return <Typography sx={{ mt: 2 }}>Student data not available.</Typography>;
  }

  return (
    <>
      <Typography variant="h5" sx={{ mt: 2, mb: 2 }}>Student Details</Typography>

      <Box sx={{ display: 'flex', gap: 2 }}>
        {/* Profile Circle */}
        <Box
          sx={{
            height: 100,
            width: 100,
            backgroundColor: 'lightgrey',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography>Img</Typography>
        </Box>

        {/* Student Info Card */}
        <Box
          sx={{
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: 2,
            mt:14,
            width:500
          }}
        >
          <Typography variant="body1">First Name: {studentData.firstName}</Typography>
          <Typography variant="body1">Middle Name: {studentData.middleName}</Typography>
          <Typography variant="body1">Last Name: {studentData.lastName}</Typography>
          <Typography variant="body1">Date of Birth: {studentData.dateofbirth}</Typography>
          <Typography variant="body1">College: {studentData.college}</Typography>
          <Typography variant="body1">University: {studentData.university}</Typography>
          <Typography variant="body1">Degree/Course: {studentData.degreeCourse}</Typography>
          <Typography variant="body1">Academic Year: {studentData.academicYear}</Typography>
          <Typography variant="body1">Admission Course: {studentData.admissionCourse}</Typography>
          <Typography variant="body1">Phone No: {studentData.phoneNo}</Typography>
          <Typography variant="body1">Parent Phone No: {studentData.parentPhoneNo}</Typography>
        </Box>
      </Box>
    </>
  );
};

export default StudentDetails;