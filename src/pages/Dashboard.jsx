import { Box, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
const COLORS = [
  "#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28EF5", "#FF69B4",
  "#BDB76B", "#4CAF50", "#CD5C5C", "#7B68EE"
]
const Dashboard = () => {
  const [counterData, setcounterData] = useState({})
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [enrollmentChartData, setEnrollmentChartData] = useState([]);
  useEffect(() => {
      let fetchCounterData =async()=>{
        try {
              const result = await axios.get("http://localhost:5000/api/fetchcounter")
       setcounterData(result.data.data)
        } catch (error) {
            console.log(error)
        }
         // Get total revenue
        const revenueRes = await axios.get("http://localhost:5000/api/fetchRevenue");
        setTotalRevenue(revenueRes.data?.data[0]?.totalRevenue || 0);

      const pieRes = await axios.get("http://localhost:5000/api/enrollment-pie");
        setEnrollmentChartData(pieRes.data.data);
     
        }
    fetchCounterData()
     
    }, [])
  return (
    <>
    Dashboard


    <Box sx={{display:"flex",gap:5,justifyContent:"center",alignItems:"center",p:5}}>
    <Box sx={{
     flexGrow:1,
      color: "#fff",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        background: "linear-gradient(135deg, #0088ffff 0%, #a9d7f8ff 100%)",
        transition: "transform 0.2s ease",
        "&:hover": {
          transform: "scale(1.05)",
        },
      borderRadius: 2,
      padding: 2,
      backgroundColor: "#3dabfeff", // light orange background,
      textAlign: "center",
      height:100
      
    }}>
    <Typography variant="h6">Total Student</Typography>
    <Typography variant="h6">{counterData.studentCounter}</Typography>
</Box>

<Box sx={{
     
      color: "#fff",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        background: "linear-gradient(135deg, #ff6600ff 0%, #fbde00ff 100%)",
        transition: "transform 0.2s ease",
        "&:hover": {
          transform: "scale(1.05)",
        },
      borderRadius: 2,
      padding: 2,
       height:100,
      backgroundColor: "#fe773dff", // light orange background,
      textAlign: "center",
     
      flexGrow:1,
    }}>
    <Typography variant="h6">Total Courses</Typography>
    <Typography variant="h6">{counterData.courseCounter}</Typography>
</Box>
<Box sx={{
     
      color: "#fff",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        background: "linear-gradient(135deg, #db03dfff 0%, #f6d0f9ff 100%)",
        transition: "transform 0.2s ease",
        "&:hover": {
          transform: "scale(1.05)",
        },
      borderRadius: 2,
      padding: 2,
      backgroundColor: "#e6b0ebff", // light orange background,
      textAlign: "center",
      flexGrow:1,
       height:100,
    }}>
    <Typography variant="h6">Total Project</Typography>
    <Typography variant="h6">{counterData.projectCounter}</Typography>
</Box>


<Box sx={{
     
      color: "#fff",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        background: "linear-gradient(135deg, #2dba06ff 0%, #a5f7abff 100%)",
        transition: "transform 0.2s ease",
        "&:hover": {
          transform: "scale(1.05)",
        },
      borderRadius: 2,
      padding: 2,
      backgroundColor: "#8cedadff", // light orange background,
      textAlign: "center",
      flexGrow:1,
       height:100
    }}>
    <Typography variant="h6">Total Revenue</Typography>
    <Typography variant="h6">{totalRevenue}</Typography>
   
</Box>
</Box>
<PieChart width={600} height={400}>
  <Pie
    data={enrollmentChartData}
    
    dataKey="studentCount"
    nameKey="courseName"
    cx="50%"
    cy="50%"
    outerRadius={150}
    label={({ name, studentCount }) => `${name}: ${studentCount}`}
  >
    {enrollmentChartData.map((entry, index) => (
      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
    ))}
  </Pie>
  <Tooltip />
  <Legend />
</PieChart>

    </>
  );
};

// Reusable style function
const cardStyle = (bg) => ({
  flexGrow: 1,
  color: "#fff",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  background: bg,
  transition: "transform 0.2s ease",
  "&:hover": {
    transform: "scale(1.05)"
  },
  borderRadius: 2,
  padding: 2,
  textAlign: "center",
  height: 100,
  minWidth: 180
});

  
export default Dashboard