"use client";

import React from "react";

// Curated authentic TechieHelp Institute of AI photographs
const ROW_1_IMAGES = [
  {
    src: "/hero-slides/technocrats_certificates.jpg",
    caption: "Student Group Receiving Certificates",
    tag: "Certification",
  },
  {
    src: "/hero-slides/goodies_kit.jpg",
    caption: "Internship Welcome Kits & Swag",
    tag: "Welcome Kit",
  },
  {
    src: "/hero-slides/hackloop_awards.jpg",
    caption: "Hackloop Hackathon Winners",
    tag: "Hackathon",
  },
  {
    src: "/hero-slides/celebration_balloons.jpg",
    caption: "Community Milestone Celebration",
    tag: "Celebration",
  },
  {
    src: "/hero-slides/single_cert_handover.jpg",
    caption: "Excellence Recognition Ceremony",
    tag: "Recognition",
  },
  {
    src: "/hero-slides/id_cards_lanyards.jpg",
    caption: "Official Student Badges & Lanyards",
    tag: "Community",
  },
  {
    src: "/hero-slides/team_celebration.jpg",
    caption: "Team & Interns Achievement Party",
    tag: "Celebration",
  },
  {
    src: "/hero-slides/tshirt_gift.jpg",
    caption: "TechieHelp Merchandise & Swag Gifts",
    tag: "Swag",
  },
  {
    src: "/aarshdeep_cert.jpg",
    caption: "Verified AI Internship Certificate",
    tag: "Credentials",
  },
  {
    src: "/hero-slides/team_steps.jpg",
    caption: "Campus Cohort & Community Meetup",
    tag: "Campus Life",
  },
  {
    src: "/hero-slides/slide1.jpg",
    caption: "Hands-on Learning Masterclass",
    tag: "Masterclass",
  },
  {
    src: "/hero-slides/slide3.jpg",
    caption: "Real-World Project Mentorship",
    tag: "Mentorship",
  },
];

const ROW_2_IMAGES = [
  {
    src: "/hero-slides/award_ceremony.jpg",
    caption: "Award Ceremony with College Leaders",
    tag: "Leadership",
  },
  {
    src: "/goodies_box.png",
    caption: "Deluxe Internship Welcome Box",
    tag: "Welcome Kit",
  },
  {
    src: "/hero-slides/thumbs_up_team.jpg",
    caption: "Interns & Mentorship Team Celebration",
    tag: "Community",
  },
  {
    src: "/hero-slides/principal_trophy.jpg",
    caption: "College Director & Principal Memento",
    tag: "Felicitation",
  },
  {
    src: "/hero-slides/certificate_handover.jpg",
    caption: "College Felicitation & Certificate Handover",
    tag: "Certification",
  },
  {
    src: "/hero-slides/backbone_team.jpg",
    caption: "TechieHelp Core Mentors & Team",
    tag: "Mentors",
  },
  {
    src: "/swag_apparel.png",
    caption: "TechieHelp Branded Swag & Apparel",
    tag: "Merchandise",
  },
  {
    src: "/nikhil_completion_certificate.png",
    caption: "Student Internship Completion Letter",
    tag: "Achievement",
  },
  {
    src: "/hero-slides/gift_box.jpg",
    caption: "Student Recognition & Milestone Gift",
    tag: "Goodies",
  },
  {
    src: "/campus_collaboration.png",
    caption: "Live Project Collaboration Session",
    tag: "Innovation",
  },
  {
    src: "/placement_drive_1.jpg",
    caption: "Campus Placement Drive & Technical Session",
    tag: "Placement",
  },
  {
    src: "/hero-slides/slide2.jpg",
    caption: "Live Coding & Problem Solving",
    tag: "Live Projects",
  },
];

function MarqueeCard({ item }) {
  return (
    <div className="group relative w-[260px] sm:w-[310px] md:w-[350px] h-[160px] sm:h-[190px] md:h-[215px] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-300 shrink-0 cursor-pointer select-none">
      {/* Authentic Photograph */}
      <img
        src={item.src}
        alt={item.caption}
        loading="lazy"
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
      />

      {/* Top Subtle Pill Tag */}
      <div className="absolute top-3 left-3 z-10 pointer-events-none">
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-bold tracking-wide uppercase bg-white/95 backdrop-blur-md text-slate-800 border border-white/60 shadow-xs group-hover:bg-[#1D4ED8] group-hover:text-white group-hover:border-blue-500 transition-colors duration-300">
          {item.tag}
        </span>
      </div>

      {/* Bottom Gradient with Caption */}
      <div className="absolute inset-x-0 bottom-0 pt-10 pb-3 px-3.5 bg-gradient-to-t from-slate-950/85 via-slate-950/45 to-transparent transition-opacity duration-300 flex items-end pointer-events-none">
        <p className="text-white text-xs sm:text-sm font-semibold tracking-tight line-clamp-1 drop-shadow-xs">
          {item.caption}
        </p>
      </div>

      {/* Subtle Inner Ring */}
      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/5 group-hover:ring-blue-500/30 transition-all duration-300 pointer-events-none" />
    </div>
  );
}

export default function LifeAtTechieHelpMarquee() {
  return (
    <div className="relative w-full overflow-hidden py-3">
      {/* Edge Fade Gradients for Luxury SaaS Aesthetic */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 md:w-44 z-20 pointer-events-none bg-gradient-to-r from-white via-white/80 to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 md:w-44 z-20 pointer-events-none bg-gradient-to-l from-white via-white/80 to-transparent" />

      {/* Marquee Tracks Container */}
      <div className="space-y-4 md:space-y-5">
        {/* ROW 1: TOP TRACK (Continuous Left to Right Movement, 42s loop) */}
        <div className="marquee-track-row overflow-hidden flex w-full">
          <div className="flex w-max animate-marquee-ltr">
            {/* Primary Track */}
            <div className="flex gap-4 sm:gap-5 pr-4 sm:pr-5 shrink-0">
              {ROW_1_IMAGES.map((item, idx) => (
                <MarqueeCard key={`row1-a-${idx}`} item={item} />
              ))}
            </div>
            {/* Seamless Duplicate Track */}
            <div className="flex gap-4 sm:gap-5 pr-4 sm:pr-5 shrink-0" aria-hidden="true">
              {ROW_1_IMAGES.map((item, idx) => (
                <MarqueeCard key={`row1-b-${idx}`} item={item} />
              ))}
            </div>
          </div>
        </div>

        {/* ROW 2: BOTTOM TRACK (Continuous Right to Left Movement, 50s loop - different speed) */}
        <div className="marquee-track-row overflow-hidden flex w-full">
          <div className="flex w-max animate-marquee-rtl">
            {/* Primary Track */}
            <div className="flex gap-4 sm:gap-5 pr-4 sm:pr-5 shrink-0">
              {ROW_2_IMAGES.map((item, idx) => (
                <MarqueeCard key={`row2-a-${idx}`} item={item} />
              ))}
            </div>
            {/* Seamless Duplicate Track */}
            <div className="flex gap-4 sm:gap-5 pr-4 sm:pr-5 shrink-0" aria-hidden="true">
              {ROW_2_IMAGES.map((item, idx) => (
                <MarqueeCard key={`row2-b-${idx}`} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
