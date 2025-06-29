import express, { RequestHandler } from "express";
import { login } from "../controller/auth/login";
const router = express.Router();

router.post("/auth/login", login as RequestHandler);

export default router;
