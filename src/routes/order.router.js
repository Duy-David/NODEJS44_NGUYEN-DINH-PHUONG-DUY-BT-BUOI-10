import express from "express";
import { handleAddOrder } from "../controllers/order.controller.js";

const orderRouter = express.Router();
orderRouter.post("/add-order", handleAddOrder);

export default orderRouter;
