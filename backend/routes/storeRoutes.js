import express from "express";
import { createStore, getStores, getStoreById, dashboard } from "../controllers/storeController.js";
import { protect } from "../middleware/authMiddleware.js";
import { permit } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/create", protect, permit("admin"), createStore);
router.get("/dashboard/summary", protect, permit("admin"), dashboard);
router.get("/", protect, getStores);
router.get("/:id", protect, getStoreById);


export default router;
