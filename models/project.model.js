import { DataTypes } from "sequelize";
import { sequalize } from "../database.js";
import User from "./user.model.js";
import Status from "./status.model.js";

const Projects = sequalize.define(
  "Projects",
  {
    demandId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    projectId: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    projectName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    integrationDetails: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    crNumber: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    status: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    priority: {
      type: DataTypes.ENUM("Low", "Medium", "High", "Critical"),
      defaultValue: "Medium",
    },
    accentColor: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    eecDone: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    eecPD: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    eecDoneAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    createdBy: {
      type: DataTypes.STRING,
      references: {
        model: User,
        key: "ipv4_address",
        onDelete: "SET NULL",
        onUpdate: "SET NULL",
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "projects",
    indexes: [
      {
        name: "demandId_index",
        fields: ["demandId"],
      },
      {
        name: "crNumber_index",
        fields: ["crNumber"],
      },
    ],
  },
);

export default Projects;
