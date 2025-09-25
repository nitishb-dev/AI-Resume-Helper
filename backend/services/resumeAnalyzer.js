const aiService = require("./aiService");

/**
 * Comprehensive Resume Analysis Service
 * Analyzes resume against job description and provides detailed feedback
 */

/**
 * Main function to perform resume analysis
 * @param {string} resumeText - The resume content
 * @param {string} jobDescriptionText - The job description content
 * @returns {Object} - Analysis results
 */
const performResumeAnalysis = async (resumeText, jobDescriptionText) => {
  // Try AI analysis first if available
  if (aiService.isAvailable()) {
    try {
      console.log("🤖 Using AI analysis with Grok-4-Fast...");
      const aiResult = await aiService.analyzeResumeWithAI(
        resumeText,
        jobDescriptionText
      );

      // Add metadata to AI result
      return {
        ...aiResult,
        analysisType: "ai",
        model: "grok-4-fast",
        provider: "openrouter",
      };
    } catch (error) {
      console.warn(
        "⚠️  AI analysis failed, falling back to rule-based analysis:",
        error.message
      );
      // Fall through to rule-based analysis
    }
  }

  // Fallback to rule-based analysis
  console.log("📊 Using rule-based analysis...");
  const keywordsFromJD = extractComprehensiveKeywords(jobDescriptionText);
  const resumeTextLower = resumeText.toLowerCase();

  // Filter keywords from the job description to find ones that are also in the resume.
  const matchedKeywords = keywordsFromJD.filter((keyword) =>
    resumeTextLower.includes(keyword.toLowerCase())
  );

  const matchScore = calculateAdvancedMatchScore(
    resumeText,
    jobDescriptionText,
    keywordsFromJD
  );
  const suggestions = generateIntelligentSuggestions(
    resumeText,
    jobDescriptionText,
    keywordsFromJD
  );
  const improvements = generateDetailedImprovements(
    resumeText,
    jobDescriptionText,
    keywordsFromJD
  );

  return {
    matchScore,
    keywords: matchedKeywords.slice(0, 15),
    suggestions,
    improvements,
    analysisType: "rule-based",
    model: "internal",
    provider: "local",
  };
};

/**
 * Extract comprehensive keywords from job description
 * @param {string} jobDescription - Job description text
 * @returns {Array} - Array of relevant keywords
 */
const extractComprehensiveKeywords = (jobDescription) => {
  const text = jobDescription.toLowerCase();

  // Comprehensive skill database
  const skillCategories = {
    programming: [
      "javascript",
      "python",
      "java",
      "c++",
      "c#",
      "php",
      "ruby",
      "go",
      "rust",
      "swift",
      "typescript",
      "kotlin",
      "scala",
      "r",
      "matlab",
      "perl",
      "shell",
      "bash",
      "powershell",
    ],
    webTech: [
      "react",
      "angular",
      "vue.js",
      "vue",
      "node.js",
      "nodejs",
      "express",
      "django",
      "flask",
      "spring",
      "html",
      "css",
      "sass",
      "less",
      "bootstrap",
      "tailwind",
      "jquery",
      "webpack",
      "vite",
      "next.js",
    ],
    databases: [
      "sql",
      "mysql",
      "postgresql",
      "postgres",
      "mongodb",
      "redis",
      "elasticsearch",
      "oracle",
      "sqlite",
      "cassandra",
      "dynamodb",
      "firebase",
      "supabase",
    ],
    cloud: [
      "aws",
      "azure",
      "gcp",
      "google cloud",
      "docker",
      "kubernetes",
      "jenkins",
      "terraform",
      "ansible",
      "chef",
      "puppet",
      "vagrant",
      "heroku",
      "netlify",
      "vercel",
    ],
    tools: [
      "git",
      "github",
      "gitlab",
      "bitbucket",
      "jira",
      "confluence",
      "slack",
      "trello",
      "visual studio",
      "vscode",
      "intellij",
      "eclipse",
      "postman",
      "figma",
      "sketch",
    ],
    methodologies: [
      "agile",
      "scrum",
      "kanban",
      "devops",
      "ci/cd",
      "tdd",
      "bdd",
      "waterfall",
      "microservices",
      "rest api",
      "restful",
      "graphql",
      "soap",
      "api",
    ],
    softSkills: [
      "leadership",
      "communication",
      "teamwork",
      "problem solving",
      "analytical",
      "project management",
      "mentoring",
      "collaboration",
      "adaptability",
      "creativity",
      "critical thinking",
      "time management",
      "organization",
    ],
    business: [
      "strategy",
      "optimization",
      "efficiency",
      "scalability",
      "performance",
      "automation",
      "integration",
      "architecture",
      "design",
      "development",
      "testing",
      "debugging",
      "troubleshooting",
      "documentation",
      "analysis",
    ],
  };

  const allSkills = Object.values(skillCategories).flat();
  const foundKeywords = [];

  // Find exact matches
  allSkills.forEach((skill) => {
    if (text.includes(skill)) {
      foundKeywords.push(skill);
    }
  });

  // Extract custom keywords (frequently mentioned terms)
  const words = text.match(/\b[a-z]{4,}\b/g) || [];
  const wordCount = {};

  const stopWords = [
    "experience",
    "knowledge",
    "skills",
    "ability",
    "strong",
    "excellent",
    "good",
    "work",
    "team",
    "company",
    "role",
    "position",
    "candidate",
    "required",
    "preferred",
    "years",
    "plus",
    "bonus",
    "looking",
    "seeking",
    "ideal",
    "must",
    "should",
    "will",
    "would",
  ];

  words.forEach((word) => {
    if (!stopWords.includes(word)) {
      wordCount[word] = (wordCount[word] || 0) + 1;
    }
  });

  // Add frequently mentioned words
  Object.entries(wordCount)
    .filter(([word, count]) => count >= 2 && word.length >= 4)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 8)
    .forEach(([word]) => {
      if (!foundKeywords.includes(word)) {
        foundKeywords.push(word);
      }
    });

  return foundKeywords;
};

