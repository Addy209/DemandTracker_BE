import multer from "multer";
import path from "path";
import fs from "fs/promises";
import dotenv from "dotenv";
import Files from "../models/files.model.js";
import { nanoid } from "nanoid";

dotenv.config();

const upload = async (file, projectId) => {
  try {
    const uploadDir = path.join(process.cwd(), "uploads", projectId);
    await fs.mkdir(uploadDir, { recursive: true });
    const filePath = path.join(uploadDir, `${Date.now()}_${file.originalname}`);
    await fs.writeFile(filePath, file.buffer);
    return { status: true, filePath };
  } catch (err) {
    return { status: false };
  }
};

export const uploadAndSaveFiles = async (req, res) => {
  try {
    const { data, projectId, IP } = req.body;
    const uploadedBy = IP || req.ip;
    const fileFields = JSON.parse(data);
    for (let i = 0; i < req.files.length; i++) {
      const file = req.files[i];
      const uploaded = await upload(file, projectId);
      if (uploaded.status) {
        const fileObj = {
          fileId: nanoid(),
          projectId,
          uploadedBy,
          fileName: fileFields[i],
          fileType: file.mimetype,
          fileSize: file.buffer.length,
          filePath: uploaded.filePath,
        };
        await Files.create(fileObj);
      }
    }
    res.status(200).json({
      status: true,
      msg: `${req.files.length > 1 ? "File" : "Files"} Uploaded SUccessfully!`,
    });
  } catch (err) {
    res
      .status(400)
      .json({ status: false, msg: "Something went wrong while uploading!" });
  }
};
