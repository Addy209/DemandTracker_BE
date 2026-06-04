import { connection } from "../database.js";
import Status from "../models/status.model.js";
import { nanoid } from "nanoid";
import { getAllStatus } from "../utils.js";

export const fetchAllStatus = async (req, res) => {
  res.status(200).json({ status: true, payload: getAllStatus() });
};
