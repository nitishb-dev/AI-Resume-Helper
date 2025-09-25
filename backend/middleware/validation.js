// middleware/validation.js

/**
 * Validate that resume or job description is provided
 */
function validateAnalysisRequest(req, res, next) {
  const hasResumeFile = req.file || (req.files && req.files.resume);
  const hasResumeText = req.body.resumeText && req.body.resumeText.trim();
  const hasJobDescText = req.body.jobDescriptionText && req.body.jobDescriptionText.trim();

  if (!hasResumeFile && !hasResumeText) {
    return res.status(400).json({
      success: false,
      message: "Resume is required. Upload a file or provide text input.",
    });
  }

  if (!hasJobDescText) {
    return res.status(400).json({
      success: false,
      message: "Job description is required. Please provide job description text.",
    });
  }

  next();
}

module.exports = { validateAnalysisRequest };
