# 🚀 EdgeCareer – AI-Powered Career Coach  

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

> **Tailored documentation for TechieHelp Institute of AI**  
> A polished, slide‑friendly guide showcasing every feature of the EdgeCareer platform—ideal for presentations, reports, or internal training.

---

## 🧾 Slide‑Ready Overview  
This README is structured to read like a slide deck. Use headings and bullet points directly as slide titles and content. Every feature of EdgeCareer is included—nothing is left out.

---

## 🧩 Slide 1: Project Summary  
- AI-based career coach for students, graduates, and job seekers
- Integrates resume/cover letter builders, interview simulator, ATS checker, job matcher, course recommendations, analytics, and more
- Built using modern web technologies and AI APIs

---

## 🧠 Slide 2: AI‑Powered Components  
- Resume Builder & Analyzer (AI feedback, keyword optimization)
- Cover Letter Generator (single-click personalization)
- Interview Simulator with real-time feedback and scoring
- ATS Compatibility Checker with actionable suggestions
- Job Match Engine providing tailored listings and apply links
- Course & Certification Recommendations (e.g., Coursera)
- Career Roadmap creation customized to user profile

---

## 🔐 Slide 3: Authentication & Security  
- Firebase-powered authentication (social & email)
- Protected routes and role-based access control for users and admins

---

## 📊 Slide 4: Insights & Gamification  
- Industry salary trends, skill heatmaps, demand statistics
- Resume analytics (views, engagement on shared links)
- Gamification: streaks, badges, leaderboards to encourage usage

---

## 📁 Slide 5: Content Management & Sharing  
- Save multiple resume versions for users
- Generate shareable public resume links
- Admin panel for managing users, questions, and analytics

---

## 🎓 Slide 6: TPO (Training & Placement Officer) Module  
- College management with student profiles and branches
- GitHub activity tracking and ranking system for students
- Automated GitHub data sync for commits, PRs, stars, and activity
- Student analytics dashboard with branch-wise, year-wise, and activity charts
- Ranking algorithm for placement readiness based on GitHub activity
- Export student data in CSV/PDF formats
- TPO dashboard for monitoring student progress and placement preparation
- Mock data seeding for colleges, students, and GitHub activities

---

## ⚙️ Slide 7: Technical Architecture  
- Frontend: React 19 + Next.js 15 App Router
- Styling: Tailwind CSS & Shadcn UI components
- Backend: NeonDB (Postgres) with Prisma ORM
- AI Integration: Gemini API (plus OpenAI optional)
- Async jobs: Inngest for background processing
- Deployment: Vercel (front end) & Neon (database)
- Containerization: Docker; CI/CD via GitHub Actions

---

## 🏗️ Slide 8: Code Structure  
- `app/`: pages and API routes
- `actions/`: server actions implementing business logic
- `components/`: reusable UI building blocks
- `prisma/`: database schema models
- `hooks/`, `lib/`, `data/`: utility code and static resources
- `public/`: static assets and icons

---

## 🛠️ Slide 9: Setup Steps  
1. Fork & clone repository
2. Install dependencies: `npm install`
3. Configure `.env.local` with required keys (see next slide)
4. Initialize database: `npx prisma generate && npx prisma db push`
5. Run development server: `npm run dev`

---

## 🔐 Slide 10: Required Environment Variables  
```
DATABASE_URL=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/onboarding
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding
GEMINI_API_KEY=
```
(plus SMTP or any other external service keys if used.)

---

## 🐳 Slide 11: Docker / Demo Setup  
```
docker build -t edgecareer .
docker run -p 3000:3000 --env-file .env.local edgecareer
```

---

## 🧩 Slide 12: Development Workflow  
- Add features via new server actions and components
- API routes auto-generated under `app/api/*/route.js`
- Style with Tailwind utility classes; see `tailwind.config.mjs`
- Update database schema in `prisma/schema.prisma` and migrate

---

## 🤝 Slide 13: Contribution Guidelines  
- Fork, branch from `main`
- Follow code style (Prettier, ESLint)
- Submit PRs with clear descriptions and linked issues
- Run tests when available (`npm run test`)

---

## 📄 Slide 14: License  
- MIT License (see `LICENSE.md`)

---

## ✅ Slide 15: Contact & Credits  
- Maintainers, contributors, and resource acknowledgments
- Ideal for closing remarks in a presentation

---

Thanks for reviewing the EdgeCareer platform! Use this document as the backbone of your slide deck for TechieHelp Institute of AI or any educational/demo setting. All features are outlined and ready for talk tracks.  

1. Build the Docker Image
   and run all this command in terminal :

```bash
 docker build `
   --build-arg NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_pub_key_here `
   --build-arg CLERK_SECRET_KEY=your_secret_key_here `
   --build-arg DATABASE_URL="your_db_url_here" `
   -t your-app-name .
```

2.  Run the Container

```bash
docker run -p 3000:3000 your-app-name
```

Replace 3000:3000 with <host-port>:<container-port> as needed.

---

###### [Back to Top](#top)

## 🚀 Live Demo

Ready to see? Click the link below to get it directly in your browser:

[**🌐 Do explore Live Demo**](edge-career.vercel.app)

---
## 💡 Suggestions & Feedback
Feel free to open issues or discussions if you have any feedback, feature suggestions, or want to collaborate!

---
## 📄 License
This project is licensed under the [License: MIT](https://github.com/akathedeveloper/CareSync/blob/main/License)

---
## 🌸 GirlScript Summer of Code 2025

This project is proudly part of **GSSoC '25**!
***Thanks to the amazing open-source community, contributors, and mentors for your valuable support.***

---
## 💬 Support & Contact

Have ideas, feedback, or just want to say hi?
- 🛠️ Open an issue in the repository 

---
**🌟 Show Your Support**

If CareSync has helped you, please consider:
* ⭐ **Star this repository**
* 🍴 **Fork and contribute**
* 📢 **Share with friends**

---
## 💖 Star the Repo if You Like It!

```
⭐ Star us — it motivates us and helps others discover the project!
```

---
## 🤝 Contribution Guidelines

We welcome **frontend, backend, AI, and design** contributions.  
See [CONTRIBUTION.md](https://github.com/amitkumardemo/EdgeCareer/blob/main/CONTRIBUTING.md) for details.

---

## 📜 License
Licensed under the [MIT License](https://github.com/amitkumardemo/EdgeCareer/blob/main/LICENSE.md).

---

<h1 align="center"><img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Glowing%20Star.png" alt="Glowing Star" width="25" height="25" /> Give us a Star and let's make magic! <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Glowing%20Star.png" alt="Glowing Star" width="25" height="25" /></h1>
<p align="center">
  Thank you for your support!
  <a href="https://github.com/amitkumardemo/EdgeCareer/stargazers">
    <img src="https://img.shields.io/github/stars/amitkumardemo/EdgeCareer?style=for-the-badge&logo=github&color=FFC107&logoColor=white" alt="GitHub Stars">
  </a>
</p>
<div align="center">
    <a href="#top">
        <img src="https://img.shields.io/badge/Back%20to%20Top-000000?style=for-the-badge&logo=github&logoColor=white" alt="Back to Top">
    </a><br>
     <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Mirror%20Ball.png" alt="Mirror Ball" width="150" height="150" />
</div>

---
 **👨‍💻 Developed By**
  **❤️Amit Kumar❤️**
[GitHub](https://github.com/amitkumardemo) | [LinkedIn](https://www.linkedin.com/in/amit-kumar-686196225/)
