"use client";

import React from "react";
import { motion } from "motion/react";
import { Folder, HeartHandshakeIcon, SparklesIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "react-responsive";

const DatabaseWithRestApi = ({
  className = "",
  circleText,
  badgeTexts,
  buttonTexts,
  title,
  lightColor,
}) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const containerHeight = isMobile ? "h-[150px]" : "h-[350px]";
  const containerMaxWidth = isMobile ? "max-w-[250px]" : "max-w-[500px]";
  const boxHeight = isMobile ? "h-[65px]" : "h-[150px]";
  const circleSizes = isMobile ? {
    first: "h-[45px] w-[45px]",
    second: "h-[65px] w-[65px]",
    third: "h-[85px] w-[85px]",
    fourth: "h-[105px] w-[105px]"
  } : {
    first: "h-[100px] w-[100px]",
    second: "h-[145px] w-[145px]",
    third: "h-[190px] w-[190px]",
    fourth: "h-[235px] w-[235px]"
  };
  const bottomPosition = isMobile ? "bottom-3" : "bottom-10";
  const shadowHeight = isMobile ? "h-[51px]" : "h-[120px]";

  return (
    <motion.div
      className={cn(
        "relative flex w-full flex-col items-center",
        containerHeight,
        containerMaxWidth,
        className
      )}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* SVG Paths */}
      <motion.svg
        className="h-full sm:w-full text-muted-foreground dark:text-white/30 light:text-black/50"
        width="100%"
        height="100%"
        viewBox="0 0 200 100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <g
          stroke="currentColor"
          fill="none"
          strokeWidth="0.6"
          strokeDasharray="100 100"
          pathLength="100"
          className="dark:drop-shadow-[0_0_8px_rgba(255,255,255,0.1)] light:drop-shadow-[0_0_4px_rgba(0,0,0,0.2)]"
        >
          <motion.path
            d="M 31 10 v 15 q 0 5 5 5 h 59 q 5 0 5 5 v 10"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
          />
          <motion.path
            d="M 77 10 v 10 q 0 5 5 5 h 13 q 5 0 5 5 v 10"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 0.7, ease: "easeInOut" }}
          />
          <motion.path
            d="M 124 10 v 10 q 0 5 -5 5 h -14 q -5 0 -5 5 v 10"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 0.9, ease: "easeInOut" }}
          />
          <motion.path
            d="M 170 10 v 15 q 0 5 -5 5 h -60 q -5 0 -5 5 v 10"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 1.1, ease: "easeInOut" }}
          />
        </g>
        {/* Blue Lights */}
        <g mask="url(#db-mask-1)">
          <motion.circle
            className="database db-light-1"
            cx="0"
            cy="0"
            r="12"
            fill="url(#db-blue-grad)"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
            style={{ filter: 'drop-shadow(0 0 10px rgba(0, 166, 245, 0.6))' }}
          />
        </g>
        <g mask="url(#db-mask-2)">
          <motion.circle
            className="database db-light-2"
            cx="0"
            cy="0"
            r="12"
            fill="url(#db-blue-grad)"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.7, duration: 0.5 }}
            style={{ filter: 'drop-shadow(0 0 10px rgba(0, 166, 245, 0.6))' }}
          />
        </g>
        <g mask="url(#db-mask-3)">
          <motion.circle
            className="database db-light-3"
            cx="0"
            cy="0"
            r="12"
            fill="url(#db-blue-grad)"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.9, duration: 0.5 }}
            style={{ filter: 'drop-shadow(0 0 10px rgba(0, 166, 245, 0.6))' }}
          />
        </g>
        <g mask="url(#db-mask-4)">
          <motion.circle
            className="database db-light-4"
            cx="0"
            cy="0"
            r="12"
            fill="url(#db-blue-grad)"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 2.1, duration: 0.5 }}
            style={{ filter: 'drop-shadow(0 0 10px rgba(0, 166, 245, 0.6))' }}
          />
        </g>
        {/* Buttons */}
        <g stroke="currentColor" fill="none" strokeWidth="0.4">
          {/* First Button */}
          <motion.g
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
            <rect
              fill="#18181B"
              x="14"
              y="5"
              width="34"
              height="10"
              rx="5"
              className="dark:shadow-lg dark:shadow-white/10 light:shadow-md light:shadow-black/20"
            ></rect>
            <DatabaseIcon x="18" y="7.5"></DatabaseIcon>
            <text
              x="28"
              y="12"
              fill="white"
              stroke="none"
              fontSize="5"
              fontWeight="500"
            >
              {badgeTexts?.first || "GET"}
            </text>
          </motion.g>
          {/* Second Button */}
          <motion.g
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
            <rect
              fill="#18181B"
              x="60"
              y="5"
              width="34"
              height="10"
              rx="5"
              className="dark:shadow-lg dark:shadow-white/10 light:shadow-md light:shadow-black/20"
            ></rect>
            <DatabaseIcon x="64" y="7.5"></DatabaseIcon>
            <text
              x="74"
              y="12"
              fill="white"
              stroke="none"
              fontSize="5"
              fontWeight="500"
            >
              {badgeTexts?.second || "POST"}
            </text>
          </motion.g>
          {/* Third Button */}
          <motion.g
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
            <rect
              fill="#18181B"
              x="108"
              y="5"
              width="34"
              height="10"
              rx="5"
              className="dark:shadow-lg dark:shadow-white/10 light:shadow-md light:shadow-black/20"
            ></rect>
            <DatabaseIcon x="112" y="7.5"></DatabaseIcon>
            <text
              x="122"
              y="12"
              fill="white"
              stroke="none"
              fontSize="5"
              fontWeight="500"
            >
              {badgeTexts?.third || "PUT"}
            </text>
          </motion.g>
          {/* Fourth Button */}
          <motion.g
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
            <rect
              fill="#18181B"
              x="150"
              y="5"
              width="40"
              height="10"
              rx="5"
              className="dark:shadow-lg dark:shadow-white/10 light:shadow-md light:shadow-black/20"
            ></rect>
            <DatabaseIcon x="154" y="7.5"></DatabaseIcon>
            <text
              x="165"
              y="12"
              fill="white"
              stroke="none"
              fontSize="5"
              fontWeight="500"
            >
              {badgeTexts?.fourth || "DELETE"}
            </text>
          </motion.g>
        </g>
        <defs>
          {/* 1 - user list */}
          <mask id="db-mask-1">
            <path
              d="M 31 10 v 15 q 0 5 5 5 h 59 q 5 0 5 5 v 10"
              strokeWidth="0.5"
              stroke="white"
            />
          </mask>
          {/* 2 - task list */}
          <mask id="db-mask-2">
            <path
              d="M 77 10 v 10 q 0 5 5 5 h 13 q 5 0 5 5 v 10"
              strokeWidth="0.5"
              stroke="white"
            />
          </mask>
          {/* 3 - backlogs */}
          <mask id="db-mask-3">
            <path
              d="M 124 10 v 10 q 0 5 -5 5 h -14 q -5 0 -5 5 v 10"
              strokeWidth="0.5"
              stroke="white"
            />
          </mask>
          {/* 4 - misc */}
          <mask id="db-mask-4">
            <path
              d="M 170 10 v 15 q 0 5 -5 5 h -60 q -5 0 -5 5 v 10"
              strokeWidth="0.5"
              stroke="white"
            />
          </mask>
          {/* Blue Grad */}
          <radialGradient id="db-blue-grad" fx="1">
            <stop offset="0%" stopColor={lightColor || "#00A6F5"} />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
      </motion.svg>
      {/* Main Box */}
      <div className={`absolute ${bottomPosition} flex w-full flex-col items-center`}>
        {/* bottom shadow */}
        <div className={`absolute -bottom-6 ${shadowHeight} w-[70%] rounded-lg bg-accent/20 dark:bg-accent/10 light:bg-black/10 blur-sm`} />
        {/* box title */}
        <motion.div
          className="absolute -top-3 z-20 flex items-center justify-center rounded-lg border bg-[#101112] dark:bg-black/80 light:bg-white/90 px-3 py-1.5 sm:-top-4 shadow-lg dark:shadow-white/10 light:shadow-black/20"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <SparklesIcon className="size-4 text-primary animate-pulse" />
          <span className="ml-2 text-[11px] font-semibold dark:text-white light:text-black">
            {title ? title : "Data exchange using a customized REST API"}
          </span>
        </motion.div>
        {/* box outter circle */}
        <motion.div
          className="absolute -bottom-8 z-30 grid h-[60px] w-[60px] place-items-center rounded-full border-2 bg-[#141516] dark:bg-black/90 light:bg-white/95 font-semibold text-xs shadow-xl dark:shadow-white/20 light:shadow-black/30"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="dark:text-white light:text-black">{circleText ? circleText : "SVG"}</span>
        </motion.div>
        {/* box content */}
        <motion.div
          className={`relative z-10 flex ${boxHeight} w-full items-center justify-center overflow-hidden rounded-lg border-2 bg-background dark:bg-black/50 light:bg-white/95 shadow-2xl dark:shadow-white/10 light:shadow-black/20`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
        >
          {/* Badges */}
          <motion.div
            className="absolute bottom-8 left-12 z-10 h-8 rounded-full bg-[#101112] dark:bg-black/80 light:bg-white/90 px-3 text-xs border-2 flex items-center gap-2 shadow-md dark:shadow-white/10 light:shadow-black/20"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.4, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
            <HeartHandshakeIcon className="size-4 text-primary" />
            <span className="dark:text-white light:text-black font-medium">{buttonTexts?.first || "LegionDev"}</span>
          </motion.div>
          <motion.div
            className="absolute right-16 z-10 hidden h-8 rounded-full bg-[#101112] dark:bg-black/80 light:bg-white/90 px-3 text-xs sm:flex border-2 items-center gap-2 shadow-md dark:shadow-white/10 light:shadow-black/20"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.6, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
            <Folder className="size-4 text-primary" />
            <span className="dark:text-white light:text-black font-medium">{buttonTexts?.second || "v2_updates"}</span>
          </motion.div>
          {/* Circles */}
          <motion.div
            className={`absolute -bottom-14 ${circleSizes.first} rounded-full border-2 bg-accent/10 dark:bg-accent/5 light:bg-primary/10`}
            animate={{
              rotate: [0, 360],
              scale: [0.98, 1.02, 0.98, 1, 1, 1, 1, 1, 1],
            }}
            transition={{
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              scale: { duration: 2, repeat: Infinity }
            }}
            style={{ borderColor: 'hsl(var(--primary))' }}
          />
          <motion.div
            className={`absolute -bottom-20 ${circleSizes.second} rounded-full border-2 bg-accent/10 dark:bg-accent/5 light:bg-primary/10`}
            animate={{
              rotate: [360, 0],
              scale: [1, 1, 1, 0.98, 1.02, 0.98, 1, 1, 1],
            }}
            transition={{
              rotate: { duration: 25, repeat: Infinity, ease: "linear" },
              scale: { duration: 2, repeat: Infinity }
            }}
            style={{ borderColor: 'hsl(var(--primary))' }}
          />
          <motion.div
            className={`absolute -bottom-[100px] ${circleSizes.third} rounded-full border-2 bg-accent/10 dark:bg-accent/5 light:bg-primary/10`}
            animate={{
              rotate: [0, -360],
              scale: [1, 1, 1, 1, 1, 0.98, 1.02, 0.98, 1, 1],
            }}
            transition={{
              rotate: { duration: 30, repeat: Infinity, ease: "linear" },
              scale: { duration: 2, repeat: Infinity }
            }}
            style={{ borderColor: 'hsl(var(--primary))' }}
          />
          <motion.div
            className={`absolute -bottom-[120px] ${circleSizes.fourth} rounded-full border-2 bg-accent/10 dark:bg-accent/5 light:bg-primary/10`}
            animate={{
              rotate: [360, 0],
              scale: [1, 1, 1, 1, 1, 1, 0.98, 1.02, 0.98, 1],
            }}
            transition={{
              rotate: { duration: 35, repeat: Infinity, ease: "linear" },
              scale: { duration: 2, repeat: Infinity }
            }}
            style={{ borderColor: 'hsl(var(--primary))' }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DatabaseWithRestApi;

const DatabaseIcon = ({ x = "0", y = "0" }) => {
  return (
    <svg
      x={x}
      y={y}
      xmlns="http://www.w3.org/2000/svg"
      width="5"
      height="5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5V19A9 3 0 0 0 21 19V5" />
      <path d="M3 12A9 3 0 0 0 21 12" />
    </svg>
  );
};
