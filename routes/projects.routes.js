import { Router } from "express";
import {
  createProject,
  getDemandsForDashboardCard,
  fetchStats,
  getDemandByID,
  updateProjectStatus,
} from "../controllers/projects.controllers.js";
import multer from "multer";

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
});

router.post("/create", createProject);
router.post("/updateStatus", upload.array("files"), updateProjectStatus);
router.get("/fetch-dashboard-cards", getDemandsForDashboardCard);
router.get("/fetch-dashboard-stats", fetchStats);
router.get("/demandDetails/:id", getDemandByID);

export default router;
