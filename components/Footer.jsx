import Link from "next/link";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-muted/50 border-t border-gray-200 dark:border-gray-800 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* CAREER TOOLS */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-foreground">Career Tools</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/resume"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  AI Resume Builder
                </Link>
              </li>
              <li>
                <Link
                  href="/ai-cover-letter"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  AI Cover Letter
                </Link>
              </li>
              <li>
                <Link
                  href="/ats-checker"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  ATS Resume Checker
                </Link>
              </li>
              <li>
                <Link
                  href="/career-branding-lab"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Career Branding Lab
                </Link>
              </li>
            </ul>
          </div>

          {/* GROWTH & LEARNING */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-foreground">Growth & Learning</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/interview"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Mock Interviews
                </Link>
              </li>
              <li>
                <Link
                  href="/roadmap"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Roadmap Generator
                </Link>
              </li>
              <li>
                <Link
                  href="/course-recommendation"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Course Recommendation
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Industry Insights
                </Link>
              </li>
            </ul>
          </div>

          {/* JOB SEARCH */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-foreground">Job Search</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/internships"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Find Internships
                </Link>
              </li>
              <li>
                <Link
                  href="/internship"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Internship Portal
                </Link>
              </li>
              <li>
                <Link
                  href="/latest-jobs"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Latest Jobs
                </Link>
              </li>
              <li>
                <Link
                  href="/job-matches"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Job Matches
                </Link>
              </li>
            </ul>
          </div>

          {/* COMPANY */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-foreground">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  About TechieHelp
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
                TechieHelp Institute of AI
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} TechieHelp Institute of AI. All rights reserved.
            </p>
          </div>

          <div className="flex gap-4">
            <Link
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="h-5 w-5" />
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </Link>
            <Link
              href="/contact"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
