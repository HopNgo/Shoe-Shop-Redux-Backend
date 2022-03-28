import express from "express";
const router = express.Router();
import {
  signIn,
  signUp,
  authenticatedUser,
  updateNameUser,
  updateUsernameUser,
  updatePasswordUser,
} from "../controller/userController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

router.post("/api/signin", signIn);
router.get("/api/authenticated", verifyToken, authenticatedUser);
router.post("/api/signup", signUp);
router.post("/api/updateNameUser", updateNameUser);
router.post("/api/updateUsernameUser", updateUsernameUser);
router.post("/api/updatePasswordUser", updatePasswordUser);

export default router;
