"use server";

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
    const refId = `TECHIE/INT/${currentYear}/${studentId}`;

    const getStaticBase64 = async (filePath) => {
      try {
        const file = await fs.readFile(filePath);
        return `data:image/png;base64,${file.toString("base64")}`;
      } catch (err) {
        return "";
      }
    };

    const images = {
      logo: await getStaticBase64(path.join(process.cwd(), "public", "skill.png")),
      msme: await getStaticBase64(path.join(process.cwd(), "public", "image (4).png")),
      iso: await getStaticBase64(path.join(process.cwd(), "public", "image (3).png")),
      niti: await getStaticBase64(path.join(process.cwd(), "public", "internship-1.png")),
      signature: await getStaticBase64(path.join(process.cwd(), "public", "EdgeCareers.png")),
      seal: await getStaticBase64(path.join(process.cwd(), "public", "seal.png")),
    };

    // 3. Generate PDF with jsPDF
    const doc = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 50;
    const contentWidth = pageWidth - margin * 2;

    // ─── Header ───
    // 1. Logo (Left)
    if (images.logo) {
      doc.addImage(images.logo, "PNG", margin, 35, 120, 60, "", "MEDIUM");
    }

    // 2. Company Info (Right stacked)
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(15, 23, 42);
    doc.text("TechieHelp Institute of AI", pageWidth - margin, 50, { align: "right" });
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(100, 116, 139);
    // Stacked info matching image
    doc.text("+91-7073130165", pageWidth - margin, 65, { align: "right" });
    doc.text("JIET Incubation Center, Jodhpur", pageWidth - margin, 78, { align: "right" });
    doc.text("support@techiehelp.in", pageWidth - margin, 91, { align: "right" });
    doc.text("techiehelp.in", pageWidth - margin, 104, { align: "right" });

    // ─── Header bottom border ───
    doc.setDrawColor(37, 99, 235); // blue-600
    doc.setLineWidth(1.5);
    doc.line(margin, 120, pageWidth - margin, 120);

    // ─── Title ───
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(15, 23, 42);
    const title = "INTERNSHIP OFFER LETTER";
    const titleWidth = doc.getTextWidth(title);
    doc.text(title, (pageWidth - titleWidth) / 2, 160);

    // Underline the title
    doc.setDrawColor(15, 23, 42);
    doc.setLineWidth(1);
    doc.line(
      (pageWidth - titleWidth) / 2,
      163,
      (pageWidth - titleWidth) / 2 + titleWidth,
      163
    );

    // ─── Ref ID & Date ───
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(15, 23, 42);
    doc.text(`Ref ID: ${refId}`, margin, 185);
    doc.text(`Date: ${currentDate}`, pageWidth - margin, 185, { align: "right" });

    doc.text("To,", margin, 205);
    doc.text(internName, margin, 218);

    // Subject line
    doc.text(`Subject: Internship Offer – ${domain} Intern`, margin, 245);
    doc.setDrawColor(15, 23, 42);
    doc.setLineWidth(0.5);
    doc.line(margin, 248, margin + doc.getTextWidth(`Subject: Internship Offer – ${domain} Intern`), 248);

    // ─── Body paragraphs ───
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(30, 41, 59);
    let y = 270;
    const lineH = 15;

    const writeWrapped = (text, x, curY, maxWidth, options = {}) => {
      const lines = doc.splitTextToSize(text, maxWidth);
      doc.text(lines, x, curY, options);
      return curY + lines.length * lineH;
    };

    doc.setFont("helvetica", "normal");
    doc.text("Dear", margin, y);
    doc.setFont("helvetica", "bold");
    doc.text(internName + ",", margin + doc.getTextWidth("Dear "), y);
    y += 18;

    const congratsLines = doc.splitTextToSize(`Congratulations on being selected as a ${domain} Intern at TechieHelp Institute of AI.`, contentWidth);
    doc.setFont("helvetica", "normal");
    doc.text(congratsLines, margin, y);
    y += congratsLines.length * lineH + 5;
    
    y = writeWrapped(
      "This internship will provide you with real-world exposure, structured learning, and hands-on experience aligned with industry standards. You will work on live projects and gain practical knowledge to enhance your career readiness.",
      margin, y, contentWidth
    );
    y += 15;

    // ─── Details grid (shaded box) ───
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(203, 213, 225);
    doc.setLineWidth(0.5);
    doc.roundedRect(margin, y - 5, contentWidth, 75, 4, 4, "FD");

    const col1 = margin + 10;
    const col2 = margin + contentWidth / 2 + 10;

    const detailRow = (label, value, x, rowY) => {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9.5);
      doc.setTextColor(15, 23, 42);
      doc.text(label, x, rowY);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(51, 65, 85);
      doc.text(value, x + doc.getTextWidth(label) + 4, rowY);
    };

    detailRow("Position:", `${domain} Intern`, col1, y + 12);
    detailRow("Duration:", `${startDate} – ${endDate}`, col2, y + 12);
    detailRow("Work Mode:", "Remote / Online", col1, y + 27);
    detailRow("Stipend:", "Performance-Based", col2, y + 27);
    detailRow("Department:", "Technology & Development", col1, y + 42);
    detailRow("Reporting HR:", "Er. Ananya Sharma", col2, y + 42);
    detailRow("College:", collegeName, col1, y + 57);

    y += 90;

    // ─── Section helper ───
    const writeSection = (heading, items, curY) => {
      // Section header bar
      doc.setFillColor(37, 99, 235);
      doc.rect(margin, curY, 3, 12, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(15, 23, 42);
      doc.text(heading, margin + 8, curY + 9);
      curY += 20;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9.5);
      doc.setTextColor(51, 65, 85);

      for (const item of items) {
        const bulletOffset = 7;
        const bodyMaxWidth = contentWidth - bulletOffset - 10;
        const lines = doc.splitTextToSize(item, bodyMaxWidth);
        
        // Ensure new page won't separate bullet from text
        if (curY + lines.length * lineH > pageHeight - 120) {
          doc.addPage();
          curY = margin;
        }

        // Draw bullet dot
        doc.setFillColor(51, 65, 85);
        doc.ellipse(margin + 5, curY - 4, 1.5, 1.5, "F");
        
        // Draw wrapped text
        doc.text(lines, margin + 5 + bulletOffset, curY);
        curY += lines.length * lineH;
      }
      return curY + 8;
    };

    if (y + 40 > pageHeight - 120) { doc.addPage(); y = margin; }
    y = writeSection("ONBOARDING & COMMUNICATION", [
      "You will receive onboarding instructions before the start date.",
      "Access to the dashboard, assigned tasks, and internal communication channels will be provided.",
      "All updates will be officially managed through Email, WhatsApp, and the portal Dashboard.",
      "Regular reporting and task submissions are strictly mandatory.",
    ], y);

    if (y + 40 > pageHeight - 120) { doc.addPage(); y = margin; }
    y = writeSection("WORKING CULTURE", [
      "We offer a flexible and growth-oriented work environment.",
      "Strong focus on continuous learning and practical exposure.",
      "Collaboration, innovation, and accountability are highly encouraged.",
      "Balanced approach: 70% project work + 30% structured learning.",
    ], y);

    if (y + 40 > pageHeight - 120) { doc.addPage(); y = margin; }
    y = writeSection("ROLES & RESPONSIBILITIES", [
      "Work proactively on real-world projects replicating client needs.",
      "Complete assigned tasks within given deadlines.",
      "Participate iteratively in technical discussions and code evaluations.",
      "Maintain absolute professionalism and responsive communication.",
    ], y);

    if (y + 40 > pageHeight - 120) { doc.addPage(); y = margin; }
    y = writeSection("TERMS, CONDITIONS & LEGAL CLAUSES", [
      "This internship is primarily learning-focused.",
      "A predefined probation period may apply based on early performance metrics.",
      "Interns must adhere firmly to timelines and maintain organizational discipline.",
      "Notice period: 15 days written intimation before exiting.",
      "Any form of documented misconduct or plagiarism may result in immediate termination.",
      "All technical work and documentation produced is the exclusive intellectual property of TechieHelp.",
    ], y);

    if (y + 40 > pageHeight - 120) { doc.addPage(); y = margin; }
    y = writeSection("BENEFITS", [
      "Official Verified Internship Certificate",
      "Letter of Recommendation (Performance Dependent)",
      "Direct Mentorship from seasoned developers",
      "Verified real-world project experience for your resume",
      "PPO opportunity (Pre-Placement Offer) based entirely on outcome quality",
    ], y);

    // ─── HR Contact box ───
    y += 5;
    if (y + 60 > pageHeight - 80) { doc.addPage(); y = margin; }
    doc.setFillColor(241, 245, 249);
    doc.setDrawColor(203, 213, 225);
    doc.setLineWidth(0.5);
    doc.roundedRect(margin, y, contentWidth, 55, 4, 4, "FD");
    
    // Left blue accent exactly like image
    doc.setFillColor(100, 116, 139); // Slate grayish blue
    doc.rect(margin, y, 4, 55, "F");
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(15, 23, 42);
    doc.text("HR Department", margin + 12, y + 18);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    doc.setTextColor(51, 65, 85);
    doc.text("TechieHelp Institute of AI", margin + 12, y + 33);
    doc.text("hr@techiehelp.in  |  +91-7073130165", margin + 12, y + 46);
    y += 75;

    // ─── Closing ───
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(30, 41, 59);
    doc.text("We look forward to supporting your growth throughout this internship.", margin, y);
    y += lineH;
    doc.text("Wishing you success in your journey.", margin, y);
    y += 30;

    // ─── Signature Layout ───
    if (y + 100 > pageHeight - 80) { doc.addPage(); y = margin; }
    
    // Draw Signature Image
    let sigWidth = 80;
    if (images.signature) {
      doc.addImage(images.signature, "PNG", margin, y, sigWidth, 40, "", "SLOW");
    }
    
    doc.setDrawColor(51, 65, 85);
    doc.setLineWidth(0.5);
    doc.line(margin, y + 45, margin + 140, y + 45); // Line under signature
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(15, 23, 42);
    doc.text("Amit Kumar", margin, y + 60);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(100, 116, 139);
    doc.text("Founder & CEO", margin, y + 72);
    doc.text("TechieHelp Institute of AI", margin, y + 84);

    // ─── Partner Badges ───
    // Align them to the right, next to signature block
    const badgeY = y + 25;
    let badgeX = margin + 170;
    const badgeW = 60;
    const badgeH = 60;
    
    if (images.seal) {
      doc.addImage(images.seal, "PNG", badgeX, badgeY - 15, 75, 75, "", "SLOW");
      badgeX += 85; 
    }
    if (images.niti) {
      doc.addImage(images.niti, "PNG", badgeX, badgeY, 90, 45, "", "SLOW");
      badgeX += 100;
    }
    if (images.msme) {
      doc.addImage(images.msme, "PNG", badgeX, badgeY, 70, 45, "", "SLOW");
      badgeX += 80;
    }
    if (images.iso) {
      doc.addImage(images.iso, "PNG", badgeX, badgeY, 45, 45, "", "SLOW");
    }

    y += 110;

    // ─── Footer Text ───
    doc.setDrawColor(203, 213, 225);
    doc.setLineWidth(1);
    doc.line(margin, pageHeight - 65, pageWidth - margin, pageHeight - 65);
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(30, 41, 59);
    doc.text(
      "TechieHelp Institute of AI  |  EdTech | AI & IT Services | Internship Programs",
      pageWidth / 2,
      pageHeight - 50,
      { align: "center" }
    );
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text(
      "+91-7073130165  |  techiehelp.in",
      pageWidth / 2,
      pageHeight - 38,
      { align: "center" }
    );
    
    doc.setFont("helvetica", "italic");
    doc.text(
      '"Learning, Innovation, and Career Growth – All in One Platform"',
      pageWidth / 2,
      pageHeight - 26,
      { align: "center" }
    );

    // 4. Export PDF as base64 data URL (works on serverless — no filesystem writes)
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
    const emailBody = `
      <p>Hi ${internName},</p>
      <p>Congratulations! You have been selected for the internship at TechieHelp Institute of AI as a <strong>${domain}</strong> Intern.</p>
      <p>Your personalized official offer letter is attached to this email as a PDF.</p>
      <p>Please review the terms and start your placement journey with us.</p>
      <p>Best Regards,<br>Amit Kumar<br>Founder & CEO, TechieHelp</p>
    `;

    let emailSent = false;
    if (user.email) {
      try {
        emailSent = await sendNotificationEmail({
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
        });
      } catch (emailErr) {
        console.warn("Email send failed (non-fatal):", emailErr.message);
      }
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
 * Kept separate so list queries don't load the large base64 string.
 */
export async function getMyOfferLetterPdf(applicationId) {
  const record = await prisma.offerLetter.findUnique({
    where: { applicationId },
    select: { pdfUrl: true, generatedAt: true, validUntil: true },
  });
  return record;
}
