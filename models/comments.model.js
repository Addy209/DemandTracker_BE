import { DataTypes } from "sequelize";
import { sequalize } from "../database.js";
import Projects from "./project.model.js";

const Comments = sequalize.define(
  "Comments",
  {
    commentId: {
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
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
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
    tableName: "comments",
    indexes: [
      {
        name: "project_index",
        fields: ["projectId"],
      },
    ],
  },
);

export default Comments;
