import { Router } from "express";
import {
  createMetaEntries,
  getMetaByProjectId,
} from "../controllers/meta.controllers.js";

const router = Router();

router.post("/create", createMetaEntries);
// router.get("/fetch-dashboard-cards", getDemandsForDashboardCard);
// router.get("/fetch-dashboard-stats", fetchStats);
router.get("/list/:projectId", getMetaByProjectId);

export default router;
