import { Router } from "express";
import {
  createProject,
  getDemandsForDashboardCard,
  fetchStats,
} from "../controllers/projects.controllers.js";

const router = Router();

router.post("/create", createProject);
router.get("/fetch-dashboard-cards", getDemandsForDashboardCard);
router.get("/fetch-dashboard-stats", fetchStats);

export default router;
