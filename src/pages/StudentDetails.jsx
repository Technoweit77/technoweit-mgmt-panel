import React, { useState } from 'react';
import { Box, Button, Dialog, TextField, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { PDFViewer,PDFDownloadLink } from "@react-pdf/renderer";
import Offerletter from "../docstemolates/Offerletter.jsx";
import CourseCompletion from '../docstemolates/CourseCompletion.jsx';
import Experianceletter from '../docstemolates/Experianceletter.jsx';
import Projectletter from '../docstemolates/Projectletter.jsx';

// path to your Offerletter component
const StudentDetails = () => {
  const studentData = useLocation().state;
  const [open, setOpen] = useState(false);
  console.log("Student Data from location state:", studentData);

  return (
    <>
      {/* Header and Buttons */}
      <Box sx={{ display: "flex", gap: 3, width: 1500, alignItems: "center" }}>
        {/* <Typography variant="h5">Student Details</Typography> */}
        <Box sx={{ ml: 50, gap: 3, display: "flex" }}>
          {/* course completion certificate */}
         <PDFDownloadLink
        document={<CourseCompletion data={studentData} />}
       fileName={`${studentData?.firstName}Course_Completion.pdf`}>
       <Button variant="contained" sx={{
        '&:hover, &:focus, &:active': {
    backgroundColor: 'hsla(220, 92%, 19%, 1.00)',
    boxShadow: 4,
  },
}}>
       course completion
      </Button>
     </PDFDownloadLink>
     {/* offer letter print  */}
     <PDFDownloadLink
        document={<Offerletter data={studentData} />}
       fileName={`${studentData?.firstName}offer_letter.pdf`}>
       <Button variant="contained" sx={{
        '&:hover, &:focus, &:active': {
    backgroundColor: 'hsla(220, 92%, 19%, 1.00)',
    boxShadow: 4,
  },
}}>Offer Letter</Button>
        </PDFDownloadLink>
        {/* project letter */}
         <PDFDownloadLink
           document={<Projectletter data={studentData} />}
           fileName={`${studentData?.firstName}project_letter.pdf`}>
          <Button variant="contained" sx={{
        '&:hover, &:focus, &:active': {
    backgroundColor: 'hsla(220, 92%, 19%, 1.00)',
    boxShadow: 4,
  },
}}>Project Letter</Button>
          </PDFDownloadLink>
          {/* experience letter */}
           <PDFDownloadLink
           document={<Experianceletter data={studentData} />}
           fileName={`${studentData?.firstName}Experiance_letter.pdf`}>
          <Button variant="contained" sx={{
        '&:hover, &:focus, &:active': {
    backgroundColor: 'hsla(220, 92%, 19%, 1.00)',
    boxShadow: 4,
  },
}}>Experience Letter</Button>
          </PDFDownloadLink>
        </Box>
      </Box>

      {/* Profile Image + Name + Phone */}
      <Box sx={{ display: "flex" }}>

        <Box sx={{ display: "flex" }}>
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
        <Box sx={{ ml: 10, p: 2, width: 1000, mb: 5 }}>
          <Typography variant="body1" fontSize={40}> {`${studentData.firstName} ${studentData.middleName} ${studentData.lastName}`} </Typography>
          <Typography variant="body1" fontSize={30}>  {studentData.phoneNo}</Typography>
        </Box>
      </Box>

      {/* Details Section */}
      <Box sx={{ display: "flex", gap: 5, mt: 2 }}>
        {/* Left Info Box */}
        <Box
          sx={{
            ml: 8,
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
           <Typography variant="body1" fontSize={18}>Salutation: {studentData.salutations}</Typography>
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
          <Typography variant="body1" fontSize={18}>Course: {studentData.courseName}</Typography>
          <Typography variant="body1" fontSize={18}>Total Fees: {studentData.totalFees}</Typography>
          <Typography variant="body1" fontSize={18}>Paid Fees: {studentData.paidFees}</Typography>
          <Typography variant="body1" fontSize={18}>Remaining Fees: {studentData.remainingFees}</Typography>
          <Button sx={{ mt: 20, ml: 35 }} variant="contained" onClick={() => setOpen(true)}>Pay Now</Button>
          <Dialog open={open} onClose={() => setOpen(false)}>
            <div style={{ padding: 20, gap: 2 }}>
              <Typography sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>Payment Details</Typography>
              <Typography>Course:{studentData.courseName}</Typography>
              <Typography>Total fee:{studentData.totalFees}</Typography>
              <TextField label="Payable Amount:" required disabled={false} />
              <Button sx={{ mt: 10, mr: 1 }} variant="contained" >Pay</Button>
              <Button sx={{ mt: 10 }} variant="contained" onClick={() => setOpen(false)}>Close</Button>
            </div>
          </Dialog>
        </Box>
      </Box>
    </>
  );
};

export default StudentDetails;
