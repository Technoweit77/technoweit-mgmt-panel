import {EnrollmentStudent} from "../Models/EnrollmentSchema.js"
 import {Course} from "../Models/CourseSchema.js";
//enrollstudent
let createEnrollmentstud=async (req,res)=>{
    let reqData=req.body;
    console.log("Enrolldata",reqData);
    try{
        let result=await EnrollmentStudent.create(reqData);
        res.status(200).json({
            data:result,
            message:"student enroll sucessfully"
    });
    }catch(error){
        res.status(500).json(error)
    }
}

//fetch 
let fetchEnrollmentstud=async(req,res)=>{
    try{
        let result=await EnrollmentStudent.find()
        
        res.status(200).json(result)
    }catch(error){
        res.status(500).json(error)
    }
}

//delete enrollstudent
let deleteEnrollmentstud = async (req, res) => {
  try {
    let { studentId } = req.body;

    let result = await EnrollmentStudent.findByIdAndDelete({_id:studentId});

    res.status(200).json({ message: "Enrollment deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//update enrollstudent 
const updateEnrollmentstud = async (req, res) => {
  try {
    const { studentId, status, paidFees } = req.body;

    const result = await EnrollmentStudent.findByIdAndUpdate(
      studentId,
      {
        $set: {
          status: status,
          paidFees: paidFees
        }
      },
      { new: true }
    );

    res.status(200).json({
      data: result,
      message: "Enrollment Student updated successfully"
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Get enrollment count per course
//  const getEnrolledStudentCounts = async (req, res) => {
//   try {
//     const result = await EnrollmentStudent.aggregate([
//       {
//         $group: {
//           _id: "$course",
//           studentCount: { $sum: 1 }
//         }
//       },
//       {
//         $lookup: {
//           from: "courses",
//           localField: "_id",
//           foreignField: "_id",
//           as: "courseInfo"
//         }
//       },
//       {
//         $unwind: "$courseInfo"
//       },
//       {
//         $project: {
//           _id: 0,
//           courseName: "$courseInfo.name",
//           studentCount: 1
//         }
//       }
//     ]);

//     res.status(200).json({ success: true, data: result });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

const getEnrolledStudentCounts = async (req, res) => {
  try {
    const courses = await Course.find();

    const enrollmentCounts = await EnrollmentStudent.aggregate([
      {
        $group: {
          _id: "$course",
          studentCount: { $sum: 1 }
        }
      }
    ]);

    const countMap = new Map();
    enrollmentCounts.forEach(item => {
      countMap.set(item._id.toString(), item.studentCount);
    });

    const result = courses.map(course => ({
      courseName: course.name,
      studentCount: countMap.get(course._id.toString()) || 0
    }));

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export { createEnrollmentstud,fetchEnrollmentstud,deleteEnrollmentstud,updateEnrollmentstud,getEnrolledStudentCounts};