//start cmd lines
D:\TechnoProject\technoweit-mgmt-panel

D:\TechnoProject\technoweit-mgmt-panel>cd server

D:\TechnoProject\technoweit-mgmt-panel\server>npm start

//create student
{
  "firstName": "Isha",
  "middleName": "Kishor",
  "lastName": "Kolhe",
  "college": "Raisoni College",
  "university": "XYZ University",
  "degreeCourse": "BSc IT",
  "academicYear": "2024",
  "admissionCourse": "Full Stack",
  "phoneNo": "7387383917",
  "parentPhoneNo": "9123345559"
}
//project create
{
  "projectTitle": "Portfolio Website",
  "duration": "3 months",
  "technology": ["React", "Node.js", "MongoDB"],
  "description": "A personal portfolio website for showcasing projects."
}

//createCourse
{
  "name": "Full Stack Web Development",
  "duration": "6 months",
  "fees": 45000,
  "technology": ["HTML", "CSS", "JavaScript", "Node.js", "React", "MongoDB"]
}

//updatestudent
{
  "studentId":"686c0816745e3c8aa20f385c",
  "updateData":{
    "name": "Kishor Kolhe",
    "email": "Kishor.kolhe@faculty.com",
    "phone": "9876543210",
    "course": "Computer Science",
    "address": "Jalgoan, Maharashtra"
  }
}
//enrollstudent 
{
    "data": {
        "student": "64f3b1d2c6e8d9a1e8a1a1b1",
        "course": "64f3b2a3c9d1e9b2d9b2b2c2",
        "joinDate": "2025-07-11T10:00:00.000Z",
        "totalFee": 15000,
        "paidFees": 8000,
        "status": "ongoing",
        "_id": "6870a4dee9345fce6ea15263",
        "__v": 0
    },
    "message": "student enroll sucessfully"
}
//delete
{
  "studentId": "6870a4dee9345fce6ea15263"
}
//update enrollment
{
  "studentId":"6870a4dee9345fce6ea15263",
   "status":"completed",
   "paidFees":15000
}
//craete receipt
{
    "data": {
        "enrollment": "6870a4dee9345fce6ea15263",
        "receiptNo": "RCPT-2025-001",
        "amountPaid": 5000,
        "paymentDate": "2025-07-11T10:30:00.000Z",
        "paymentMode": "upi",
        "remarks": "First installment paid via UPI",
        "_id": "6870bf721aa9c181382866c4",
        "__v": 0
    },
    "message": "fees receipt created"
}
//delete
{
    "enrollmentId":"6870bf721aa9c181382866c4"
}
//update
{
    "data": null,
    "message": "Enrollment Student updated successfully"
}

//fetchTotalRevenue
[{
    "_id": "664b0f4f2f9b8b22d1a7e1c1",
    "enrollment": "664aef1d25f29b30d018ab5f",
    "receiptNo": "REC001",
    "amountPaid": 5000,
    "paymentDate": "2024-07-01T10:00:00.000Z",
    "paymentMode": "cash",
    "remarks": "First installment",
    "status": "paid"
  },
  {
    "_id": "664b0f5e2f9b8b22d1a7e1c2",
    "enrollment": "664aef1d25f29b30d018ab5f",
    "receiptNo": "REC002",
    "amountPaid": 7000,
    "paymentDate": "2024-07-10T12:00:00.000Z",
    "paymentMode": "upi",
    "remarks": "Second installment",
    "status": "paid"
  }]
  //create project
  {
  "projectTitle": "food cart",
  "duration": "2 weeks",
  "technology": ["React", "Node.js"],
  "description": "Sample project",
  "assignToStudents":["686c0816745e3c8aa20f385c","686f605786fee9f4c7559d86","686f655f86fee9f4c7559d88"]
}
//chnchl id
6870e300c3164c55784717c8
//projectId
6875efe397a3ba620d1d35e8