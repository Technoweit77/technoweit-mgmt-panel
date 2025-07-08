import express from 'express';
import { createCourse,deleteCourse,updateCoursePrice,fetchAllCourse } from '../Controller/CourseController.js';
let courseRouter = express.Router();

courseRouter.post("/createcourse", createCourse);
courseRouter.get("/fetchallcourse", fetchAllCourse);
courseRouter.put("/updatecourse", updateCoursePrice);
courseRouter.delete("/deletecourse", deleteCourse);
export default courseRouter;