// controllers/resumeController.js
const {
  extractTextFromPDF,
  extractTextFromDOCX,
} = require("../services/fileProcessor");
const { performResumeAnalysis } = require("../services/resumeAnalyzer");

async function analyzeResume(req, res, next) {
  try {
    let resumeText = "";
    const { jobDescriptionText, resumeText: resumeTextBody } = req.body;

    // Process uploaded resume file
    if (req.file) {
      const resumeFile = req.file;

      if (resumeFile.mimetype === "application/pdf") {
        resumeText = await extractTextFromPDF(resumeFile.buffer);
      } else if (
        resumeFile.mimetype === "application/msword" ||
        resumeFile.mimetype ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        resumeText = await extractTextFromDOCX(resumeFile.buffer);
      }
    }

    // If resumeText was also sent in the body, it overrides the file content.
    if (resumeTextBody && resumeTextBody.trim()) {
      resumeText = resumeTextBody.trim();
    }

    // Perform resume analysis
    const analysisResult = await performResumeAnalysis(
      resumeText,
      jobDescriptionText
    );

    res.status(200).json({
      success: true,
      data: analysisResult,
      metadata: {
        resumeWordCount: resumeText.split(/\s+/).length,
        jobDescWordCount: jobDescriptionText.split(/\s+/).length,
        timestamp: new Date().toISOString(),
        analysisType: analysisResult.analysisType,
        aiModel: analysisResult.model,
      },
    });
  } catch (error) {
    // Pass error to the global error handler for a consistent response
    next(error);
  }
}

module.exports = { analyzeResume };
