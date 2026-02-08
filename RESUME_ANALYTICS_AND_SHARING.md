# Resume Analytics & Sharing System - Implementation Guide

## Overview
This document outlines the comprehensive resume analytics tracking and branded sharing system implemented for the EdgeCareer.AI Resume Builder.

## Key Features Implemented

### 1. **Real-Time Analytics Tracking**
All resume actions now update analytics in real-time across both `/resume` and `/dashboard` pages:

- ✅ **Resume Created** - Tracked when a new resume is saved
- ✅ **Resume Saved** - Tracked on every save action  
- ✅ **Resume Downloaded** - Tracked when PDF is generated
- ✅ **Resume Shared** - Tracked when share link is generated
- ✅ **Mode Tracking** - Differentiates between Manual vs AI-generated resumes

### 2. **Database as Single Source of Truth**
All analytics are stored in PostgreSQL and fetched on page load:

**User Table Fields:**
- `totalResumesCreated` - Total number of resumes created
- `totalResumesSaved` - Total save actions
- `totalResumesDownloaded` - Total PDF downloads
- `totalResumesShared` - Total share actions

**Resume Table Fields:**
- `mode` - "manual" or "ai" (tracks creation method)
- `downloadCount` - Per-resume download tracking
- `shareCount` - Per-resume share tracking
- `shareToken` - Unique branded share token
- `isPublic` - Share visibility toggle

### 3. **Branded Share Links**
Share links are generated with clean, professional URLs:

**Format:**
```
resume_{username}_{hash}.techiehelpinstituteofai.in
```

**Examples:**
- `resume_amitkumar_a3f2e1.techiehelpinstituteofai.in`
- `resume_adityasingh_b7d4c9.techiehelpinstituteofai.in`

**Features:**
- Username extracted from user's name (lowercase, no spaces/special chars)
- 6-character hash ensures uniqueness
- Development URL: `http://localhost:3000/resume/share/{token}`
- Production URL: `resume_{token}.techiehelpinstituteofai.in`

### 4. **Public Resume View**
Shared resumes display in a clean, read-only format:

**URL:** `/resume/share/[shareToken]`

**Features:**
- ✅ One-page PDF layout
- ✅ All links clickable (email, LinkedIn, GitHub, portfolio)
- ✅ No edit controls shown
- ✅ Footer: "Powered by TechieHelp Institute of AI"
- ✅ CTA button to create own resume

### 5. **User Controls**
Resume owners can:
- ✅ Share resume (generates branded link)
- ✅ Copy link to clipboard automatically
- ✅ Enable/disable public sharing (coming soon)
- ✅ Regenerate share link (new share creates new link)

---

## Technical Implementation

### API Routes Created/Updated

#### 1. `/api/track-download` (Updated)
**Method:** POST  
**Purpose:** Track resume downloads and update analytics

**Request:**
```json
{
  "resumeId": "clxxx..."
}
```

**Actions:**
- Increments `Resume.downloadCount`
- Increments `User.totalResumesDownloaded`
- Revalidates `/resume` and `/dashboard` paths
- Logs download event

#### 2. `/api/share-resume` (Existing, used with updated action)
**Method:** POST  
**Purpose:** Generate share link and track sharing

**Request:**
```json
{
  "resumeId": "clxxx..."
}
```

**Response:**
```json
{
  "success": true,
  "shareToken": "amitkumar_a3f2e1",
  "shareUrl": "http://localhost:3000/resume/share/amitkumar_a3f2e1",
  "brandedUrl": "resume_amitkumar_a3f2e1.techiehelpinstituteofai.in",
  "message": "Resume shared successfully!"
}
```

**Actions:**
- Generates unique branded token
- Updates `Resume.shareToken`, `Resume.isPublic`, increments `Resume.shareCount`
- Increments `User.totalResumesShared`
- Revalidates paths
- Logs share event

#### 3. `/api/ai-resume-generator` (Fixed)
**Fix Applied:** PDF parsing error handled gracefully

**Issue:** `pdf-parse` library was trying to access test files, causing ENOENT errors

**Solution:**
```javascript
catch (pdfError) {
  // Ignore test file errors from pdf-parse internals
  if (pdfError.code === 'ENOENT' && pdfError.path?.includes('test')) {
    console.warn("PDF parse test file warning (can be ignored):", pdfError.message);
  } else {
    // Real errors are still caught
    return NextResponse.json({ error: "Failed to parse PDF" }, { status: 400 });
  }
}
```

### Server Actions Updated

