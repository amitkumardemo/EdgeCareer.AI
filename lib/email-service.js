import { Resend } from "resend";
import { render } from "@react-email/render";
import { DynamicNotificationEmail } from "../emails/DynamicNotificationEmail";

// Initialize Resend with the provided production API Key
const RESEND_API_KEY = process.env.RESEND_API_KEY;

if (!RESEND_API_KEY) {
  console.warn("⚠️ RESEND_API_KEY is not defined in the environment variables.");
}

const resend = new Resend(RESEND_API_KEY || "dummy_key_to_prevent_crash");

const EMAIL_FROM = "TechieHelp Institute of AI <admin@techiehelpinstituteofai.in>";

/**
 * Sends a premium, responsive React Email via Resend.
 * 
 * Backward compatible with existing app calls while supporting 30+ new Fortune 500
 * email variations through dynamic props (statusBadge, infoCards, timeline, etc.)
 */
export const sendNotificationEmail = async ({
  to,
  subject,
  username,
  message,
  buttonText = "View Dashboard",
  buttonLink = "https://techiehelpinstituteofai.in/dashboard",
  attachments = [],
  
  // NEW ENTERPRISE TEMPLATE PROPS
  heroTitle = subject,
  statusBadge = null,
  infoCards = [],
  timeline = [],
  certificate = null,
  secondaryButtonText = null,
  secondaryButtonLink = null,
}) => {
  try {
    if (!to) {
      throw new Error("Recipient email (to) is required.");
    }

    // 1. Render the React Component to an HTML string
    const htmlString = await render(
      <DynamicNotificationEmail 
        subject={subject}
        username={username || "Student"}
        heroTitle={heroTitle}
        message={message}
        buttonText={buttonText}
        buttonLink={buttonLink}
        statusBadge={statusBadge}
        infoCards={infoCards}
        timeline={timeline}
        certificate={certificate}
        secondaryButtonText={secondaryButtonText}
        secondaryButtonLink={secondaryButtonLink}
        appUrl={process.env.NEXT_PUBLIC_APP_URL || "https://techiehelpinstituteofai.in"}
      />
    );

    // 2. Send via Resend
    const response = await resend.emails.send({
      from: EMAIL_FROM,
      to: [to],
      reply_to: "techiehelpinstituteofai@gmail.com",
      subject: subject,
      html: htmlString,
      attachments: attachments.map(att => ({
        filename: att.filename,
        content: att.content,
      }))
    });

    if (response.error) {
      console.error(`❌ Resend API Error for ${to}:`, response.error);
      return false;
    }

    console.log(`✅ Resend Email sent successfully to ${to} [ID: ${response?.data?.id}]`);
    return true;
  } catch (error) {
    console.error(`❌ Resend failed to send email to ${to}:`, error);
    return false;
  }
};

/**
 * Sends emails to an array of users using a staggered approach to avoid rate limits.
 */
export const sendBulkNotificationEmails = async (
  usersArray,
  subject,
  generateMessageFn,
  buttonText = "View Dashboard",
  buttonLink = "https://techiehelpinstituteofai.in/dashboard"
) => {
  if (!usersArray || usersArray.length === 0) return;
  
  console.log(`🚀 Starting bulk Resend dispatch to ${usersArray.length} users...`);
  
  const results = {
    success: 0,
    failed: 0,
    errors: [],
  };

  const chunkSize = 10;
  for (let i = 0; i < usersArray.length; i += chunkSize) {
    const chunk = usersArray.slice(i, i + chunkSize);
    
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

    // Small delay between chunks to respect API limits
    if (i + chunkSize < usersArray.length) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  console.log(`🏁 Bulk Resend email finished. Success: ${results.success}, Failed: ${results.failed}`);
  return results;
};
