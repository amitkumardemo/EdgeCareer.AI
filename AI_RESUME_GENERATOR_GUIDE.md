# AI Resume Generator - User Guide

## Overview
The AI Resume Generator is a powerful feature that creates company-specific, ATS-optimized resumes automatically using AI. It requires **zero manual form filling** and generates a professional one-page resume tailored to your target job.

## How to Access
1. Navigate to **Growth Tools** dropdown in the header
2. Click on **AI Resume Generator**
3. Or visit directly: `http://localhost:3000/ai-resume-generator`

## How It Works

### Step 1: Enter Job Details
Fill in the following information about your target position:
- **Company Name**: The company you're applying to (e.g., Google, Microsoft)
- **Job Role**: The position title (e.g., Software Engineer, Product Manager)
- **Job Description**: Copy and paste the complete job posting

### Step 2: Provide Your Resume
Choose one of two methods:
- **Upload PDF**: Upload your existing resume (PDF format, max 5MB)
- **Paste Text**: Copy and paste your resume content directly

### Step 3: Generate Resume
Click the **"Generate ATS-Optimized Resume"** button and wait while the AI:
- Extracts ATS keywords from the job description
- Analyzes your existing resume
- Matches your experience to job requirements
- Rewrites content using job-specific keywords
- Optimizes for 90%+ ATS compatibility

### Step 4: Review & Download
- View your **ATS Compatibility Score** (0-100%)
- See **Matched Keywords** from the job description
- Read **Optimization Notes** explaining the changes
- Preview the generated resume
- Click **Download PDF** to save your resume

## Key Features

### ✅ Zero Manual Input
- No forms to fill out
- No manual section editing required
- AI handles all content generation

### ✅ ATS Optimization
- 90%+ keyword match targeting
- ATS-safe formatting (no icons, tables, or images)
- One-page layout
- Standard section headings

### ✅ Job-Specific Customization
- Professional summary tailored to the role
- Experience bullets rewritten with job keywords
- Skills prioritized based on job requirements
- Projects restructured for relevance
- Irrelevant content automatically removed

### ✅ Live Preview
- Real-time ATS score display
- Color-coded score indicator:
  - **Green (90-100%)**: Excellent
  - **Yellow (75-89%)**: Good
  - **Red (0-74%)**: Needs Improvement
- Matched keywords display
- Full resume preview before download

## Tips for Best Results

1. **Job Description**: Paste the complete, unedited job posting for maximum accuracy
2. **Resume Quality**: Use a well-structured existing resume with clear sections
3. **PDF Format**: When uploading, ensure your PDF has selectable text (not scanned images)
4. **Review Before Download**: Always review the generated content for accuracy

## Technical Details

### AI Model
- Uses Google Gemini 2.5 Flash for fast, accurate generation
- Analyzes job requirements and resume content
- Generates optimized content with quantifiable metrics

### Output Format
- One-page A4 layout
- Two-column design
- Professional formatting
- ATS-compatible structure

### Sections Included
- Contact Information
- Professional Summary
- Skills
- Experience
- Projects
- Education

## Troubleshooting

### PDF Upload Issues
- Ensure file is less than 5MB
- Use PDF format (not Word or other formats)
- Try pasting text instead if upload fails

### Low ATS Score
- Ensure job description is complete
- Check if your resume has relevant experience
- Review matched keywords and add missing skills

### Generation Errors
- Check internet connection
- Verify all required fields are filled
- Try again with a different resume format

## API Endpoint
The feature uses the `/api/ai-resume-generator` endpoint which accepts:
- Company name
- Job role
- Job description
- Resume (file or text)

## Privacy & Data
- Resume content is processed securely
- No data is permanently stored without your consent
- Generated resumes are available for immediate download
- All processing happens server-side for security

## Support
For issues or questions, please check:
1. Ensure all fields are filled correctly
2. Verify file format and size limits
3. Check browser console for errors
4. Contact support if problems persist

---

**Built with**: Next.js 15, Google Gemini AI, React, Tailwind CSS, shadcn/ui
