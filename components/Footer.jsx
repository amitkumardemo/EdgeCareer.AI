import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="text-black dark:text-gray-300 border-t border-gray-200 dark:border-gray-800 pt-14 pb-10 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-sm">
        {/* Logo and Tagline */}
        <div className="col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <img src="/skill.png" alt="EdgeCareer Logo" className="h-6 w-auto" />
            <span className="text-xl md:text-2xl font-extrabold tracking-wide text-black dark:text-white">
              EdgeCareer
            </span>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Your AI-powered assistant for jobs, resumes, mock interviews, and beyond.
          </p>
        </div>

        {/* AI Features Column 1 */}
        <div>
          <h3 className="text-xl md:text-2xl font-bold mb-4 text-black dark:text-white border-b border-black/10 dark:border-white/20 pb-1">
            AI Features to Accelerate Your Career
          </h3>
          <ul className="space-y-2">
            <li><Link href="/dashboard" className="hover:text-primary transition">AI-Powered Career Guidance</Link></li>
            <li><Link href="/resume" className="hover:text-primary transition">Build Smart Resume & Cover Letter</Link></li>
            <li><Link href="/ats-checker" className="hover:text-primary transition">Optimize with ATS Score Check</Link></li>
            <li><Link href="/course-recommendation" className="hover:text-primary transition">Skill Enhancement Courses</Link></li>
          </ul>
        </div>

        {/* AI Features Column 2 */}
        <div>
          <h3 className="text-xl md:text-2xl font-bold mb-4 text-black dark:text-white border-b border-black/10 dark:border-white/20 pb-1">
            &nbsp;
          </h3>
          <ul className="space-y-2">
            <li><Link href="/interview" className="hover:text-primary transition">Practice with Mock Interviews</Link></li>
            <li><Link href="/roadmap" className="hover:text-primary transition">Generate Career Roadmap</Link></li>
            <li><Link href="/latest-jobs" className="hover:text-primary transition">Find Perfect Job Matches</Link></li>
            <li><Link href="/internships" className="hover:text-primary transition">Secure Your Dream Internship</Link></li>
          </ul>
        </div>

        {/* Newsletter & Social */}
        <div>
          <h3 className="text-xl md:text-2xl font-bold mb-4 text-black dark:text-white">Stay Updated</h3>
          <form className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="Your email"
              className="bg-gray-100 dark:bg-gray-800 text-black dark:text-white 
             px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 
             focus:outline-none focus:ring-3 focus:ring-primary transition-colors"
              suppressHydrationWarning
            />

            <button
              type="submit"
              className="bg-primary hover:bg-primary/90 text-white py-2 rounded-md transition dark:text-black"
              suppressHydrationWarning
            >
              Subscribe
            </button>
          </form>

          <div className="flex gap-4 mt-6">
            <a
              href="https://github.com/amitkumardemo/EdgeCareer"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              <Github className="h-6 w-6 hover:scale-110 transition-transform" />
            </a>
            <a
              href="https://www.linkedin.com/in/amit-kumar-686196225/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              <Linkedin className="h-6 w-6 hover:scale-110 transition-transform" />
            </a>
            <a
              href="mailto:amitk25783@gmail.com"
              className="hover:text-primary transition-colors"
            >
              <Mail className="h-6 w-6 hover:scale-110 transition-transform" />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center text-gray-500 dark:text-gray-400 text-xs mt-10">
        © {new Date().getFullYear()} EdgeCareer. Built with 💡 by Edge Career.
      </div>
    </footer>
  );
}
