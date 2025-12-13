import express from "express";
import { getUsers, createUser, getUserById, updatePassword } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import { permit } from "../middleware/roleMiddleware.js";
const router = express.Router();

router.get("/", protect, permit("admin"), getUsers);
router.post("/create", protect, permit("admin"), createUser);
router.get("/:id", protect, permit("admin"), getUserById);
router.put("/me/password", protect, updatePassword);

export default router;
