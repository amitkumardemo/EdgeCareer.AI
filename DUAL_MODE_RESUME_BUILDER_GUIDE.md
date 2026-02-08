# Dual-Mode AI Resume Builder - Complete Guide

## 🎯 Overview
The Dual-Mode AI Resume Builder is a flexible, professional resume creation tool that supports **TWO** distinct workflows:
1. **Manual Mode** - Traditional form-based resume building with strict one-page enforcement
2. **AI Mode** - Automated resume generation from job descriptions and existing resumes

Both modes produce **ATS-optimized, ONE-PAGE** resumes.

---

## 🚀 Access the Feature

**URL:** `http://localhost:3000/resume`

**Navigation:** 
- Click **Growth Tools** dropdown in header → **Build Resume**

---

## 📋 Mode Selection

At the top of the Resume Builder, you'll see two clear options:

```
┌─────────────────────────┬─────────────────────────┐
│   Build Manually        │    Build with AI        │
│   (Form-based)          │    (Auto-generation)    │
└─────────────────────────┴─────────────────────────┘
```

**You can switch between modes anytime!**

---

## 🤖 MODE 1: Build with AI (Auto Mode)

### How It Works

1. **Fill 3 Input Boxes:**

   **BOX 1: Job Details**
   - Company Name (e.g., Google, Amazon)
   - Job Role / Position (e.g., Software Engineer)

   **BOX 2: Job Description**
   - Paste complete job description
   - Include requirements, responsibilities, qualifications

   **BOX 3: Resume Source**
   - **Option A:** Upload existing resume (PDF, max 5MB)
   - **Option B:** Paste resume content as text

2. **Click "Generate ATS-Optimized Resume"**

3. **AI Processing:**
   - Analyzes job description for keywords
   - Extracts required skills and experience
   - Matches your resume to job requirements
   - Rewrites content with job-specific terms
   - Auto-fills ALL resume sections

4. **Review & Download:**
   - Form auto-fills with optimized content
   - View ATS compatibility score (0-100%)
   - See matched keywords
   - Read optimization notes
   - Switch to manual mode to edit if needed

### AI Features

✅ **Zero Manual Form Filling**
- No need to type anything manually
- AI handles all content generation

✅ **ATS Optimization (90%+ target)**
- Keyword extraction from job description
- Experience bullets rewritten with metrics
- Skills prioritized by job requirements
- Projects restructured for relevance

✅ **Auto-Generated Sections:**
- Professional Summary (tailored to role)
- Skills (aligned with job requirements)
- Experience (rewritten with job keywords)
- Projects (optimized for relevance)
- Achievements
- Why I Fit This Role

---

## ✍️ MODE 2: Build Manually (Form Mode)

### Structured Form Sections

The manual mode provides a comprehensive form with the following sections:

#### 1. Contact Information
- **Full Name** (Max 50 chars)
- **Email** (Required)
- **Mobile** (Max 20 chars)
- **LinkedIn URL** (Optional)
- **GitHub Profile** (Optional)
- **Portfolio Website** (Optional)

#### 2. Professional Summary
- **Max 200 characters**
- AI Enhance button available
- Real-time character counter
- Turns **orange at 80%**, **red at 100%**

#### 3. Skills
- **Max 300 characters**
- Comma-separated list
- Real-time character counter

#### 4. Experience
- **Max 3 entries** (Hard limit for one-page)
- Each entry max **360 characters** (3 bullets × 120 chars)
- Fields: Title, Organization, Start Date, End Date, Description
- "Current position" checkbox

#### 5. Projects
- **Max 3 entries** (Hard limit for one-page)
- Each entry max **220 characters** (2 bullets × 110 chars)
- Same fields as Experience

#### 6. Education
- **Max 2 entries** (Hard limit for one-page)
- Same structure as Experience

#### 7. Achievements
- **Max 300 characters** (3 points × 100 chars)
- Bullet-point format

#### 8. Leadership Positions
- **Max 220 characters** (2 points × 110 chars)
- Bullet-point format

#### 9. Why I Fit This Role
- **Max 300 characters** (3 points × 100 chars)
- Bullet-point format

### Strict Enforcement Rules

🚨 **Hard Limits Enforced:**
- Input is **BLOCKED** when character limit is reached
- Cannot add more entries beyond max count
- Character counter displays:
  - **Green** (0-79%)
  - **Orange** (80-99%)
  - **Red** (100% - Input blocked)

---

## 📏 One-Page Resume Enforcement

### Design Rules

✅ **Guaranteed One-Page Output:**
- A4 format (210mm × 297mm)
- Fixed font sizes (11px body, 24px name)
- Two-column layout (1/3 left, 2/3 right)
- Fixed line heights (1.4)
- Character limits calculated for one page

✅ **ATS-Friendly Formatting:**
- No tables, icons, or images
- Plain text formatting
- Standard section headings
- Clickable links (Email, LinkedIn, GitHub, Portfolio)
- No fancy fonts or colors

### PDF Export

The PDF export ensures:
- **Exactly one page** (no overflow)
- **No blank second page**
- **Matches live preview** exactly
- **ATS-compatible** formatting

---

## 📊 Analytics & Dashboard

### Tracked Metrics

