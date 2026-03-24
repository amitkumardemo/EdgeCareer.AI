import nodemailer from "nodemailer";
import { generateEmailTemplate } from "./email-template";

/**
 * Singleton pattern for nodemailer transporter to prevent connection leaks
 */
let transporter = null;

const getTransporter = () => {
  if (!transporter) {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error("Missing EMAIL_USER or EMAIL_PASS environment variables.");
    }

    transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }
  return transporter;
};

/**
 * Sends a premium formatted HTML email to a single user.
 * 
 * @param {Object} options 
 * @param {string} options.to - Recipient email address
 * @param {string} options.subject - Email Subject line (emojis encouraged)
 * @param {string} options.username - Recipient's name for greeting
 * @param {string} options.message - The HTML content to inject into the body
 * @param {string} [options.buttonText="View Dashboard"] - CTA button text
 * @param {string} [options.buttonLink="http://localhost:3000/dashboard"] - CTA button URL
 * @returns {Promise<boolean>} Success status
 */
export const sendNotificationEmail = async ({
  to,
  subject,
  username,
  message,
  buttonText = "View Dashboard",
  buttonLink = "https://techiehelpinstituteofai.in/dashboard",
  attachments = [],
}) => {
  try {
    const mailTransporter = getTransporter();

    if (!to) {
      throw new Error("Recipient email (to) is required.");
    }

    const htmlContent = generateEmailTemplate({
      username,
      message,
      buttonText,
      buttonLink,
    });

    const mailOptions = {
      from: `"TechieHelp Institute of AI" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html: htmlContent,
      attachments,
    };

    const info = await mailTransporter.sendMail(mailOptions);
    console.log(`✅ Email sent successfully to ${to} [${info.messageId}]`);
    return true;
  } catch (error) {
    console.error(`❌ Failed to send email to ${to}:`, error.message);
    return false;
  }
};

/**
 * Sends emails to an array of users using a staggered approach to avoid rate limits.
 * 
 * @param {Array<Object>} usersArray - Array of user objects { email, name }
 * @param {string} subject - Common subject for all emails
 * @param {Function} generateMessageFn - Function that takes (user) and returns HTML message string
 * @param {string} [buttonText="View Dashboard"] - Common CTA
 * @param {string} [buttonLink="http://localhost:3000/dashboard"] - Common CTA link
 */
export const sendBulkNotificationEmails = async (
  usersArray,
  subject,
  generateMessageFn,
  buttonText = "View Dashboard",
  buttonLink = "https://techiehelpinstituteofai.in/dashboard"
) => {
  if (!usersArray || usersArray.length === 0) return;
  
  console.log(`🚀 Starting bulk email dispatch to ${usersArray.length} users...`);
  
  const results = {
    success: 0,
    failed: 0,
    errors: [],
  };

  // Promise.all is fast but we chunk it to prevent Gmail rate limits (max 500/day usually, but bursting can throttle)
  const chunkSize = 10;
  for (let i = 0; i < usersArray.length; i += chunkSize) {
    const chunk = usersArray.slice(i, i + chunkSize);
    
    // Process chunk concurrently
    const chunkPromises = chunk.map(async (user) => {
      if (!user.email) return false;
      
      const message = generateMessageFn ? generateMessageFn(user) : "You have a new notification.";
      const username = user.name || "Student";

      return sendNotificationEmail({
        to: user.email,
        subject,
        username,
        message,
        buttonText,
        buttonLink,
      });
    });

    const settled = await Promise.allSettled(chunkPromises);
    
    settled.forEach((res) => {
      if (res.status === "fulfilled" && res.value === true) results.success++;
      else results.failed++;
    });

    // Small delay between chunks to respect SMTP limits
    if (i + chunkSize < usersArray.length) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  console.log(`🏁 Bulk email finished. Success: ${results.success}, Failed: ${results.failed}`);
  return results;
};
