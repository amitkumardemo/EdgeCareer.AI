"use client";

import React from "react";

// Natural Aspect Ratio Width Classes (Fixed Row Height: h-[185px] sm:h-[215px] md:h-[240px])
const WIDTH_CLASSES = {
  tall: "w-[115px] sm:w-[130px] md:w-[145px]", // 9:16 vertical awards & trophies
  portrait: "w-[145px] sm:w-[170px] md:w-[190px]", // 3:4 certificate handovers & portraits
  square: "w-[185px] sm:w-[215px] md:w-[240px]", // 1:1 square collabs
  landscape: "w-[250px] sm:w-[290px] md:w-[325px]", // 4:3 / 3:2 student groups
  wide: "w-[290px] sm:w-[340px] md:w-[385px]", // 16:9 classrooms & wide stages
};

// Curated authentic TechieHelp Institute of AI photographs with face-preserving focal framing
const ROW_1_IMAGES = [
  {
    src: "/hero-slides/technocrats_certificates.jpg",
    title: "Student Group Receiving Certificates",
    desc: "Campus certification ceremony at Technocrats Institute of Technology",
    tag: "Certification",
    position: "center 10%",
    aspect: "landscape",
  },
  {
    src: "/hero-slides/techiehelp_life_01.jpeg",
    title: "Student Certificate Felicitation",
    desc: "Campus certification ceremony honoring student technical achievements",
    tag: "Certification",
    position: "center 10%",
    aspect: "portrait",
  },
  {
    src: "/hero-slides/class1.jpeg",
    title: "Campus Classroom & Interactive Masterclass",
    desc: "Live practical workshop on emerging technologies and AI tools",
    tag: "Training",
    position: "center 20%",
    aspect: "wide",
  },
  {
    src: "/hero-slides/techiehelp_life_02.jpeg",
    title: "TechieHelp Student Kit Handover",
    desc: "Presenting official welcome kit and student goodies package",
    tag: "Welcome Kit",
    position: "center 10%",
    aspect: "tall",
  },
  {
    src: "/hero-slides/goodies_kit.jpg",
    title: "Internship Welcome Kits & Swag",
    desc: "Official TechieHelp backpack, journal, badge and goodies package",
    tag: "Welcome Kit",
    position: "center 8%",
    aspect: "tall",
  },
  {
    src: "/hero-slides/techiehelp_life_03.jpeg",
    title: "Intern Recognition & Swag",
    desc: "Interns receiving official TechieHelp apparel and welcome swag",
    tag: "Goodies",
    position: "center 10%",
    aspect: "tall",
  },
  {
    src: "/hero-slides/team_hack.jpg",
    title: "Hackathon Innovation Team",
    desc: "Student developers building real-world software during campus hackathon",
    tag: "Hackathon",
    position: "center 15%",
    aspect: "landscape",
  },
  {
    src: "/hero-slides/techiehelp_life_04.jpeg",
    title: "Excellence in Innovation Award",
    desc: "Honoring top student developer for outstanding live project work",
    tag: "Recognition",
    position: "center 10%",
    aspect: "portrait",
  },
  {
    src: "/hero-slides/hackloop_awards.jpg",
    title: "Hackloop Hackathon Winners",
    desc: "Top performing team awarded with trophies, certificates & recognitions",
    tag: "Hackathon",
    position: "center 14%",
    aspect: "landscape",
  },
  {
    src: "/hero-slides/techiehelp_life_05.jpeg",
    title: "Hands-on Tech Masterclass",
    desc: "Interactive technical workshop on real-world software engineering",
    tag: "Training",
    position: "center 20%",
    aspect: "wide",
  },
  {
    src: "/hero-slides/charchita_photo.jpeg",
    title: "Student Excellence Felicitation",
    desc: "Honoring top-performing student intern for outstanding project work",
    tag: "Recognition",
    position: "center 12%",
    aspect: "portrait",
  },
  {
    src: "/hero-slides/techiehelp_life_06.jpeg",
    title: "Institutional Partner Felicitation",
    desc: "Director and college faculty presenting collaborative awards",
    tag: "Leadership",
    position: "center 10%",
    aspect: "portrait",
  },
  {
    src: "/hero-slides/celebration_balloons.jpg",
    title: "Community Milestone Celebration",
    desc: "Celebrating cohort completion and live product launches together",
    tag: "Celebration",
    position: "center 16%",
    aspect: "wide",
  },
  {
    src: "/hero-slides/techiehelp_life_07.jpeg",
    title: "Verified Internship Credentials",
    desc: "Handing over verified certificate of completion and performance letter",
    tag: "Credentials",
    position: "center 10%",
    aspect: "portrait",
  },
  {
    src: "/hero-slides/single_cert_handover.jpg",
    title: "Student Achievement Felicitation",
    desc: "Honoring top student intern for exceptional project contribution",
    tag: "Recognition",
    position: "center 6%",
    aspect: "portrait",
  },
  {
    src: "/hero-slides/techiehelp_life_08.jpeg",
    title: "Campus Graduation & Felicitation",
    desc: "Formal graduation ceremony honoring practical project milestones",
    tag: "Certification",
    position: "center 10%",
    aspect: "portrait",
  },
  {
    src: "/about-students-collaboration.jpg",
    title: "Campus Innovation & Live Projects",
    desc: "Student teams collaborating on emerging AI and technology prototypes",
    tag: "Innovation",
    position: "center 15%",
    aspect: "landscape",
  },
  {
    src: "/hero-slides/techiehelp_life_09.jpeg",
    title: "Student Project Accomplishment",
    desc: "Recognizing successful project delivery and deployment",
    tag: "Achievement",
    position: "center 10%",
    aspect: "portrait",
  },
  {
    src: "/hero-slides/kit_nodha.jpeg",
    title: "Internship Goodies & Kit Handover",
    desc: "Presenting official TechieHelp welcome kit, bag and goodies to student",
    tag: "Welcome Kit",
    position: "center 22%",
    aspect: "tall",
  },
  {
    src: "/hero-slides/techiehelp_life_10.jpeg",
    title: "Internship Onboarding Kit",
    desc: "Welcome merchandise and badges presented to incoming student cohort",
    tag: "Welcome Kit",
    position: "center 10%",
    aspect: "tall",
  },
  {
    src: "/hero-slides/team_celebration.jpg",
    title: "Team & Cohort Achievement Party",
    desc: "Students and mentorship team celebrating milestone achievements",
    tag: "Celebration",
    position: "center 16%",
    aspect: "wide",
  },
  {
    src: "/hero-slides/techiehelp_life_11.jpeg",
    title: "Campus TechieHelp Cohort",
    desc: "Active student interns building collaborative technical solutions",
    tag: "Community",
    position: "center 10%",
    aspect: "tall",
  },
  {
    src: "/hero-slides/25.jpeg",
    title: "Campus Felicitation & Award Handover",
    desc: "Honoring student achievements and practical project milestones",
    tag: "Felicitation",
    position: "center 8%",
    aspect: "portrait",
  },
  {
    src: "/hero-slides/techiehelp_life_12.jpeg",
    title: "Hackathon Problem Solving",
    desc: "Student teams pitching real-world solutions during technical contest",
    tag: "Hackathon",
    position: "center 20%",
    aspect: "wide",
  },
  {
    src: "/hero-slides/tshirt_gift.jpg",
    title: "TechieHelp Merchandise & Swag Gifts",
    desc: "Interns receiving official TechieHelp apparel and merchandise gifts",
    tag: "Swag",
    position: "center 32%",
    aspect: "tall",
  },
  {
    src: "/hero-slides/techiehelp_life_13.jpeg",
    title: "Student Merit Recognition",
    desc: "Rewarding high-performing students with exclusive TechieHelp gifts",
    tag: "Goodies",
    position: "center 22%",
    aspect: "tall",
  },
  {
    src: "/aarshdeep_cert.jpg",
    title: "Verified AI Internship Certificate",
    desc: "Industry-recognized certificate of accomplishment and skill mastery",
    tag: "Credentials",
    position: "center 12%",
    aspect: "portrait",
  },
  {
    src: "/hero-slides/techiehelp_life_14.jpeg",
    title: "Welcome Package Distribution",
    desc: "Official TechieHelp goodies package and student stationery kit",
    tag: "Welcome Kit",
    position: "center 22%",
    aspect: "tall",
  },
  {
    src: "/hero-slides/29.jpeg",
    title: "Campus Innovation Club Gathering",
    desc: "Students gathered on campus for hands-on tech initiatives and workshops",
    tag: "Campus Life",
    position: "center 15%",
    aspect: "landscape",
  },
  {
    src: "/hero-slides/techiehelp_life_15.jpeg",
    title: "Special Achievement Token",
    desc: "Token of appreciation presented for exceptional teamwork",
    tag: "Recognition",
    position: "center 22%",
    aspect: "tall",
  },
  {
    src: "/hero-slides/team_steps.jpg",
    title: "Campus Cohort Meetup",
    desc: "Student cohort gathering on campus steps for offline networking",
    tag: "Campus Life",
    position: "center 20%",
    aspect: "tall",
  },
  {
    src: "/hero-slides/techiehelp_life_16.jpeg",
    title: "Dual Credential Felicitation",
    desc: "Students receiving training and internship dual certificates",
    tag: "Certification",
    position: "center 10%",
    aspect: "portrait",
  },
  {
    src: "/hero-slides/30.jpeg",
    title: "Project Demo Day Celebration",
    desc: "Celebrating successful demo day presentations with students and mentors",
    tag: "Celebration",
    position: "center 20%",
    aspect: "wide",
  },
  {
    src: "/hero-slides/techiehelp_life_17.jpeg",
    title: "Student Innovation Team",
    desc: "Campus innovation club members collaborating on tech initiatives",
    tag: "Campus Life",
    position: "center 10%",
    aspect: "portrait",
  },
  {
    src: "/hero-slides/slide1.jpg",
    title: "Hands-on Learning Masterclass",
    desc: "Practical interactive masterclass on modern emerging technologies",
    tag: "Masterclass",
    position: "center 20%",
    aspect: "wide",
  },
  {
    src: "/hero-slides/techiehelp_life_18.jpeg",
    title: "1-on-1 Mentorship Session",
    desc: "Guidance from senior engineers on software architecture",
    tag: "Mentorship",
    position: "center 10%",
    aspect: "tall",
  },
  {
    src: "/hero-slides/slide3.jpg",
    title: "Real-World Project Mentorship",
    desc: "1-on-1 guidance from industry mentors on live production codebase",
    tag: "Mentorship",
    position: "center 20%",
    aspect: "wide",
  },
  {
    src: "/hero-slides/techiehelp_life_19.jpeg",
    title: "Interactive Classroom Session",
    desc: "Live coding demonstrations and technical concept breakdowns",
    tag: "Masterclass",
    position: "center 20%",
    aspect: "wide",
  },
  {
    src: "/hero-slides/techiehelp_life_20.jpeg",
    title: "Full Stack Workshop",
    desc: "Hands-on training session on web and cloud technologies",
    tag: "Training",
    position: "center 20%",
    aspect: "wide",
  },
  {
    src: "/hero-slides/techiehelp_life_21.jpeg",
    title: "Milestone Celebration Day",
    desc: "Celebrating cohort completion and production deployments",
    tag: "Celebration",
    position: "center 10%",
    aspect: "tall",
  },
];

