import express from "express";
import { submitRating, getRatingsByStore, getRatingsByUser } from "../controllers/ratingController.js";
import { protect } from "../middleware/authMiddleware.js";
import { permit } from "../middleware/roleMiddleware.js";
const router = express.Router();

router.post("/", protect, permit("user","admin"), submitRating);
router.get("/store/:storeId", protect, getRatingsByStore); // owners can filter by store and admin too
router.get("/user/:userId", protect, permit("admin"), getRatingsByUser);

export default router;
