const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, 'actions', 'offer-letter.js');

const newContent = `"use server";

import prisma from "@/lib/prisma";
import { sendNotificationEmail } from "@/lib/email-service";
import { jsPDF } from "jspdf";
import fs from "fs/promises";
import path from "path";

/**
 * Issues an offer letter using jsPDF — fully compatible with Vercel serverless.
 * The PDF is stored as a base64 data URL in the database since serverless
 * filesystems are read-only.
 */
export async function issueOfferLetter(applicationId) {
  try {
    // 1. Fetch the application with necessary relational data
    const application = await prisma.internshipApplication.findUnique({
      where: { id: applicationId },
      include: {
        user: { include: { college: true } },
        batch: { include: { program: true } },
      },
    });

    if (!application) {
      throw new Error("Application not found");
    }

    if (application.status !== "SELECTED") {
      throw new Error("Only SELECTED applications can be issued an Offer Letter.");
    }

    // 2. Prepare template variables
    const { user, batch } = application;
    const internName = user.name || "Student Name";
    const collegeName = user.college?.name || user.collegeName || "Your College";
    const studentId = user.techieId || "T-0000";
    const domain = batch.program?.domain || batch.program?.title || "AI Internship";
    const startDate = new Date(batch.startDate).toLocaleDateString("en-US", {
      month: "long", day: "numeric", year: "numeric"
    });
    const endDate = new Date(batch.endDate).toLocaleDateString("en-US", {
      month: "long", day: "numeric", year: "numeric"
    });
    const currentDate = new Date().toLocaleDateString("en-US", {
      month: "long", day: "numeric", year: "numeric"
    });
    const currentYear = new Date().getFullYear();
    const refId = \`TECHIE/INT/\${currentYear}/\${studentId}\`;

    const getStaticBase64 = async (filePath) => {
      try {
        const file = await fs.readFile(filePath);
        return \`data:image/png;base64,\${file.toString("base64")}\`;
      } catch (err) {
        return "";
      }
    };

    const imagesData = await Promise.all([
      getStaticBase64(path.join(process.cwd(), "public", "thp logo.png")),
      getStaticBase64(path.join(process.cwd(), "public", "EdgeCareers.png")),
      getStaticBase64(path.join(process.cwd(), "public", "seal.png")),
      getStaticBase64(path.join(process.cwd(), "public", "image (3).png")), // ISO
      getStaticBase64(path.join(process.cwd(), "public", "image (4).png")), // MSME
    ]);

    const images = {
      logo: imagesData[0],
      signature: imagesData[1],
      seal: imagesData[2],
      iso: imagesData[3],
      msme: imagesData[4],
    };

    // 3. Generate PDF with jsPDF (Exact 1-Page Match)
    const doc = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 35;
    const contentWidth = pageWidth - margin * 2;

    // Theme Colors exactly matching the image
    const colors = {
      navy: [15, 56, 104], // Deep navy blue
      gold: [194, 146, 54], // Desaturated gold/bronze
      textDark: [30, 41, 59], // Dark slate
      textLight: [100, 116, 139], // Slate
      bgCard: [248, 250, 252], // Very light blue/grey
      border: [203, 213, 225], // Slate 200
      bgGoldLight: [253, 251, 246] // Very pale gold for benefits
    };

    // Helper: Draw Icon (Geometric)
    const drawIcon = (type, x, y, size, color) => {
      doc.setFillColor(color[0], color[1], color[2]);
      doc.setDrawColor(color[0], color[1], color[2]);
      doc.setLineWidth(1);

      if (type === 'phone') {
        doc.circle(x, y, size, 'F');
        doc.setFillColor(255, 255, 255);
        doc.circle(x, y, size - 1, 'F');
        // phone receiver shape
        doc.setFillColor(color[0], color[1], color[2]);
        doc.roundedRect(x - 2.5, y - 4, 5, 8, 1, 1, 'F');
      } else if (type === 'location') {
        doc.circle(x, y - 1, size, 'F');
        doc.setFillColor(255, 255, 255);
        doc.circle(x, y - 1.5, size - 2, 'F');
        doc.setFillColor(color[0], color[1], color[2]);
        doc.triangle(x - size + 1, y + 1, x + size - 1, y + 1, x, y + size + 2, 'F');
        doc.circle(x, y - 2, 2, 'F');
      } else if (type === 'email') {
        doc.circle(x, y, size, 'F');
        doc.setFillColor(255, 255, 255);
        doc.circle(x, y, size - 1, 'F');
        doc.setDrawColor(color[0], color[1], color[2]);
        doc.rect(x - size + 3, y - size + 4, (size-3)*2, (size-4)*2);
        doc.line(x - size + 3, y - size + 4, x, y);
        doc.line(x + size - 3, y - size + 4, x, y);
      } else if (type === 'globe') {
        doc.circle(x, y, size, 'F');
        doc.setFillColor(255, 255, 255);
        doc.circle(x, y, size - 1, 'F');
        doc.setDrawColor(color[0], color[1], color[2]);
        doc.setLineWidth(0.5);
        doc.ellipse(x, y, size - 3, size - 1);
        doc.line(x - size + 1, y, x + size - 1, y);
        doc.line(x, y - size + 1, x, y + size - 1);
      } else if (type === 'briefcase') {
        doc.roundedRect(x - 6, y - 4, 12, 9, 1, 1, 'S');
        doc.rect(x - 2, y - 6, 4, 2, 'S');
        doc.line(x - 6, y, x + 6, y);
        doc.circle(x, y, 1.5, 'F');
      } else if (type === 'monitor') {
        doc.roundedRect(x - 7, y - 5, 14, 9, 1, 1, 'S');
        doc.rect(x - 3, y + 4, 6, 2, 'F');
        doc.line(x - 5, y + 6, x + 5, y + 6);
      } else if (type === 'building') {
        doc.rect(x - 5, y - 6, 10, 12, 'S');
        doc.rect(x - 2, y + 2, 4, 4, 'S');
        doc.rect(x - 3, y - 4, 2, 2, 'F');
        doc.rect(x + 1, y - 4, 2, 2, 'F');
        doc.rect(x - 3, y - 1, 2, 2, 'F');
        doc.rect(x + 1, y - 1, 2, 2, 'F');
      } else if (type === 'cap') {
        doc.triangle(x - 6, y - 1, x + 6, y - 1, x, y - 4, 'F');
        doc.rect(x - 4, y - 1, 8, 4, 'F');
        doc.line(x + 6, y - 1, x + 6, y + 3);
      } else if (type === 'calendar') {
        doc.roundedRect(x - 6, y - 6, 12, 12, 1, 1, 'S');
        doc.line(x - 6, y - 2, x + 6, y - 2);
        doc.rect(x - 3, y - 8, 2, 3, 'F');
        doc.rect(x + 1, y - 8, 2, 3, 'F');
        doc.rect(x - 4, y + 1, 2, 2, 'F');
        doc.rect(x - 1, y + 1, 2, 2, 'F');
        doc.rect(x + 2, y + 1, 2, 2, 'F');
      } else if (type === 'rupee') {
        doc.circle(x, y, 7, 'S');
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        doc.text("₹", x - 2.5, y + 3); 
      } else if (type === 'user') {
        doc.circle(x, y - 3, 3, 'S');
        doc.path([
          {op: 'm', c: [x - 5, y + 6]},
          {op: 'c', c: [x - 5, y + 1, x + 5, y + 1, x + 5, y + 6]}
        ]);
        doc.stroke();
      }
    };

    // ─── 1. TOP BAR ───
    doc.setFillColor(colors.navy[0], colors.navy[1], colors.navy[2]);
    doc.rect(0, 0, pageWidth, 12, "F");

    // ─── 2. HEADER ───
    if (images.logo) {
      doc.addImage(images.logo, "PNG", margin - 10, 25, 120, 60, "", "MEDIUM");
    }
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(colors.navy[0], colors.navy[1], colors.navy[2]);
    doc.text("Learn • Build • Grow", margin + 35, 80);

    // Contact Info (Right)
    const rightX = pageWidth - margin;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(colors.textDark[0], colors.textDark[1], colors.textDark[2]);

    drawIcon('phone', rightX - 145, 30, 5, colors.gold);
    doc.text("+91-7073130165", rightX - 135, 33);
    
    drawIcon('location', rightX - 145, 45, 5, colors.gold);
    doc.text("Vivek Vihar Yojana Sector 14", rightX - 135, 45);
    doc.text("Block D Room 31", rightX - 135, 54);

    drawIcon('email', rightX - 145, 68, 5, colors.gold);
    doc.text("techiehelpinstituteofai@gmail.com", rightX - 135, 71);

    drawIcon('globe', rightX - 145, 83, 5, colors.gold);
    doc.text("techiehelpinstituteofai.in", rightX - 135, 86);

    // ─── 3. DIVIDER ───
    doc.setFillColor(colors.navy[0], colors.navy[1], colors.navy[2]);
    doc.path([
      {op: 'm', c: [0, 105]},
      {op: 'l', c: [pageWidth * 0.4, 105]},
      {op: 'c', c: [pageWidth * 0.45, 105, pageWidth * 0.48, 115, pageWidth * 0.5, 115]},
      {op: 'l', c: [0, 115]}
    ]);
    doc.fill();
    
    doc.setFillColor(colors.gold[0], colors.gold[1], colors.gold[2]);
    doc.rect(pageWidth * 0.5, 112, pageWidth * 0.5, 3, "F");

    // ─── 4. TITLE ───
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor(colors.navy[0], colors.navy[1], colors.navy[2]);
    const title = "INTERNSHIP OFFER LETTER";
    doc.text(title, pageWidth / 2, 140, { align: "center" });
    
    // REPLACED STAR WITH GOLD LINE
    doc.setDrawColor(colors.gold[0], colors.gold[1], colors.gold[2]);
    doc.setLineWidth(1.5);
    doc.line(pageWidth / 2 - 80, 145, pageWidth / 2 + 80, 145);

    // ─── 5. META INFO ───
    let y = 175;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(colors.textDark[0], colors.textDark[1], colors.textDark[2]);
    doc.text(\`Ref ID: \${refId}\`, margin, y);
    doc.text(\`Date: \${currentDate}\`, rightX, y, { align: "right" });

    y += 20;
    doc.text("To,", margin, y);
    y += 12;
    doc.text(internName, margin, y);
    
    y += 15;
    doc.setTextColor(colors.gold[0], colors.gold[1], colors.gold[2]);
    doc.text("Subject:", margin, y);
    doc.setTextColor(colors.textDark[0], colors.textDark[1], colors.textDark[2]);
    doc.text(\` Internship Offer – \${domain} Intern\`, margin + doc.getTextWidth("Subject:"), y);

    y += 20;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.text(\`Dear \${internName},\`, margin, y);
    y += 12;
    doc.text(\`Congratulations on being selected as a \${domain} Intern at TechieHelp Institute of AI.\`, margin, y);
    
    y += 15;
    const introLines = doc.splitTextToSize(
      "This internship will provide you with real-world exposure, structured learning, and hands-on experience aligned with industry standards. You will work on live projects and gain practical knowledge to enhance your career readiness.", 
      contentWidth
    );
    doc.text(introLines, margin, y);
    y += introLines.length * 10 + 10;

    // ─── 6. INFO GRID (Horizontal Layout) ───
    doc.setDrawColor(colors.border[0], colors.border[1], colors.border[2]);
    doc.setLineWidth(0.5);
    doc.roundedRect(margin, y, contentWidth, 75, 4, 4, "S");

    const col1 = margin + 15;
    const col2 = margin + contentWidth / 2;

    const drawInfoItem = (icon, lbl, val, ix, iy) => {
      drawIcon(icon, ix + 5, iy + 6, 0, colors.navy);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(7.5);
      doc.setTextColor(colors.textDark[0], colors.textDark[1], colors.textDark[2]);
      
      const lblStr = \`\${lbl} : \`;
      doc.text(lblStr, ix + 25, iy + 9);
      
      const lblWidth = doc.getTextWidth(lblStr);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(colors.textLight[0], colors.textLight[1], colors.textLight[2]);
      doc.text(val, ix + 25 + lblWidth, iy + 9);
    };

    drawInfoItem('briefcase', 'Position', \`\${domain} Intern\`, col1, y + 5);
    drawInfoItem('monitor', 'Work Mode', 'Remote / Online', col1, y + 25);
    drawInfoItem('building', 'Department', 'Technology & Development', col1, y + 45);
    drawInfoItem('cap', 'College / University', collegeName.substring(0, 35), col1, y + 65);

    drawInfoItem('calendar', 'Duration', \`\${startDate} – \${endDate}\`, col2, y + 5);
    drawInfoItem('rupee', 'Stipend', 'Performance-Based', col2, y + 25);
    drawInfoItem('user', 'Reporting Mentor', 'Er. Aditya Kumar', col2, y + 45);

    y += 90;

    // ─── 7. 2x2 SECTIONS ───
    const sWidth = (contentWidth / 2) - 15;
    
    const drawSection = (icon, title, items, sx, sy) => {
      doc.setDrawColor(colors.gold[0], colors.gold[1], colors.gold[2]);
      doc.setFillColor(colors.gold[0], colors.gold[1], colors.gold[2]);
      if(icon==='rocket'){
        doc.triangle(sx+4, sy, sx+1, sy+7, sx+7, sy+7, 'S');
      } else if(icon==='clipboard') {
        doc.rect(sx+1, sy+1, 6, 8, 'S'); doc.rect(sx+3, sy, 2, 2, 'S');
      } else if(icon==='people') {
        doc.circle(sx+3, sy+2, 1.5, 'S'); doc.circle(sx+7, sy+2, 1.5, 'S');
      } else {
        doc.line(sx, sy+2, sx+8, sy+2); doc.triangle(sx+4, sy, sx+3, sy+3, sx+5, sy+3, 'S');
      }

      doc.setFont("helvetica", "bold");
      doc.setFontSize(7.5);
      doc.setTextColor(colors.navy[0], colors.navy[1], colors.navy[2]);
      doc.text(title, sx + 15, sy + 7);
      
      let cy = sy + 18;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(7);
      doc.setTextColor(colors.textDark[0], colors.textDark[1], colors.textDark[2]);
      
      for(const item of items) {
        doc.setFillColor(colors.gold[0], colors.gold[1], colors.gold[2]);
        doc.circle(sx + 3, cy - 2, 1.5, "F");
        const lines = doc.splitTextToSize(item, sWidth - 10);
        doc.text(lines, sx + 10, cy);
        cy += lines.length * 9 + 2;
      }
    };

    drawSection('rocket', 'ONBOARDING & COMMUNICATION', [
      "You will receive onboarding instructions before the start date.",
      "Access to the dashboard, assigned tasks, and internal communication channels will be provided.",
      "All updates will be officially managed through Email, WhatsApp, and the portal Dashboard.",
      "Regular reporting and task submissions are strictly mandatory."
    ], margin, y);

    drawSection('people', 'WORKING CULTURE', [
      "We offer a flexible and growth-oriented work environment.",
      "Strong focus on continuous learning and practical exposure.",
      "Collaboration, innovation, and accountability are highly encouraged.",
      "Balanced approach: 70% project work + 30% structured learning."
    ], margin + contentWidth/2 + 5, y);

    y += 65;

    drawSection('clipboard', 'ROLES & RESPONSIBILITIES', [
      "Work proactively on real-world projects replicating client needs.",
      "Complete assigned tasks within given deadlines.",
      "Participate iteratively in technical discussions and code evaluations.",
      "Maintain absolute professionalism and responsive communication."
    ], margin, y);

    drawSection('scales', 'TERMS, CONDITIONS & LEGAL CLAUSES', [
      "This internship is primarily learning-focused.",
      "A predefined probation period may apply based on early performance metrics.",
      "Interns must adhere firmly to timelines and maintain organizational discipline.",
      "Notice period: 15 days written intimation before exiting.",
      "Any form of documented misconduct or plagiarism may result in immediate termination.",
      "All technical work and documentation produced is the exclusive intellectual property of TechieHelp."
    ], margin + contentWidth/2 + 5, y);

    y += 85;

    // ─── 8. BENEFITS ───
    doc.setDrawColor(colors.gold[0], colors.gold[1], colors.gold[2]);
    doc.setFillColor(colors.bgGoldLight[0], colors.bgGoldLight[1], colors.bgGoldLight[2]);
    doc.roundedRect(margin, y - 5, contentWidth, 45, 4, 4, "FD");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(colors.navy[0], colors.navy[1], colors.navy[2]);
    // REPLACED STAR IN BENEFITS WITH NORMAL ICON OR TEXT ONLY
    // Since user asked to remove star under title, I'll keep the star here as it was part of the original design, but I'll draw it.
    const drawSmallStar = (x, y) => {
      doc.triangle(x, y - 4, x - 3, y + 3, x + 3, y + 3, 'F');
      doc.triangle(x, y + 5, x - 4, y - 2, x + 4, y - 2, 'F');
    }
    doc.setFillColor(colors.gold[0], colors.gold[1], colors.gold[2]);
    drawSmallStar(margin + 25, y + 10);
    
    doc.text("BENEFITS", margin + 12, y + 25);
    
    doc.setDrawColor(colors.border[0], colors.border[1], colors.border[2]);
    doc.line(margin + 50, y, margin + 50, y + 35);

    const benefits = [
      ["Official Verified", "Internship Certificate"],
      ["Letter of", "Recommendation"],
      ["Direct Mentorship", "from seasoned devs"],
      ["Verified real-world", "project experience"],
      ["PPO Opportunity", "based on performance"]
    ];

    const bStep = (contentWidth - 60) / 5;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(6.5);
    doc.setTextColor(colors.textDark[0], colors.textDark[1], colors.textDark[2]);
    
    for(let i=0; i<benefits.length; i++){
      const bx = margin + 55 + (i * bStep) + (bStep/2);
      doc.setFillColor(colors.navy[0], colors.navy[1], colors.navy[2]);
      doc.rect(bx - 6, y + 3, 12, 10, "F");
      doc.setFillColor(255, 255, 255);
      doc.rect(bx - 3, y + 6, 6, 4, "F");
      
      doc.text(benefits[i][0], bx, y + 23, {align:"center"});
      doc.text(benefits[i][1], bx, y + 31, {align:"center"});
      
      if(i < benefits.length - 1) {
        doc.setDrawColor(colors.border[0], colors.border[1], colors.border[2]);
        doc.line(margin + 55 + ((i+1)*bStep), y + 5, margin + 55 + ((i+1)*bStep), y + 30);
      }
    }

    y += 45;

    // ─── 9. ACCEPTANCE OF OFFER ───
    doc.setFillColor(colors.navy[0], colors.navy[1], colors.navy[2]);
    doc.roundedRect(margin, y, contentWidth, 18, 4, 4, "F");
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(255, 255, 255);
    const hx = pageWidth/2 - 70;
    doc.setFillColor(255, 255, 255);
    doc.rect(hx, y + 5, 6, 4, "F"); doc.rect(hx+8, y+7, 6, 4, "F");
    
    doc.text("ACCEPTANCE OF OFFER", pageWidth/2, y + 13, { align: "center" });

    y += 18;
    doc.setDrawColor(colors.border[0], colors.border[1], colors.border[2]);
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(margin, y - 4, contentWidth, 90, 4, 4, "S");
    
    y += 10;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(colors.textDark[0], colors.textDark[1], colors.textDark[2]);
    
    doc.text("I, _____________________________________________, hereby acknowledge that I have read and understood the terms and", margin + 10, y);
    doc.text("conditions, roles and responsibilities, and other details mentioned in this Internship Offer Letter cum Job Description", margin + 10, y + 12);
    doc.text("issued by TechieHelp Institute of AI. I voluntarily accept the position and agree to perform my duties with professionalism,", margin + 10, y + 24);
    doc.text("integrity, and dedication throughout the internship period.", margin + 10, y + 36);

    y += 55;
    doc.setFont("helvetica", "bold");
    doc.text("Name of Intern: _________________________", margin + 10, y);
    doc.text("College/University: _________________________", pageWidth/2, y);
    
    y += 20;
    doc.text("Signature of Intern: ______________________", margin + 10, y);
    doc.text("Date: ______/______/______", pageWidth/2, y);
    doc.text("Place: _________________", pageWidth/2 + 120, y);

    y += 35;

    // ─── 10. FOOTER ───
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(colors.textDark[0], colors.textDark[1], colors.textDark[2]);
    doc.text("We look forward to supporting your growth", margin, y);
    doc.text("throughout this internship.", margin, y + 10);
    doc.text("Wishing you success in your journey.", margin, y + 20);

    // Signature Area CENTERED
    const sigX = pageWidth / 2;
    if (images.signature) {
      doc.addImage(images.signature, "PNG", sigX - 35, y - 10, 70, 35, "", "SLOW");
    }
    
    // Founder Name and Line
    doc.setDrawColor(colors.textDark[0], colors.textDark[1], colors.textDark[2]);
    doc.setLineWidth(0.5);
    doc.line(sigX - 40, y + 25, sigX + 40, y + 25);
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.text("Er. Amit Kumar", sigX, y + 35, {align:"center"});
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.text("Founder & CEO", sigX, y + 45, {align:"center"});
    doc.text("TechieHelp Institute of AI", sigX, y + 55, {align:"center"});

    // Place ISO, MSME and Seal Logos at the right
    const logoY = y + 5;
    if(images.iso) {
      doc.addImage(images.iso, "PNG", rightX - 120, logoY, 40, 40, "", "SLOW");
    }
    if(images.msme) {
      doc.addImage(images.msme, "PNG", rightX - 75, logoY + 5, 45, 30, "", "SLOW");
    }
    if(images.seal) {
      doc.addImage(images.seal, "PNG", rightX - 30, logoY + 5, 35, 35, "", "SLOW");
    }

    // ─── 11. BOTTOM BAR ───
    const fY = pageHeight - 20;
    doc.setFillColor(colors.navy[0], colors.navy[1], colors.navy[2]);
    doc.rect(0, fY, pageWidth, 20, "F");
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(255, 255, 255);
    doc.text("techiehelpinstituteofai.in", margin + 10, fY + 12);
    doc.text("techiehelpinstituteofai@gmail.com", margin + 110, fY + 12);
    
    // Social icons mock
    const smX = margin + 250;
    doc.setFillColor(0, 119, 181); doc.circle(smX, fY+10, 4, "F"); // LI
    doc.setFillColor(225, 48, 108); doc.circle(smX+15, fY+10, 4, "F"); // Insta
    doc.setFillColor(255, 0, 0); doc.circle(smX+30, fY+10, 4, "F"); // YT
    
    doc.text(\`© \${currentYear} TechieHelp Institute of AI. All Rights Reserved.\`, rightX - 180, fY + 12);

    // 4. Export PDF as base64 data URL
    const pdfBase64 = doc.output("datauristring");

    // 5. Upsert DB record with data URL
    const offerLetterRecord = await prisma.offerLetter.upsert({
      where: { applicationId: application.id },
      update: {
        pdfUrl: pdfBase64,
        validUntil: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 days
      },
      create: {
        applicationId: application.id,
        pdfUrl: pdfBase64,
        validUntil: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
      },
    });

    // 6. Send email (PDF as attachment buffer)
    const pdfBuffer = Buffer.from(doc.output("arraybuffer"));
    const emailBody = \`
      <p>Hi \${internName},</p>
      <p>Congratulations! You have been selected for the internship at TechieHelp Institute of AI as a <strong>\${domain}</strong> Intern.</p>
      <p>Your personalized official offer letter is attached to this email as a PDF.</p>
      <p>Please review the terms and start your placement journey with us.</p>
      <p>Best Regards,<br>Amit Kumar<br>Founder & CEO, TechieHelp</p>
    \`;

    let emailSent = false;
    if (user.email) {
      sendNotificationEmail({
        to: user.email,
        subject: "🎉 Internship Offer Letter - TechieHelp",
        username: internName,
        message: emailBody,
        buttonText: "View Dashboard",
        buttonLink: "https://techiehelpinstituteofai.in/dashboard",
        attachments: [
          {
            filename: "offer-letter.pdf",
            content: pdfBuffer,
            contentType: "application/pdf",
          },
        ],
      }).then(res => { emailSent = res; }).catch(err => {
        console.warn("Email send failed (non-fatal):", err.message);
      });
    }

    return {
      success: true,
      message: "Offer letter generated successfully",
      offerLetter: { ...offerLetterRecord, pdfUrl: "[base64-stored]" },
      emailSent,
    };
  } catch (error) {
    console.error("Issue Offer Letter Error:", error);
    throw new Error(error.message || "Failed to issue offer letter.");
  }
}

/**
 * Fetches only the pdfUrl for a specific application's offer letter.
 */
export async function getMyOfferLetterPdf(applicationId) {
  const record = await prisma.offerLetter.findUnique({
    where: { applicationId },
    select: { pdfUrl: true, generatedAt: true, validUntil: true },
  });
  return record;
}
`;

fs.writeFileSync(targetPath, newContent, 'utf8');
console.log('actions/offer-letter.js has been restored to the exact-match format with the requested user tweaks.');
