import express from "express"
import { createStudent,fetchAllStudents,deleteStudent } from "../Controller/StudentController.js"
let studentRouter = express.Router()

studentRouter.get("/fetchallstudents",fetchAllStudents)
studentRouter.post("/createstudent",createStudent)
studentRouter.delete("/deletestudent",deleteStudent)
export default studentRouter