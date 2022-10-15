import express from "express";
import {
  deleteRoutes,
  getRoutes,
  getRoutesById,
  postRoutes,
  updateRoutes,
} from "../controller/controller.js";

const router = express.Router();

router.get("/", getRoutes);
router.post("/", postRoutes);
router.get("/:id", getRoutesById);
router.put("/:id", updateRoutes);
router.delete("/:id", deleteRoutes);

export default router;
