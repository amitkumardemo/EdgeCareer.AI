"use server";

import prisma from "@/lib/prisma";
import puppeteer from "puppeteer";
import fs from "fs/promises";
import path from "path";
import { sendNotificationEmail } from "@/lib/email-service";
import { getOfferLetterHtml } from "@/templates/offerTemplate";

/**
 * Issues an offer letter using a clean HTML template rendered through Puppeteer.
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

    // 2. Prepare Template variables
    const { user, batch } = application;
    const internName = user.name || "Student Name";
    const collegeName = user.college?.name || user.collegeName || "Your College";
    const studentId = user.techieId || "T-0000";
    const domain = batch.program?.domain || batch.program?.title || "AI Internship";
    const startDate = new Date(batch.startDate).toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' });
    const endDate = new Date(batch.endDate).toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' });
    const currentDate = new Date().toLocaleDateString("en-US", { month: 'long', day: 'numeric', year: 'numeric' });

    // Read Image Assets as Base64 for foolproof Puppeteer embedding
    const publicDir = path.join(process.cwd(), "public");
    const getBase64 = async (filename) => {
      try {
        const file = await fs.readFile(path.join(publicDir, filename));
        return `data:image/png;base64,${file.toString("base64")}`;
      } catch (err) {
        console.warn(`Warning: Could not load image ${filename}`, err.message);
        return ""; // Return empty string so HTML simply doesn't render it instead of crashing
      }
    };

    const images = {
      logo: await getBase64("skill.png"),
      signature: await getBase64("EdgeCareers.png"),
      aicte: await getBase64("internship-1.png"),
      msme: await getBase64("image (4).png"),
      iso: await getBase64("image (3).png"),
      seal: await getBase64("seal.png")
    };

    // 3. Generate structured HTML template natively
    const htmlContent = getOfferLetterHtml({
      internName,
      collegeName,
      studentId,
      domain,
      startDate,
      endDate,
      currentDate,
      images
    });

    // 4. Print HTML strictly to PDF via clean Headless Puppeteer
    const browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });
    const page = await browser.newPage();
    
    // Load the HTML content directly
    await page.setContent(htmlContent, { waitUntil: "networkidle0" });
    
    // Render and pull binary buffer
    const pdfBytes = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "40px",
        bottom: "40px",
        left: "40px",
        right: "40px"
      }
    });
    
    await browser.close();

    // 5. Store the PDF heavily
    const outputFileName = `offer-letter-${user.id}-${Date.now()}.pdf`;
    const offersDir = path.join(process.cwd(), "public", "documents", "offers");
    
    // Ensure "public/documents/offers" directory exists
    await fs.mkdir(offersDir, { recursive: true });
    
    const outputPath = path.join(offersDir, outputFileName);
    await fs.writeFile(outputPath, pdfBytes);

    const pdfUrl = `/documents/offers/${outputFileName}`;

    // 6. DB Entry (Upsert to handle pre-created empty shells)
    const offerLetterRecord = await prisma.offerLetter.upsert({
      where: { applicationId: application.id },
      update: {
        pdfUrl: pdfUrl,
        validUntil: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // Valid for 7 days
      },
      create: {
        applicationId: application.id,
        pdfUrl: pdfUrl,
        validUntil: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // Valid for 7 days
      }
    });

    // 7. Send the Email
    const emailBody = `
      <p>Hi ${internName},</p>
      <p>Congratulations! You have been selected for the internship at TechieHelp Institute of AI as a <strong>${domain}</strong>.</p>
      <p>Your personalized official offer letter is attached precisely generated as a PDF directly on your portal.</p>
      <p>Please review the terms and start your placement journey with us.</p>
      <p>Best Regards,<br>Amit Kumar<br>Founder & CEO, TechieHelp</p>
    `;

    // Try emailing
    let emailSent = false;
    if (user.email) {
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
            content: Buffer.from(pdfBytes), // buffer works identically
            contentType: "application/pdf"
          }
        ]
      });
    }

    return { 
      success: true, 
      message: "Offer letter generated perfectly", 
      offerLetter: offerLetterRecord,
      emailSent
    };
  } catch (error) {
    console.error("Issue Offer Letter Error:", error);
    throw new Error(error.message || "Failed to issue precisely mapped offer letter.");
  }
}
