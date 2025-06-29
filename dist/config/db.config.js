"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDb = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const hash_1 = require("../libs/hash");
const User_model_1 = __importDefault(require("../models/User.model"));
const connectDb = async () => {
    try {
        const db = await mongoose_1.default.connect(process.env.DB_URL);
        if (!db) {
            throw new Error("Database connection failed");
        }
        const admin = {
            phoneNumber: process.env.ADMIN_PHONE_NUMBER,
            password: await (0, hash_1.hashPassword)(process.env.ADMIN_PASSWORD),
        };
        const existingAdmin = await User_model_1.default?.findOne({
            phoneNumber: admin.phoneNumber,
        });
        if (!existingAdmin) {
            await User_model_1.default?.create(admin);
            console.log("Admin user created successfully");
        }
        console.log(`Database connected successfully: ${db.connection.port}`);
        return db;
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(`Database connection error: ${error.message}`);
        }
        process.exit(1);
    }
};
exports.connectDb = connectDb;
