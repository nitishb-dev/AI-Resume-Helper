# Resume Helper Backend

Express.js backend for the AI Resume Helper application. Provides resume analysis, file processing, and intelligent matching algorithms.

## 🚀 Features

- **File Processing**: PDF and DOCX resume parsing
- **AI Analysis**: Comprehensive resume-job matching
- **RESTful API**: Clean, documented endpoints
- **Security**: Rate limiting, CORS, input validation
- **Error Handling**: Comprehensive error management

## 📋 Prerequisites

- Node.js 16+ 
- npm or yarn

## 🛠️ Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Start development server
npm run dev
```

## 🔧 Configuration

Update `.env` file with your settings:

```env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

## 📚 API Endpoints

### POST /api/resume/analyze

Analyze resume against job description.

**Request:**
- `Content-Type: multipart/form-data`
- `resume`: PDF/DOCX file (optional if resumeText provided)
- `jobDescription`: PDF/DOCX file (optional if jobDescriptionText provided)  
- `resumeText`: Plain text resume (optional if resume file provided)
- `jobDescriptionText`: Plain text job description (optional if jobDescription file provided)

**Response:**
```json
{
  "success": true,
  "data": {
    "matchScore": 85,
    "keywords": ["javascript", "react", "node.js"],
    "suggestions": ["Add more quantifiable achievements"],
    "improvements": [
      {
        "section": "Skills",
        "recommendation": "Add these skills: docker, aws",
        "priority": "high"
      }
    ]
  }
}
```

### GET /health

Health check endpoint.

## 🧪 Testing

```bash
# Run tests
npm test

# Test with curl
curl -X POST http://localhost:5000/api/resume/analyze \
  -F "resumeText=Your resume content here" \
  -F "jobDescriptionText=Job description here"
```

## 📁 Project Structure

```
backend/
├── controllers/         # Request handlers
├── middleware/         # Custom middleware
├── routes/            # API routes
├── services/          # Business logic
├── uploads/           # Temporary file storage
├── server.js          # Main server file
└── package.json       # Dependencies
```

## 🔒 Security Features

- **Rate Limiting**: 100 requests per 15 minutes
- **File Validation**: Type and size restrictions
- **CORS Protection**: Configurable origins
- **Input Sanitization**: Joi validation
- **Error Handling**: No sensitive data exposure

## 🚀 Deployment

### Local Development
```bash
npm run dev
```

### Production
```bash
npm start
```

### Docker (Optional)
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

## 📊 Performance

- **File Processing**: Handles 10MB files efficiently
- **Memory Usage**: Optimized for concurrent requests
- **Response Time**: < 2 seconds for typical resumes

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Add tests for new features
4. Submit pull request

## 📝 License

MIT License - see LICENSE file for details.