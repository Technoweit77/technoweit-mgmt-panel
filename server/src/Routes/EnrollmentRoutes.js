import express from "express";
import {
  createEnrollmentstud,
  fetchEnrollmentstud,
  deleteEnrollmentstud,
  updateEnrollmentstud,
  
} from "../Controller/EnrollmentController.js";

const enrollmentRouter = express.Router();

enrollmentRouter.post("/createEnrollment", createEnrollmentstud);
enrollmentRouter.get("/fetchEnrollment", fetchEnrollmentstud);
enrollmentRouter.put("/updateEnrollment", updateEnrollmentstud);
enrollmentRouter.delete("/deleteEnrollment", deleteEnrollmentstud);


export default enrollmentRouter;