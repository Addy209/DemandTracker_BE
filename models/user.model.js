import { DataTypes } from "sequelize";
import { sequalize } from "../database.js";

const User = sequalize.define(
  "User",
  {
    ipv4_address: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    lastSeenAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    displayPic: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "users",
    indexes: [
      {
        name: "ipv4_address_index",
        fields: ["ipv4_address"],
      },
    ],
  },
);

export default User;
