import express, { RequestHandler } from "express";
import { createCategory } from "../controller/category/category";

const router = express.Router();

router.post("/category", createCategory as RequestHandler);

export default router;
