import { Router } from "express";
import {
  createProject,
  getDemandsForDashboardCard,
  fetchStats,
  getDemandByID,
} from "../controllers/projects.controllers.js";

const router = Router();

router.post("/create", createProject);
router.get("/fetch-dashboard-cards", getDemandsForDashboardCard);
router.get("/fetch-dashboard-stats", fetchStats);
router.get("/demandDetails/:id", getDemandByID);

export default router;
