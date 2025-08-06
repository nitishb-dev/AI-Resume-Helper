# Resume Helper Agent

A modern web application that analyzes resumes against job descriptions using AI-powered insights. Built with React, TypeScript, and N8N workflow automation.

![Resume Helper Agent](https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=1200&h=400&fit=crop)

## 🚀 Features

- **Smart Resume Analysis** - AI-powered comparison between your resume and job descriptions
- **File Upload Support** - Upload resume as PDF files with basic text extraction
- **Text Input Option** - Paste job description text directly for best accuracy
- **Match Scoring** - Get a percentage match score based on keyword alignment
- **Keyword Extraction** - Identify important skills and keywords from job descriptions
- **Actionable Suggestions** - Receive specific recommendations to improve your resume
- **Detailed Improvements** - Section-by-section analysis with priority levels
- **ATS Optimization** - Tips to make your resume more Applicant Tracking System friendly
- **Professional Analysis** - Advanced algorithms for comprehensive resume evaluation

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **Vite** - Fast build tool and dev server

### Backend
- **N8N** - Visual workflow automation
- **JavaScript** - Custom analysis logic
- **Advanced PDF Processing** - Professional text extraction methods

## 📋 Prerequisites

- Node.js 16+ and npm
- N8N workflow (available for purchase)
- Modern web browser

## 🚀 Quick Start

### 1. Purchase N8N Workflow

The backend N8N workflow that powers this application is available for purchase. Contact me for pricing and access:

- 📧 **Email**: nitishb057@gmail.com
- 💼 **LinkedIn**: www.linkedin.com/in/nitishb-dev

### 2. Clone and Setup Frontend

```bash
# Clone the repository
git clone <your-repo-url>
cd resume-helper-agent

# Install dependencies
npm install

# Start development server
npm run dev
```

### 3. Setup N8N Workflow

After purchasing the workflow:

1. **Import Workflow** into your N8N instance
2. **Configure Gemini API Keys** (Use any as per your availability) 
3. **Update API Endpoint** in `src/services/api.ts` with your N8N webhook URL
4. **Activate Workflow** in your N8N dashboard

## 📁 Project Structure

```
resume-helper-agent/
├── src/
│   ├── components/          # React components
│   │   ├── FileUpload.tsx   # File upload component
│   │   ├── JobDescriptionInput.tsx  # Job description input
│   │   ├── ResultsDisplay.tsx       # Analysis results display
│   │   └── LoadingSpinner.tsx       # Loading indicator
│   ├── services/
│   │   └── api.ts          # API service for N8N communication
│   ├── types/
│   │   └── index.ts        # TypeScript type definitions
│   ├── utils/
│   │   └── fileValidation.ts  # File validation utilities
│   ├── App.tsx             # Main application component
│   ├── main.tsx           # Application entry point
│   └── index.css          # Global styles
├── package.json
└── README.md
```

## 🔧 Configuration

### API Endpoint

Update the API endpoint in `src/services/api.ts`:

```typescript
const API_ENDPOINT = 'https://your-n8n-instance.com/webhook/your-webhook-id';
```

### File Upload Limits

Configure file size limits in `src/utils/fileValidation.ts`:

```typescript
const maxSizeInMB = 10; // Maximum file size
const allowedTypes = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/msword'
];
```

## 💰 Pricing

- **Frontend Code**: Free and open source
- **N8N Workflow**: Available for purchase (includes setup guide and support)
- **Custom Features**: Available on request

## 📖 How to Use

### For Users

1. **Upload Resume** - Upload your PDF resume
2. **Add Job Description** - Paste the job description you're applying for
3. **Analyze** - Click "Analyze Resume" to get insights
4. **Review Results** - Get match score, keywords, and improvement suggestions
5. **Improve** - Follow the detailed recommendations to enhance your resume

### For Developers

1. **Frontend Development** - Standard React development with TypeScript (free)
2. **Workflow Access** - Purchase N8N workflow for backend functionality
3. **Customization** - Modify frontend styling and components as needed
4. **API Integration** - Extend the API service for additional endpoints

## 🎯 Analysis Features

### Match Score Calculation
- Keyword matching with weighted scoring
- Resume structure analysis
- Quantifiable achievements detection
- Action verb usage assessment

### Keyword Extraction
- 100+ technical skills (JavaScript, Python, React, etc.)
- Cloud technologies (AWS, Docker, Kubernetes)
- Soft skills (Leadership, Communication, Teamwork)
- Industry-specific terms

### Improvement Suggestions
- **High Priority** - Critical missing keywords and structure issues
- **Medium Priority** - ATS optimization and formatting improvements
- **Low Priority** - Content enhancement and additional sections

## 🔍 Troubleshooting

### Common Issues

**Need N8N Workflow**
- The backend workflow is required for the application to function
- Contact me to purchase the complete workflow setup
- Includes detailed setup instructions and support

**CORS Issues**
- Ensure N8N webhook has proper CORS headers configured
- Check that the webhook URL is correct in frontend
- Verify the workflow is activated in N8N

**API Connection Issues**
- Verify the webhook URL in `src/services/api.ts`
- Check that the webhook is activated

### Debug Tips

1. **Check Browser Console** - Look for API errors
2. **Test N8N Workflow** - Use N8N's test feature with sample data
3. **Verify File Formats** - Ensure uploaded files are PDF or DOCX
4. **Contact Support** - Reach out if you need help with the workflow

## 🚀 Deployment

### Frontend Deployment

```bash
# Build for production
npm run build

# Deploy to Netlify, Vercel, or any static hosting
```

### N8N Deployment
- Self-host N8N on your server
- Deploy on platforms like Railway, render

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

**Note**: Contributions are welcome for the frontend code. The N8N workflow is proprietary and not included in this repository.

## 💼 Commercial Use

This project is available for commercial use. The frontend is open source, but the N8N workflow requires a license for commercial deployment.

## 📝 License

- **N8N Workflow**: Proprietary - requires purchase for use

## 🙏 Acknowledgments

- **N8N** - For the excellent workflow automation platform
- **Tailwind CSS** - For the beautiful UI components
- **Lucide** - For the icon set
- **Pexels** - For stock photos

## 📞 Support

- **Frontend Issues** - Report bugs and request features via GitHub Issues
- **Workflow Support** - Available to customers who purchase the N8N workflow
- **Custom Development** - Available on request

## 🎓 Educational Use

The frontend code is open source and available for educational purposes:

- ✅ Learn React and TypeScript development
- ✅ Study modern frontend architecture
- ✅ Understand API integration patterns
- ✅ Practice with file upload handling

For the complete working application, the N8N workflow is required.

---

**Built with ❤️ using modern web technologies**
