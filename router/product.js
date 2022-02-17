import express from "express";
const router = express.Router();
import { getAllProduct } from "../controller/productController.js";

router.get('/api/product', getAllProduct)

export default router;