import Comments from "./models/comments.model.js";
import Meta from "./models/meta.model.js";
import Files from "./models/files.model.js";
import Projects from "./models/project.model.js";
import Status from "./models/status.model.js";
import User from "./models/user.model.js";

export const associations = () => {
  Projects.hasMany(Files, {
    foreignKey: "projectId",
  });
  Projects.hasMany(Meta, {
    foreignKey: "projectId",
  });
  Projects.hasMany(Comments, {
    foreignKey: "projectId",
  });
  //   Projects.hasMany(Status, {
  //     foreignKey: "statusId",
  //   });
};
