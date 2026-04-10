"use server";

import prisma from "@/lib/prisma";
import { jsPDF } from "jspdf";
import fs from "fs/promises";
import path from "path";
import { sendNotificationEmail } from "@/lib/email-service";
import { requireAdmin } from "./internship-admin";
import { revalidatePath } from "next/cache";

/**
 * Issues an Internship Completion Certificate securely generating a PDF via jsPDF
 * and dispatching it naturally via NodeMailer. Completely serverless compatible.
 */
export async function issueCertificate(applicationId) {
  try {
    const admin = await requireAdmin();

    // 1. Fetch exact progress constraints and validation
    const progress = await prisma.internProgress.findUnique({
      where: { applicationId },
      include: {
        application: {
          include: {
            user: { include: { college: true } },
            batch: { include: { program: true } }
          }
        },
        certificate: true
      }
    });

    if (!progress) throw new Error("InternProgress not found for this application.");
    if (!progress.completed) throw new Error("Internship is not marked as completed yet.");

    const application = progress.application;
    const { user, batch } = application;
    
    // 2. Prepare dynamic fields exactly as mapped
    const name = user.name || "Student Name";
    const studentId = user.techieId || user.rollNumber || "T-0000";
    const collegeName = user.college?.name || user.collegeName || "Your College";
    const domain = batch.program?.domain || batch.program?.title || "AI Internship";
    const startDateObj = batch.startDate || application.reviewedAt || application.createdAt;
    const startDate = new Date(startDateObj).toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' });
    const endDate = new Date(batch.endDate).toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' });
    const issueDate = new Date().toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' });
    
    const currentYear = new Date().getFullYear();
    const cleanStudentId = studentId && studentId.length > 15 ? studentId.substring(studentId.length - 8).toUpperCase() : studentId;
    const refId = `TECHIE/INT/${currentYear}/${cleanStudentId}`;
    const serialNo = refId;

    // 3. Read Image Assets dynamically (static trace for Vercel Edge)
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
      aicte: await getStaticBase64(path.join(process.cwd(), "public", "internship-1.png")),
      signature: await getStaticBase64(path.join(process.cwd(), "public", "EdgeCareers.png")),
      seal: await getStaticBase64(path.join(process.cwd(), "public", "seal.png")),
      qrCode: await getStaticBase64(path.join(process.cwd(), "public", "qr.png"))
    };

    // 4. Generate PDF natively with jsPDF
    const doc = new jsPDF({ orientation: "landscape", unit: "pt", format: "a4" });
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    
    // Outer border (18px slate-900)
    doc.setDrawColor(15, 23, 42); 
    doc.setLineWidth(18);
    doc.rect(9, 9, pageWidth - 18, pageHeight - 18);

    // Inner border (2px slate-300)
    doc.setDrawColor(203, 213, 225);
    doc.setLineWidth(2);
    doc.rect(30, 30, pageWidth - 60, pageHeight - 60);

    // HEADER ROW
    // MSME (Left)
    if (images.msme) doc.addImage(images.msme, "PNG", 60, 45, 110, 50, "", "MEDIUM");
    // Logo (Center)
    if (images.logo) {
      const logoW = 160;
      doc.addImage(images.logo, "PNG", (pageWidth - logoW) / 2, 40, logoW, 60, "", "MEDIUM");
    }
    // AICTE / NITI (Right)
    if (images.aicte) doc.addImage(images.aicte, "PNG", pageWidth - 180, 45, 120, 50, "", "MEDIUM");

    // TITLE AREA
    doc.setFont("times", "bold");
    doc.setFontSize(28);
    doc.setTextColor(15, 23, 42);
    doc.text("CERTIFICATE OF INTERNSHIP COMPLETION", pageWidth / 2, 160, { align: "center" });
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(100, 116, 139);
    doc.text("THIS CERTIFICATE IS PROUDLY PRESENTED TO", pageWidth / 2, 200, { align: "center" });

    // NAME AREA
    doc.setFont("times", "bold");
    doc.setFontSize(36);
    doc.setTextColor(217, 119, 6); // Golden Amber
    doc.text(name.toUpperCase(), pageWidth / 2, 250, { align: "center" });

    // Underline
    doc.setDrawColor(203, 213, 225);
    doc.setLineWidth(1);
    doc.line(pageWidth / 2 - 180, 265, pageWidth / 2 + 180, 265);

    // CONTENT AREA Helper
    doc.setTextColor(51, 65, 85);
    doc.setFontSize(12);
    const writeMixedCenter = (y, fragments) => {
      let totalWidth = 0;
      fragments.forEach(f => {
        doc.setFont("helvetica", f.font);
        f.width = doc.getTextWidth(f.text);
        totalWidth += f.width;
      });
      let currentX = (pageWidth - totalWidth) / 2;
      fragments.forEach(f => {
        doc.setFont("helvetica", f.font);
        doc.text(f.text, currentX, y);
        currentX += f.width;
      });
    };

    // Line 1
    writeMixedCenter(320, [
      { text: "This is to certify that the student bearing ID: ", font: "normal" },
      { text: studentId, font: "bold" }
    ]);
    
    // Line 2
    writeMixedCenter(355, [
      { text: "from ", font: "normal" },
      { text: collegeName, font: "bold" },
      { text: " has successfully completed the internship in ", font: "normal" },
      { text: `"${domain}"`, font: "bold" }
    ]);

    // Line 3
    writeMixedCenter(405, [
      { text: "under the mentorship of TechieHelp - India's Leading AI Software Development Company.", font: "normal" }
    ]);

    // Line 4
    writeMixedCenter(435, [
      { text: "The internship tenure was from ", font: "normal" },
      { text: startDate, font: "bold" },
      { text: " to ", font: "normal" },
      { text: `${endDate}.`, font: "bold" }
    ]);

    // BOTTOM ROW 
    const bottomY = 515;

    // Signature
    if (images.signature) doc.addImage(images.signature, "PNG", 75, bottomY - 55, 80, 45, "", "MEDIUM");
    doc.setDrawColor(100, 116, 139);
    doc.setLineWidth(1);
    doc.line(60, bottomY - 5, 170, bottomY - 5);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(15, 23, 42);
    doc.text("Amit Kumar", 115, bottomY + 12, { align: "center" });
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text("Founder & CEO", 115, bottomY + 25, { align: "center" });
    doc.text("TechieHelp Institute of AI", 115, bottomY + 38, { align: "center" });

    // QR Code
    if (images.qrCode) {
      doc.addImage(images.qrCode, "PNG", pageWidth / 2 - 35, bottomY - 55, 70, 70, "", "MEDIUM");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.setTextColor(148, 163, 184);
      doc.text("SCAN TO VERIFY", pageWidth / 2, bottomY + 30, { align: "center" });
    }

    // Seal & ISO
    if (images.seal) doc.addImage(images.seal, "PNG", pageWidth - 200, bottomY - 60, 80, 80, "", "MEDIUM");
    if (images.iso) doc.addImage(images.iso, "PNG", pageWidth - 110, bottomY - 50, 60, 60, "", "MEDIUM");

    // 5. Generate and store as Edge-Compatible DataURI in DB
    const pdfBase64 = doc.output("datauristring");

    const updatedCertificate = await prisma.internshipCertificate.upsert({
      where: { progressId: progress.id },
      create: {
        progressId: progress.id,
        pdfUrl: pdfBase64,
        serialNo: serialNo
      },
      update: {
        pdfUrl: pdfBase64,
        serialNo: serialNo
      }
    });

    // 6. Native NodeMailer Dispatch ArrayBuffer
    let emailSent = false;
    if (user.email) {
      const pdfBuffer = Buffer.from(doc.output("arraybuffer"));
      const emailBody = `
        <p>Hi ${name},</p>
        <p>Congratulations on successfully completing your internship in <strong>${domain}</strong>.</p>
        <p>Your official verifiable certificate is attached.</p>
        <p>Keep growing 🚀</p>
        <p>Best regards,<br>TechieHelp Support Team</p>
      `;

      try {
         emailSent = await sendNotificationEmail({
          to: user.email,
          subject: "🎉 Internship Certificate – TechieHelp",
          username: name,
          message: emailBody,
          buttonText: "View Dashboard",
          buttonLink: "https://techiehelpinstituteofai.in/dashboard",
          attachments: [
            {
              filename: "Internship_Completion_Certificate.pdf",
              content: pdfBuffer,
              contentType: "application/pdf"
            }
          ]
        });
      } catch (err) {
        console.warn("Email warning:", err.message);
      }
    }

    revalidatePath("/internship/admin/certificates");
    revalidatePath("/internship/admin/applications");

    return { 
      success: true, 
      message: "Certificate precisely generated and dispatched successfully.",
      certificate: { ...updatedCertificate, pdfUrl: "[base64]" },
      emailSent
    };

  } catch (error) {
    console.error("Issue Certificate Generator Error:", error);
    throw new Error(error.message || "An exception occurred inside the native jsPDF generation layer.");
  }
}
