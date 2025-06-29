import mongoose from "mongoose";

interface ICategory {
  name: {
    uz: string;
    ru: string;
  };
  image: string;
}

const CategoryModel = new mongoose.Schema<ICategory>(
  {
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
  },
  { timestamps: true }
);

const Category =
  mongoose.models.Category || mongoose.model("Category", CategoryModel);

export default Category;

export type CategoryType = mongoose.HydratedDocument<ICategory>;
