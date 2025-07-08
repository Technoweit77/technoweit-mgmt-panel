import express from 'express';
import {createUser,fetchAllUsers,updateUser,deleteUser } from '../Controller/UserController.js';

let userRouter = express.Router()

userRouter.post("/createuser",createUser);
userRouter.get("/fetchallusers",fetchAllUsers);
userRouter.put("/updateuser",updateUser);
userRouter.delete("/deleteuser",deleteUser);

export {userRouter};