/**
 * Calculate advanced match score
 * @param {string} resume - Resume text
 * @param {string} jobDescription - Job description text
 * @param {Array} keywords - Extracted keywords
 * @returns {number} - Match score (0-100)
 */
const calculateAdvancedMatchScore = (resume, jobDescription, keywords) => {
  const resumeText = resume.toLowerCase();
  let matchedKeywords = 0;
  let weightedScore = 0;

  // Calculate keyword matches with weights
  keywords.forEach((keyword) => {
    if (resumeText.includes(keyword.toLowerCase())) {
      matchedKeywords++;
      // Give higher weight to technical skills
      const highValueKeywords = [
        "javascript",
        "python",
        "react",
        "node.js",
        "aws",
        "docker",
        "kubernetes",
        "sql",
        "mongodb",
        "git",
        "api",
        "microservices",
      ];
      const weight = highValueKeywords.includes(keyword.toLowerCase())
        ? 2.5
        : 1;
      weightedScore += weight;
    }
  });

  const keywordScore =
    keywords.length > 0 ? (weightedScore / (keywords.length * 1.8)) * 70 : 35;

  // Additional scoring factors
  let bonusScore = 0;

  // Resume structure bonus
  const structureKeywords = [
    "experience",
    "work",
    "employment",
    "skills",
    "education",
    "projects",
    "summary",
    "objective",
  ];
  const hasGoodStructure =
    structureKeywords.filter((keyword) => resumeText.includes(keyword))
      .length >= 3;
  if (hasGoodStructure) bonusScore += 15;

  // Quantifiable achievements bonus
  const hasMetrics = /\d+%|\d+\+|\$\d+|\d+ years?|\d+ months?|\d+k|\d+m/i.test(
    resume
  );
  if (hasMetrics) bonusScore += 10;

  // Action verbs bonus
  const actionVerbs = [
    "developed",
    "implemented",
    "managed",
    "led",
    "created",
    "designed",
    "built",
    "improved",
    "optimized",
    "achieved",
    "delivered",
    "collaborated",
  ];
  const actionVerbCount = actionVerbs.filter((verb) =>
    resumeText.includes(verb)
  ).length;
  if (actionVerbCount >= 3) bonusScore += 10;
  else if (actionVerbCount >= 1) bonusScore += 5;

  // Length appropriateness
  const wordCount = resume.split(/\s+/).length;
  if (wordCount >= 250 && wordCount <= 1000) bonusScore += 5;

  const finalScore = Math.min(
    100,
    Math.max(0, Math.round(keywordScore + bonusScore))
  );
  return finalScore;
};

/**
 * Generate intelligent suggestions
 * @param {string} resume - Resume text
 * @param {string} jobDescription - Job description text
 * @param {Array} keywords - Extracted keywords
 * @returns {Array} - Array of suggestions
 */
const generateIntelligentSuggestions = (resume, jobDescription, keywords) => {
  const suggestions = [];
  const resumeText = resume.toLowerCase();

  // Missing keywords analysis
  const missingKeywords = keywords.filter(
    (keyword) => !resumeText.includes(keyword.toLowerCase())
  );

  if (missingKeywords.length > 0) {
    const topMissing = missingKeywords.slice(0, 5);
    suggestions.push(
      `Add these relevant skills from the job description: ${topMissing.join(
        ", "
      )}`
    );
  }

  // Structure analysis
  if (!/summary|objective/i.test(resume)) {
    suggestions.push(
      "Add a professional summary at the top that highlights your key qualifications"
    );
  }

  // Quantification analysis
  if (!/\d+%|\d+\+|\$\d+/i.test(resume)) {
    suggestions.push(
      "Include quantifiable achievements (e.g., 'Increased efficiency by 25%', 'Managed $50K budget')"
    );
  }

  // Action verbs analysis
  const actionVerbs = [
    "developed",
    "implemented",
    "managed",
    "led",
    "created",
    "designed",
  ];
  const usedActionVerbs = actionVerbs.filter((verb) =>
    resumeText.includes(verb)
  );
  if (usedActionVerbs.length < 2) {
    suggestions.push(
      "Use more strong action verbs like 'developed', 'implemented', 'managed', 'led'"
    );
  }

  // Industry-specific suggestions
  if (
    jobDescription.toLowerCase().includes("software") ||
    jobDescription.toLowerCase().includes("developer")
  ) {
    if (!resumeText.includes("github") && !resumeText.includes("portfolio")) {
      suggestions.push(
        "Include links to your GitHub profile or portfolio to showcase your technical work"
      );
    }
  }

  // Length analysis
  const wordCount = resume.split(/\s+/).length;
  if (wordCount < 250) {
    suggestions.push(
      "Expand your resume with more detailed descriptions of your experience and achievements"
    );
  } else if (wordCount > 1000) {
    suggestions.push(
      "Consider condensing your resume to focus on the most relevant experiences"
    );
  }

  return suggestions.slice(0, 6);
};

