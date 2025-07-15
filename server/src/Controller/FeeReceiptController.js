import {FeeReceipt}from "../Models/FeeReceiptSchema.js"
//create feereceipt
let createfeereceipt=async (req,res)=>{
let reqData=req.body
console.log("feereceipt data",reqData)
try{
    let result=await FeeReceipt.create(reqData)
    res.status(200).json({
        data:result,
        message:"fees receipt created"
})
}catch(error){
res.status(500).json(error)
}
}

//fetchreceipt

let fetchreceipt=async(req,res)=>{
    try
       {
 let result=await FeeReceipt.find()
res.status(200).json(result)
    }catch(error){
res.status(500).json(error)
    }
}

//delete receipt
let deletefeereceipt = async (req, res) => {
  try {
    let { enrollmentId} = req.body;

    let result = await FeeReceipt.findByIdAndDelete({_id:enrollmentId});

    res.status(200).json({ message: "Enrollment deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
 
//update feereceipt
const updatefeerecepit = async (req, res) => {
  try {
    const { enrollmentId,amountPaid } = req.body;

    const result = await FeeReceipt.findByIdAndUpdate(
    enrollmentId,
      {
        $set: {
amountPaid:amountPaid,        }
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
let fetchTotalRevenue =async(req,res)=>{
    try {
        const result=await FeeReceipt.aggregate([
            {
                $match:{
                    status:"paid"
                }
            },
            {
                $group:{
                    _id:null,//No grouping key to calculate total
                    totalRevenue:{$sum:"$amountPaid"}//sum of total amount
                }
            }
        ])
        console.log(result);
        res.status(200).json({data:result})

    } catch (error) {
       console.log(error.message) 
    }
}
export{createfeereceipt,fetchreceipt,deletefeereceipt,updatefeerecepit,fetchTotalRevenue}