import { Router } from "express";
import {
  fetchStatusFileMapperAllValue,
  fetchStatusFileMapperValue,
} from "../controllers/statusfilemapper.controllers.js";

const router = Router();

router.get("/fetch/all", fetchStatusFileMapperAllValue);
router.get("/fetch/:key", fetchStatusFileMapperValue);

export default router;
