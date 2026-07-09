require("dotenv").config();
const { sendNotificationEmail } = require("./lib/email-service");

async function test() {
  console.log("Testing email with key:", process.env.RESEND_API_KEY);
  try {
    const result = await sendNotificationEmail({
      to: "test@example.com",
      subject: "Test Email",
      username: "Test User",
      message: "Testing email functionality"
    });
    console.log("Result:", result);
  } catch(e) {
    console.error("Error running test:", e);
  }
}

test();
