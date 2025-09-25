require("dotenv").config();
const express = require("express");
const cors = require("cors");

// Import routes and middleware
const resumeRoutes = require("./routes/resume");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // parse URL-encoded bodies

// Routes
app.use("/api/resume", resumeRoutes);

// Health check route
app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "Server is up and running!" });
});

app.get("/", (req, res) => {
  res.send("✅ AI Resume Helper Backend is running!");
});

// Handle 404 - Not Found for any unhandled routes
app.use((req, res, next) => {
  const error = new Error("Endpoint not found");
  error.status = 404;
  next(error);
});

// Global error handler
app.use(errorHandler);


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
