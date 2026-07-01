import { connection } from "../database.js";
import Status from "../models/status.model.js";
import { nanoid } from "nanoid";
import {
  getAllStatus,
  getAllStatusFileMapperValues,
  getStatusFileMapperValue,
} from "../utils.js";

export const fetchStatusFileMapperValue = async (req, res) => {
  res.status(200).json({
    status: true,
    payload: getStatusFileMapperValue(parseInt(req.params.key)),
  });
};

export const fetchStatusFileMapperAllValue = async (req, res) => {
  res.status(200).json({
    status: true,
    payload: getAllStatusFileMapperValues(),
  });
};
