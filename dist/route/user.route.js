"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const login_1 = require("../controller/auth/login");
const router = express_1.default.Router();
router.post("/auth/login", login_1.login);
exports.default = router;
