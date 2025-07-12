// utils/getNextSequence.js
import Counter from "../Models/counterSchema";

export async function getNextSequence(forCounterName) {
  const counter = await Counter.findOneAndUpdate(
    { forCounterName },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  return counter.seq;
}
