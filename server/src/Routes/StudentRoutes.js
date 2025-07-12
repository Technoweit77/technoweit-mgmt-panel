import express from "express"
import { createStudent,fetchAllStudents,deleteStudent ,updateStudent} from "../Controller/StudentController.js"
import { upload } from "../Middleware/FileUploadMiddleware.js"

let studentRouter = express.Router()

studentRouter.get("/fetchallstudents",fetchAllStudents)
studentRouter.post("/createstudent",upload.single("studentimage"),createStudent)
studentRouter.delete("/deletestudent",deleteStudent)
studentRouter.put("/updatestudent",updateStudent)

export default studentRouter