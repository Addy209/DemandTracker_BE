import { DataTypes } from "sequelize";
import { sequalize } from "../database.js";
import Projects from "./project.model.js";
import User from "./user.model.js";

const Meta = sequalize.define(
  "Meta",
  {
    metaId: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    projectId: {
      type: DataTypes.STRING,
      references: {
        model: Projects,
        key: "projectId",
        onDelete: "SET NULL",
        onUpdate: "SET NULL",
      },
    },
    fieldName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fieldValue: {
      type: DataTypes.TEXT,
      allowNull: false,
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
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "meta",
    indexes: [
      {
        name: "project_field_index",
        fields: ["projectId", "fieldName"],
      },
    ],
  },
);

export default Meta;
