require('dotenv').config({ path: '.env' });
require('dotenv').config({ path: '.env.local' });
const nodemailer = require("nodemailer");

async function check() {
  console.log("User:", process.env.EMAIL_USER);
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER?.replace(/['"]/g, ""),
      pass: process.env.EMAIL_PASS?.replace(/['"]/g, ""),
    },
  });
  console.log("Verifying connection...");
  try {
    await transporter.verify();
    console.log("SMTP Connection successful.");
  } catch(e) {
    console.error("SMTP Error:", e);
  }
  process.exit();
}

check();
