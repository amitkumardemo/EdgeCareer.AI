export const generateEmailTemplate = ({
  username,
  message,
  buttonText = "View Dashboard",
  buttonLink = "http://localhost:3000/dashboard",
}) => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TechieHelp Notification</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f4f6f9;
      font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: #333333;
    }
    .email-container {
      max-width: 600px;
      margin: 40px auto;
      background: #ffffff;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(0,0,0,0.05);
    }
    .header {
      background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%);
      padding: 40px 30px;
      text-center: center;
    }
    .header img {
      width: 180px;
      max-width: 100%;
      height: auto;
      margin-bottom: 20px;
      display: block;
      margin-left: auto;
      margin-right: auto;
    }
    .header h1 {
      color: #ffffff;
      font-size: 24px;
      font-weight: 700;
      margin: 0;
      text-align: center;
      letter-spacing: 0.5px;
    }
    .body-content {
      padding: 40px 30px;
      background-color: #ffffff;
    }
    .greeting {
      font-size: 20px;
      font-weight: 600;
      color: #111827;
      margin-top: 0;
      margin-bottom: 20px;
    }
    .message {
      font-size: 16px;
      line-height: 1.6;
      color: #4b5563;
      margin-bottom: 35px;
    }
    .message strong {
      color: #111827;
    }
    .cta-container {
      text-align: center;
      margin-top: 40px;
      margin-bottom: 20px;
    }
    .cta-button {
      display: inline-block;
      padding: 14px 32px;
      background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
      color: #ffffff !important;
      text-decoration: none;
      font-size: 16px;
      font-weight: 600;
      border-radius: 8px;
      box-shadow: 0 4px 15px rgba(124, 58, 237, 0.3);
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .footer {
      background-color: #f8fafc;
      padding: 30px;
      text-align: center;
      border-top: 1px solid #e2e8f0;
    }
    .footer p {
      margin: 5px 0;
      font-size: 14px;
      color: #64748b;
    }
    .support-link {
      color: #4f46e5;
      text-decoration: none;
      font-weight: 500;
    }
    .social-links {
      margin-top: 15px;
      margin-bottom: 15px;
    }
    .social-links a {
      display: inline-block;
      margin: 0 10px;
      color: #64748b;
      text-decoration: none;
      font-size: 14px;
    }
    .copyright {
      font-size: 12px !important;
      margin-top: 20px !important;
      color: #94a3b8 !important;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <!-- Header Area -->
    <div class="header">
      <!-- Fallback empty alt for security scanners so it doesn't look broken if images are off -->
      <img src="https://techiehelpinstituteofai.in/skill.png" alt="TechieHelp Institute of AI" style="display:block; margin: 0 auto 16px auto; height: 60px; width: auto; object-fit: contain;" />
      <h1 style="color: #ffffff; text-align: center; margin-bottom: 10px;">TechieHelp Institute of AI</h1>
      <p style="color: #a5b4fc; margin: 0; font-size: 14px; text-align: center; text-transform: uppercase; letter-spacing: 2px;">Career Development Portal</p>
    </div>

    <!-- Main Content Area -->
    <div class="body-content">
      <h2 class="greeting">Hi ${username || 'Student'},</h2>
      
      <div class="message">
        <!-- Message is dynamically injected here, allowing for HTML formatting -->
        ${message}
      </div>

      <div class="cta-container">
        <a href="${buttonLink}" class="cta-button">${buttonText}</a>
      </div>
      
      <p style="margin-top: 40px; font-size: 15px; color: #64748b; margin-bottom: 0;">
        Best regards,<br>
        <strong>TechieHelp Support Team</strong>
      </p>
    </div>

    <!-- Footer Area -->
    <div class="footer">
      <p>Need assistance? Contact us at <a href="mailto:support@techiehelp.in" class="support-link">support@techiehelp.in</a></p>
      
      <p class="copyright">
        © ${new Date().getFullYear()} TechieHelp Institute of AI. All rights reserved.<br>
        This is an automated notification, please do not reply directly to this email.
      </p>
    </div>
  </div>
</body>
</html>
  `;
};
