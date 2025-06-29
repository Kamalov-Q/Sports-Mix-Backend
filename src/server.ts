import express from "express";
import "dotenv/config";
import path from "path";
import { connectDb } from "./config/db.config";
import userRoutes from "./route/user.route";
import imageUpload from "./route/upload.route";
import categoryRoutes from "./route/category.route";

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
app.use("/api/upload", imageUpload);

// Test route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
