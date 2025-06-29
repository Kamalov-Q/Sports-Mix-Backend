"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const User_model_1 = __importDefault(require("../../models/User.model"));
const generateToken_1 = require("../../libs/generateToken");
const hash_1 = require("../../libs/hash");
const login = async (req, res) => {
    try {
        const { phoneNumber, password } = req.body;
        if (!phoneNumber || !password) {
            return res
                .status(400)
                .json({ message: "Phone number and password are required" });
        }
        const user = await User_model_1.default.findOne({
            phoneNumber,
        });
        console.log(user);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isValidPassword = await (0, hash_1.comparePassword)(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: "Invalid password" });
        }
        const accessToken = await (0, generateToken_1.generateAccessToken)(user);
        const { password: _pw, ...rest } = user.toObject();
        res.status(200).json({
            user: rest,
            accessToken,
            message: "User successfully logged in",
        });
    }
    catch (error) {
        console.error(`Login error: ${error instanceof Error ? error.message : "Unknown error"}`);
        res.status(500).json({ message: `Internal server error : ${error}` });
    }
};
exports.login = login;
