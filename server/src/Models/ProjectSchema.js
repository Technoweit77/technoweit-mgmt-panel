import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  projectTitle: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  technology: {
    type: [String], // Array to allow multiple technologies
    required: true
  },
  description: {
    type: String,
    required: true,
  },

  assignToStudents: [{
    type: mongoose.Schema.Types.ObjectId, ref: "Student"
  }]
});

export const Project = mongoose.model('Project', ProjectSchema);