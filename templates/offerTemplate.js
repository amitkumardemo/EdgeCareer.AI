export function getOfferLetterHtml({
  internName,
  collegeName,
  studentId,
  domain,
  startDate,
  endDate,
  currentDate,
  images // Pass base64 image strings
}) {
  const currentYear = new Date().getFullYear();
  const refId = `TECHIE/INT/${currentYear}/${studentId}`;

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Internship Offer Letter</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

        /* NATURAL PAGE MARGINS */
        @page {
          margin: 50px;
        }

        body {
          font-family: 'Poppins', Arial, sans-serif;
          margin: 0;
          padding: 0;
          color: #1e293b;
          line-height: 1.6;
        }

        .container {
          max-width: 800px;
          margin: 0 auto;
        }

        /* Prevent ugly page breaks inside crucial blocks */
        .section-block {
          page-break-inside: avoid;
          margin-bottom: 25px;
        }

        /* ----- HEADER (NATURAL FLOW) ----- */
        header {
          display: flex;
          justify-content: space-between;
          align-items: center; 
          border-bottom: 2px solid #2563eb;
          padding-bottom: 15px;
          margin-bottom: 30px;
        }

        .header-left img {
          max-height: 75px;
          object-fit: contain;
        }

        .header-right {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 6px;
          font-size: 11px;
          color: #475569;
        }

        .company-name-bold {
          font-size: 14px;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 2px;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .contact-icon {
          width: 14px;
          height: 14px;
          fill: #2563eb;
          flex-shrink: 0;
        }

        /* ----- MAIN CONTENT ----- */
        main {
          font-size: 13.5px;
        }

        /* TITLE */
        .title-box {
          text-align: center;
          margin: 10px 0 30px 0;
        }
        .title {
          font-size: 20px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: #0f172a;
          margin: 0;
          text-decoration: underline;
          text-underline-offset: 6px;
        }

        /* TOP INFO */
        .top-info {
          margin-bottom: 25px;
        }
        .top-info-flex {
          display: flex;
          justify-content: space-between;
          margin-bottom: 15px;
        }
        .top-info p {
          margin: 3px 0;
        }
        .subject-line {
          font-weight: 700;
          font-size: 14px;
          text-decoration: underline;
          margin: 15px 0;
        }

        /* BODY PARAGRAPHS */
        .body-content {
          text-align: justify;
          margin-bottom: 25px;
        }
        .body-content p {
          margin-bottom: 12px;
        }

        /* HEADERS */
        h3.section-header {
          font-size: 14px;
          color: #0f172a;
          margin-bottom: 10px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-weight: 700;
          border-left: 3px solid #2563eb;
          padding-left: 10px;
        }

        /* GRID DETAILS */
        .details-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          row-gap: 10px;
          column-gap: 20px;
          background-color: #f8fafc;
          border: 1px solid #cbd5e1;
          border-radius: 4px;
          padding: 15px 20px;
        }
        .details-grid p {
          margin: 0;
          font-size: 13px;
        }
        .details-grid strong {
          color: #1e293b;
        }

        /* LISTS */
        ul.custom-list {
          margin: 0;
          padding-left: 20px;
        }
        ul.custom-list li {
          margin-bottom: 6px;
          color: #334155;
        }

        /* HR CONTACT */
        .hr-contact {
          background-color: #f1f5f9;
          padding: 15px;
          border-radius: 4px;
          border-left: 3px solid #64748b;
        }
        .hr-contact p { margin: 2px 0; }

        .closing-block {
          margin-top: 25px;
          margin-bottom: 30px;
        }

        /* SIGNATURE & BADGES SECTION */
        .signature-badges-section {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          page-break-inside: avoid;
          margin-bottom: 70px;  /* Increased gap before footer */
        }

        /* Left: Signature Block */
        .signature-block {
          text-align: left;
        }
        .signature-img {
          height: 60px;
          object-fit: contain;
          display: block;
          opacity: 0.9;
          margin-bottom: 5px;
        }
        .signature-line {
          width: 200px;
          height: 1px;
          background-color: #334155;
          border: none;
          margin: 4px 0 8px 0;
        }
        .signature-name {
          font-weight: 700;
          font-size: 14px;
          margin: 0;
          color: #0f172a;
        }
        .signature-title {
          font-size: 12px;
          color: #64748b;
          margin: 0;
        }

        /* Right: Badges Block */
        .footer-badges {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 15px;
        }
        .footer-badges img {
          height: 60px;
          object-fit: contain;
        }
        .seal-img {
          height: 75px !important;
        }

        /* ----- FOOTER (NATURAL FLOW, AT BOTTOM OF CONTENT) ----- */
        footer {
          text-align: center;
          font-size: 11px;
          color: #1e293b;
          font-weight: 600; /* Bold Footer Content */
          line-height: 1.8;
          border-top: 2px solid #cbd5e1;
          padding-top: 20px;
          page-break-inside: avoid;
          margin-top: 30px;
        }
        footer strong {
          color: #0f172a;
          font-weight: 700;
        }
      </style>
    </head>
    <body>

      <div class="container">
      
        <!-- HEADER (Normal HTML Block at Top) -->
        <header>
          <div class="header-left">
            <img src="${images.logo}" alt="TechieHelp Logo" />
          </div>
          <div class="header-right">
            <div class="company-name-bold">TechieHelp Institute of AI</div>
            <div class="contact-item">
              <!-- WhatsApp Icon -->
              <svg class="contact-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.6 14c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.3-.6.8-.8 1-.1.2-.3.2-.5.1-.7-.3-1.4-.7-2-1.2-.5-.5-.9-1.1-1.2-1.7-.1-.2 0-.3.1-.4.1-.1.3-.3.4-.4.1-.1.2-.3.2-.4.1-.2 0-.4-.1-.5-.1-.2-.6-1.5-.9-2-.2-.5-.5-.4-.6-.4h-.5c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.8 1.1 3c.1.2 2 3.1 4.9 4.3.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2-.1-.2-.3-.3-.5-.4zM12 21.9c-1.6 0-3.1-.4-4.5-1.2l-.3-.2-3.3.9.9-3.2-.2-.3c-.8-1.4-1.3-3-1.3-4.7C3.3 8 7.2 4 12 4s8.7 3.9 8.7 8.7c0 4.8-3.9 8.8-8.7 9.2zm0-19.9C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.4 4.9L2 22l5.3-1.4C8.7 21.5 10.3 22 12 22c5.5 0 10-4.5 10-10S17.5 2 12 2z"/>
              </svg>
              <span>+91-7073130165</span>
            </div>
            <div class="contact-item">
              <svg class="contact-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              <span>JIET Incubation Center, Jodhpur</span>
            </div>
            <div class="contact-item">
              <svg class="contact-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
              <span>support@techiehelp.in</span>
            </div>
            <div class="contact-item">
              <svg class="contact-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95c-.32-1.25-.78-2.45-1.38-3.56 1.84.63 3.37 1.9 4.33 3.56zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.09 13.36 4 12.69 4 12s.09-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2s.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56-1.84-.63-3.37-1.9-4.33-3.56zm2.95-8H5.08c1.84-.63 3.37-1.9 4.33-3.56C8.81 5.55 8.35 6.75 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2s.07-1.34.16-2h4.68c.09.66.16 1.32.16 2s-.07 1.34-.16 2zm1.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95c-.96 1.65-2.49 2.93-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2s-.06-1.34-.14-2h3.38c.17.64.26 1.31.26 2s-.09 1.36-.26 2h-3.38z"/>
              </svg>
              <span>techiehelp.in</span>
            </div>
          </div>
        </header>

        <!-- MAIN CONTENT (Natural Flow) -->
        <main>
          
          <!-- TITLE -->
          <div class="title-box">
            <h1 class="title">INTERNSHIP OFFER LETTER</h1>
          </div>

          <!-- TOP INFO -->
          <div class="top-info">
            <div class="top-info-flex">
              <div>
                <p><strong>Ref ID:</strong> ${refId}</p>
                <p><strong>To,</strong></p>
                <p>${internName}</p>
              </div>
              <div>
                <p><strong>Date:</strong> ${currentDate}</p>
              </div>
            </div>
            <div class="subject-line">Subject: Internship Offer – ${domain} Intern</div>
          </div>

          <!-- BODY -->
          <div class="body-content">
            <p>Dear <strong>${internName}</strong>,</p>
            <p>Congratulations on being selected as a <strong>${domain} Intern</strong> at <strong>TechieHelp Institute of AI</strong>.</p>
            <p>This internship will provide you with real-world exposure, structured learning, and hands-on experience aligned with industry standards. You will work on live projects and gain practical knowledge to enhance your career readiness.</p>
          </div>

          <!-- INTERNSHIP DETAILS -->
          <div class="section-block">
            <div class="details-grid">
              <p><strong>Position:</strong> ${domain} Intern</p>
              <p><strong>Duration:</strong> ${startDate} to ${endDate}</p>
              <p><strong>Work Mode:</strong> Remote / Online</p>
              <p><strong>Stipend:</strong> Performance-Based</p>
              <p><strong>Department:</strong> Technology & Development</p>
              <p><strong>Reporting HR Manager:</strong> Er. Ananya Sharma</p>
            </div>
          </div>

          <!-- ONBOARDING & COMMUNICATION -->
          <div class="section-block">
            <h3 class="section-header">Onboarding & Communication</h3>
            <ul class="custom-list">
              <li>You will receive onboarding instructions before the start date.</li>
              <li>Access to the dashboard, assigned tasks, and internal communication channels will be provided.</li>
              <li>All updates will be officially managed through Email, WhatsApp, and the portal Dashboard.</li>
              <li>Regular reporting and task submissions are strictly mandatory.</li>
            </ul>
          </div>

          <!-- WORKING CULTURE -->
          <div class="section-block">
            <h3 class="section-header">Working Culture</h3>
            <ul class="custom-list">
              <li>We offer a flexible and growth-oriented work environment.</li>
              <li>Strong focus on continuous learning and practical exposure.</li>
              <li>Collaboration, innovation, and accountability are highly encouraged.</li>
              <li>Balanced approach: 70% project work + 30% structured learning.</li>
            </ul>
          </div>

          <!-- ROLES & RESPONSIBILITIES -->
          <div class="section-block">
            <h3 class="section-header">Roles & Responsibilities</h3>
            <ul class="custom-list">
              <li>Work proactively on real-world projects replicating client needs.</li>
              <li>Complete assigned tasks flawlessly within given deadlines.</li>
              <li>Participate iteratively in technical discussions and rigorous code evaluations.</li>
              <li>Maintain absolute professionalism and responsive communication.</li>
            </ul>
          </div>

          <!-- TERMS & CONDITIONS -->
          <div class="section-block">
            <h3 class="section-header">Terms, Conditions & Legal Clauses</h3>
            <ul class="custom-list">
              <li>This internship is primarily learning-focused.</li>
              <li>A predefined probation period may apply based on early performance metrics.</li>
              <li>Interns must adhere firmly to timelines and maintain organizational discipline.</li>
              <li><strong>Notice period:</strong> 15 days written intimation before exiting.</li>
              <li>Any form of documented misconduct or plagiarism may result in immediate termination.</li>
              <li>All technical work and documentation produced is the exclusive intellectual property of TechieHelp.</li>
            </ul>
          </div>

          <!-- BENEFITS -->
          <div class="section-block">
            <h3 class="section-header">Benefits</h3>
            <ul class="custom-list">
              <li>Official Verified Internship Certificate</li>
              <li>Letter of Recommendation (Performance Dependent)</li>
              <li>Direct Mentorship from seasoned developers</li>
              <li>Verified real-world project experience for your resume</li>
              <li>PPO opportunity (Pre-Placement Offer) based entirely on outcome quality</li>
            </ul>
          </div>

          <!-- HR CONTACT -->
          <div class="section-block hr-contact">
            <p><strong>HR Department</strong></p>
            <p>TechieHelp Institute of AI</p>
            <p>📧 hr@techiehelp.in &nbsp;|&nbsp; 📞 +91-7073130165</p>
          </div>

          <div class="closing-block">
            <p>We look forward to supporting your growth throughout this internship.</p>
            <p>Wishing you success in your journey.</p>
          </div>

          <!-- SIGNATURE & BADGES IN NORMAL FLOW -->
          <div class="signature-badges-section">
            <div class="signature-block">
              <img src="${images.signature}" alt="Amit Kumar Signature" class="signature-img" />
              <hr class="signature-line" />
              <p class="signature-name">Amit Kumar</p>
              <p class="signature-title">Founder & CEO</p>
              <p class="signature-title">TechieHelp Institute of AI</p>
            </div>
            
            <div class="footer-badges">
              <img src="${images.seal}" alt="Authorized Seal" class="seal-img" />
              <img src="${images.aicte}" alt="AICTE" />
              <img src="${images.msme}" alt="MSME" />
              <img src="${images.iso}" alt="ISO" />
            </div>
          </div>

        </main>

        <!-- FOOTER (FLOWS EXACTLY AFTER CONTENT, NO EXTRA BLANK SPACING) -->
        <footer>
          <strong>TechieHelp Institute of AI</strong> | EdTech | AI & IT Services | Internship Programs<br/>
          📞 +91-7073130165 | 🌐 techiehelp.in<br/>
          <em>"Learning, Innovation, and Career Growth – All in One Platform"</em>
        </footer>

      </div> <!-- End Container -->

    </body>
    </html>
  `;
}
