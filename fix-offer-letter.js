const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, 'actions', 'offer-letter.js');
let content = fs.readFileSync(targetPath, 'utf8');

const marker = 'const pdfBase64 = doc.output("datauristring");';
const markerIndex = content.indexOf(marker);

if (markerIndex !== -1) {
  const newContent = content.substring(0, markerIndex + marker.length) + `
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
      // Fire and forget email logic to prevent blocking UI if SMTP timeouts
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
 * Kept separate so list queries don't load the large base64 string.
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
  console.log('Fixed file and appended getMyOfferLetterPdf');
} else {
  console.log('marker not found');
}
