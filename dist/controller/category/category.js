"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.getCategoryById = exports.getAllCategories = exports.createCategory = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Category_model_1 = __importDefault(require("../../models/Category.model"));
// CREATE CATEGORY
const createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const parsedName = typeof name === "string" ? JSON.parse(name) : name;
        if (!parsedName?.uz || !parsedName?.ru || !req.file) {
            res.status(400).json({ message: "Missing required fields" });
        }
        const existingCategory = await Category_model_1.default.findOne({
            name: {
                uz: parsedName.uz,
                ru: parsedName.ru,
            },
        });
        if (existingCategory) {
            res.status(400).json({ message: "Category already exists" });
        }
        const newCategory = await Category_model_1.default.create({
            name: parsedName,
            image: `/upload/${req.file.filename}`,
        });
        res.status(201).json({
            message: "Category created successfully",
            data: newCategory,
        });
    }
    catch (error) {
        console.error("Error while creating category:", error);
        res.status(500).json({ message: "Internal server error", error });
    }
};
exports.createCategory = createCategory;
// GET ALL CATEGORIES
const getAllCategories = async (req, res) => {
    try {
        const { search } = req.query;
        const query = search
            ? {
                $or: [
                    { "name.uz": { $regex: search, $options: "i" } },
                    { "name.ru": { $regex: search, $options: "i" } },
                ],
            }
            : {};
        const categories = await Category_model_1.default.find(query).sort({ createdAt: -1 });
        if (!categories.length) {
            return res.status(404).json({ message: "No categories found" });
        }
        return res.status(200).json({
            message: "Categories fetched successfully",
            categories,
        });
    }
    catch (error) {
        console.error("Error while fetching categories:", error);
        res.status(500).json({ message: "Internal server error", error });
    }
};
exports.getAllCategories = getAllCategories;
// GET CATEGORY BY ID
const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            res.status(400).json({ message: "Invalid category id" });
        }
        const category = await Category_model_1.default.findById(id);
        if (!category) {
            res.status(404).json({ message: "Category not found" });
        }
        res.status(200).json({
            message: "Category fetched successfully",
            category,
        });
    }
    catch (error) {
        console.error("Error while fetching category:", error);
        res.status(500).json({ message: "Internal server error", error });
    }
};
exports.getCategoryById = getCategoryById;
// UPDATE CATEGORY
const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid category id" });
        }
        // Parse name if it exists
        const parsedName = name
            ? typeof name === "string"
                ? JSON.parse(name)
                : name
            : null;
        // Check if both name and file are missing
        if (!parsedName && !req.file) {
            return res
                .status(400)
                .json({
                message: "At least one of name or image is required to update",
            });
        }
        const updateData = {};
        if (parsedName?.uz || parsedName?.ru) {
            if (!updateData.name)
                updateData.name = { uz: "", ru: "" };
            if (parsedName.uz)
                updateData.name.uz = parsedName.uz;
            if (parsedName.ru)
                updateData.name.ru = parsedName.ru;
        }
        if (req.file) {
            updateData.image = `/upload/${req.file.filename}`;
        }
        const updatedCategory = await Category_model_1.default.findByIdAndUpdate(id, updateData, {
            new: true,
        });
        if (!updatedCategory) {
            return res.status(404).json({ message: "Category not found" });
        }
        return res.status(200).json({
            message: "Category updated successfully",
            category: updatedCategory,
        });
    }
    catch (error) {
        console.error("Error while updating category:", error);
        res.status(500).json({ message: "Internal server error", error });
    }
};
exports.updateCategory = updateCategory;
// DELETE CATEGORY
const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            res.status(400).json({ message: "Invalid category id" });
        }
        const deletedCategory = await Category_model_1.default.findByIdAndDelete(id);
        if (!deletedCategory) {
            res.status(404).json({ message: "Category not found" });
        }
        res.status(200).json({
            message: "Category deleted successfully",
            category: deletedCategory,
        });
    }
    catch (error) {
        console.error("Error while deleting category:", error);
        res.status(500).json({ message: "Internal server error", error });
    }
};
exports.deleteCategory = deleteCategory;
