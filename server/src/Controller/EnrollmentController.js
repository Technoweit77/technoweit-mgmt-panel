import {EnrollmentStudent} from "../Models/EnrollmentSchema.js"
 
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

export { createEnrollmentstud,fetchEnrollmentstud,deleteEnrollmentstud,updateEnrollmentstud};