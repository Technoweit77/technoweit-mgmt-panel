import { Project } from '../Models/ProjectSchema.js';

// Create Project
let createProject = async (req, res) => {
  let reqData = req.body;
  console.log("Project Data:", reqData);

  try {
    let result = await Project.create(reqData);
    res.status(200).json({
      data: result,
      message: "Project created successfully"
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get All Projects
let fetchAllProjects = async (req, res) => {
  try {
    let result = await Project.find();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Delete Project
let deleteProject = async (req, res) => {
  let { projectId } = req.body;

  try {
    let result = await Project.findByIdAndDelete(projectId);
    res.status(200).json({
      data: result,
      message: "Project deleted successfully",

    });
  } catch (error) {
    res.status(500).json(error);
  }
};

let updateAssignProject = async (req, res) => {

  let { studentId, projectId } = req.body
  try {
    let result = await Project.findByIdAndUpdate(
      projectId,
      { $push: { assignToStudents: studentId } },
      { new: true }
    )
    res.status(200).json({
      data: result,
      message: "Project Assigned to Sudent"
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      data: null,
      message: error.message
    })
  }
}
let removestudentfromproject=async(req,res)=>{
  let{studentId,projectId}=req.body
  try {
    let result1= await Project.findByIdAndUpdate(
      projectId,{$pull: { assignToStudents: studentId }},{ new: true }

    )
    res.status(200).json({
      data: result1,
      message: " Student deleted form project"
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      data: null,
      message: error.message
    })
  }
}
export { createProject, fetchAllProjects, deleteProject,updateAssignProject,removestudentfromproject };