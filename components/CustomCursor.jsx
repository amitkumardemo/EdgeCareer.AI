"use client";

import React, { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [hoverState, setHoverState] = useState("default"); // 'default' | 'button' | 'cta' | 'gallery' | 'project' | 'text'
  const [isVisible, setIsVisible] = useState(false);

  // References for coordinates and animation
  const mouseRef = useRef({ x: -100, y: -100 });
  const ringRef = useRef({ x: -100, y: -100 });
  const magneticRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef([]);
  const canvasRef = useRef(null);
  const animFrameIdRef = useRef(null);
  const dotElRef = useRef(null);
  const ringElRef = useRef(null);
  const activeCtaRef = useRef(null);

  useEffect(() => {
    // 1. Check if device is touch or mobile or prefers reduced motion
    const isTouch =
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(max-width: 1024px)").matches ||
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isTouch || prefersReducedMotion) {
      return; // Do not mount custom cursor on touch/mobile or reduced-motion
    }

    setMounted(true);

    const canvas = canvasRef.current;
    let ctx = null;
    if (canvas) {
      ctx = canvas.getContext("2d");
      const handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };
      handleResize();
      window.addEventListener("resize", handleResize, { passive: true });
    }

    // 2. Mouse Move Listener
    let lastSpawn = 0;
    const onMouseMove = (e) => {
      const clientX = e.clientX;
      const clientY = e.clientY;

      mouseRef.current.x = clientX;
      mouseRef.current.y = clientY;

      if (!isVisible) setIsVisible(true);

      // Spawn a subtle AI micro-particle if moved sufficiently (throttle to 40ms)
      const now = performance.now();
      if (now - lastSpawn > 40 && hoverState !== "text") {
        lastSpawn = now;
        particlesRef.current.push({
          x: clientX,
          y: clientY,
          radius: Math.random() * 1.5 + 1.2, // Tiny 1.2 - 2.7px dot
          alpha: 0.4,                         // Soft subtle glow
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          decay: Math.random() * 0.025 + 0.025
        });

        // Cap particles array to keep performance rock solid (max 10 particles)
        if (particlesRef.current.length > 10) {
          particlesRef.current.shift();
        }
      }

      // Check hover targets
      const target = e.target;
      if (!target || !(target instanceof Element)) return;

      // Check text selection / input fields -> hide custom cursor for native I-beam
      if (
        target.closest('input, textarea, select, [contenteditable="true"]') ||
        window.getSelection()?.toString().length > 0
      ) {
        setHoverState("text");
        activeCtaRef.current = null;
        magneticRef.current = { x: 0, y: 0 };
        return;
      }

      // Check Image Gallery / Marquee cards
      if (
        target.closest(
          '[data-cursor="gallery"], .marquee-track-row, [class*="LifeAtTechieHelp"], [class*="gallery-card"]'
        )
      ) {
        setHoverState("gallery");
        activeCtaRef.current = null;
        magneticRef.current = { x: 0, y: 0 };
        return;
      }

      // Check Project Cards
      if (
        target.closest(
          '[data-cursor="project"], [href*="/internship/"], [href*="/build2earn"], [class*="project-card"]'
        )
      ) {
        setHoverState("project");
        activeCtaRef.current = null;
        magneticRef.current = { x: 0, y: 0 };
        return;
      }

      // Check Important CTA buttons (for magnetic interaction)
      const cta = target.closest(
        '[data-cursor="cta"], .btn-primary, [class*="bg-blue-600"], [class*="bg-[#1D4ED8]"], [class*="bg-[#F97316]"], a[href*="apply"], a[href*="register"]'
      );
      if (cta && (cta.tagName === "A" || cta.tagName === "BUTTON" || cta.getAttribute("role") === "button")) {
        setHoverState("cta");
        activeCtaRef.current = cta;
        const rect = cta.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        // Subtle magnetic pull (max 12px)
        const dx = (centerX - clientX) * 0.22;
        const dy = (centerY - clientY) * 0.22;
        magneticRef.current = { x: dx, y: dy };
        return;
      }

      // Check General clickable elements
      if (
        target.closest(
          'a, button, [role="button"], input[type="button"], input[type="submit"], [tabindex="0"]'
        )
      ) {
        setHoverState("button");
        activeCtaRef.current = null;
        magneticRef.current = { x: 0, y: 0 };
        return;
      }

      // Default normal content
      setHoverState("default");
      activeCtaRef.current = null;
      magneticRef.current = { x: 0, y: 0 };
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener("pointermove", onMouseMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onMouseLeave);
    document.documentElement.addEventListener("mouseenter", onMouseEnter);

    // 3. 60fps / 120fps Animation Loop with Spring Lerp
    const renderLoop = () => {
      const mouse = mouseRef.current;
      const ring = ringRef.current;
      const magnetic = magneticRef.current;

      // Spring follow interpolation (lerp factor 0.16)
      ring.x += (mouse.x + magnetic.x - ring.x) * 0.16;
      ring.y += (mouse.y + magnetic.y - ring.y) * 0.16;

      // Position center dot directly at mouse coordinates
      if (dotElRef.current) {
        dotElRef.current.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0)`;
      }

      // Position trailing ring with smooth interpolation
      if (ringElRef.current) {
        ringElRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0)`;
      }

      // Render subtle AI stardust particles on canvas
      if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const particles = particlesRef.current;

        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.alpha -= p.decay;
          p.radius *= 0.96;

          if (p.alpha <= 0 || p.radius <= 0.4) {
            particles.splice(i, 1);
            continue;
          }

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(29, 78, 216, ${p.alpha})`;
          ctx.fill();
        }
      }

      animFrameIdRef.current = requestAnimationFrame(renderLoop);
    };

    animFrameIdRef.current = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener("pointermove", onMouseMove);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
      document.documentElement.removeEventListener("mouseenter", onMouseEnter);
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [hoverState, isVisible]);

  if (!mounted) return null;

  const isHidden = !isVisible || hoverState === "text";
  const isGallery = hoverState === "gallery";
  const isProject = hoverState === "project";
  const isCta = hoverState === "cta";
  const isButton = hoverState === "button";

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[999999] overflow-hidden select-none transition-opacity duration-300"
      style={{ opacity: isHidden ? 0 : 1 }}
    >
      {/* 1. Canvas for lightweight subtle AI particle trail */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 w-full h-full"
      />

      {/* 2. Precise Glowing Blue Center Dot */}
      <div
        ref={dotElRef}
        className="pointer-events-none absolute top-0 left-0 -ml-[3px] -mt-[3px] rounded-full transition-opacity duration-200"
        style={{
          width: "6px",
          height: "6px",
          backgroundColor: "#1D4ED8",
          boxShadow: "0 0 8px rgba(29, 78, 216, 0.9), 0 0 16px rgba(59, 130, 246, 0.5)",
          opacity: isGallery || isProject ? 0 : 1,
          willChange: "transform"
        }}
      />

      {/* 3. Smooth Outer Follow Ring / Interactive Badge */}
      <div
        ref={ringElRef}
        className="pointer-events-none absolute top-0 left-0 flex items-center justify-center transition-all duration-200 ease-out"
        style={{
          willChange: "transform, width, height, border-radius, background-color",
          // Sizing & Positioning based on Hover State
          width: isGallery ? "92px" : isProject ? "114px" : isCta ? "52px" : isButton ? "46px" : "34px",
          height: isGallery ? "32px" : isProject ? "32px" : isCta ? "52px" : isButton ? "46px" : "34px",
          marginLeft: isGallery ? "-46px" : isProject ? "-57px" : isCta ? "-26px" : isButton ? "-23px" : "-17px",
          marginTop: isGallery ? "-16px" : isProject ? "-16px" : isCta ? "-26px" : isButton ? "-23px" : "-17px",
          borderRadius: isGallery || isProject ? "9999px" : "9999px",
          // Brand Colors & Glass Accents
          backgroundColor: isGallery
            ? "rgba(11, 25, 44, 0.88)"
            : isProject
            ? "#1D4ED8"
            : isCta
            ? "rgba(29, 78, 216, 0.12)"
            : isButton
            ? "rgba(29, 78, 216, 0.08)"
            : "rgba(29, 78, 216, 0.04)",
          backdropFilter: isGallery ? "blur(6px)" : "none",
          border: isGallery
            ? "1px solid rgba(255, 255, 255, 0.25)"
            : isProject
            ? "1px solid rgba(255, 255, 255, 0.4)"
            : isCta
            ? "2px solid rgba(29, 78, 216, 0.85)"
            : isButton
            ? "1.5px solid rgba(29, 78, 216, 0.65)"
            : "1.5px solid rgba(29, 78, 216, 0.4)",
          boxShadow: isProject
            ? "0 4px 14px rgba(29, 78, 216, 0.4)"
            : isCta
            ? "0 0 16px rgba(29, 78, 216, 0.3)"
            : isGallery
            ? "0 4px 12px rgba(0, 0, 0, 0.2)"
            : "none"
        }}
      >
        {/* Gallery Hover: "EXPLORE" Label */}
        {isGallery && (
          <span className="text-[10px] font-black uppercase tracking-[0.14em] text-white flex items-center gap-1 select-none drop-shadow-xs">
            <span>EXPLORE</span>
            <span className="text-blue-300 text-[11px]">↗</span>
          </span>
        )}

        {/* Project Hover: "VIEW PROJECT" Label */}
        {isProject && (
          <span className="text-[9px] font-black uppercase tracking-[0.12em] text-white select-none drop-shadow-xs">
            VIEW PROJECT
          </span>
        )}
      </div>
    </div>
  );
}
