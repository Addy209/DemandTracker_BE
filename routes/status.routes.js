import { Router } from "express";
import { fetchAllStatus } from "../controllers/status.controllers.js";

const router = Router();

router.get("/fetch", fetchAllStatus);

export default router;
