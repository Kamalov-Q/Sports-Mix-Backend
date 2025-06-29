import express from "express";
import "dotenv/config";
import path from "path";
import { connectDb } from "./config/db.config";
import userRoutes from "./route/user.route";
import categoryRoutes from "./route/category.route";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";
 
const app = express();
const port = process.env.PORT || 3000;

// Parse incoming JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Log requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Connect to DB
connectDb();

// Routes
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);

//Swagger Docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Test route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log(
    `API documentation available at http://localhost:${port}/api-docs`
  );
});
