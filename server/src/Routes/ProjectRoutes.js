import express from 'express';
import { createProject, fetchAllProjects, deleteProject, updateAssignProject, removestudentfromproject } from '../Controller/ProjectController.js';

let projectrouter = express.Router();

// Route to create a new project
projectrouter.post("/createproject", createProject);

// Route to get all projects
projectrouter.get("/fetchallprojects", fetchAllProjects);

// Route to delete a project (ID sent in body)
projectrouter.delete("/deleteproject", deleteProject);
projectrouter.put("/updateassignproject",updateAssignProject)
projectrouter.put("/removestudentfromproject",removestudentfromproject)
export default projectrouter;