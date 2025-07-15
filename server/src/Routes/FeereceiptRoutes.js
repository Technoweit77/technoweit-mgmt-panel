import express from "express";
import {
    createfeereceipt,
    fetchreceipt,
    updatefeerecepit,
    deletefeereceipt,
    fetchTotalRevenue
} from "../Controller/FeeReceiptController.js"


const feereceiptRouter = express.Router();
feereceiptRouter.post("/createreceipt",createfeereceipt);
feereceiptRouter.get("/fetchreceipt",fetchreceipt );
feereceiptRouter.delete("/deletereceipt",deletefeereceipt);
feereceiptRouter.put("/updatereceipt",updatefeerecepit)
feereceiptRouter.get("/fetchRevenue",fetchTotalRevenue)
export default feereceiptRouter;