// routes/resume.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const { analyzeResume } = require("../controllers/resumeController");
const { validateAnalysisRequest } = require("../middleware/validation");

// Multer setup
const storage = multer.memoryStorage(); // store file in memory as Buffer
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "application/pdf" ||
      file.mimetype.includes("word")
    ) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only PDF or DOCX allowed."));
    }
  },
});

// POST /api/resume/analyze
router.post(
  "/analyze",
  upload.single("resume"), // expect field name "resume"
  validateAnalysisRequest,
  analyzeResume
);

module.exports = router;
