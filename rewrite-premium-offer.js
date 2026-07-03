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

    // 3. Generate PDF with jsPDF (Premium Corporate A4)
    const doc = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 35;
    const contentWidth = pageWidth - margin * 2;

    // Theme Colors
    const colors = {
      navy: [11, 61, 145], // Navy Blue #0B3D91
      gold: [244, 180, 0], // Gold #F4B400
      textDark: [33, 37, 41], // Slate dark
      textLight: [73, 80, 87], // Slate gray
      bgLightBlue: [248, 250, 252], // Very light blue for highlight card
      bgCard: [255, 255, 255], 
      border: [203, 213, 225], 
    };

    // Helper: Draw Icon
    const drawIcon = (type, x, y, size, color) => {
      doc.setFillColor(color[0], color[1], color[2]);
      doc.setDrawColor(color[0], color[1], color[2]);
      doc.setLineWidth(1);

      if (type === 'phone') {
        doc.circle(x, y, size, 'F');
        doc.setFillColor(255, 255, 255);
        doc.circle(x, y, size - 1, 'F');
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
      } else if (type === 'check') {
        doc.setLineWidth(1.5);
        doc.path([
          {op: 'm', c: [x-4, y]},
          {op: 'l', c: [x-1, y+3]},
          {op: 'l', c: [x+4, y-4]}
        ]);
        doc.stroke();
      }
    };

    // ─── 1. TOP BAR ───
    doc.setFillColor(colors.navy[0], colors.navy[1], colors.navy[2]);
    doc.rect(0, 0, pageWidth, 12, "F");

    // ─── 2. HEADER ───
    if (images.logo) {
      // Scaled up by ~25%
      doc.addImage(images.logo, "PNG", margin - 15, 20, 150, 75, "", "MEDIUM");
    }
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(colors.navy[0], colors.navy[1], colors.navy[2]);
    doc.text("Learn • Build • Grow", margin + 35, 90);

    // Contact Info (Right) perfectly aligned
    const rightX = pageWidth - margin;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(colors.textDark[0], colors.textDark[1], colors.textDark[2]);

    drawIcon('phone', rightX - 165, 30, 5, colors.gold);
    doc.text("+91-7073130165", rightX - 152, 33);
    
    drawIcon('location', rightX - 165, 48, 5, colors.gold);
    doc.text("Vivek Vihar Yojana Sector 14", rightX - 152, 48);
    doc.text("Block D Room 31", rightX - 152, 59);

    drawIcon('email', rightX - 165, 75, 5, colors.gold);
    doc.text("techiehelpinstituteofai@gmail.com", rightX - 152, 78);

    drawIcon('globe', rightX - 165, 93, 5, colors.gold);
    doc.text("techiehelpinstituteofai.in", rightX - 152, 96);

    // ─── 3. DIVIDER ───
    doc.setFillColor(colors.navy[0], colors.navy[1], colors.navy[2]);
    doc.path([
      {op: 'm', c: [0, 115]},
      {op: 'l', c: [pageWidth * 0.4, 115]},
      {op: 'c', c: [pageWidth * 0.45, 115, pageWidth * 0.48, 125, pageWidth * 0.5, 125]},
      {op: 'l', c: [0, 125]}
    ]);
    doc.fill();
    doc.setFillColor(colors.gold[0], colors.gold[1], colors.gold[2]);
    doc.rect(pageWidth * 0.5, 122, pageWidth * 0.5, 3, "F");

    // ─── 4. TITLE ───
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22); // Increased Typography
    doc.setTextColor(colors.navy[0], colors.navy[1], colors.navy[2]);
    doc.text("INTERNSHIP OFFER LETTER", pageWidth / 2, 160, { align: "center" });
    
    doc.setDrawColor(colors.gold[0], colors.gold[1], colors.gold[2]);
    doc.setLineWidth(1.5);
    doc.line(pageWidth / 2 - 100, 168, pageWidth / 2 + 100, 168);

    // ─── 5. META INFO ───
    let y = 195;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(colors.textDark[0], colors.textDark[1], colors.textDark[2]);
    doc.text(\`Ref ID: \${refId}\`, margin, y);
    doc.text(\`Date: \${currentDate}\`, rightX, y, { align: "right" });

    y += 20;

    // ─── 6. PREMIUM HIGHLIGHT CARD (Student Name) ───
    doc.setFillColor(colors.bgLightBlue[0], colors.bgLightBlue[1], colors.bgLightBlue[2]);
    doc.setDrawColor(colors.navy[0], colors.navy[1], colors.navy[2]);
    doc.setLineWidth(1);
    doc.roundedRect(margin, y, contentWidth, 75, 6, 6, "FD");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(colors.navy[0], colors.navy[1], colors.navy[2]);
    doc.text("INTERN NAME", margin + 15, y + 25);
    
    doc.setFontSize(17);
    doc.setTextColor(colors.textDark[0], colors.textDark[1], colors.textDark[2]);
    doc.text(internName.toUpperCase(), margin + 15, y + 45);
    
    doc.setFontSize(9);
    doc.setTextColor(colors.gold[0], colors.gold[1], colors.gold[2]);
    doc.text("SELECTED AS", pageWidth / 2 + 30, y + 25);
    doc.setFontSize(13);
    doc.setTextColor(colors.textDark[0], colors.textDark[1], colors.textDark[2]);
    doc.text(\`\${domain.toUpperCase()} INTERN\`, pageWidth / 2 + 30, y + 43);

    doc.setFontSize(9.5);
    doc.setTextColor(colors.textLight[0], colors.textLight[1], colors.textLight[2]);
    doc.text(\`🎉 Congratulations! You have been selected for the \${domain} \${currentYear} Batch.\`, margin + 15, y + 62);

    y += 90;

    // ─── 7. HORIZONTAL INFORMATION GRID ───
    // Using horizontal Layout: "Label : Value"
    const gridCols = [margin, pageWidth / 2];
    let gy = y;

    const drawGridItem = (emoji, label, value, x, y) => {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9.5);
      doc.setTextColor(colors.navy[0], colors.navy[1], colors.navy[2]);
      doc.text(\`\${emoji} \${label}\`, x, y);
      
      const labelWidth = doc.getTextWidth(\`\${emoji} \${label} : \`);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(colors.textDark[0], colors.textDark[1], colors.textDark[2]);
      // Handle long college names
      const valLines = doc.splitTextToSize(value, (contentWidth/2) - labelWidth - 10);
      doc.text(valLines, x + labelWidth, y);
      return valLines.length; // return lines taken to adjust layout if needed
    };

    drawGridItem("💼", "Position", \`\${domain} Intern\`, gridCols[0], gy);
    drawGridItem("📅", "Duration", \`\${startDate} – \${endDate}\`, gridCols[1], gy);
    gy += 18;
    drawGridItem("💻", "Work Mode", "Remote / Online", gridCols[0], gy);
    drawGridItem("💰", "Stipend", "Performance-Based", gridCols[1], gy);
    gy += 18;
    drawGridItem("🏢", "Department", "Technology & Dev", gridCols[0], gy);
    drawGridItem("👨‍🏫", "Reporting Mentor", "Er. Aditya Kumar", gridCols[1], gy);
    gy += 18;
    let clines = drawGridItem("🎓", "College", collegeName, gridCols[0], gy);
    
    y = gy + (clines * 10) + 15;

    // ─── 8. BODY SECTIONS (Compressed into 2x2 grid to save space) ───
    const sWidth = (contentWidth / 2) - 15;
    const drawSection = (title, items, sx, sy) => {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(colors.navy[0], colors.navy[1], colors.navy[2]);
      doc.text(title, sx, sy + 7);
      
      doc.setDrawColor(colors.gold[0], colors.gold[1], colors.gold[2]);
      doc.setLineWidth(1);
      doc.line(sx, sy + 11, sx + 50, sy + 11);

      let cy = sy + 22;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5); // Body text 8.5 to ensure it fits
      doc.setTextColor(colors.textDark[0], colors.textDark[1], colors.textDark[2]);
      
      for(const item of items) {
        doc.setFillColor(colors.gold[0], colors.gold[1], colors.gold[2]);
        doc.circle(sx + 3, cy - 3, 1.5, "F");
        const lines = doc.splitTextToSize(item, sWidth - 10);
        doc.text(lines, sx + 10, cy);
        cy += lines.length * 10 + 2;
      }
    };

    drawSection('ONBOARDING', [
      "Instructions provided before the start date.",
      "Access to portal, assigned tasks, and internal channels.",
      "Updates managed via Email, WhatsApp, and Dashboard.",
      "Reporting and task submissions are mandatory."
    ], margin, y);

    drawSection('WORKING CULTURE', [
      "Flexible and growth-oriented remote work environment.",
      "Focus on continuous learning and practical exposure.",
      "Collaboration, innovation, and accountability encouraged.",
      "Balanced: 70% project work + 30% structured learning."
    ], margin + contentWidth/2 + 5, y);

    y += 75;

    drawSection('ROLES & RESPONSIBILITIES', [
      "Work proactively on real-world client projects.",
      "Complete tasks within deadlines iteratively.",
      "Participate in technical discussions and code reviews.",
      "Maintain absolute professionalism and responsiveness."
    ], margin, y);

    drawSection('TERMS & CLAUSES', [
      "This internship is learning-focused. Probation may apply.",
      "Must adhere strictly to organizational discipline.",
      "Notice period: 15 days written intimation before exiting.",
      "Misconduct/plagiarism results in immediate termination.",
      "Technical work produced is exclusive IP of TechieHelp."
    ], margin + contentWidth/2 + 5, y);

    y += 85;

    // ─── 9. PREMIUM BENEFITS CARDS ───
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(colors.navy[0], colors.navy[1], colors.navy[2]);
    doc.text("BENEFITS", margin, y);
    doc.setDrawColor(colors.gold[0], colors.gold[1], colors.gold[2]);
    doc.setLineWidth(1);
    doc.line(margin, y + 4, margin + 50, y + 4);
    
    y += 15;
    
    const benefits = [
      ["Certificate", "Industry Recognized"],
      ["Recommendation", "Performance Based"],
      ["Direct Mentor", "Industry Experts"],
      ["Live Projects", "Real-world Work"],
      ["PPO Opportunity", "Top Performers"]
    ];

    const bStep = contentWidth / 5;
    
    for(let i=0; i<benefits.length; i++){
      const bx = margin + (i * bStep);
      
      doc.setDrawColor(colors.border[0], colors.border[1], colors.border[2]);
      doc.setFillColor(colors.bgLightBlue[0], colors.bgLightBlue[1], colors.bgLightBlue[2]);
      doc.roundedRect(bx, y, bStep - 6, 35, 4, 4, "FD");
      
      drawIcon('check', bx + (bStep-6)/2, y + 10, 0, colors.gold);
      
      doc.setFont("helvetica", "bold");
      doc.setFontSize(7.5);
      doc.setTextColor(colors.navy[0], colors.navy[1], colors.navy[2]);
      doc.text(benefits[i][0], bx + (bStep-6)/2, y + 23, {align:"center"});
      
      doc.setFont("helvetica", "normal");
      doc.setFontSize(6.5);
      doc.setTextColor(colors.textLight[0], colors.textLight[1], colors.textLight[2]);
      doc.text(benefits[i][1], bx + (bStep-6)/2, y + 31, {align:"center"});
    }

    y += 50;

    // ─── 10. ACCEPTANCE OF OFFER ───
    doc.setFillColor(colors.navy[0], colors.navy[1], colors.navy[2]);
    doc.roundedRect(margin, y, contentWidth, 20, 4, 4, "F");
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(255, 255, 255);
    doc.text("ACCEPTANCE OF OFFER", pageWidth/2, y + 14, { align: "center" });

    y += 20;
    doc.setDrawColor(colors.border[0], colors.border[1], colors.border[2]);
    doc.roundedRect(margin, y - 4, contentWidth, 85, 4, 4, "S");
    
    y += 12;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(colors.textDark[0], colors.textDark[1], colors.textDark[2]);
    
    doc.text("I hereby acknowledge that I have read and understood the terms, conditions, roles, and responsibilities mentioned", margin + 10, y);
    doc.text("in this Internship Offer Letter. I voluntarily accept the position and agree to perform my duties with", margin + 10, y + 12);
    doc.text("professionalism, integrity, and dedication throughout the internship period.", margin + 10, y + 24);

    y += 45;
    doc.setFont("helvetica", "bold");
    
    const drawLine = (lx, lw) => {
      doc.setDrawColor(150, 150, 150);
      doc.setLineWidth(0.5);
      doc.line(lx, y+2, lx+lw, y+2);
    };

    doc.text("Name:", margin + 10, y);
    drawLine(margin + 45, 120);
    
    doc.text("College:", pageWidth/2 - 20, y);
    drawLine(pageWidth/2 + 25, 120);
    
    y += 20;
    doc.text("Signature:", margin + 10, y);
    drawLine(margin + 60, 105);
    
    doc.text("Date:", pageWidth/2 - 20, y);
    drawLine(pageWidth/2 + 5, 40);
    
    doc.text("Place:", pageWidth/2 + 60, y);
    drawLine(pageWidth/2 + 95, 50);

    y += 35;

    // ─── 11. FOOTER ───
    // Left: Thank you message
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(colors.navy[0], colors.navy[1], colors.navy[2]);
    doc.text("We look forward to supporting", margin, y);
    doc.text("your growth journey.", margin, y + 12);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(colors.textLight[0], colors.textLight[1], colors.textLight[2]);
    doc.text("Wishing you immense success.", margin, y + 24);

    // Center: Signature & Founder
    const sigX = pageWidth / 2;
    if (images.signature) {
      doc.addImage(images.signature, "PNG", sigX - 35, y - 10, 70, 35, "", "SLOW");
    }
    
    doc.setDrawColor(colors.textDark[0], colors.textDark[1], colors.textDark[2]);
    doc.setLineWidth(0.5);
    doc.line(sigX - 50, y + 25, sigX + 50, y + 25);
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(colors.textDark[0], colors.textDark[1], colors.textDark[2]);
    doc.text("Er. Amit Kumar", sigX, y + 36, {align:"center"});
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.text("Founder & CEO", sigX, y + 48, {align:"center"});

    // Right: Official Verification (ISO, MSME, Seal)
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(colors.navy[0], colors.navy[1], colors.navy[2]);
    doc.text("Official Verification", rightX, y, {align:"right"});
    
    const logoY = y + 5;
    if(images.iso) {
      doc.addImage(images.iso, "PNG", rightX - 120, logoY, 40, 40, "", "SLOW");
    }
    if(images.msme) {
      doc.addImage(images.msme, "PNG", rightX - 75, logoY + 8, 40, 26, "", "SLOW");
    }
    if(images.seal) {
      doc.addImage(images.seal, "PNG", rightX - 30, logoY + 5, 30, 30, "", "SLOW");
    }

    // ─── 12. BOTTOM BAR ───
    const fY = pageHeight - 15;
    doc.setFillColor(colors.navy[0], colors.navy[1], colors.navy[2]);
    doc.rect(0, fY, pageWidth, 15, "F");
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(255, 255, 255);
    doc.text(\`© \${currentYear} TechieHelp Institute of AI. All Rights Reserved.\`, pageWidth/2, fY + 10, {align:"center"});

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
console.log('actions/offer-letter.js has been successfully completely rewritten for the premium overhaul design.');
