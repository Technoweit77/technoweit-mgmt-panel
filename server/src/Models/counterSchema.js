// models/Counter.js
import mongoose from "mongoose";

const counterSchema = new mongoose.Schema({
  forCounterName: { type: String, required: true, unique: true },
  seq: { type: Number, default: 1000 }
});

export const Counter =  mongoose.model("Counter", counterSchema);
