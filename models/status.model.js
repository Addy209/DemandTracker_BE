import { DataTypes } from "sequelize";
import { sequalize } from "../database.js";

const Status = sequalize.define(
  "Status",
  {
    statusId: {
      type: DataTypes.TINYINT,
      primaryKey: true,
    },
    statusName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "status",
    timestamps: false,
  },
);

export default Status;
