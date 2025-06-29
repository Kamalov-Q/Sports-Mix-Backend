"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const category_1 = require("../controller/category/category");
const upload_1 = require("../middleware/upload");
const router = express_1.default.Router();
router.post("/categories", upload_1.upload.single("images"), category_1.createCategory);
router.get("/categories", category_1.getAllCategories);
router.get("/categories/:id", category_1.getCategoryById);
router.patch("/categories/:id", upload_1.upload.single("images"), category_1.updateCategory);
router.delete("/categories/:id", category_1.deleteCategory);
exports.default = router;
