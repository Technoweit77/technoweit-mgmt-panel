import { fetchCounters } from "../Controller/DashBoardController.js";
import express from "express";



const counterrouter =express.Router();

counterrouter.get("/fetchcounter",fetchCounters)


export {counterrouter};