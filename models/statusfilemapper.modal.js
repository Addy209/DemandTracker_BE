import { DataTypes } from "sequelize";
import { sequalize } from "../database.js";
import Status from "./status.model.js";

const StatusFileMapper = sequalize.define(
  "StatusFileMapper",
  {
    statusFileMapperId: {
      type: DataTypes.TINYINT,
      primaryKey: true,
    },
    statusId: {
      type: DataTypes.TINYINT,
      references: {
        model: Status,
        key: "statusId",
        onDelete: "SET NULL",
        onUpdate: "SET NULL",
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    type: {
      type: DataTypes.ENUM("DETAIL", "DOCUMENT", "DOCUMENTS"),
      allowNull: true,
    },
  },
  {
    tableName: "statusfilemapper",
    timestamps: false,
  },
);

export default StatusFileMapper;
