import { Request, Response } from "express";
import Category from "../../models/Category.model";

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { image, name } = req.body;

    // Validate input
    if (!name?.uz || !name?.ru || !image) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const existingCategory = await Category?.findOne({
      name: {
        uz: name.uz,
        ru: name.ru,
      },
    });

    if (existingCategory) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const newCategory = {
      name: {
        uz: name.uz,
        ru: name.ru,
      },
      image: image,
    };

    const newCateg = await Category.create(newCategory);

    // Respond success
    return res.status(201).json({
      message: "Category created successfully",
      category: newCateg,
    });
  } catch (error) {
    console.error(`Error while creating category:`, error);
    res.status(500).json({ message: "Internal server error", error });
  }
};