#### 1. `actions/resume-analytics.js`

**`shareResume(resumeId)`** - Updated
- Generates branded share token using crypto MD5 hash
- Format: `{cleanName}_{hash}` (e.g., `amitkumar_a3f2e1`)
- Updates database and analytics
- Returns both development and production URLs
- Logs share event

**Other actions:**
- `getResumeAnalytics()` - Fetches user analytics + mode-based counts
- `trackResumeDownload(resumeId)` - Tracks downloads
- `getSharedResume(shareToken)` - Fetches public resumes
- `getUserResumes()` - Lists all user resumes

#### 2. `actions/resume.js`

**`saveResume(content, resumeId, name, mode)`** - Updated
- Now accepts `mode` parameter ("manual" or "ai")
- Tracks creation mode in database
- Updates analytics on save

### Frontend Components Updated

#### 1. `dual-mode-resume-builder.jsx`

**New Features:**
- Share button with loading states
- Copy-to-clipboard functionality  
- Automatic page reload after download/share to update analytics
- Visual feedback (checkmark when copied)

**Share Handler:**
```javascript
const handleShare = async () => {
  // Check if resume is saved
  if (!saveResult?.resume?.id) {
    toast.error("Please save your resume before sharing");
    return;
  }

  // Call share API
  const response = await fetch('/api/share-resume', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ resumeId: saveResult.resume.id })
  });

  // Copy to clipboard
  await navigator.clipboard.writeText(data.shareUrl);
  
  // Show success message with branded URL
  toast.success("🎉 Share link copied!", {
    description: `resume_${data.shareToken}.techiehelpinstituteofai.in`
  });

  // Reload to update analytics
  setTimeout(() => window.location.reload(), 1000);
};
```

**Download Tracking:**
```javascript
const generatePDF = async () => {
  // ... PDF generation code ...
  
  // Track download
  if (saveResult?.resume?.id) {
    await fetch('/api/track-download', {
      method: 'POST',
      body: JSON.stringify({ resumeId: saveResult.resume.id })
    });
    window.location.reload(); // Update analytics
  }
};
```

#### 2. `resume-preview.jsx`

**Updated Props:**
- Now accepts both `formData` and `data` props
- Added `isPublicView` prop for public display
- Shows "Powered by TechieHelp Institute of AI" footer in public view

#### 3. Updated: `app/(main)/resume/share/[shareToken]/page.jsx`

**Public Resume View Page:**
- Server component for SEO
- Fetches resume by share token
- Shows clean, read-only resume via `SharedResumeView` component
- Includes CTA to create own resume
- Branded footer

**Metadata:**
```javascript
export const metadata = {
  title: "Shared Resume - TechieHelp Institute of AI",
  description: "View shared resume created with TechieHelp AI Resume Builder",
};
```

### Pages Using Analytics

#### 1. `/resume` Page
**File:** `app/(main)/resume/page.jsx`

Displays 4 analytics cards:
- Total Resumes
- Manual / AI (split count)
- Downloads
- Shares

Data fetched via:
```javascript
const analytics = await getResumeAnalytics();
```

#### 2. `/dashboard` Page
**File:** `app/(main)/dashboard/page.jsx`

Shows comprehensive resume analytics section including:
- Same 4 cards as resume page
- Resume creation timeline chart
- Manual vs AI bar chart
- Resume status distribution
- Recent activity list

Data fetched via:
```javascript
const resumeAnalytics = await getResumeAnalytics();
const resumeTimeline = await getResumeTimeline();
const resumeStatusDistribution = await getResumeStatusDistribution();
const recentResumeActivity = await getRecentResumeActivity();
```

---

## Data Flow

### Resume Creation Flow
```
User creates/saves resume
  ↓
saveResume(content, resumeId, name, mode)
  ↓
Database: Resume.create() or Resume.update()
  ↓
Database: User.totalResumesCreated++ (if new)
  ↓
Database: User.totalResumesSaved++
  ↓
revalidatePath("/resume") + revalidatePath("/dashboard")
  ↓
Pages refresh with updated analytics
```

### Download Flow
```
User clicks Download PDF
  ↓
PDF generated via html2pdf
  ↓
POST /api/track-download { resumeId }
  ↓
Database: Resume.downloadCount++
  ↓
Database: User.totalResumesDownloaded++
  ↓
revalidatePath() + window.location.reload()
  ↓
Analytics update instantly
```

