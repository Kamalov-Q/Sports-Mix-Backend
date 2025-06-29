"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const CategoryModel = new mongoose_1.default.Schema({
    name: {
        uz: {
            type: String,
            required: true,
        },
        ru: {
            type: String,
            required: true,
        },
    },
    image: {
        type: String,
        required: true,
    },
}, { timestamps: true });
const Category = mongoose_1.default.models.Category || mongoose_1.default.model("Category", CategoryModel);
exports.default = Category;
