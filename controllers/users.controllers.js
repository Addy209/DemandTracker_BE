import { connection } from "../database.js";
import User from "../models/user.model.js";
import { nanoid } from "nanoid";

export const pingToCheckUser = async (req, res) => {
  const IP = req.ip;
  console.log(IP);

  try {
    const row = await User.findOne({ where: { ipv4_address: IP } });
    if (!row) {
      return res.status(200).json({ status: false });
    } else {
      User.update({ lastSeenAt: new Date() }, { where: { ipv4_address: IP } });
      return res.status(200).json({
        status: true,
        payload: { ...row.dataValues },
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(200).json({ status: false });
  }
};

export const createUser = async (req, res) => {
  const { name } = req.body;
  const ip = req.ip;
  const regex = /^[a-zA-Z. ]{3,30}$/;
  if (!regex.test(name)) {
    return res.status(400).json({
      msg: "Name should be 3-30 characters long and contain only letters and spaces.",
    });
  }
  try {
    const newUser = await User.create({
      ipv4_address: ip,
      name: name,
    });
    return res.status(201).json({
      status: true,
      payload: { ...newUser.dataValues },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const updateName = async (req, res) => {
  const { name } = req.body;
  const IP = req.ip;
  const regex = /^[a-zA-Z. ]{3,30}$/;
  if (!regex.test(name)) {
    return res.status(400).json({
      msg: "Name should be 3-30 characters long and contain only letters and spaces.",
    });
  }
  try {
    const row = await User.findOne({ where: { ipv4_address: IP } });
    if (!row) {
      return res.status(404).json({ status: false, msg: "User not found" });
    }
    const [rowsUpdated] = await User.update(
      { name: name },
      { where: { ipv4_address: IP } },
    );
    return res
      .status(200)
      .json({ status: true, payload: { ...row.dataValues, name: name } });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ status: false, msg: "Internal Server Error" });
  }
};
