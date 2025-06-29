"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const path_1 = __importDefault(require("path"));
const db_config_1 = require("./config/db.config");
const user_route_1 = __importDefault(require("./route/user.route"));
const category_route_1 = __importDefault(require("./route/category.route"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = require("./config/swagger");
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// Parse incoming JSON and form data
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Serve uploaded files
app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "../uploads")));
// Log requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});
// Connect to DB
(0, db_config_1.connectDb)();
// Routes
app.use("/api", user_route_1.default);
app.use("/api", category_route_1.default);
//Swagger Docs
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.swaggerSpec));
// Test route
app.get("/", (req, res) => {
    res.send("Hello World!");
});
// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log(`API documentation available at http://localhost:${port}/api-docs`);
});
