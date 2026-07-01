import { Router } from "express";
import { uploadAndSaveFiles } from "../controllers/files.controllers.js";
import multer from "multer";

const router = Router();

const store = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 100 * 1024 * 1024,
  },
});

router.post("/upload", store.array("files"), uploadAndSaveFiles);
// router.get("/list/:projectId", getMetaByProjectId);

export default router;
