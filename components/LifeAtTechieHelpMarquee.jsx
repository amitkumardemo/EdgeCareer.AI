"use client";

import React from "react";

// Curated authentic TechieHelp Institute of AI photographs with face-preserving focal framing
const ROW_1_IMAGES = [
  {
    src: "/hero-slides/technocrats_certificates.jpg",
    title: "Student Group Receiving Certificates",
    desc: "Campus certification ceremony at Technocrats Institute of Technology",
    tag: "Certification",
    position: "center 10%",
  },
  {
    src: "/hero-slides/class1.jpeg",
    title: "Campus Classroom & Interactive Masterclass",
    desc: "Live practical workshop on emerging technologies and AI tools",
    tag: "Training",
    position: "center 20%",
  },
  {
    src: "/hero-slides/goodies_kit.jpg",
    title: "Internship Welcome Kits & Swag",
    desc: "Official TechieHelp backpack, journal, badge and goodies package",
    tag: "Welcome Kit",
    position: "center 8%",
  },
  {
    src: "/hero-slides/team_hack.jpg",
    title: "Hackathon Innovation Team",
    desc: "Student developers building real-world software during campus hackathon",
    tag: "Hackathon",
    position: "center 15%",
  },
  {
    src: "/hero-slides/hackloop_awards.jpg",
    title: "Hackloop Hackathon Winners",
    desc: "Top performing team awarded with trophies, certificates & recognitions",
    tag: "Hackathon",
    position: "center 14%",
  },
  {
    src: "/hero-slides/charchita_photo.jpeg",
    title: "Student Excellence Felicitation",
    desc: "Honoring top-performing student intern for outstanding project work",
    tag: "Recognition",
    position: "center 12%",
  },
  {
    src: "/hero-slides/celebration_balloons.jpg",
    title: "Community Milestone Celebration",
    desc: "Celebrating cohort completion and live product launches together",
    tag: "Celebration",
    position: "center 16%",
  },
  {
    src: "/hero-slides/single_cert_handover.jpg",
    title: "Student Achievement Felicitation",
    desc: "Honoring top student intern for exceptional project contribution",
    tag: "Recognition",
    position: "center 6%",
  },
  {
    src: "/about-students-collaboration.jpg",
    title: "Campus Innovation & Live Projects",
    desc: "Student teams collaborating on emerging AI and technology prototypes",
    tag: "Innovation",
    position: "center 15%",
  },
  {
    src: "/hero-slides/kit_nodha.jpeg",
    title: "Internship Goodies & Kit Handover",
    desc: "Presenting official TechieHelp welcome kit, bag and goodies to student",
    tag: "Welcome Kit",
    position: "center 22%",
  },
  {
    src: "/hero-slides/team_celebration.jpg",
    title: "Team & Cohort Achievement Party",
    desc: "Students and mentorship team celebrating milestone achievements",
    tag: "Celebration",
    position: "center 16%",
  },
  {
    src: "/hero-slides/25.jpeg",
    title: "Campus Felicitation & Award Handover",
    desc: "Honoring student achievements and practical project milestones",
    tag: "Felicitation",
    position: "center 8%",
  },
  {
    src: "/hero-slides/tshirt_gift.jpg",
    title: "TechieHelp Merchandise & Swag Gifts",
    desc: "Interns receiving official TechieHelp apparel and merchandise gifts",
    tag: "Swag",
    position: "center 32%",
  },
  {
    src: "/aarshdeep_cert.jpg",
    title: "Verified AI Internship Certificate",
    desc: "Industry-recognized certificate of accomplishment and skill mastery",
    tag: "Credentials",
    position: "center 12%",
  },
  {
    src: "/hero-slides/29.jpeg",
    title: "Campus Innovation Club Gathering",
    desc: "Students gathered on campus for hands-on tech initiatives and workshops",
    tag: "Campus Life",
    position: "center 15%",
  },
  {
    src: "/hero-slides/team_steps.jpg",
    title: "Campus Cohort Meetup",
    desc: "Student cohort gathering on campus steps for offline networking",
    tag: "Campus Life",
    position: "center 20%",
  },
  {
    src: "/hero-slides/30.jpeg",
    title: "Project Demo Day Celebration",
    desc: "Celebrating successful demo day presentations with students and mentors",
    tag: "Celebration",
    position: "center 20%",
  },
  {
    src: "/hero-slides/slide1.jpg",
    title: "Hands-on Learning Masterclass",
    desc: "Practical interactive masterclass on modern emerging technologies",
    tag: "Masterclass",
    position: "center 20%",
  },
  {
    src: "/hero-slides/slide3.jpg",
    title: "Real-World Project Mentorship",
    desc: "1-on-1 guidance from industry mentors on live production codebase",
    tag: "Mentorship",
    position: "center 20%",
  },
];

