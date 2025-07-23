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
    enum: ["cash", "upi", "card", "netbanking", "razorpay"],
    required: true
  },
  remarks: {
    type: String,
  },
  transactionId: {
    type: String,
  },
  status: {
    type: String,
    enum: ["paid", "unpaid", "pending", "success", "failed",]
  }
});

export const FeeReceipt = mongoose.model("FeeReceipt", feeReceiptSchema);