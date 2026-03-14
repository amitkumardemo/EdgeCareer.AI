# Internship Management Platform

The Internship Management Platform is a comprehensive, scalable, and automated system integrated directly into `EdgeCareer.AI`. Inspired by standard large-scale internship portals like the AICTE internship portal, it facilitates a seamless lifecycle for internship programs, spanning from batch creation to automated certificate generation.

The platform is designed around a strictly enforced **Role-Based Access Control (RBAC)** architecture handling three distinct perspectives:
1. **Administrators (ADMIN):** Full control over creating programs, reviewing applications, assigning tasks, and issuing certificates.
2. **Students / Interns (STUDENT):** Dashboards for applying to open batches, tracking progress, uploading task submissions, and downloading final documents.
3. **Colleges / TPOs (TPO):** Oversight dashboards allowing placement officers to track their students' real-time performance and internship outcomes.

---

## 🛠 Features by Role

### 1. Admin Portal (`/internship/admin/dashboard`)
*   **Dashboard Analytics:** High-level metrics showing active batches, pending applications, and total student completion rates.
*   **Batch & Program Management:** Ability to define `InternshipPrograms` (domain, duration, stipend) and deploy active `InternshipBatches` with specific capacities and start dates.
*   **Application Review Pipeline:** Accept or reject student applications. Selected students automatically have an `InternProgress` record generated and are issued a dummy Offer Letter.
*   **Task Assignment System:** Create assignments (`InternshipTask`) specific to a batch. View and evaluate student `TaskSubmissions` and provide written feedback.
*   **Automated Attendance Tracking:** Log and view daily student attendance linked to their progress.
*   **Global Announcements:** Broadcast alerts to specific batches or to all interns platform-wide.
*   **Certificate Generation Tracker:** Manage pending and issued certificates. Once an intern completes all required tasks, admins can click "Mark Complete" to issue a serialized certificate.

### 2. Student Portal (`/internship/student/dashboard`)
*   **Interactive Progress Dashboard:** Visual progress bar tracking task completion %, current score, and attendance records. Active streaks are also displayed.
*   **Application Status Tracker:** Visual stepped wizard (Applied → Under Review → Selected → Interning → Completed) to track the exact state of all applications.
*   **Task & Submission Board:** List of pending, approved, or rejected assignments. Includes a modal to upload project URLs (e.g., GitHub, Drive) and notes.
*   **Peer Leaderboard:** A gamified podium displaying the top-performing students in a batch based on their assigned task scores.
*   **Attendance Log:** Shows a daily log of present/absent days and the overall attendance percentage.
*   **Automated Documents:** Dedicated pages allowing students to securely download their AI-generated Offer Letters (upon selection) and Completion Certificates (upon completion).

### 3. College / TPO Portal (`/internship/college/dashboard`)
*   **Auto-Mapped Dashboard:** The moment a TPO logs into the platform (e.g., `tpo@jiet.ac.in`), the system aggregates all platform students sharing the college's domain (`@jiet.ac.in`).
*   **Aggregated Analytics:** View total enrolled students from the college, active application counts, and total completed internships.
*   **Detailed Student Roster:** A comprehensive table mapping every student to their current application status and real-time progress bar, allowing easy tracking of college placement success.

---

## 📐 Technology Architecture & Schema

The platform relies on the existing Next.js 15, Prisma, and Firebase Auth stack. 

### Core Database Models (`schema.prisma`)
*   `InternshipProgram`: Defines the core blueprint of an internship (Title, Domain, Duration).
*   `InternshipBatch`: Represents a specific active running instance of a program (Dates, Capacity).
*   `InternshipApplication`: The junction tracking a User applying to a Batch. Includes standard statuses (`APPLIED`, `UNDER_REVIEW`, `SELECTED`, `REJECTED`).
*   `InternProgress`: A tracking entity populated automatically upon a student being `SELECTED`. It maintains running totals of `progressPct`, `performScore`, `attendancePct`, etc.
*   `InternshipTask` & `TaskSubmission`: Manages coursework and student uploads.
*   `OfferLetter` & `InternshipCertificate`: Dedicated models mapping to unique document generation records.

### Route Protection & Middleware
Access control is handled through the central layout file: `app/(internship)/layout.js`. 
*   It utilizes the `getFirebaseUser` utility to ensure users are authenticated.
*   It queries the `User` table to determine the individual's role (`ADMIN`, `STUDENT`, `TPO`).
*   Unauthorized attempts to access specialized route directories (e.g., a student trying to hit `/internship/admin/*`) are blocked visually and at the server-action level.

---

## 🚀 Setup & Execution Guidelines

### 1. Generating Dummy Data / Testing
If you are starting from a blank database or want to test the full pipeline:

1.  **Grant Admin Access:** To access the admin portal, you need an account with the role `ADMIN`. Use the provided script:
    ```bash
    node scripts/make-admin.js
    ```
    This turns the oldest user in the DB into an admin.
2. **Accessing the Portals:** Ensure you are logged in. From the global Navbar, click `Growth Tools` > `Internship Portal`. The platform will automatically route you to your respective dashboard based on your role.

### 2. The Golden Testing Path
To see the full lifecycle of the platform in action, follow this pathway:

1.  **As an Admin:** Navigate to `/internship/admin/batches`. Create a new `Program` (e.g., "Full Stack Web Dev") and then open a `Batch`.
2.  **As a Student:** Sign in with a normal student account. Navigate to `/internship/student/apply` and submit an application for the open batch.
3.  **As an Admin:** Go to `/internship/admin/applications`, review the application, and select `Select`. Wait for the success toast (this creates the InternProgress record).
4.  **As an Admin:** Go to `/internship/admin/tasks`, select the active batch, and create a new task (e.g., "Build a React Navbar").
5.  **As a Student:** Go to `/internship/student/tasks`, see the new task, click `Submit`, and provide a dummy GitHub URL.
6.  **As an Admin:** Return to Admin Tasks, click "Evaluate" on the submission, and assign a score (e.g., 90/100).
7.  **As a Student:** Check the `/internship/student/dashboard` and `/internship/student/leaderboard` to see the live points update.
8.  **As an Admin:** Go to `/internship/admin/certificates` and click `Mark Complete` on the student.
9.  **As a Student:** Check `/internship/student/certificate` to finally see the earned documentation.

---

## 🎨 UI & Aesthetics
The platform is designed following strict modern SaaS aesthetics reminiscent of Vercel or Linear:
*   **Deep Dark Mode:** Background color palette uses `#0d1117` with subtle white/10 borders (`border-white/8`).
*   **Glassmorphism & Depth:** Cards use `bg-white/3` with soft opacity gradients.
*   **Interactive Feedback:** Uses the `lucide-react` icons and `sonner` toasts for all state mutations. Visual indicators prominently use `primary`, `amber-400`, `blue-400`, and `green-400` colors to reflect distinct status states cleanly.
