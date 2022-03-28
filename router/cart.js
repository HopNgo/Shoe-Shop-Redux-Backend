import express from "express";
import { getAllCart, orderCart } from "../controller/cartController.js";
const router = express.Router();

router.post("/api/orderCart", orderCart);
router.get("/api/getAllCart", getAllCart);

export default router;
