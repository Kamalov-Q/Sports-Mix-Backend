import express, { Request, Response } from "express";
import { upload } from "../middleware/upload";

const router = express.Router();

router.post(
  "/",
  upload.array("images", 10),
  (req: Request, res: Response) => {
    if (!req.files || !Array.isArray(req.files)) {
      res.status(400).json({ error: "No files uploaded" });
      return;
    }

    const files = req.files as Express.Multer.File[];

    const baseUrl = `${req.protocol}://${req.get("host")}`;

    const fileInfos = files.map((file) => ({
      url: `${baseUrl}/uploads/${file.filename}`,
    }));

    res.status(200).json({
      message: "Uploaded successfully",
      files: fileInfos,
    });
  }
);

export default router;
