import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  fees: {
    type: Number,
    required: true
  },
  technology: {
    type: [String], // allows multiple technologies
    required: true
  }
});

export const Course = mongoose.model('Course', CourseSchema);