/**
 * Generate detailed improvements
 * @param {string} resume - Resume text
 * @param {string} jobDescription - Job description text
 * @param {Array} keywords - Extracted keywords
 * @returns {Array} - Array of improvement objects
 */
const generateDetailedImprovements = (resume, jobDescription, keywords) => {
  const improvements = [];
  const resumeText = resume.toLowerCase();

  // Professional Summary
  if (!/summary|objective/i.test(resume)) {
    improvements.push({
      section: "Professional Summary",
      recommendation: `Add a 2-3 sentence professional summary that includes these key terms: ${keywords
        .slice(0, 4)
        .join(
          ", "
        )}. This helps with ATS scanning and gives recruiters a quick overview.`,
      priority: "high",
    });
  }

  // Skills Section
  const missingSkills = keywords.filter(
    (keyword) => !resumeText.includes(keyword.toLowerCase())
  );
  if (missingSkills.length > 0) {
    improvements.push({
      section: "Skills Section",
      recommendation: `Add these relevant skills from the job description: ${missingSkills
        .slice(0, 8)
        .join(
          ", "
        )}. Only include skills you actually possess and can discuss in an interview.`,
      priority: "high",
    });
  }

  // Experience Section
  if (!/\d+%|\d+\+|\$\d+|\d+ years?/i.test(resume)) {
    improvements.push({
      section: "Work Experience",
      recommendation:
        "Quantify your achievements with specific numbers, percentages, dollar amounts, or timeframes. For example: 'Improved system performance by 40%' or 'Led a team of 5 developers' or 'Managed projects worth $100K+'",
      priority: "high",
    });
  }

  // Action Verbs and Impact
  const actionVerbs = [
    "developed",
    "implemented",
    "managed",
    "led",
    "created",
    "designed",
    "built",
    "improved",
    "optimized",
    "achieved",
  ];
  const usedActionVerbs = actionVerbs.filter((verb) =>
    resumeText.includes(verb)
  );
  if (usedActionVerbs.length < 3) {
    improvements.push({
      section: "Experience Descriptions",
      recommendation:
        "Start each bullet point with strong action verbs and focus on impact. Use words like: developed, implemented, managed, led, created, designed, optimized, achieved, delivered, collaborated.",
      priority: "medium",
    });
  }

  // ATS Optimization
  improvements.push({
    section: "ATS Optimization",
    recommendation:
      "Use exact keywords and phrases from the job description. Applicant Tracking Systems (ATS) look for specific matches. Include both acronyms and full terms (e.g., 'AI' and 'Artificial Intelligence').",
    priority: "medium",
  });

  // Education and Certifications
  if (
    jobDescription.toLowerCase().includes("degree") ||
    jobDescription.toLowerCase().includes("bachelor") ||
    jobDescription.toLowerCase().includes("master")
  ) {
    if (!/education|degree|university|college|bachelor|master/i.test(resume)) {
      improvements.push({
        section: "Education",
        recommendation:
          "Include your educational background as it's mentioned in the job requirements. List your degree, major, institution, and graduation year.",
        priority: "medium",
      });
    }
  }

  // Technical Projects (for tech roles)
  if (
    keywords.some((k) =>
      ["javascript", "python", "react", "node.js", "java", "sql"].includes(
        k.toLowerCase()
      )
    )
  ) {
    if (!/project|github|portfolio/i.test(resume)) {
      improvements.push({
        section: "Projects Section",
        recommendation:
          "Add a projects section showcasing relevant technical work. Include project descriptions, technologies used, and links to GitHub or live demos.",
        priority: "low",
      });
    }
  }

  // Format and Length
  const wordCount = resume.split(/\s+/).length;
  if (wordCount < 250) {
    improvements.push({
      section: "Content Depth",
      recommendation:
        "Expand your resume with more detailed descriptions of your responsibilities, achievements, and the impact of your work. Aim for 400-800 words total.",
      priority: "low",
    });
  }

  return improvements;
};

module.exports = {
  performResumeAnalysis,
  extractComprehensiveKeywords,
  calculateAdvancedMatchScore,
  generateIntelligentSuggestions,
  generateDetailedImprovements,
};
