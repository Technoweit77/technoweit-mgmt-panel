import React from 'react'
import { Box, Typography,Button,Tooltip, IconButton,Dialog,DialogTitle,DialogContent,FormControl,FormLabel,TextField,DialogActions} from '@mui/material';
import axios from 'axios';
import CustomTable from '../components/CustomTable'; 
import DeleteIcon from '@mui/icons-material/Delete'; 
import{useState,useEffect} from 'react'



const Users = () => {
let [userdata,setuserdata]=useState([])
let[isOpen,setIsOpen]=useState(false)
useEffect(() => {
    const fetchuser= async () => {
      try {
        const result = await axios.get("http://localhost:5000/api/fetchallusers");//fetchuser
        setuserdata(result.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchuser();
  }, []);
  //createuser

let adduser = async (e) => {
  e.preventDefault();

  const formdata = new FormData(e.target);
  const reqFormData = Object.fromEntries(formdata.entries());
  console.log("user data", reqFormData);

  try {
    const result = await axios.post("http://localhost:5000/api/createuser", reqFormData)
    alert("User added successfully");
  } catch (error) {
    console.log("Error adding user", error);
  }
};
  const columns = [
    { accessorKey: "name", header: "Name" },
    { accessorKey: "mobileNo", header: "mobileNo" },
    { accessorKey: "userType", header: "userType" },
  
  
    {
      header: "Actions",
      Cell: ({ row }) => {
        return (
          <Box display="flex" gap={1}>
            <Tooltip title="Delete">
              <IconButton
                color="error"
                onClick={() => {
                  console.log("Delete user", row.original._id); 
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
      <Typography sx={{mt:10,
        textAlign:'center'
      }}>USERS</Typography>
    </Box>
    <CustomTable data={userdata} columns={columns} addButtonLabel='Add User'onAddClick={()=>setIsOpen(true)}/> 
        <Dialog open={isOpen} onClose={() => setIsOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add User</DialogTitle>
      
        <form onSubmit={adduser}>
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
              <FormLabel>MobileNo</FormLabel>
              <TextField
                name="mobileNo"
                type="text"
                variant="outlined"
                fullWidth
              />
            </FormControl>
      
            <FormControl fullWidth>
              <FormLabel>UserType</FormLabel>
              <TextField
                name="userType"
                type="text"
                variant="outlined"
                fullWidth />
            </FormControl>
          </DialogContent>
      
          <DialogActions>
            <Button type="submit" variant="contained" color="primary">
              Add User
            </Button>
            <Button onClick={() => setIsOpen(false)} color="secondary">
              Cancel
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      
     </>
  )
}

export default Users