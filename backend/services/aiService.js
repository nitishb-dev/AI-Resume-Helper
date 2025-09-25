const axios = require("axios");

/**
 * AI Service for Resume Analysis using OpenRouter Grok-4-Fast
 */
class AIService {
  constructor() {
    this.apiKey = process.env.OPENROUTER_API_KEY;
    this.model = process.env.OPENROUTER_MODEL || "x-ai/grok-4-fast:free";
    this.baseURL =
      process.env.OPENROUTER_BASE_URL || "https://openrouter.ai/api/v1";

    if (!this.apiKey) {
      console.warn(
        "⚠️  OpenRouter API key not found. AI analysis will use fallback logic."
      );
    }
  }

  /**
   * Analyze resume using Grok-4-Fast AI model
   * @param {string} resumeText - Resume content
   * @param {string} jobDescription - Job description content
   * @returns {Promise<Object>} - AI analysis results
   */
  async analyzeResumeWithAI(resumeText, jobDescription) {
    if (!this.apiKey) {
      throw new Error("OpenRouter API key not configured");
    }

    try {
      const prompt = this.buildAnalysisPrompt(resumeText, jobDescription);

      const response = await axios.post(
        `${this.baseURL}/chat/completions`,
        {
          model: this.model,
          messages: [
            {
              role: "system",
              content:
                "You are a professional resume analyst and career coach with expertise in ATS optimization, keyword matching, and career development. Analyze resumes with precision and provide actionable feedback.",
            },
            {
              role: "user",
              content: prompt,
            },
          ],
          temperature: 0.3,
          max_tokens: 2000,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        },
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            "Content-Type": "application/json",
            Referer: process.env.FRONTEND_URL || "http://localhost:3000",
            "X-Title": "AI Resume Helper",
          },
          timeout: 30000, // 30 second timeout
        }
      );

      const aiResponse = response.data.choices[0]?.message?.content;

      if (!aiResponse) {
        throw new Error("No response from AI model");
      }

      return this.parseAIResponse(aiResponse);
    } catch (error) {
      console.error(
        "AI Analysis Error:",
        error.response?.data || error.message
      );

      if (error.response?.status === 401) {
        throw new Error("Invalid OpenRouter API key");
      } else if (error.response?.status === 429) {
        throw new Error("Rate limit exceeded. Please try again later.");
      } else if (error.response?.status === 402) {
        throw new Error(
          "Insufficient credits. Please check your OpenRouter account."
        );
      }

      throw new Error("AI analysis temporarily unavailable");
    }
  }

  /**
   * Build comprehensive analysis prompt for AI
   * @param {string} resumeText - Resume content
   * @param {string} jobDescription - Job description
   * @returns {string} - Formatted prompt
   */
  buildAnalysisPrompt(resumeText, jobDescription) {
    return `
TASK: Analyze the following resume against the job description and provide detailed, actionable feedback.

RESUME CONTENT:
${resumeText}

JOB DESCRIPTION:
${jobDescription}

ANALYSIS REQUIREMENTS:
1. Calculate a match score (0-100) based on:
   - Keyword alignment and relevance
   - Skills match with job requirements
   - Experience relevance
   - Qualification compatibility

2. Identify and list the top 10-15 most important skills/keywords from the job description that are also present in the resume.

3. Provide 4-6 quick, actionable suggestions for improvement

4. Generate detailed section-by-section recommendations with priority levels (high/medium/low)

RESPONSE FORMAT (JSON ONLY):
{
  "matchScore": <number 0-100>,
  "keywords": ["matched_keyword1", "matched_keyword2", "matched_keyword3", ...],
  "suggestions": [
    "Quick suggestion 1",
    "Quick suggestion 2",
    ...
  ],
  "improvements": [
    {
      "section": "Section Name",
      "recommendation": "Detailed recommendation with specific actions",
      "priority": "high|medium|low"
    },
    ...
  ]
}

IMPORTANT: 
- Respond ONLY with valid JSON
- The "keywords" array must only contain keywords found in BOTH the resume and the job description.
- Be specific and actionable in recommendations
- Focus on ATS optimization and keyword matching
- Consider both technical and soft skills
- Prioritize improvements that will have the biggest impact
`;
  }

  /**
   * Parse and validate AI response
   * @param {string} aiResponse - Raw AI response
   * @returns {Object} - Parsed analysis results
   */
  parseAIResponse(aiResponse) {
    try {
      // Clean the response to extract JSON
      let cleanResponse = aiResponse.trim();

      // Remove markdown code blocks if present
      cleanResponse = cleanResponse
        .replace(/```json\n?/g, "")
        .replace(/```\n?/g, "");

      // Find JSON object in the response
      const jsonMatch = cleanResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        cleanResponse = jsonMatch[0];
      }

      const parsed = JSON.parse(cleanResponse);

      // Validate and sanitize the response
      return {
        matchScore: Math.min(
          100,
          Math.max(0, parseInt(parsed.matchScore) || 0)
        ),
        keywords: Array.isArray(parsed.keywords)
          ? parsed.keywords.slice(0, 15)
          : [],
        suggestions: Array.isArray(parsed.suggestions)
          ? parsed.suggestions.slice(0, 6)
          : [],
        improvements: Array.isArray(parsed.improvements)
          ? parsed.improvements.slice(0, 8).map((imp) => ({
              section: imp.section || "General",
              recommendation:
                imp.recommendation || "No recommendation provided",
              priority: ["high", "medium", "low"].includes(imp.priority)
                ? imp.priority
                : "medium",
            }))
          : [],
      };
    } catch (error) {
      console.error("Error parsing AI response:", error);
      console.log("Raw AI response:", aiResponse);

      throw new Error("Failed to parse AI analysis results");
    }
  }

  /**
   * Check if AI service is available
   * @returns {boolean} - Whether AI service is configured
   */
  isAvailable() {
    return !!this.apiKey;
  }

  /**
   * Get service status
   * @returns {Object} - Service status information
   */
  getStatus() {
    return {
      available: this.isAvailable(),
      model: this.model,
      provider: "OpenRouter (Grok-4-Fast)",
    };
  }
}

module.exports = new AIService();
