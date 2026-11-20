"use client";

import React, { useState, useEffect } from "react";

const ROTATING_WORDS = [
  "Training",
  "Workshops",
  "Mentorship",
  "Hackathons",
  "Internships",
  "Placement Support",
  "Career Growth",
  "Innovation",
];

export default function TypingHeadlineWord() {
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check reduced motion accessibility setting
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

  // Character-by-character typing & deleting loop
  useEffect(() => {
    if (prefersReducedMotion) return;

    const currentWord = ROTATING_WORDS[wordIndex];

    // State 1: Word completely deleted -> wait 200ms, then switch to next word
    if (isDeleting && charIndex === 0) {
      const pauseTimeout = setTimeout(() => {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
      }, 200);
      return () => clearTimeout(pauseTimeout);
    }

    // State 2: Word fully typed -> pause for 1.5 seconds (1500ms) before deleting
    if (!isDeleting && charIndex === currentWord.length) {
      const holdTimeout = setTimeout(() => {
        setIsDeleting(true);
      }, 1500);
      return () => clearTimeout(holdTimeout);
    }

    // State 3: Active typing or deleting step
    const stepSpeed = isDeleting ? 45 : 90;
    const stepTimeout = setTimeout(() => {
      setCharIndex((prev) => prev + (isDeleting ? -1 : 1));
    }, stepSpeed);

    return () => clearTimeout(stepTimeout);
  }, [charIndex, wordIndex, isDeleting, prefersReducedMotion]);

  // If user prefers reduced motion, display static "Innovation" without blinking cursor
  if (prefersReducedMotion) {
    return (
      <span className="relative inline-block text-[#087BEA] font-black">
        Innovation
        <svg
          className="absolute -bottom-1.5 sm:-bottom-2 left-0 w-full h-2.5 sm:h-3 text-[#FFB800] overflow-visible"
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

  const currentWord = ROTATING_WORDS[wordIndex];
  const displayedText = currentWord.substring(0, charIndex);

  return (
    <span
      className="relative inline-flex items-baseline text-[#087BEA] font-black min-w-[150px] sm:min-w-[190px] md:min-w-[240px] lg:min-w-[310px] xl:min-w-[350px] transition-all duration-100"
      aria-label={`Hub of ${currentWord}`}
      role="text"
    >
      <span className="relative inline-block">
        {/* The active typed text in bright blue (#087BEA) */}
        <span>{displayedText || "\u00A0"}</span>

        {/* Dynamic yellow accent curve underneath */}
        <svg
          className="absolute -bottom-1.5 sm:-bottom-2 left-0 w-full h-2.5 sm:h-3 text-[#FFB800] overflow-visible pointer-events-none"
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

      {/* Blinking cursor in vibrant yellow (#FFB800) */}
      <span
        className={`inline-block ml-1 sm:ml-1.5 w-[3px] sm:w-[4px] h-[0.82em] bg-[#FFB800] align-baseline rounded-full transition-opacity duration-100 ${
          cursorVisible ? "opacity-100 shadow-[0_0_8px_#FFB800]" : "opacity-0"
        }`}
        aria-hidden="true"
      />
    </span>
  );
}

