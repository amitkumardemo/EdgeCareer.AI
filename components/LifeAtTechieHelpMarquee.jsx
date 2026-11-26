"use client";

import React from "react";

// Curated authentic TechieHelp Institute of AI photographs with hover details
const ROW_1_IMAGES = [
  {
    src: "/hero-slides/technocrats_certificates.jpg",
    title: "Student Group Receiving Certificates",
    desc: "Campus certification ceremony at Technocrats Institute of Technology",
    tag: "Certification",
  },
  {
    src: "/hero-slides/goodies_kit.jpg",
    title: "Internship Welcome Kits & Swag",
    desc: "Official TechieHelp backpack, journal, badge and goodies package",
    tag: "Welcome Kit",
  },
  {
    src: "/hero-slides/hackloop_awards.jpg",
    title: "Hackloop Hackathon Winners",
    desc: "Top performing team awarded with trophies, certificates & recognitions",
    tag: "Hackathon",
  },
  {
    src: "/hero-slides/celebration_balloons.jpg",
    title: "Community Milestone Celebration",
    desc: "Celebrating cohort completion and live product launches together",
    tag: "Celebration",
  },
  {
    src: "/hero-slides/single_cert_handover.jpg",
    title: "Student Achievement Felicitation",
    desc: "Honoring top student intern for exceptional project contribution",
    tag: "Recognition",
  },
  {
    src: "/hero-slides/id_cards_lanyards.jpg",
    title: "Official Badges & TechieHelp Lanyards",
    desc: "Official verified intern credentials and onboarding welcome pack",
    tag: "Community",
  },
  {
    src: "/hero-slides/team_celebration.jpg",
    title: "Team & Cohort Achievement Party",
    desc: "Students and mentorship team celebrating milestone achievements",
    tag: "Celebration",
  },
  {
    src: "/hero-slides/tshirt_gift.jpg",
    title: "TechieHelp Merchandise & Swag Gifts",
    desc: "Interns receiving official TechieHelp apparel and merchandise gifts",
    tag: "Swag",
  },
  {
    src: "/aarshdeep_cert.jpg",
    title: "Verified AI Internship Certificate",
    desc: "Industry-recognized certificate of accomplishment and skill mastery",
    tag: "Credentials",
  },
  {
    src: "/hero-slides/team_steps.jpg",
    title: "Campus Cohort Meetup",
    desc: "Student cohort gathering on campus steps for offline networking",
    tag: "Campus Life",
  },
  {
    src: "/hero-slides/slide1.jpg",
    title: "Hands-on Learning Masterclass",
    desc: "Practical interactive masterclass on modern emerging technologies",
    tag: "Masterclass",
  },
  {
    src: "/hero-slides/slide3.jpg",
    title: "Real-World Project Mentorship",
    desc: "1-on-1 guidance from industry mentors on live production codebase",
    tag: "Mentorship",
  },
];

const ROW_2_IMAGES = [
  {
    src: "/hero-slides/award_ceremony.jpg",
    title: "Award Ceremony with Leadership",
    desc: "College director and leadership presenting mementos to TechieHelp",
    tag: "Leadership",
  },
  {
    src: "/goodies_box.png",
    title: "Deluxe Internship Welcome Box",
    desc: "Curated student kit including custom gear, stickers and stationery",
    tag: "Welcome Kit",
  },
  {
    src: "/hero-slides/thumbs_up_team.jpg",
    title: "Interns & Mentorship Celebration",
    desc: "Student cohort celebration after successful live project presentations",
    tag: "Community",
  },
  {
    src: "/hero-slides/principal_trophy.jpg",
    title: "College Director & Principal Memento",
    desc: "Institutional collaboration felicitation and memento presentation",
    tag: "Felicitation",
  },
  {
    src: "/hero-slides/certificate_handover.jpg",
    title: "College Felicitation & Certificate Handover",
    desc: "Formal graduation ceremony handing over verified credentials",
    tag: "Certification",
  },
  {
    src: "/hero-slides/backbone_team.jpg",
    title: "TechieHelp Core Mentors & Team",
    desc: "Senior engineering and academic mentors behind the curriculum",
    tag: "Mentors",
  },
  {
    src: "/swag_apparel.png",
    title: "Official Branded Apparel & Swag",
    desc: "TechieHelp Institute of AI custom hoodies, t-shirts and student merch",
    tag: "Merchandise",
  },
  {
    src: "/nikhil_completion_certificate.png",
    title: "Student Internship Completion Letter",
    desc: "Official verification letter confirming production project delivery",
    tag: "Achievement",
  },
  {
    src: "/hero-slides/gift_box.jpg",
    title: "Student Recognition & Milestone Gift",
    desc: "Token of appreciation presented to top-performing student leaders",
    tag: "Goodies",
  },
  {
    src: "/campus_collaboration.png",
    title: "Live Project Collaboration Session",
    desc: "Student teams solving real-world challenges through collaborative coding",
    tag: "Innovation",
  },
  {
    src: "/placement_drive_1.jpg",
    title: "Campus Placement Drive & Technical Session",
    desc: "On-campus placement preparation and interview screening drive",
    tag: "Placement",
  },
  {
    src: "/hero-slides/slide2.jpg",
    title: "Live Coding & Problem Solving",
    desc: "Hands-on coding session solving real architectural challenges",
    tag: "Live Projects",
  },
];

function MarqueeCard({ item }) {
  return (
    <div className="group relative w-[260px] sm:w-[310px] md:w-[350px] h-[160px] sm:h-[190px] md:h-[215px] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-300 shrink-0 cursor-pointer select-none">
      {/* 100% Clean Authentic Photograph (No text displayed by default) */}
      <img
        src={item.src}
        alt={item.title}
        loading="lazy"
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
      />

      {/* Subtle Inner Ring */}
      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/5 group-hover:ring-blue-500/30 transition-all duration-300 pointer-events-none" />

      {/* Modern Hover Details Overlay (Hidden by default, reveals only on cursor hover) */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-slate-950/20 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out flex flex-col justify-between p-3.5 sm:p-4 pointer-events-none backdrop-blur-[2px]">
        {/* Top Tag Pill (Smooth slide-in on hover) */}
        <div className="flex justify-start transform -translate-y-2 group-hover:translate-y-0 transition-transform duration-300 ease-out">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-bold tracking-wide uppercase bg-white/95 text-[#1D4ED8] shadow-md border border-white/80">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1D4ED8]" />
            <span>{item.tag}</span>
          </span>
        </div>

        {/* Bottom Details Content (Smooth slide-up on hover) */}
        <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 ease-out space-y-0.5">
          <h4 className="text-white font-bold text-xs sm:text-sm leading-snug drop-shadow-md">
            {item.title}
          </h4>
          <p className="text-slate-200 text-[11px] sm:text-xs leading-tight line-clamp-2 drop-shadow-xs font-normal">
            {item.desc}
          </p>
        </div>
      </div>
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
