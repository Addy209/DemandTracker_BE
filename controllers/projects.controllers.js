import { connection } from "../database.js";
import { nanoid } from "nanoid";
import Projects from "../models/project.model.js";
import Files from "../models/files.model.js";
import Status from "../models/status.model.js";
import { Op, Sequelize } from "sequelize";
import { getStatus } from "../utils.js";
import dotenv from "dotenv";
import { cache, getCache, removeCache, setCache } from "../cache.js";
import axios from "axios";

dotenv.config();
const ACTIVE_START = parseInt(process.env.ACTIVE_START);
const ACTIVE_END = parseInt(process.env.ACTIVE_END);
const COMPLETED = parseInt(process.env.COMPLETED);

export const createProject = async (req, res) => {
  const {
    demandId,
    projectId,
    projectName,
    integrationDetails,
    priority,
    accentColor,
  } = req.body;
  const IP = req.ip;
  const statsCacheKey = `stats_${IP}`;
  const dashboard_card_cacheKey = `dashboard_card_${IP}`;
  if (
    !(
      demandId &&
      projectId &&
      projectName &&
      priority &&
      accentColor &&
      integrationDetails
    )
  ) {
    return res
      .status(400)
      .json({ status: false, msg: "All fields are required" });
  }
  try {
    const newProject = await Projects.create({
      demandId,
      projectId,
      projectName,
      integrationDetails,
      priority,
      accentColor,
      createdBy: IP,
    });
    removeCache([statsCacheKey, dashboard_card_cacheKey]);
    return res.status(201).json({ status: true, payload: { ...newProject } });
  } catch (err) {
    console.log(err);
    return res.status(401).json({
      status: false,
      msg: "Unauthorized Access!! You are not authorized to create a project.",
    });
  }
};

export const getDemandsForDashboardCard = async (req, res) => {
  const IP = req.ip;
  const cacheKey = "dashboard_card_" + IP;
  const cachedDashboardCards = getCache(cacheKey);
  if (cachedDashboardCards) {
    return res.status(200).json({
      status: true,
      payload: cachedDashboardCards,
    });
  }
  try {
    const results = await Projects.findAll({
      where: {
        createdBy: IP,
        status: {
          [Op.between]: [1, 5],
        },
      },
      attributes: [
        "demandId",
        "projectId",
        "projectName",
        "integrationDetails",
        "crNumber",
        "status",
        "priority",
        "accentColor",
        [Sequelize.fn("COUNT", Sequelize.col("Files.fileId")), "filesCount"],
        "createdAt",
      ],
      include: [
        {
          model: Files,
          attributes: [],
        },
      ],
      group: ["projectId"],
      order: [["createdAt", "DESC"]],
    });
    const finalResult = results.map((value) => ({
      ...value.dataValues,
      statusName: getStatus(value.status),
    }));
    setCache(cacheKey, finalResult);
    return res.status(200).json({
      status: true,
      payload: finalResult,
    });
  } catch (err) {
    console.log(err);
    return res.status(401).json({
      status: false,
      msg: err.message,
    });
  }
};

export const fetchStats = async (req, res) => {
  const IP = req.ip;
  const cacheKey = `stats_${IP}`;
  const cachedStats = getCache(cacheKey);
  if (cachedStats) {
    console.log("Cache Hit");
    return res.status(200).json({
      status: true,
      payload: cachedStats,
    });
  }
  console.log("Cache Miss");

  const result = await Projects.findAll({
    where: {
      createdBy: IP,
    },
    attributes: [
      "status",
      [Sequelize.fn("COUNT", Sequelize.col("projectId")), "count"],
    ],
    group: ["status"],
  });
  const stats = { total: 0, active: 0, completed: 0 };
  result.forEach((val) => {
    if (
      val.dataValues.status >= ACTIVE_START &&
      val.dataValues.status <= ACTIVE_END
    ) {
      stats.active += val.dataValues.count;
    } else if (val.dataValues.status === COMPLETED) {
      stats.completed = val.dataValues.count;
    }
  });

  const filesCount = await Files.count({ where: { uploadedBy: IP } });
  const finalStats = {
    ...stats,
    total: stats.active + stats.completed,
    filesCount,
  };
  setCache(cacheKey, finalStats);
  return res.status(200).json({
    status: true,
    payload: finalStats,
  });
};

export const getDemandByID = async (req, res) => {
  const IP = req.ip;
  const id = req.params.id;
  try {
    const result = await Projects.findOne({
      where: { projectId: id, createdBy: IP },
    });
    console.log(result);
    res.status(200).json({
      status: true,
      payload: {
        ...result.dataValues,
        statusName: getStatus(result.status),
      },
    });
  } catch (err) {
    res
      .status(404)
      .json({ success: false, msg: "Details for the projectId not found" });
  }
};

export const updateProjectStatus = async (req, res) => {
  console.log(req.files);

  const { data } = req.body;
  const { projectId, newStatus, additionalDetails } = JSON.parse(data);
  const project = await Projects.findByPk(projectId);
  if (!project) {
    res.status(404).json({ status: false, msg: "Project Not Found!" });
  }

  let iter = 0;
  for (let item of additionalDetails) {
    const fd = new FormData();
    const fields = [];
    switch (item.type) {
      case "DETAIL": {
        console.log(item.fieldName, item.fieldValue);
        await axios.post("http://192.168.29.170:5005/api/meta/create", {
          fieldName: item.fieldName,
          fieldValue: item.fieldValue,
          projectId: projectId,
          IP: req.ip,
          typeOfRequest: "INTERNAL",
        });
        break;
      }
      case "DOCUMENT":
      // {
      //   console.log(item.fieldName, req.files[iter]);
      //   iter += 1;
      //   break;
      // }
      case "DOCUMENTS": {
        const original_iter = iter;
        for (
          let i = original_iter;
          i < original_iter + item.fileCount;
          i++, iter++
        ) {
          const fileBlob = new Blob([req.files[i].buffer], {
            type: req.files[i].mimetype,
          });
          fd.append("files", fileBlob, req.files[i].originalname);
          fields.push(item.fieldName);
        }
        fd.append("data", JSON.stringify(fields));
        fd.append("projectId", projectId);
        fd.append("IP", req.ip);
        const result = await axios.post(
          "http://192.168.29.170:5005/api/files/upload",
          fd,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        );
        break;
      }
    }
  }
  const result = await project.update({ status: newStatus });
  return res.status(200).json({
    status: true,
    payload: {
      ...result.dataValues,
      statusName: getStatus(result.status),
    },
  });
};
