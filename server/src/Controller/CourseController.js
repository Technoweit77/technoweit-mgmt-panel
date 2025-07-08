import {Course} from "../Models/CourseSchema.js"
// Create Project
let createCourse = async (req, res) => {
  let reqData = req.body;
  console.log("Course Data:", reqData);

  try {
    let result = await Course.create(reqData);
    res.status(200).json({
      data: result,
      message: "Course created successfully"
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get All Projects
let fetchAllCourse = async (req, res) => {
  try {
    let result = await Course.find();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

 let updateCoursePrice = async (req, res) => {
  try {
    let { courseId, fees } = req.body;
    let result = await Course.findByIdAndUpdate(
      { _id: courseId },
      { fees: fees },
      { new: true }
    );

    res.status(200).json({
      data: result,
      message: "Course fees updated successfully"
    });
    
  } catch (error) {
    res.status(500).json(error);
  }
};

// Delete Project
let deleteCourse = async (req, res) => {
  try {
    console.log("REQ.BODY:", req.body);
    let { courseId } = req.body;

    let result = await Course.findByIdAndDelete(courseId);

    res.status(200).json({
      data: result,
      message: "Course deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export { createCourse, fetchAllCourse, deleteCourse ,updateCoursePrice};