export function getCertificateHtml({
  name,
  studentId,
  collegeName,
  domain,
  startDate,
  endDate,
  issueDate,
  refId,
  images // Base64 assets
}) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Internship Completion Certificate</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700&family=Poppins:wght@400;500;600;700&display=swap');
        
        @page { 
          margin: 0; 
          size: A4 landscape; 
        }
        
        body {
          margin: 0;
          padding: 0;
          width: 100vw;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #ffffff;
          font-family: 'Poppins', sans-serif;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }

        .certificate {
          width: 1080px;
          height: 780px;
          background: white;
          border: 18px solid #0f172a;
          position: relative;
          padding: 30px;
          box-sizing: border-box;
          background-image: 
            radial-gradient(circle at top left, #f8fafc 0%, transparent 40%),
            radial-gradient(circle at bottom right, #f8fafc 0%, transparent 40%);
        }
        
        .certificate-inner {
          border: 2px solid #cbd5e1;
          width: 100%;
          height: 100%;
          box-sizing: border-box;
          padding: 20px 40px;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
        }

        /* Certificate ID Tracking */
        .certificate-number {
          position: absolute;
          top: -15px;
          right: 30px;
          font-size: 11px;
          color: #64748b;
          letter-spacing: 1px;
          background: white;
          padding: 0 10px;
          font-weight: 500;
        }

        /* TOP ROW */
        .header-row {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 25px;
        }

        .badges-left, .badges-right {
          display: flex;
          align-items: center;
          width: 150px;
        }

        .badges-right {
          justify-content: flex-end;
        }

        .badge-logo {
          height: 65px !important;
          object-fit: contain;
        }

        .logo-center {
          display: flex;
          justify-content: center;
          flex: 1;
        }
        
        .logo-center img {
          height: 85px;
          object-fit: contain;
        }

        /* TITLE */
        .title-area {
          text-align: center;
          margin-bottom: 10px; /* Heavily compressed */
        }

        .title {
          font-family: 'Cinzel', serif;
          font-size: 34px;
          color: #0f172a;
          letter-spacing: 3px;
          font-weight: 700;
          margin: 0 0 10px 0;
          text-transform: uppercase;
        }

        .subtitle {
          font-size: 15px;
          color: #64748b;
          letter-spacing: 1.5px;
          margin: 0;
          text-transform: uppercase;
          font-weight: 500;
        }

        /* NAME */
        .name-area {
          text-align: center;
          margin-bottom: 10px; /* Compressed */
        }

        .name-text {
          font-family: 'Cinzel', serif;
          font-size: 46px;
          color: #d97706; /* Golden highlight */
          font-weight: 700;
          margin: 0;
          line-height: 1;
        }
        
        .name-underline {
          width: 70%;
          height: 2px;
          background: linear-gradient(90deg, transparent, #cbd5e1, transparent);
          margin: 15px auto 0 auto;
        }

        /* CONTENT */
        .certificate-content {
          text-align: center;
          font-size: 14px;
          color: #334155;
          line-height: 2.0;
          max-width: 850px;
          margin: 0 auto;
        }

        .certificate-content strong {
          color: #0f172a;
          font-weight: 600;
        }

        .highlight-bold {
          font-size: 17px;
          font-weight: 700;
          color: #1e293b;
        }

        /* REFERENCE NUM */
        .reference-block {
          text-align: center;
          font-weight: 600;
          font-size: 14px;
          color: #1e293b;
          margin-top: 15px;
        }

        /* BOTTOM ROW */
        .bottom-row {
          width: 100%;
          margin-top: auto;
          margin-bottom: 25px; /* Extra bottom lift */
          display: flex;
          justify-content: space-between; /* Restored to between */
          align-items: flex-start; /* Aligns tops so logos are perfectly inline horizontally */
          padding: 0 80px 0 20px; /* 80px right-padding forcefully pushes the Seal inwards closer to QR */
          box-sizing: border-box;
        }

        .signature-block {
          text-align: center;
          width: 220px;
        }

        .signature-block img {
          height: 55px;
          display: block;
          margin: 0 auto 5px auto;
        }

        .signature-line {
          width: 180px;
          border-top: 1.5px solid #64748b;
          margin: 5px auto;
        }

        .signature-name {
          font-weight: 700;
          font-size: 14px;
          color: #0f172a;
          margin: 0;
        }

        .signature-title {
          font-size: 11px;
          color: #64748b;
          margin: 2px 0 0 0;
        }

        .qr-block {
          text-align: center;
          padding-bottom: 10px;
          margin-left: 80px; /* Shifts the QR exactly towards the seal */
        }

        .qr-block img {
          height: 85px; /* Restored size */
          width: 85px;
          object-fit: contain;
          border: 1px solid #e2e8f0;
          padding: 4px;
          border-radius: 4px;
          background: white;
        }

        .qr-block p {
          font-size: 10px;
          color: #94a3b8;
          margin: 5px 0 0 0;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .seal-block {
          width: 280px;
          display: flex;
          justify-content: flex-end;
          align-items: flex-start;
          gap: 30px;
        }

        .seal-block img {
          height: 95px; /* Manually enlarged */
          object-fit: contain;
        }
      </style>
    </head>
    <body>
      <div class="certificate">
        <div class="certificate-inner">

          <!-- TOP ROW HEADER -->
          <div class="header-row">
            <div class="badges-left">
              <img src="${images.msme}" alt="MSME Logo" class="badge-logo" />
            </div>
            
            <div class="logo-center">
              <img src="${images.logo}" alt="TechieHelp Logo" />
            </div>
            
            <div class="badges-right">
              <img src="${images.aicte}" alt="AICTE Logo" class="badge-logo" />
            </div>
          </div>

          <!-- TITLE SECTION -->
          <div class="title-area">
            <h1 class="title">Certificate of Internship Completion</h1>
            <p class="subtitle">This certificate is proudly presented to</p>
          </div>

          <!-- NAME HIGHLIGHT -->
          <div class="name-area">
            <h2 class="name-text">${name}</h2>
            <div class="name-underline"></div>
          </div>

          <!-- CONTENT EXACTLY matching user request -->
          <div class="certificate-content">
            This is to certify that the student bearing ID: <strong>${studentId}</strong> <br/>
            from <strong class="highlight-bold">${collegeName}</strong> has successfully completed the internship in <strong class="highlight-bold">"${domain}"</strong>
            <br/><br/>
            under the mentorship of TechieHelp - India's Leading AI Software Development Company.<br/>
            The internship tenure was from <strong>${startDate}</strong> to <strong>${endDate}</strong>.
          </div>

          <!-- BOTTOM SIGNATURE, QR & VERIFICATION ROW -->
          <div class="bottom-row">
            <div class="signature-block">
              <img src="${images.signature}" alt="Amit Kumar Signature" />
              <div class="signature-line"></div>
              <p class="signature-name">Amit Kumar</p>
              <p class="signature-title">Founder & CEO</p>
              <p class="signature-title">TechieHelp Institute of AI</p>
            </div>
            
            <div class="qr-block">
              <img src="${images.qrCode}" alt="Verification QR Code" />
              <p>Scan to Verify</p>
            </div>
            
            <div class="seal-block">
              <img src="${images.seal}" alt="Official Seal" />
              <img src="${images.iso}" alt="ISO Logo" />
            </div>
          </div>

        </div>
      </div>

    </body>
    </html>
  `;
}
