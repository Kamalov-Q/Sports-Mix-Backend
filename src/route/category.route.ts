import express, { RequestHandler } from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
} from "../controller/category/category";
import { upload } from "../middleware/upload";

const router = express.Router();

router.post(
  "/categories",
  upload.single("images"),
  createCategory as RequestHandler
);
router.get("/categories", getAllCategories as RequestHandler);
router.get("/categories/:id", getCategoryById as RequestHandler);
router.patch("/categories/:id", upload.single("images"), updateCategory as RequestHandler);
router.delete("/categories/:id", deleteCategory as RequestHandler);
export default router;
