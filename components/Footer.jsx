import Link from "next/link";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-muted/50 border-t border-gray-200 dark:border-gray-800 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* FEATURES */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-foreground">Features</h3>
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
                  href="/ats-checker"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  ATS Resume Checker
                </Link>
              </li>
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
                  href="/career-branding-lab"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Career Branding Lab
                </Link>
              </li>
              <li>
                <Link
                  href="/internships"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Internship Programs
                </Link>
              </li>
            </ul>
          </div>

          {/* PLATFORM */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-foreground">Platform</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/dashboard"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/resume"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Resume History
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Analytics
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  AI Tools
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
                  About TechieHelp Institute of AI
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

          {/* RESOURCES */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-foreground">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/career-guidance"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Career Guidance
                </Link>
              </li>
              <li>
                <Link
                  href="/placement-preparation"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Placement Preparation
                </Link>
              </li>
              <li>
                <Link
                  href="/interview-tips"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Interview Tips
                </Link>
              </li>
              <li>
                <Link
                  href="/resume-optimization"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Resume Optimization
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
