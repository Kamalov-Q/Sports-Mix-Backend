import mongoose from "mongoose";
import { hashPassword } from "../libs/hash";
import User from "../models/User.model";
export const connectDb = async () => {
  try {
    const db = await mongoose.connect(process.env.DB_URL as string);
    if (!db) {
      throw new Error("Database connection failed");
    }
    const admin = {
      phoneNumber: process.env.ADMIN_PHONE_NUMBER,
      password: await hashPassword(process.env.ADMIN_PASSWORD as string),
    };

    const existingAdmin = await User?.findOne({
      phoneNumber: admin.phoneNumber,
    });

    if (!existingAdmin) {
      await User?.create(admin);
      console.log("Admin user created successfully");
    }

    console.log(`Database connected successfully: ${db.connection.port}`);
    return db;
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Database connection error: ${error.message}`);
    }
    process.exit(1);
  }
};
