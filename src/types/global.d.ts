import { UserType } from "../models/User.model";
import { Multer } from "multer";

declare global {
  namespace Express {
    interface Request {
      user?: UserType;
      file?: Multer.File;
      files?: Multer.File[];
    }
  }
}
