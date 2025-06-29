"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAccessToken = generateAccessToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
async function generateAccessToken(user) {
    try {
        if (!user) {
            throw new Error("User object is required to generate access token");
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id, phoneNumber: user.phoneNumber }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });
        return token;
    }
    catch (error) {
        console.error("Error generating access token:", error);
        throw new Error("Failed to generate access token");
    }
}
