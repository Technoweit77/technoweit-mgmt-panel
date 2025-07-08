import mongoose from "mongoose";

const DB_URL = "mongodb://localhost:27017/student-management-db";

async function connectToDatabase() {
  try {
    const connection = await mongoose.connect(DB_URL);
    console.log("DB Connected:", connection.connection.name);
  } catch (error) {
    console.log(error);
  }
}

export { connectToDatabase };