"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerSpec = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
exports.swaggerSpec = (0, swagger_jsdoc_1.default)({
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Sport E-commerce API",
            version: "1.0.0",
            description: "API documentation for your backend",
        },
        servers: [
            {
                url: "http://localhost:3001",
                description: "Local server",
            },
        ],
    },
    apis: ["./src/docs/**/*.ts"],
});