### Share Flow
```
User clicks Share button
  ↓
POST /api/share-resume { resumeId }
  ↓
Generate branded token: username_hash
  ↓
Database: Resume.shareToken = token
  ↓
Database: Resume.isPublic = true
  ↓
Database: Resume.shareCount++
  ↓
Database: User.totalResumesShared++
  ↓
Copy link to clipboard
  ↓
Show toast with branded URL
  ↓
revalidatePath() + window.location.reload()
  ↓
Analytics update instantly
```

---

## Console Logging

All tracking events log to console for debugging:

```
✅ Download tracked for resume clxxx by user clyyyy
✅ Share link generated for resume clxxx by user clyyyy: amitkumar_a3f2e1
```

---

## Testing Checklist

### Manual Testing
- [ ] Create a new resume manually
- [ ] Verify analytics increment on `/resume` page
- [ ] Verify same count on `/dashboard` page
- [ ] Create resume using AI mode
- [ ] Verify Manual/AI split is tracked correctly
- [ ] Download resume PDF
- [ ] Verify download count increments
- [ ] Click Share button
- [ ] Verify link copied to clipboard
- [ ] Verify share count increments
- [ ] Open shared link in incognito window
- [ ] Verify resume displays correctly
- [ ] Verify all links are clickable
- [ ] Verify footer shows "Powered by TechieHelp"

### Database Verification
```sql
-- Check user analytics
SELECT 
  name,
  totalResumesCreated,
  totalResumesSaved,
  totalResumesDownloaded,
  totalResumesShared
FROM "User" 
WHERE clerkUserId = 'user_xxx';

-- Check resume mode distribution
SELECT 
  mode,
  COUNT(*) as count
FROM "Resume"
WHERE userId = 'user_id'
GROUP BY mode;

-- Check shared resumes
SELECT 
  name,
  shareToken,
  isPublic,
  shareCount,
  downloadCount
FROM "Resume"
WHERE isPublic = true;
```

---

## Known Issues & Solutions

### Issue 1: PDF Parsing Error
**Error:** `ENOENT: no such file or directory, open test/data/05-versions-space.pdf`

**Cause:** `pdf-parse` library tries to access internal test files

**Solution:** 
```javascript
catch (pdfError) {
  if (pdfError.code === 'ENOENT' && pdfError.path?.includes('test')) {
    console.warn("PDF parse test file warning (can be ignored)");
  } else {
    // Handle real errors
  }
}
```

### Issue 2: Analytics Not Updating
**Cause:** Pages using cached data

**Solution:** Added `revalidatePath()` + `window.location.reload()` after tracking calls

### Issue 3: Share Button Disabled
**Cause:** Resume must be saved first

**Solution:** 
```javascript
disabled={!saveResult?.resume?.id || isSharing}
```

---

## Future Enhancements

1. **Disable/Enable Share Toggle**
   - Add PATCH endpoint to toggle `isPublic` flag
   - UI toggle in resume history

2. **Share Analytics**
   - Track view count on shared links
   - Show who viewed (if authenticated)

3. **Custom Domains**
   - Allow users to use custom domains
   - `resume.johndoe.com` → points to share link

4. **PDF Optimization**
   - Compress PDF file size
   - Add metadata (author, title, keywords)

5. **Social Sharing**
   - Generate og:image previews
   - LinkedIn/Twitter share buttons

6. **Export Formats**
   - DOCX export
   - HTML export
   - LaTeX export

---

## Deployment Checklist

### Environment Variables
Ensure these are set in production:

```env
DATABASE_URL="postgresql://..."
NEXT_PUBLIC_APP_URL="https://techiehelpinstituteofai.in"
GEMINI_API_KEY="..."
```

### Database Migration
Run Prisma migration to ensure schema is up to date:

```bash
npx prisma migrate deploy
npx prisma generate
```

### DNS Configuration
For branded share links to work in production:

1. Add wildcard DNS record:
   ```
   *.techiehelpinstituteofai.in → Your server IP
   ```

2. Configure Next.js rewrites in `next.config.js`:
   ```javascript
   async rewrites() {
     return [
       {
         source: '/:path*',
         has: [
           {
             type: 'host',
             value: 'resume_(?<token>.*).techiehelpinstituteofai.in',
           },
         ],
         destination: '/resume/share/:token',
       },
     ];
   }
   ```

---

## Support

For issues or questions:
- Check console logs for tracking events
- Verify database values directly
- Test in incognito to avoid cache issues
- Check network tab for API responses

---

**Last Updated:** 2026-02-08  
**Version:** 1.0.0  
**Author:** Kombai AI Assistant
