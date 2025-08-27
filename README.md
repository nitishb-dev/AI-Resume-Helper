# AI Resume Helper 🤖📄

> **Live Demo**: [https://ai-resume-helper-nine.vercel.app/](https://ai-resume-helper-nine.vercel.app/)

A cutting-edge web application that leverages AI to analyze resumes against job descriptions, providing actionable insights to help you land your dream job. Built with modern technologies and deployed for instant access.

![AI Resume Helper](https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=1200&h=400&fit=crop)

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20App-brightgreen?style=for-the-badge&logo=vercel)](https://ai-resume-helper-nine.vercel.app/)
[![License](https://img.shields.io/badge/License-Mixed-blue?style=for-the-badge)](#-license)
[![Contact](https://img.shields.io/badge/Contact-LinkedIn-blue?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/nitishb-dev)

## 🌟 Features

### 🎯 **Smart Resume Analysis**
- AI-powered comparison between resumes and job descriptions
- Advanced keyword matching with weighted scoring
- Professional algorithms for comprehensive evaluation

### 📁 **Multi-Format Support**
- **PDF Upload** - Upload resume files with advanced text extraction
- **Direct Text Input** - Paste job descriptions for optimal accuracy
- **File Validation** - Secure upload with size and type restrictions

### 📊 **Intelligent Scoring System**
- **Match Percentage** - Precise compatibility scoring
- **Keyword Analysis** - Extract and highlight critical skills
- **Gap Identification** - Identify missing keywords and requirements

### 💡 **Actionable Insights**
- **Priority-Based Suggestions** - High, medium, and low priority recommendations
- **ATS Optimization** - Applicant Tracking System compatibility tips
- **Section-by-Section Analysis** - Detailed improvement roadmap

## 🚀 Live Application

**🌐 Access the app instantly**: [ai-resume-helper-nine.vercel.app](https://ai-resume-helper-nine.vercel.app/)

No installation required - start analyzing your resume in seconds!

## 🛠️ Tech Stack

### **Frontend**
- ![React](https://img.shields.io/badge/React-18-blue?logo=react) - Modern React with hooks
- ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript) - Type-safe development
- ![Tailwind](https://img.shields.io/badge/Tailwind-CSS-06B6D4?logo=tailwindcss) - Utility-first styling
- ![Vite](https://img.shields.io/badge/Vite-Build-646CFF?logo=vite) - Lightning-fast development

### **Backend & AI**
- ![N8N](https://img.shields.io/badge/N8N-Workflow-EA4B71) - Visual workflow automation
- ![AI](https://img.shields.io/badge/Gemini-AI-4285F4) - Advanced language processing
- **Professional PDF Processing** - Enterprise-grade text extraction

### **Deployment**
- ![Vercel](https://img.shields.io/badge/Vercel-Deployment-000000?logo=vercel) - Seamless hosting and CDN

## 🎯 How It Works

### 1. **Upload Your Resume**
Upload your PDF resume using our secure file handling system

### 2. **Add Job Description**
Paste the job description you're targeting for optimal matching

### 3. **AI Analysis**
Our advanced AI analyzes compatibility and generates detailed insights

### 4. **Get Actionable Results**
- Match score percentage
- Missing keywords identification
- Priority-based improvement suggestions
- ATS optimization recommendations

## 📊 Analysis Capabilities

### **Comprehensive Keyword Detection**
- **Technical Skills**: JavaScript, Python, React, AWS, Docker, etc.
- **Soft Skills**: Leadership, Communication, Problem-solving
- **Industry Terms**: Role-specific terminology and requirements
- **Action Verbs**: Achievement-oriented language analysis

### **Intelligent Scoring**
- Weighted keyword matching
- Resume structure evaluation
- Achievement quantification assessment
- Professional formatting analysis

### **Improvement Categories**
- 🔴 **High Priority**: Critical missing elements
- 🟡 **Medium Priority**: ATS and formatting improvements
- 🟢 **Low Priority**: Enhancement opportunities

## 💼 For Developers

### **Frontend Development**
The frontend code is open source and perfect for learning:

```bash
# Clone the repository
git clone https://github.com/yourusername/ai-resume-helper
cd ai-resume-helper

# Install dependencies
npm install

# Start development server
npm run dev
```

### **Backend Integration**
The powerful N8N workflow that drives the AI analysis is available for purchase:

**What You Get:**
- Complete N8N workflow configuration
- AI integration setup (Gemini API)
- Professional PDF processing pipeline
- Setup documentation and support
- Commercial usage rights

**Contact for Workflow:**
- 📧 **Email**: nitishb057@gmail.com
- 💼 **LinkedIn**: [linkedin.com/in/nitishb-dev](https://www.linkedin.com/in/nitishb-dev)

## 🏗️ Project Structure

```
ai-resume-helper/
├── src/
│   ├── components/              # React components
│   │   ├── FileUpload.tsx       # Secure file upload
│   │   ├── JobDescriptionInput.tsx  # Job input interface
│   │   ├── ResultsDisplay.tsx   # Analysis results UI
│   │   └── LoadingSpinner.tsx   # Loading states
│   ├── services/
│   │   └── api.ts              # N8N workflow integration
│   ├── types/
│   │   └── index.ts            # TypeScript definitions
│   ├── utils/
│   │   └── fileValidation.ts   # Upload security
│   ├── App.tsx                 # Main application
│   └── main.tsx               # Entry point
├── public/                     # Static assets
├── package.json               # Dependencies
└── vercel.json               # Deployment config
```

## 🚀 Deployment Guide

### **Deploy Your Own Instance**

1. **Fork the Repository**
2. **Connect to Vercel**
3. **Configure Environment Variables**
4. **Deploy Instantly**

### **Environment Variables**
```env
VITE_API_ENDPOINT=your-n8n-webhook-url
VITE_APP_NAME=AI Resume Helper
```

## 📈 Performance & Features

- ⚡ **Lightning Fast** - Optimized loading and analysis
- 🔒 **Secure** - Client-side processing with secure uploads
- 📱 **Responsive** - Perfect on desktop, tablet, and mobile
- 🌐 **Global CDN** - Fast access worldwide via Vercel
- 🎨 **Modern UI** - Clean, intuitive interface design

## 🤝 Contributing

I Welcome contributions to the frontend:

1. Fork the repository
2. Create a feature branch
3. Make your improvements
4. Submit a pull request

For backend workflow contributions, please contact me directly.

## 💰 Pricing & Licensing

### **Frontend**
- ✅ **Free & Open Source** - MIT License
- ✅ **Commercial Use** - Allowed
- ✅ **Educational Use** - Encouraged

### **AI Workflow**
- 💼 **Commercial License** - Required for business use
- 🎓 **Educational Discount** - Available for students
- 🛠️ **Custom Features** - Development available

**Contact**: nitishb057@gmail.com

## 🔧 Configuration & Setup

### **API Configuration**
Update the endpoint in `src/services/api.ts`:

```typescript
const API_ENDPOINT = process.env.VITE_API_ENDPOINT || 'your-n8n-webhook-url';
```

### **File Upload Settings**
Customize limits in `src/utils/fileValidation.ts`:

```typescript
export const FILE_CONFIG = {
  maxSizeInMB: 10,
  allowedTypes: ['application/pdf'],
  maxFiles: 1
};
```

## 🐛 Troubleshooting

### **Common Issues**

**Application Not Loading**
- Check browser console for errors
- Verify network connection
- Try refreshing the page

**Upload Issues**
- Ensure file is PDF format
- Check file size (max 10MB)
- Try a different browser

**Analysis Not Working**
- The N8N workflow backend is required for full functionality
- Contact us for workflow access

### **Getting Help**

- 📧 **Email Support**: nitishb057@gmail.com
- 💬 **GitHub Issues**: For frontend bugs
- 📞 **Workflow Support**: Available for customers

## 🎓 Educational Resources

Perfect for learning modern web development:

- **React 18 Patterns** - Modern hooks and component design
- **TypeScript Integration** - Type-safe development practices
- **API Integration** - RESTful service consumption
- **File Handling** - Secure upload implementations
- **UI/UX Design** - Modern interface patterns

## 🌟 Acknowledgments

- **Vercel** - Seamless deployment platform
- **N8N** - Powerful workflow automation
- **Tailwind CSS** - Beautiful utility-first styling
- **Lucide React** - Clean, consistent icons
- **Pexels** - High-quality stock imagery

## 📞 Contact & Support

### **Developer**
- **Name**: Nitish B
- **Email**: nitishb057@gmail.com
- **LinkedIn**: [linkedin.com/in/nitishb-dev](https://www.linkedin.com/in/nitishb-dev)
- **Portfolio**: [GitHub Profile](https://github.com/nitishb-dev)

### **Business Inquiries**
- Custom development
- Enterprise solutions
- Workflow licensing
- Technical consulting

---

<div align="center">

**🚀 [Try It Now](https://ai-resume-helper-nine.vercel.app/) | 💼 [Get Workflow](mailto:nitishb057@gmail.com) | ⭐ [Star on GitHub](https://github.com/yourusername/ai-resume-helper)**

*Built with ❤️ using cutting-edge web technologies*

</div>
