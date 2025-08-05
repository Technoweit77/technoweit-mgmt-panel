import express from "express";
import {
  createEnrollmentstud,
  fetchEnrollmentstud,
  deleteEnrollmentstud,
  updateEnrollmentstud,
  getEnrolledStudentCounts,
  
} from "../Controller/EnrollmentController.js";

const enrollmentRouter = express.Router();

enrollmentRouter.post("/createEnrollment", createEnrollmentstud);
enrollmentRouter.get("/fetchEnrollment", fetchEnrollmentstud);
enrollmentRouter.put("/updateEnrollment", updateEnrollmentstud);
enrollmentRouter.delete("/deleteEnrollment", deleteEnrollmentstud);
enrollmentRouter.get("/enrollment-pie", getEnrolledStudentCounts);


export default enrollmentRouter;