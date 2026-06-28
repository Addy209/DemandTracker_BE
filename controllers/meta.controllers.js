import { connection } from "../database.js";
import { nanoid } from "nanoid";
import Projects from "../models/project.model.js";
import Files from "../models/files.model.js";
import Status from "../models/status.model.js";
import { Op, Sequelize } from "sequelize";
import { getStatus } from "../utils.js";
import dotenv from "dotenv";
import { cache, getCache, removeCache, setCache } from "../cache.js";
import Meta from "../models/meta.model.js";

export const createMetaEntries = async (req, res) => {
  const metaCreationRequest = req.body;
  let IP = null;

  if (metaCreationRequest.typeOfRequest === "INTERNAL") {
    IP = metaCreationRequest.IP;
    delete metaCreationRequest["IP"];
    delete metaCreationRequest["typeOfRequest"];
  } else {
    IP = req.ip;
  }

  try {
    const result = await Meta.create({
      ...metaCreationRequest,
      metaId: nanoid(),
      createdBy: IP,
    });
    res.status(200).json({
      status: true,
      payload: { ...result.dataValues },
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      msg: "Bad Request",
    });
  }
};

export const getMetaByProjectId = async (req, res) => {
  const IP = req.ip;
  const projectId = req.params.projectId;
  try {
    const result = await Meta.findAll({
      where: {
        projectId: projectId,
        createdBy: IP,
      },
      order: [["updatedAt", "DESC"]],
    });
    res.status(200).json({ status: true, payload: [...result] });
  } catch (err) {
    res
      .status(404)
      .json({ status: false, msg: "Meta with the Project Id not found!!" });
  }
};