const ROW_2_IMAGES = [
  {
    src: "/hero-slides/award_ceremony.jpg",
    title: "Award Ceremony with Leadership",
    desc: "College director and leadership presenting mementos to TechieHelp",
    tag: "Leadership",
    position: "center 8%",
  },
  {
    src: "/hero-slides/27.jpeg",
    title: "Student Certificate Felicitation",
    desc: "Formal certificate presentation celebrating practical AI project success",
    tag: "Certification",
    position: "center 8%",
  },
  {
    src: "/goodies_box.png",
    title: "Deluxe Internship Welcome Box",
    desc: "Curated student kit including custom gear, stickers and stationery",
    tag: "Welcome Kit",
    position: "center",
  },
  {
    src: "/hero-slides/kitt_1.jpeg",
    title: "Student Welcome Pack Felicitation",
    desc: "Intern receiving official credentials and TechieHelp welcome pack",
    tag: "Welcome Kit",
    position: "center 20%",
  },
  {
    src: "/hero-slides/thumbs_up_team.jpg",
    title: "Interns & Mentorship Celebration",
    desc: "Student cohort celebration after successful live project presentations",
    tag: "Community",
    position: "center 18%",
  },
  {
    src: "/hero-slides/aryan2.jpeg",
    title: "Certificate of Completion Handover",
    desc: "Recognizing student intern for successful completion of practical track",
    tag: "Certification",
    position: "center 25%",
  },
  {
    src: "/hero-slides/principal_trophy.jpg",
    title: "College Director & Principal Memento",
    desc: "Institutional collaboration felicitation and memento presentation",
    tag: "Felicitation",
    position: "center 18%",
  },
  {
    src: "/hero-slides/rss_6714.jpeg",
    title: "Campus Tech Community Meetup",
    desc: "Students and mentors networking and discussing emerging AI projects",
    tag: "Community",
    position: "center 12%",
  },
  {
    src: "/hero-slides/certificate_handover.jpg",
    title: "College Felicitation & Certificate Handover",
    desc: "Formal graduation ceremony handing over verified credentials",
    tag: "Certification",
    position: "center 6%",
  },
  {
    src: "/hero-slides/32.jpeg",
    title: "Student Swag & Kit Recognition",
    desc: "Delivering official merchandise and goodies packages to active interns",
    tag: "Goodies",
    position: "center 18%",
  },
  {
    src: "/hero-slides/backbone_team.jpg",
    title: "TechieHelp Core Mentors & Team",
    desc: "Senior engineering and academic mentors behind the curriculum",
    tag: "Mentors",
    position: "center 8%",
  },
  {
    src: "/hero-slides/56.jpeg",
    title: "Campus Innovation Ceremony",
    desc: "College leadership and students celebrating institutional partnership",
    tag: "Leadership",
    position: "center 20%",
  },
  {
    src: "/swag_apparel.png",
    title: "Official Branded Apparel & Swag",
    desc: "TechieHelp Institute of AI custom hoodies, t-shirts and student merch",
    tag: "Merchandise",
    position: "center",
  },
  {
    src: "/nikhil_completion_certificate.png",
    title: "Student Internship Completion Letter",
    desc: "Official verification letter confirming production project delivery",
    tag: "Achievement",
    position: "center 12%",
  },
  {
    src: "/hero-slides/gift_box.jpg",
    title: "Student Recognition & Milestone Gift",
    desc: "Token of appreciation presented to top-performing student leaders",
    tag: "Goodies",
    position: "center",
  },
  {
    src: "/campus_collaboration.png",
    title: "Live Project Collaboration Session",
    desc: "Student teams solving real-world challenges through collaborative coding",
    tag: "Innovation",
    position: "center 15%",
  },
  {
    src: "/placement_drive_1.jpg",
    title: "Campus Placement Drive & Technical Session",
    desc: "On-campus placement preparation and interview screening drive",
    tag: "Placement",
    position: "center 18%",
  },
  {
    src: "/hero-slides/slide2.jpg",
    title: "Live Coding & Problem Solving",
    desc: "Hands-on coding session solving real architectural challenges",
    tag: "Live Projects",
    position: "center 20%",
  },
];

function MarqueeCard({ item }) {
  return (
    <div className="group relative w-[270px] sm:w-[320px] md:w-[360px] h-[180px] sm:h-[215px] md:h-[240px] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-300 shrink-0 cursor-pointer select-none">
      {/* 100% Clean Authentic Photograph (No text displayed by default, face-protected framing) */}
      <img
        src={item.src}
        alt={item.title}
        loading="lazy"
        style={{ objectPosition: item.position || "center 16%" }}
        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-104"
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
        {/* ROW 1: TOP TRACK (Continuous Left to Right Movement, smooth 68s loop) */}
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

        {/* ROW 2: BOTTOM TRACK (Continuous Right to Left Movement, smooth 78s loop - different speed) */}
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
