import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";
import statusRoutes from "./routes/status.routes.js";
import projectsRoutes from "./routes/projects.routes.js";
import metaRoutes from "./routes/meta.routes.js";
import dotenv from "dotenv";
import { connection, sequalize } from "./database.js";
import Comments from "./models/comments.model.js";
import Meta from "./models/meta.model.js";
import Files from "./models/files.model.js";
import Projects from "./models/project.model.js";
import Status from "./models/status.model.js";
import User from "./models/user.model.js";
import { associations } from "./associations.js";
import { loadStatus } from "./utils.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors());

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use("/api/users", userRoutes);
app.use("/api/status", statusRoutes);
app.use("/api/projects", projectsRoutes);
app.use("/api/meta", metaRoutes);

associations();
loadStatus();

const startServer = async () => {
  await connection();
  try {
    await sequalize.sync({ alter: true });
    console.log("Database Synced Successfully");
  } catch (err) {
    console.error("Error syncing database: ", err);
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
startServer();
