import Status from "./models/status.model.js";

let status = {};
export const loadStatus = async () => {
  const rows = await Status.findAll();
  if (rows.length === 0) {
    throw Error("Status Table empty!!");
  }
  const result = rows.map((val) => val.dataValues);
  for (const val of result) {
    status[val.statusId] = val.statusName;
  }
  console.log(status);
};

export const getStatus = (key) => {
  return status[key];
};

export const getAllStatus = () => {
  return status;
};
