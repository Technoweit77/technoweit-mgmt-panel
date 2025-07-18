import { Student } from '../Models/StudentSchema.js';

// Create new student
let createStudent = async (req, res) => {
  try {
    const studentData = req.body;
    let filepath = req.file ? req.file.path.replace("\\", "/") : null
    let newStudent = await Student.create({ ...studentData, imageUrl: filepath })
    // const newStudent = await Student.create(studentData);
    res.status(200).json({
      data: newStudent,


      message: 'Student created successfully'

    });
  } catch (error) {
    console.log(error)
    res.status(500).json(error);
  }
}

// Get all students
let fetchAllStudents = async (req, res) => {
  try {
    const result = await Student.aggregate([
      // Join with EnrollmentStudent
      {
        $lookup: {
          from: "enrollmentstudents", // collection name
          localField: "_id",
          foreignField: "student",
          as: "enrollments"
        }
      },
      { $unwind: "$enrollments" },

      // Join with Course
      {
        $lookup: {
          from: "courses",
          localField: "enrollments.course",
          foreignField: "_id",
          as: "courseInfo"
        }
      },
      { $unwind: "$courseInfo" },

      // Project all student fields + additional fields
      {
        $project: {
          // Include all original student fields
          student: "$$ROOT",

          // Add computed fields
          courseName: "$courseInfo.name",
          courseDuration: "$courseInfo.duration",
          totalFees: "$enrollments.totalFee",
          paidFees: "$enrollments.paidFees",
          remainingFees: {
            $subtract: ["$enrollments.totalFee", "$enrollments.paidFees"]
          },
          enrollmentStatus: "$enrollments.status",
          joinDate: "$enrollments.joinDate"
        }
      }
    ]);

    res.status(200).json(result);
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
      message: "Student deleted successfully"
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
let updateStudent = async (req, res) => {
  try {
    const { studentId, updateData } = req.body;

    const result = await Student.findByIdAndUpdate(studentId, updateData, {
      new: true,
    });

    res.status(200).json({
      data: result,
      message: "Student updated successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



export { createStudent, fetchAllStudents, deleteStudent, updateStudent }