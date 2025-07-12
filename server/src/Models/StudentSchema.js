import mongoose from 'mongoose';

const StudentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: true
  },
  dateofbirth: {
    type: String,

  },
  college: {
    type: String,
    required: true
  },
  university: {
    type: String,
    required: true
  },
  degreeCourse: {
    type: String,
    required: true
  },
  academicYear: {
    type: String,
    required: true
  },
  admissionCourse: {
    type: String,
    required: true
  },

  phoneNo: {
    type: String,
    required: true,
    validate: {
      validator: v => /^\d{10}$/.test(v),
      message: 'Phone number must be 10 digits'
    }
  },
  parentPhoneNo: {
    type: String,
    required: true,
    validate: {
      validator: v => /^\d{10}$/.test(v),
      message: 'Phone number must be 10 digits'
    }
  },
  imageUrl: {
    type: String
  }

});

export const Student = mongoose.model('Student', StudentSchema);