import { Router } from "express";
import {
  pingToCheckUser,
  createUser,
  updateName,
} from "../controllers/users.controllers.js";

const router = Router();

router.get("/exists", pingToCheckUser);
router.post("/create", createUser);
router.post("/update-name", updateName);

export default router;
