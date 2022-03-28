import express from "express";
const router = express.Router();
import {
  getAllProduct,
  addProduct,
  editProduct,
  deleteProduct,
} from "../controller/productController.js";

router.get("/api/getAllProduct", getAllProduct);
router.post("/api/addProduct", addProduct);
router.post("/api/editProduct", editProduct);
router.post("/api/deleteProduct", deleteProduct);

export default router;
