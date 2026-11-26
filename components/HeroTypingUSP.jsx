"use client";

import React, { useState, useEffect } from "react";

const USP_PHRASES = [
  "AI Training",
  "Live Projects",
  "Internships",
  "Expert Mentorship",
  "Career Guidance",
  "Placement Preparation",
  "Hackathons",
  "Campus Innovation Clubs",
  "Career Branding",
  "Startup Development",
  "Industry Workshops",
  "Open Source Learning",
];

export default function HeroTypingUSP() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check reduced-motion accessibility preference
  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(mediaQuery.matches);

      const handleChange = (e) => setPrefersReducedMotion(e.matches);
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, []);

  // Blinking cursor toggle
  useEffect(() => {
    if (prefersReducedMotion) return;
    const interval = setInterval(() => {
      setCursorVisible((v) => !v);
    }, 500);
    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  // Character typing & deleting loop
  useEffect(() => {
    if (prefersReducedMotion) return;

    const currentPhrase = USP_PHRASES[phraseIndex];

    // State 1: Phrase deleted completely -> brief pause before typing next
    if (isDeleting && charIndex === 0) {
      const pauseTimer = setTimeout(() => {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % USP_PHRASES.length);
      }, 250);
      return () => clearTimeout(pauseTimer);
    }

    // State 2: Phrase fully typed -> pause for 1.8 seconds (1800ms)
    if (!isDeleting && charIndex === currentPhrase.length) {
      const holdTimer = setTimeout(() => {
        setIsDeleting(true);
      }, 1800);
      return () => clearTimeout(holdTimer);
    }

    // State 3: Normal typing or deleting step
    const speed = isDeleting ? 40 : 85;
    const stepTimer = setTimeout(() => {
      setCharIndex((prev) => prev + (isDeleting ? -1 : 1));
    }, speed);

    return () => clearTimeout(stepTimer);
  }, [charIndex, phraseIndex, isDeleting, prefersReducedMotion]);

  // Static fallback if user prefers reduced motion
  if (prefersReducedMotion) {
    return (
      <span className="relative inline-block text-[#1D4ED8] font-black">
        AI Training & Career Innovation
        <svg
          className="absolute -bottom-1.5 sm:-bottom-2 left-0 w-full h-2.5 sm:h-3 text-[#F97316] overflow-visible pointer-events-none"
          viewBox="0 0 160 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 14C45 3 115 3 158 13"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </svg>
      </span>
    );
  }

  const currentPhrase = USP_PHRASES[phraseIndex];
  const displayedText = currentPhrase.substring(0, charIndex);

  return (
    <span
      className="relative inline-flex items-baseline text-[#1D4ED8] font-black min-h-[1.25em] min-w-[160px] sm:min-w-[220px] md:min-w-[280px] lg:min-w-[340px] xl:min-w-[420px] transition-all duration-100"
      aria-label={`Your future starts with ${currentPhrase}`}
      role="text"
    >
      <span className="relative inline-block whitespace-normal sm:whitespace-nowrap">
        {/* Active typed USP text in brand blue */}
        <span>{displayedText || "\u00A0"}</span>

        {/* Dynamic orange brand accent underline curve */}
        <svg
          className="absolute -bottom-1.5 sm:-bottom-2 left-0 w-full h-2.5 sm:h-3 text-[#F97316] overflow-visible pointer-events-none"
          viewBox="0 0 160 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 14C45 3 115 3 158 13"
            stroke="url(#orangeAccentSwoosh)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="orangeAccentSwoosh" x1="0" y1="0" x2="160" y2="0" gradientUnits="userSpaceOnUse">
              <stop stopColor="#F97316" />
              <stop offset="0.7" stopColor="#FFB800" />
              <stop offset="1" stopColor="#F59E0B" />
            </linearGradient>
          </defs>
        </svg>
      </span>

      {/* Blinking cursor in brand orange with subtle glow */}
      <span
        className={`inline-block ml-1 sm:ml-1.5 w-[3px] sm:w-[4px] h-[0.82em] bg-[#F97316] align-baseline rounded-full transition-opacity duration-100 ${
          cursorVisible ? "opacity-100 shadow-[0_0_8px_#F97316]" : "opacity-0"
        }`}
        aria-hidden="true"
      />
    </span>
  );
}

