import Status from "./models/status.model.js";
import StatusFileMapper from "./models/statusfilemapper.modal.js";

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

let statusFileMapper = {};
export const loadStatusFileMapper = async () => {
  const rows = await StatusFileMapper.findAll();
  if (rows.length === 0) {
    throw Error("StatusFileMapper Table empty!!");
  }
  const result = rows.forEach((val) => {
    const value = { name: val.name, type: val.type };
    if (Object.hasOwn(statusFileMapper, val.statusId)) {
      statusFileMapper[val.statusId].push(value);
    } else {
      statusFileMapper[val.statusId] = [value];
    }
  });
  console.log(statusFileMapper);
};

export const getStatusFileMapperValue = (key) => {
  return statusFileMapper[key];
};

export const getAllStatusFileMapperValues = () => {
  return statusFileMapper;
};
