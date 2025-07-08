import express from "express"
import { createStudent,fetchAllStudents,deleteStudent ,updateStudent} from "../Controller/StudentController.js"
let studentRouter = express.Router()

studentRouter.get("/fetchallstudents",fetchAllStudents)
studentRouter.post("/createstudent",createStudent)
studentRouter.delete("/deletestudent",deleteStudent)
studentRouter.put("/updatestudent",updateStudent)

export default studentRouter