import mongoose from "mongoose";

const feeReceiptSchema = new mongoose.Schema({
  enrollment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "EnrollmentStudent",
    required: true
  },
  receiptNo: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  amountPaid: {
    type: Number,
    required: true,
    min: [0, "Amount paid must be a positive number"]
  },
  paymentDate: {
    type: Date,
    default: Date.now
  },
  paymentMode: {
    type: String,
    enum: ["cash", "upi", "card", "netbanking"],
    required: true
  },
  remarks: {
    type: String,
  }
});

export const FeeReceipt = mongoose.model("FeeReceipt", feeReceiptSchema);