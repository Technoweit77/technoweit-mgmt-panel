import { Student } from '../Models/StudentSchema.js';

// Create new student
 let createStudent = async (req, res) => {
  try {
    const studentData = req.body;
    const newStudent = await Student.create(studentData);
    res.status(200).json({
         data: newStudent,
      message: 'Student created successfully'
     
    });
  } catch (error) {
    res.status(500).json(error);
  }
}

// Get all students
 let fetchAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json(error);
  }
};
let deleteStudent = async (req, res) => {
  try {
    let { studentId } = req.body; 
    let result = await Student.findByIdAndDelete(studentId); 
    res.status(200).json({ 
        deletedStudent: result,
        message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
};

export{createStudent,fetchAllStudents,deleteStudent}