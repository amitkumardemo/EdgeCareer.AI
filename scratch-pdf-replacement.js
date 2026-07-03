    // 3. Generate PDF with jsPDF
    const doc = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 50;
    const contentWidth = pageWidth - margin * 2;

    // Theme Colors
    const colors = {
      navy: [11, 61, 145], // #0B3D91
      gold: [244, 180, 0], // #F4B400
      greyLight: [248, 249, 250], // #F8F9FA
      greyBorder: [226, 232, 240], // slate-200
      textMain: [30, 41, 59], // slate-800
      textMuted: [100, 116, 139], // slate-500
    };

    // Helper: Draw Footer on current page
    const drawFooter = () => {
      const footerY = pageHeight - 65;
      doc.setDrawColor(colors.gold[0], colors.gold[1], colors.gold[2]);
      doc.setLineWidth(1.5);
      doc.line(margin, footerY, pageWidth - margin, footerY);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(8.5);
      doc.setTextColor(colors.navy[0], colors.navy[1], colors.navy[2]);
      doc.text("TechieHelp Institute of AI  |  Building AI Leaders Through Skills, Experience & Innovation", pageWidth / 2, footerY + 15, { align: "center" });

      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(colors.textMuted[0], colors.textMuted[1], colors.textMuted[2]);
      doc.text("+91-7073130165  |  techiehelpinstituteofai@gmail.com  |  https://techiehelpinstituteofai.in", pageWidth / 2, footerY + 28, { align: "center" });
      
      const pageNumber = doc.internal.getNumberOfPages();
      doc.text(`Page ${pageNumber} | Digitally Generated Document - Confidential`, pageWidth / 2, footerY + 41, { align: "center" });
    };

    // Helper: Draw Watermark
    const drawWatermark = () => {
      if (images.logo) {
        doc.saveGraphicsState();
        doc.setGState(new doc.GState({ opacity: 0.05 }));
        const w = 300;
        const h = 150;
        doc.addImage(images.logo, "PNG", (pageWidth - w) / 2, (pageHeight - h) / 2, w, h, "", "MEDIUM");
        doc.restoreGraphicsState();
      }
    };

    drawWatermark();

    // ─── Header ───
    if (images.logo) {
      doc.addImage(images.logo, "PNG", margin, 35, 120, 60, "", "MEDIUM");
    }

    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(colors.navy[0], colors.navy[1], colors.navy[2]);
    doc.text("TechieHelp Institute of AI", pageWidth - margin, 50, { align: "right" });
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(colors.textMuted[0], colors.textMuted[1], colors.textMuted[2]);
    doc.text("Vivek Vihar Yojana, Sector 14, Block D, Room No. 31", pageWidth - margin, 65, { align: "right" });
    doc.text("+91 7073130165  |  techiehelpinstituteofai@gmail.com", pageWidth - margin, 78, { align: "right" });
    doc.text("https://techiehelpinstituteofai.in", pageWidth - margin, 91, { align: "right" });

    // Premium Divider
    doc.setDrawColor(colors.navy[0], colors.navy[1], colors.navy[2]);
    doc.setLineWidth(2);
    doc.line(margin, 115, pageWidth - margin - 100, 115);
    doc.setDrawColor(colors.gold[0], colors.gold[1], colors.gold[2]);
    doc.line(pageWidth - margin - 100, 115, pageWidth - margin, 115);

    // ─── Title ───
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor(colors.navy[0], colors.navy[1], colors.navy[2]);
    const title = "INTERNSHIP OFFER LETTER";
    const titleWidth = doc.getTextWidth(title);
    doc.text(title, (pageWidth - titleWidth) / 2, 150);

    // Badges Row
    const badgeY = 165;
    doc.setFillColor(colors.greyLight[0], colors.greyLight[1], colors.greyLight[2]);
    doc.setDrawColor(colors.greyBorder[0], colors.greyBorder[1], colors.greyBorder[2]);
    doc.setLineWidth(0.5);
    
    const drawBadge = (label, value, x, w) => {
      doc.roundedRect(x, badgeY, w, 20, 3, 3, "FD");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.setTextColor(colors.navy[0], colors.navy[1], colors.navy[2]);
      doc.text(label + ":", x + 8, badgeY + 13);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(colors.textMain[0], colors.textMain[1], colors.textMain[2]);
      doc.text(value, x + 8 + doc.getTextWidth(label + ": "), badgeY + 13);
    };

    const bWidth = (contentWidth - 20) / 3;
    drawBadge("Issue Date", currentDate, margin, bWidth);
    drawBadge("Internship ID", studentId, margin + bWidth + 10, bWidth);
    drawBadge("Ref ID", `TH/${currentYear}/${studentId.slice(-4)}`, margin + (bWidth * 2) + 20, bWidth);

    // ─── Introduction ───
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
    doc.setTextColor(colors.textMain[0], colors.textMain[1], colors.textMain[2]);
    let y = 215;
    const lineH = 16;

    doc.text(`Dear ${internName},`, margin, y);
    y += 20;

    const introText = `We are thrilled to extend this offer to you for the position of ${domain} Intern at TechieHelp Institute of AI. Following your successful application and review process, we believe your skills and enthusiasm align perfectly with our mission to build AI leaders through experience and innovation.`;
    const introLines = doc.splitTextToSize(introText, contentWidth);
    doc.text(introLines, margin, y);
    y += introLines.length * lineH + 15;

    // ─── Information Card Grid ───
    doc.setFillColor(colors.greyLight[0], colors.greyLight[1], colors.greyLight[2]);
    doc.setDrawColor(colors.greyBorder[0], colors.greyBorder[1], colors.greyBorder[2]);
    doc.roundedRect(margin, y, contentWidth, 110, 6, 6, "FD");

    const col1 = margin + 15;
    const col2 = margin + contentWidth / 2 + 10;
    
    const detailRow = (label, value, x, rowY) => {
      doc.setFillColor(colors.navy[0], colors.navy[1], colors.navy[2]);
      doc.circle(x + 2, rowY - 3, 2, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9.5);
      doc.setTextColor(colors.navy[0], colors.navy[1], colors.navy[2]);
      doc.text(label, x + 10, rowY);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(colors.textMain[0], colors.textMain[1], colors.textMain[2]);
      doc.text(value, x + 10 + doc.getTextWidth(label) + 5, rowY);
    };

    detailRow("Candidate:", internName, col1, y + 20);
    detailRow("Position:", `${domain} Intern`, col2, y + 20);
    detailRow("Department:", "Technology & Development", col1, y + 40);
    detailRow("Work Mode:", "Remote / Online", col2, y + 40);
    detailRow("Duration:", `${startDate} to ${endDate}`, col1, y + 60);
    detailRow("College:", collegeName.length > 30 ? collegeName.substring(0, 30) + '...' : collegeName, col2, y + 60);
    detailRow("Stipend:", "Performance-Based", col1, y + 80);
    detailRow("Reporting HR:", "Er. Aditya Kumar", col2, y + 80);

    y += 135;

    // ─── Section Helper ───
    const writeSection = (heading, items, curY) => {
      if (curY + 80 > pageHeight - 80) {
        drawFooter();
        doc.addPage();
        drawWatermark();
        curY = margin;
      }
      
      doc.setFillColor(colors.greyLight[0], colors.greyLight[1], colors.greyLight[2]);
      const boxH = 30 + (items.length * lineH);
      doc.roundedRect(margin, curY, contentWidth, boxH, 4, 4, "F");
      
      doc.setFillColor(colors.navy[0], colors.navy[1], colors.navy[2]);
      doc.rect(margin, curY + 8, 4, 14, "F");
      
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10.5);
      doc.setTextColor(colors.navy[0], colors.navy[1], colors.navy[2]);
      doc.text(heading, margin + 12, curY + 19);
      
      curY += 35;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9.5);
      doc.setTextColor(colors.textMain[0], colors.textMain[1], colors.textMain[2]);

      for (const item of items) {
        doc.setFillColor(colors.gold[0], colors.gold[1], colors.gold[2]);
        doc.circle(margin + 14, curY - 3, 2, "F");
        doc.text(item, margin + 22, curY);
        curY += lineH;
      }
      return curY + 20;
    };

    y = writeSection("ROLES & RESPONSIBILITIES", [
      "Work proactively on real-world projects replicating client needs.",
      "Complete assigned tasks within given deadlines.",
      "Participate iteratively in technical discussions and code evaluations.",
      "Maintain absolute professionalism and responsive communication.",
    ], y);

    y = writeSection("TERMS, CONDITIONS & LEGAL CLAUSES", [
      "This internship is primarily learning-focused.",
      "A predefined probation period may apply based on early performance metrics.",
      "Interns must adhere firmly to timelines and maintain organizational discipline.",
      "Notice period: 15 days written intimation before exiting.",
      "Any form of documented misconduct or plagiarism may result in immediate termination.",
      "All technical work and documentation produced is the exclusive intellectual property of TechieHelp.",
    ], y);

    // ─── Benefits Grid ───
    if (y + 100 > pageHeight - 80) {
      drawFooter();
      doc.addPage();
      drawWatermark();
      y = margin;
    }
    
    doc.setFillColor(colors.navy[0], colors.navy[1], colors.navy[2]);
    doc.rect(margin, y, 4, 14, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.text("INTERNSHIP BENEFITS", margin + 12, y + 11);
    y += 30;

    const benefits = [
      "Official Verified Certificate", "Letter of Recommendation",
      "Industry Mentorship", "Live Project Experience",
      "PPO Opportunity (Performance)", "Leaderboard Recognition"
    ];
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    doc.setTextColor(colors.textMain[0], colors.textMain[1], colors.textMain[2]);
    
    for (let i = 0; i < benefits.length; i++) {
      const isRightCol = i % 2 !== 0;
      const bx = isRightCol ? margin + contentWidth / 2 : margin;
      const by = y + Math.floor(i / 2) * 25;
      
      doc.setFillColor(colors.greyLight[0], colors.greyLight[1], colors.greyLight[2]);
      doc.roundedRect(bx, by, contentWidth / 2 - 10, 20, 3, 3, "F");
      
      doc.setFillColor(colors.gold[0], colors.gold[1], colors.gold[2]);
      doc.circle(bx + 10, by + 10, 2.5, "F");
      doc.text(benefits[i], bx + 18, by + 14);
    }
    
    y += Math.ceil(benefits.length / 2) * 25 + 30;

    // ─── Signatures ───
    if (y + 120 > pageHeight - 80) {
      drawFooter();
      doc.addPage();
      drawWatermark();
      y = margin;
    }

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text("We look forward to supporting your growth and welcoming you to the team.", margin, y);
    y += 40;

    let sigWidth = 80;
    if (images.signature) {
      doc.addImage(images.signature, "PNG", margin, y, sigWidth, 40, "", "SLOW");
    }
    if (images.seal) {
      doc.addImage(images.seal, "PNG", margin + 120, y - 10, 65, 65, "", "SLOW");
    }
    
    doc.setDrawColor(colors.greyBorder[0], colors.greyBorder[1], colors.greyBorder[2]);
    doc.setLineWidth(1);
    doc.line(margin, y + 45, margin + 100, y + 45); 
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.setTextColor(colors.navy[0], colors.navy[1], colors.navy[2]);
    doc.text("Amit Kumar", margin, y + 60);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(colors.textMuted[0], colors.textMuted[1], colors.textMuted[2]);
    doc.text("Founder & CEO", margin, y + 72);
    doc.text("TechieHelp Institute of AI", margin, y + 84);

    drawFooter();

    // ==============================================================
    // PAGE 2: ACCEPTANCE
    // ==============================================================
    doc.addPage();
    drawWatermark();

    // ─── Header ───
    if (images.logo) {
      doc.addImage(images.logo, "PNG", margin, 35, 120, 60, "", "MEDIUM");
    }

    // Premium Divider
    doc.setDrawColor(colors.navy[0], colors.navy[1], colors.navy[2]);
    doc.setLineWidth(2);
    doc.line(margin, 115, pageWidth - margin - 100, 115);
    doc.setDrawColor(colors.gold[0], colors.gold[1], colors.gold[2]);
    doc.line(pageWidth - margin - 100, 115, pageWidth - margin, 115);

    // Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor(colors.navy[0], colors.navy[1], colors.navy[2]);
    const accTitle = "INTERNSHIP OFFER ACCEPTANCE";
    const accTitleWidth = doc.getTextWidth(accTitle);
    doc.text(accTitle, (pageWidth - accTitleWidth) / 2, 160);
    
    let ay = 200;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
    doc.setTextColor(colors.textMain[0], colors.textMain[1], colors.textMain[2]);
    
    doc.text("I, the undersigned, hereby acknowledge and declare that:", margin, ay);
    ay += 30;

    const declarations = [
      "I accept the internship offer for the specified domain and duration.",
      "I agree to comply with all company policies, rules, and code of conduct.",
      "I understand that this is a learning-focused role and stipends (if any) are performance-based.",
      "I commit to maintaining strict confidentiality regarding company projects and data.",
      "I acknowledge that any form of misconduct or plagiarism may result in termination."
    ];

    doc.setFontSize(10);
    for (const dec of declarations) {
      doc.setFillColor(colors.gold[0], colors.gold[1], colors.gold[2]);
      doc.roundedRect(margin, ay - 9, 10, 10, 2, 2, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.text("v", margin + 2.5, ay - 1.5); // Checkmark simulation
      
      doc.setTextColor(colors.textMain[0], colors.textMain[1], colors.textMain[2]);
      doc.setFont("helvetica", "normal");
      doc.text(dec, margin + 20, ay);
      ay += 25;
    }

    ay += 20;
    
    // Acceptance Grid
    doc.setFillColor(colors.greyLight[0], colors.greyLight[1], colors.greyLight[2]);
    doc.setDrawColor(colors.greyBorder[0], colors.greyBorder[1], colors.greyBorder[2]);
    doc.roundedRect(margin, ay, contentWidth, 200, 6, 6, "FD");
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(colors.navy[0], colors.navy[1], colors.navy[2]);
    
    // Grid Lines inside box
    doc.line(margin, ay + 100, pageWidth - margin, ay + 100);
    doc.line(pageWidth / 2, ay, pageWidth / 2, ay + 200);

    // Box 1: Intern Signature
    doc.text("Intern Name:", margin + 15, ay + 25);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(colors.textMain[0], colors.textMain[1], colors.textMain[2]);
    doc.text(internName, margin + 15, ay + 40);
    doc.line(margin + 15, ay + 80, margin + 200, ay + 80);
    doc.text("Intern Signature & Date", margin + 15, ay + 92);

    // Box 2: College Info
    doc.setFont("helvetica", "bold");
    doc.setTextColor(colors.navy[0], colors.navy[1], colors.navy[2]);
    doc.text("College/University:", pageWidth / 2 + 15, ay + 25);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(colors.textMain[0], colors.textMain[1], colors.textMain[2]);
    const splitCollege = doc.splitTextToSize(collegeName, (contentWidth / 2) - 30);
    doc.text(splitCollege, pageWidth / 2 + 15, ay + 40);

    // Box 3: HR Signature
    doc.setFont("helvetica", "bold");
    doc.setTextColor(colors.navy[0], colors.navy[1], colors.navy[2]);
    doc.text("Authorized HR Signatory:", margin + 15, ay + 125);
    if (images.signature) {
      doc.addImage(images.signature, "PNG", margin + 15, ay + 135, 70, 35, "", "SLOW");
    }
    doc.line(margin + 15, ay + 180, margin + 200, ay + 180);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(colors.textMain[0], colors.textMain[1], colors.textMain[2]);
    doc.text("Er. Aditya Kumar", margin + 15, ay + 192);

    // Box 4: Seal placeholder
    doc.setFont("helvetica", "bold");
    doc.setTextColor(colors.navy[0], colors.navy[1], colors.navy[2]);
    doc.text("Company Seal:", pageWidth / 2 + 15, ay + 125);
    if (images.seal) {
      doc.addImage(images.seal, "PNG", pageWidth / 2 + 15, ay + 135, 50, 50, "", "SLOW");
    }
    
    // QR Code Placeholder text
    doc.setFont("helvetica", "italic");
    doc.setFontSize(8);
    doc.setTextColor(colors.textMuted[0], colors.textMuted[1], colors.textMuted[2]);
    doc.text("* Scan QR code on dashboard for digital verification", margin, ay + 220);

    drawFooter();

    // 4. Export PDF as base64 data URL
    const pdfBase64 = doc.output("datauristring");