const ROW_2_IMAGES = [
  {
    src: "/hero-slides/award_ceremony.jpg",
    title: "Award Ceremony with Leadership",
    desc: "College director and leadership presenting mementos to TechieHelp",
    tag: "Leadership",
    position: "center 8%",
    aspect: "portrait",
  },
  {
    src: "/hero-slides/techiehelp_life_22.jpeg",
    title: "Campus Technical Drive",
    desc: "College placement preparation and technical screening session",
    tag: "Training",
    position: "center 20%",
    aspect: "wide",
  },
  {
    src: "/hero-slides/27.jpeg",
    title: "Student Certificate Felicitation",
    desc: "Formal certificate presentation celebrating practical AI project success",
    tag: "Certification",
    position: "center 8%",
    aspect: "portrait",
  },
  {
    src: "/hero-slides/techiehelp_life_23.jpeg",
    title: "Live Coding Deep-Dive",
    desc: "Students working through algorithmic and architectural challenges",
    tag: "Masterclass",
    position: "center 20%",
    aspect: "wide",
  },
  {
    src: "/goodies_box.png",
    title: "Deluxe Internship Welcome Box",
    desc: "Curated student kit including custom gear, stickers and stationery",
    tag: "Welcome Kit",
    position: "center",
    aspect: "wide",
  },
  {
    src: "/hero-slides/techiehelp_life_24.jpeg",
    title: "Emerging Tech Masterclass",
    desc: "Interactive lecture on artificial intelligence and practical tooling",
    tag: "Workshop",
    position: "center 20%",
    aspect: "wide",
  },
  {
    src: "/hero-slides/kitt_1.jpeg",
    title: "Student Welcome Pack Felicitation",
    desc: "Intern receiving official credentials and TechieHelp welcome pack",
    tag: "Welcome Kit",
    position: "center 20%",
    aspect: "tall",
  },
  {
    src: "/hero-slides/techiehelp_life_25.jpeg",
    title: "Campus Hackathon Challenge",
    desc: "Building innovative software prototypes under mentorship",
    tag: "Innovation",
    position: "center 20%",
    aspect: "wide",
  },
  {
    src: "/hero-slides/thumbs_up_team.jpg",
    title: "Interns & Mentorship Celebration",
    desc: "Student cohort celebration after successful live project presentations",
    tag: "Community",
    position: "center 18%",
    aspect: "wide",
  },
  {
    src: "/hero-slides/techiehelp_life_26.jpeg",
    title: "Project Showcase & Pitch",
    desc: "Teams demonstrating working software prototypes to judges",
    tag: "Hackathon",
    position: "center 20%",
    aspect: "wide",
  },
  {
    src: "/hero-slides/aryan2.jpeg",
    title: "Certificate of Completion Handover",
    desc: "Recognizing student intern for successful completion of practical track",
    tag: "Certification",
    position: "center 25%",
    aspect: "tall",
  },
  {
    src: "/hero-slides/techiehelp_life_27.jpeg",
    title: "Official Certificate Handover",
    desc: "Awarding verified internship certificates of excellence",
    tag: "Certification",
    position: "center 10%",
    aspect: "portrait",
  },
  {
    src: "/hero-slides/principal_trophy.jpg",
    title: "College Director & Principal Memento",
    desc: "Institutional collaboration felicitation and memento presentation",
    tag: "Felicitation",
    position: "center 18%",
    aspect: "wide",
  },
  {
    src: "/hero-slides/techiehelp_life_28.jpeg",
    title: "College Leadership Felicitation",
    desc: "Honoring institutional collaboration and tech mentorship success",
    tag: "Leadership",
    position: "center 10%",
    aspect: "portrait",
  },
  {
    src: "/hero-slides/rss_6714.jpeg",
    title: "Campus Tech Community Meetup",
    desc: "Students and mentors networking and discussing emerging AI projects",
    tag: "Community",
    position: "center 12%",
    aspect: "square",
  },
  {
    src: "/hero-slides/techiehelp_life_29.jpeg",
    title: "Outstanding Intern Recognition",
    desc: "Acknowledging high-impact contributions in engineering tracks",
    tag: "Recognition",
    position: "center 10%",
    aspect: "portrait",
  },
  {
    src: "/hero-slides/certificate_handover.jpg",
    title: "College Felicitation & Certificate Handover",
    desc: "Formal graduation ceremony handing over verified credentials",
    tag: "Certification",
    position: "center 6%",
    aspect: "portrait",
  },
  {
    src: "/hero-slides/techiehelp_life_30.jpeg",
    title: "Graduation Felicitation Ceremony",
    desc: "Formal certificate ceremony celebrating practical engineering mastery",
    tag: "Certification",
    position: "center 10%",
    aspect: "portrait",
  },
  {
    src: "/hero-slides/32.jpeg",
    title: "Student Swag & Kit Recognition",
    desc: "Delivering official merchandise and goodies packages to active interns",
    tag: "Goodies",
    position: "center 18%",
    aspect: "tall",
  },
  {
    src: "/hero-slides/techiehelp_life_31.jpeg",
    title: "Student Achievement Felicitation",
    desc: "Handing over verified credentials to graduating student leaders",
    tag: "Credentials",
    position: "center 10%",
    aspect: "portrait",
  },
  {
    src: "/hero-slides/backbone_team.jpg",
    title: "TechieHelp Core Mentors & Team",
    desc: "Senior engineering and academic mentors behind the curriculum",
    tag: "Mentors",
    position: "center 8%",
    aspect: "tall",
  },
  {
    src: "/hero-slides/techiehelp_life_32.jpeg",
    title: "Cohort Demo Day",
    desc: "Interns celebrating project launches and successful deliveries",
    tag: "Community",
    position: "center 20%",
    aspect: "landscape",
  },
  {
    src: "/hero-slides/56.jpeg",
    title: "Campus Innovation Ceremony",
    desc: "College leadership and students celebrating institutional partnership",
    tag: "Leadership",
    position: "center 20%",
    aspect: "wide",
  },
  {
    src: "/hero-slides/techiehelp_life_33.jpeg",
    title: "Student Swag Kit Handover",
    desc: "Intern receiving TechieHelp branded student kit and merchandise",
    tag: "Goodies",
    position: "center 22%",
    aspect: "tall",
  },
  {
    src: "/swag_apparel.png",
    title: "Official Branded Apparel & Swag",
    desc: "TechieHelp Institute of AI custom hoodies, t-shirts and student merch",
    tag: "Merchandise",
    position: "center",
    aspect: "tall",
  },
  {
    src: "/hero-slides/techiehelp_life_34.jpeg",
    title: "Welcome Package Distribution",
    desc: "Branded backpack, badge and welcome goodies for top performers",
    tag: "Welcome Kit",
    position: "center 22%",
    aspect: "tall",
  },
  {
    src: "/nikhil_completion_certificate.png",
    title: "Student Internship Completion Letter",
    desc: "Official verification letter confirming production project delivery",
    tag: "Achievement",
    position: "center 12%",
    aspect: "landscape",
  },
  {
    src: "/hero-slides/techiehelp_life_35.jpeg",
    title: "Campus Milestone Celebration",
    desc: "Panoramic campus gathering celebrating student achievements",
    tag: "Celebration",
    position: "center 20%",
    aspect: "wide",
  },
  {
    src: "/hero-slides/gift_box.jpg",
    title: "Student Recognition & Milestone Gift",
    desc: "Token of appreciation presented to top-performing student leaders",
    tag: "Goodies",
    position: "center",
    aspect: "wide",
  },
  {
    src: "/hero-slides/techiehelp_life_36.jpeg",
    title: "Official Goodies Handover",
    desc: "Delivering welcome kits and official credentials to interns",
    tag: "Welcome Kit",
    position: "center 22%",
    aspect: "tall",
  },
  {
    src: "/campus_collaboration.png",
    title: "Live Project Collaboration Session",
    desc: "Student teams solving real-world challenges through collaborative coding",
    tag: "Innovation",
    position: "center 15%",
    aspect: "square",
  },
  {
    src: "/hero-slides/techiehelp_life_37.jpeg",
    title: "Student Swag Delivery",
    desc: "Presenting custom merchandise and goodies to active interns",
    tag: "Merchandise",
    position: "center 22%",
    aspect: "tall",
  },
  {
    src: "/placement_drive_1.jpg",
    title: "Campus Placement Drive & Technical Session",
    desc: "On-campus placement preparation and interview screening drive",
    tag: "Placement",
    position: "center 18%",
    aspect: "wide",
  },
  {
    src: "/hero-slides/techiehelp_life_38.jpeg",
    title: "TechieHelp Community Meetup",
    desc: "Students and alumni networking and sharing industry journeys",
    tag: "Community",
    position: "center 20%",
    aspect: "square",
  },
  {
    src: "/hero-slides/slide2.jpg",
    title: "Live Coding & Problem Solving",
    desc: "Hands-on coding session solving real architectural challenges",
    tag: "Live Projects",
    position: "center 20%",
    aspect: "wide",
  },
  {
    src: "/hero-slides/techiehelp_life_39.jpeg",
    title: "Intern Welcome Kit Recognition",
    desc: "Honoring incoming student intern with official goodies kit",
    tag: "Welcome Kit",
    position: "center 10%",
    aspect: "tall",
  },
  {
    src: "/hero-slides/techiehelp_life_40.jpeg",
    title: "Student Recognition Package",
    desc: "Delivering TechieHelp merchandise and student gear",
    tag: "Goodies",
    position: "center 10%",
    aspect: "tall",
  },
  {
    src: "/hero-slides/techiehelp_life_41.jpeg",
    title: "Campus Recruitment & Placement Drive",
    desc: "On-campus technical interview coaching and career placement",
    tag: "Placement",
    position: "center 20%",
    aspect: "wide",
  },
];

