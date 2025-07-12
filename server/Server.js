
import express from "express";
import bodyParser from "body-parser";
import cors from "cors"
import { connectToDatabase } from "./src/DB/dbconnection.js";
import  studentRouter  from "./src/Routes/StudentRoutes.js";
import projectrouter from "./src/Routes/ProjectRoutes.js";
import courseRouter from "./src/Routes/CourseRoutes.js";
import userRouter from "./src/Routes/UserRoutes.js";
import enrollmentRouter from "./src/Routes/EnrollmentRoutes.js";
import feereceiptRouter from "./src/Routes/FeereceiptRoutes.js";

let Server = express();

Server.use (cors());
Server.use(bodyParser.json());


connectToDatabase()


Server.get("/", (req, res) => {
    res.send("Hello World!");
});

Server.use("/api",studentRouter)
Server.use("/api",projectrouter)
Server.use("/api",courseRouter)
Server.use("/api",userRouter)
Server.use("/Uploadimages",express.static("Uploadimages"))
Server.use("/api",enrollmentRouter)
Server.use("/api",feereceiptRouter)
Server.listen(5000, () => {
    console.log("Server is running on port 5000");
});



