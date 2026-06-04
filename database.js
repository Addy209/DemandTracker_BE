import mysql from "mysql2/promise";
import dotenv from "dotenv";
import { Sequelize } from "sequelize";
dotenv.config();

// const connection = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   password: "2222",
//   database: "myforms",
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
// });

// export default connection;

export const sequalize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false,
  },
);

export const connection = async () => {
  try {
    await sequalize.authenticate();
    console.log("Connection has been established successfully");
  } catch (err) {
    console.error("Unable to connect to the database: ", err);
  }
};