function MarqueeCard({ item }) {
  const widthClass = WIDTH_CLASSES[item.aspect] || "w-[250px] sm:w-[290px] md:w-[325px]";
  const isCompact = item.aspect === "tall" || item.aspect === "portrait";

  return (
    <div
      data-cursor="gallery"
      className={`group relative ${widthClass} h-[185px] sm:h-[215px] md:h-[240px] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-300 shrink-0 cursor-pointer select-none`}
    >
      {/* 100% Clean Authentic Photograph (Uncropped natural aspect ratio framing) */}
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
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-slate-950/20 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out flex flex-col justify-between p-3 sm:p-3.5 pointer-events-none backdrop-blur-[2px]">
        {/* Top Tag Pill (Smooth slide-in on hover) */}
        <div className="flex justify-start transform -translate-y-2 group-hover:translate-y-0 transition-transform duration-300 ease-out">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full font-bold tracking-wide uppercase bg-white/95 text-[#1D4ED8] shadow-md border border-white/80 ${
              isCompact ? "px-2 py-0.5 text-[9px] sm:text-[10px]" : "px-2.5 py-1 text-[10px] sm:text-[11px]"
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#1D4ED8]" />
            <span>{item.tag}</span>
          </span>
        </div>

        {/* Bottom Details Content (Smooth slide-up on hover) */}
        <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 ease-out space-y-0.5">
          <h4
            className={`text-white font-bold leading-snug drop-shadow-md ${
              isCompact ? "text-[11px] sm:text-xs line-clamp-2" : "text-xs sm:text-sm line-clamp-1"
            }`}
          >
            {item.title}
          </h4>
          {!isCompact && (
            <p className="text-slate-200 text-[11px] sm:text-xs leading-tight line-clamp-2 drop-shadow-xs font-normal">
              {item.desc}
            </p>
          )}
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
        {/* ROW 1: TOP TRACK (Continuous Left to Right Movement) */}
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

        {/* ROW 2: BOTTOM TRACK (Continuous Right to Left Movement - different speed) */}
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
