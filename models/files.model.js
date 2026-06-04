import { DataTypes } from "sequelize";
import { sequalize } from "../database.js";
import Projects from "./project.model.js";
import User from "./user.model.js";
import Comments from "./comments.model.js";

const Files = sequalize.define(
  "Files",
  {
    fileId: {
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
    uploadedBy: {
      type: DataTypes.STRING,
      references: {
        model: User,
        key: "ipv4_address",
        onDelete: "SET NULL",
        onUpdate: "SET NULL",
      },
    },
    commentId: {
      type: DataTypes.STRING,
      references: {
        model: Comments,
        key: "commentId",
        onDelete: "SET NULL",
        onUpdate: "SET NULL",
      },
    },
    fileName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fileSize: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    fileType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    filePath: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "files",
    indexes: [
      {
        name: "file_index",
        fields: ["fileName", "fileType", "filePath"],
      },
    ],
  },
);

export default Files;
