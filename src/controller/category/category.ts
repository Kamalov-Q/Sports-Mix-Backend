import { Request, Response } from "express";
import mongoose from "mongoose";
import Category, { CategoryType } from "../../models/Category.model";

interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

// CREATE CATEGORY
export const createCategory = async (req: MulterRequest, res: Response) => {
  try {
    const { name } = req.body;
    const parsedName = typeof name === "string" ? JSON.parse(name) : name;

    if (!parsedName?.uz || !parsedName?.ru || !req.file) {
      res.status(400).json({ message: "Missing required fields" });
    }

    const existingCategory = await Category.findOne({
      name: {
        uz: parsedName.uz,
        ru: parsedName.ru,
      },
    });

    if (existingCategory) {
      res.status(400).json({ message: "Category already exists" });
    }

    const newCategory = await Category.create({
      name: parsedName,
      image: `/upload/${req.file!.filename}`,
    });

    res.status(201).json({
      message: "Category created successfully",
      data: newCategory,
    });
  } catch (error) {
    console.error("Error while creating category:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

// GET ALL CATEGORIES
export const getAllCategories = async (req: Request, res: Response) => {
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

    const categories = await Category.find(query).sort({ createdAt: -1 });

    if (!categories.length) {
      return res.status(404).json({ message: "No categories found" });
    }

    return res.status(200).json({
      message: "Categories fetched successfully",
      categories,
    });
  } catch (error) {
    console.error("Error while fetching categories:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

// GET CATEGORY BY ID
export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: "Invalid category id" });
    }

    const category = await Category.findById(id);
    if (!category) {
      res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({
      message: "Category fetched successfully",
      category,
    });
  } catch (error) {
    console.error("Error while fetching category:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

// UPDATE CATEGORY
export const updateCategory = async (req: MulterRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
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

    const updateData: Partial<CategoryType> = {};

    if (parsedName?.uz || parsedName?.ru) {
      if (!updateData.name) updateData.name = { uz: "", ru: "" };
      if (parsedName.uz) updateData.name.uz = parsedName.uz;
      if (parsedName.ru) updateData.name.ru = parsedName.ru;
    }

    if (req.file) {
      updateData.image = `/upload/${req.file.filename}`;
    }

    const updatedCategory = await Category.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    return res.status(200).json({
      message: "Category updated successfully",
      category: updatedCategory,
    });
  } catch (error) {
    console.error("Error while updating category:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

// DELETE CATEGORY
export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: "Invalid category id" });
    }

    const deletedCategory = await Category.findByIdAndDelete(id);
    if (!deletedCategory) {
      res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({
      message: "Category deleted successfully",
      category: deletedCategory,
    });
  } catch (error) {
    console.error("Error while deleting category:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};