For each user, the system tracks:
- Total resumes created
- Total resumes saved
- Total resumes downloaded
- Total resumes shared

### Dashboard Display

Visit `http://localhost:3000/dashboard` to see:

1. **Stats Cards**
   - Resumes Created
   - Resumes Saved
   - Resumes Downloaded
   - Resumes Shared

2. **Charts**
   - Resume creation timeline (bar/histogram)
   - Resume status distribution (pie chart)

3. **Recent Activity**
   - Last 5 resume updates
   - Status and timestamps

---

## 🎨 User Experience

### Clean, Professional Design

✨ **Card-Based UI:**
- Clean, modern card layout
- Clear visual hierarchy
- Professional SaaS aesthetic

✨ **Beginner-Friendly:**
- Clear instructions
- Helpful tooltips
- Error messages with guidance

✨ **Smooth Transitions:**
- Mode switching animation
- Live preview updates
- Loading states with progress feedback

### Responsive Design

- **Desktop:** Side-by-side form and preview
- **Tablet:** Stackable layout
- **Mobile:** Toggle preview visibility

---

## 🛠️ Technical Details

### Technology Stack

- **Frontend:** React, Next.js 15 (App Router)
- **UI Components:** shadcn/ui with Tailwind CSS
- **Forms:** React Hook Form + Zod validation
- **AI:** Google Gemini 2.5 Flash
- **PDF Generation:** html2pdf.js
- **PDF Parsing:** pdf-parse
- **Database:** PostgreSQL (Prisma ORM)

### API Endpoints

| Endpoint | Purpose |
|----------|---------|
| `/api/ai-resume-generator` | Generate resume from job description |
| `/api/ai-suggestions` | Get AI suggestions for manual mode |
| `/api/track-download` | Track resume downloads |
| Actions: `saveResume` | Save resume to database |
| Actions: `improveWithAI` | Enhance content with AI |

---

## 📖 Usage Examples

### Example 1: AI Mode Workflow

```
1. Select "Build with AI" mode
2. Enter:
   - Company: "Google"
   - Role: "Senior Software Engineer"
   - JD: [Paste full job description]
3. Upload: resume.pdf
4. Click "Generate ATS-Optimized Resume"
5. Wait ~10-15 seconds
6. Review auto-filled form (switches to manual mode)
7. Make minor edits if needed
8. Click "Save" then "Download PDF"
```

### Example 2: Manual Mode Workflow

```
1. Select "Build Manually" mode
2. Fill contact information
3. Write summary (watch character counter)
4. Add skills
5. Add 2-3 experience entries
6. Add 2-3 projects
7. Fill achievements
8. Review live preview
9. Click "Save" then "Download PDF"
```

### Example 3: Hybrid Workflow

```
1. Start with "Build with AI"
2. Generate initial resume from job description
3. Review auto-filled content
4. Switch to Manual mode (already switched automatically)
5. Fine-tune specific sections
6. Adjust wording, add personal touches
7. Save and download
```

---

## ⚠️ Important Rules

### DO:
✅ Fill all required fields for best results
✅ Use complete job descriptions in AI mode
✅ Review AI-generated content before downloading
✅ Switch modes freely to find your preferred workflow
✅ Use character counters to stay within limits

### DON'T:
❌ Try to bypass character limits (input blocked)
❌ Upload non-PDF files (will be rejected)
❌ Upload files > 5MB (will be rejected)
❌ Expect multi-page resumes (strictly one-page)
❌ Use special characters that break ATS parsing

---

## 🐛 Troubleshooting

### Issue: AI generation fails
**Solution:** 
- Check internet connection
- Ensure job description is not empty
- Verify resume file is valid PDF
- Try pasting text instead of uploading

### Issue: Character limit reached
**Solution:**
- Use concise language
- Remove unnecessary words
- Focus on impact and metrics
- Prioritize most relevant content

### Issue: PDF has multiple pages
**Solution:**
- This shouldn't happen (strict enforcement)
- If it does, reduce content in manual mode
- Contact support with details

### Issue: ATS score is low
**Solution:**
- Use more keywords from job description
- Include both acronyms and full terms
- Add quantifiable metrics
- Match skills to job requirements

---

## 🎓 Tips for Best Results

### AI Mode Tips:
1. **Use complete job descriptions** - More details = better optimization
2. **Upload well-formatted PDFs** - Ensure text is selectable
3. **Review and refine** - AI is good but not perfect
4. **Check for accuracy** - Ensure no fabricated information

### Manual Mode Tips:
1. **Be concise** - Every character counts
2. **Use action verbs** - Led, Developed, Achieved, etc.
3. **Include metrics** - Numbers, percentages, impact
4. **Prioritize relevance** - Most important content first

### General Tips:
1. **Test both modes** - Find what works for you
2. **Save frequently** - Don't lose your work
3. **Use AI Enhance** - Available in manual mode too
4. **Preview before download** - Ensure formatting is correct

---

## 📞 Support

For issues or questions:
1. Check this documentation first
2. Review error messages carefully
3. Try clearing browser cache
4. Contact support with:
   - Steps to reproduce
   - Error messages
   - Browser and OS details

---

**Built with ❤️ using Next.js 15, Google Gemini AI, React, Tailwind CSS, and shadcn/ui**

**Last Updated:** 2026-02-08
