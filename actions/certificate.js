"use server";

import prisma from "@/lib/prisma";
import puppeteer from "puppeteer";
import fs from "fs/promises";
import path from "path";
import { sendNotificationEmail } from "@/lib/email-service";
import { requireAdmin } from "./internship-admin";
import { getCertificateHtml } from "@/templates/certificateTemplate";
import { revalidatePath } from "next/cache";

/**
 * Issues an Internship Completion Certificate securely generating a PDF via Puppeteer and dispatching it natively via NodeMailer.
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
    
    // Always map the deterministic reference ID mathematically
    const serialNo = refId;

    // Read Image Assets as Base64 for foolproof Puppeteer embedding
    const publicDir = path.join(process.cwd(), "public");
    const getBase64 = async (filename) => {
      try {
        const file = await fs.readFile(path.join(publicDir, filename));
        return `data:image/png;base64,${file.toString("base64")}`;
      } catch (err) {
        console.warn(`Warning: Could not load image ${filename}`, err.message);
        return ""; 
      }
    };

    const images = {
      logo: await getBase64("skill.png"),
      msme: await getBase64("image (4).png"),
      iso: await getBase64("image (3).png"),
      aicte: await getBase64("internship-1.png"),
      signature: await getBase64("EdgeCareers.png"), 
      seal: await getBase64("seal.png"),
      qrCode: await getBase64("qr.png") 
    };

    // 3. Generate HTML
    const htmlContent = getCertificateHtml({
      name,
      studentId,
      collegeName,
      domain,
      startDate,
      endDate,
      issueDate,
      refId: serialNo,
      images
    });

    // 4. Generate PDF natively via Headless Puppeteer in LANDSCAPE mode
    const browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });
    const page = await browser.newPage();
    
    await page.setContent(htmlContent, { waitUntil: "load", timeout: 45000 });
    
    // Landscape A4 render
    const pdfBytes = await page.pdf({
      format: "A4",
      landscape: true,
      printBackground: true,
      margin: { top: 0, bottom: 0, left: 0, right: 0 }
    });
    
    await browser.close();

    // 5. Securely save to filesystem
    const outputFileName = `certificate-${user.id}-${Date.now()}.pdf`;
    const certsDir = path.join(process.cwd(), "public", "documents", "certificates");
    
    await fs.mkdir(certsDir, { recursive: true });
    
    const outputPath = path.join(certsDir, outputFileName);
    await fs.writeFile(outputPath, pdfBytes);

    const pdfUrl = `/documents/certificates/${outputFileName}`;

    // 6. DB Tracking Persistence
    const updatedCertificate = await prisma.internshipCertificate.upsert({
      where: { progressId: progress.id },
      create: {
        progressId: progress.id,
        pdfUrl: pdfUrl,
        serialNo: serialNo
      },
      update: {
        pdfUrl: pdfUrl,
        serialNo: serialNo
      }
    });

    // 7. Fire successful email notification
    let emailSent = false;
    if (user.email) {
      const emailBody = `
        <p>Hi ${name},</p>
        <p>Congratulations on successfully completing your internship in <strong>${domain}</strong>.</p>
        <p>Your official verifiable certificate is attached.</p>
        <p>Keep growing 🚀</p>
        <p>Best regards,<br>TechieHelp Support Team</p>
      `;

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
            content: Buffer.from(pdfBytes),
            contentType: "application/pdf"
          }
        ]
      });
    }

    revalidatePath("/internship/admin/certificates");
    revalidatePath("/internship/admin/applications");

    return { 
      success: true, 
      message: "Certificate precisely generated and dispatched successfully.",
      certificate: updatedCertificate,
      emailSent
    };

  } catch (error) {
    console.error("Issue Certificate Generator Error:", error);
    throw new Error(error.message || "An exception occurred inside the Puppeteer generation layer.");
  }
}
