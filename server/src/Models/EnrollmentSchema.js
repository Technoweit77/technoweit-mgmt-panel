import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true
  },
  joinDate: {
    type: Date,
    default: Date.now
  },
  totalFee: {
    type: Number,
    required: true,
    min: [0, "Total fee must be a positive number"]
  },
  paidFees: {
    type: Number,
    required: true,
    min: [0, "Paid fee must be a positive number"],
  },
  status: {
    type: String,
    enum: ["ongoing", "completed", "cancelled"],
    default: "ongoing"
  }
});

export const EnrollmentStudent=mongoose.model('EnrollmentStudent',enrollmentSchema);