import { FeeReceipt } from "../Models/FeeReceiptSchema.js"
import Razorpay from "razorpay";
import crypto from "crypto";
import shortid from "shortid";
import { getNextSequence } from "../utils/utilsFunctions.js";
import { EnrollmentStudent } from "../Models/EnrollmentSchema.js";
//create feereceipt
let createfeereceipt = async (req, res) => {
  let reqData = req.body
  console.log("feereceipt data", reqData)
  try {
    let result = await FeeReceipt.create(reqData)
    res.status(200).json({
      data: result,
      message: "fees receipt created"
    })
  } catch (error) {
    res.status(500).json(error)
  }
}

//fetchreceipt

let fetchreceipt = async (req, res) => {
  try {
    let result = await FeeReceipt.find()
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json(error)
  }
}

//delete receipt
let deletefeereceipt = async (req, res) => {
  try {
    let { enrollmentId } = req.body;

    let result = await FeeReceipt.findByIdAndDelete({ _id: enrollmentId });

    res.status(200).json({ message: "Enrollment deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//update feereceipt
const updatefeerecepit = async (req, res) => {
  try {
    const { enrollmentId, amountPaid } = req.body;

    const result = await FeeReceipt.findByIdAndUpdate(
      enrollmentId,
      {
        $set: {
          amountPaid: amountPaid,
        }
      },
      { new: true }
    );

    res.status(200).json({
      data: result,
      message: "Enrollment Student updated successfully"
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
let fetchTotalRevenue = async (req, res) => {
  try {
    const result = await FeeReceipt.aggregate([
      {
        $match: {
          status: "paid"
        }
      },
      {
        $group: {
          _id: null,//No grouping key to calculate total
          totalRevenue: { $sum: "$amountPaid" }//sum of total amount
        }
      }
    ])
    console.log(result);
    res.status(200).json({ data: result })

  } catch (error) {
    console.log(error.message)
  }
}
const razorpay = new Razorpay({
  key_id: "rzp_test_RRRqrm1ahDFT82",
  key_secret: "mIJhHvktdpwRj8jStLxrtdFc",
});
// Create order
const RazorpayOrder = async (req, res) => {
  try {
    const { enrollmentId, amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ success: false, message: "Invalid amount" });
    }

    const options = {
      amount: amount*100, // Convert to paise
      currency: "INR",
      receipt: shortid.generate(),
      payment_capture: 1,
    };

    const razorpayOrder = await razorpay.orders.create(options);

    const seqNum = await getNextSequence("receipt")

    const formattedRecNum = `RCPT-${seqNum.toString().padStart(5, "0")}`

    // 1) Fetch the enrollment document
    const enrollment = await EnrollmentStudent.findById(enrollmentId);
    if (!enrollment) {
      return res.status(404).json({ success: false, message: "Enrollment not found" });
    }
    // Update paidFee field before receipt creation
    const updatedPaidFee = (enrollment.paidFees || 0) + amount;

    await EnrollmentStudent.findByIdAndUpdate(enrollmentId, {
      paidFees: updatedPaidFee
    });
    const payment = new FeeReceipt({
      enrollment: enrollmentId,
      amountPaid: amount,
      transactionId: razorpayOrder.id,
      status: "paid",
      paymentMode: "razorpay",
      receiptNo: formattedRecNum
    });

    await payment.save();

    res.status(201).json({ success: true, order: razorpayOrder, receipt: payment });
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: error.message });
  }
};

// Verify Razorpay payment
const verifyRazorpay = async (req, res) => {
  try {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

    const shasum = crypto.createHmac("sha256", secret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");

    if (digest !== req.headers["x-razorpay-signature"]) {
      return res.status(400).json({ success: false, message: "Invalid signature" });
    }

    const event = req.body;
    if (event.event === "payment.captured") {
      const { order_id, payment_id } = event.payload.payment.entity;

      const payment = await FeeReceipt.findOneAndUpdate(
        { transactionId: order_id },
        { status: "Paid", transactionId: payment_id },
        { new: true }
      );

      if (!payment) {
        return res.status(404).json({ success: false, message: "Payment record not found" });
      }
    }

    res.status(200).json({ success: true, message: "Payment verified successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export { createfeereceipt, fetchreceipt, deletefeereceipt, updatefeerecepit, fetchTotalRevenue, RazorpayOrder, verifyRazorpay }