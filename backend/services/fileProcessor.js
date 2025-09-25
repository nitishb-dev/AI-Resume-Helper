const pdf = require("pdf-parse");
const mammoth = require("mammoth");

/**
 * Extract text from PDF file
 * @param {Buffer} fileBuffer - Buffer of the PDF file
 * @returns {Promise<string>} - Extracted text
 */
const extractTextFromPDF = async (fileBuffer) => {
  try {
    const data = await pdf(fileBuffer);

    if (!data.text || data.text.trim().length < 50) {
      throw new Error("PDF appears to be empty or contains mostly images");
    }

    return data.text.trim();
  } catch (error) {
    console.error("PDF extraction error:", error);
    throw new Error(
      "Failed to extract text from PDF. The file might be corrupted, password-protected, or contain mostly images."
    );
  }
};

/**
 * Extract text from DOCX file
 * @param {Buffer} fileBuffer - Buffer of the DOCX file
 * @returns {Promise<string>} - Extracted text
 */
const extractTextFromDOCX = async (fileBuffer) => {
  try {
    const result = await mammoth.extractRawText({ buffer: fileBuffer });

    if (!result.value || result.value.trim().length < 50) {
      throw new Error("DOCX appears to be empty");
    }

    return result.value.trim();
  } catch (error) {
    console.error("DOCX extraction error:", error);
    throw new Error(
      "Failed to extract text from DOCX file. The file might be corrupted or in an unsupported format."
    );
  }
};

/**
 * Validate extracted text quality
 * @param {string} text - Extracted text
 * @returns {Object} - Validation result
 */
const validateExtractedText = (text) => {
  const wordCount = text.split(/\s+/).length;
  const hasEmail = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/.test(
    text
  );
  const hasPhone = /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/.test(text);
  const hasCommonResumeWords =
    /\b(experience|education|skills|work|employment|project)\b/i.test(text);

  return {
    isValid: wordCount >= 50 && hasCommonResumeWords,
    wordCount,
    hasContactInfo: hasEmail || hasPhone,
    hasResumeStructure: hasCommonResumeWords,
    quality: wordCount >= 200 ? "good" : wordCount >= 100 ? "fair" : "poor",
  };
};

module.exports = {
  extractTextFromPDF,
  extractTextFromDOCX,
  validateExtractedText,
};
